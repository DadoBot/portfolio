# 🏠 Home Lab Infrastructure

A self-hosted, production-grade home lab built on **Docker Swarm**, designed around the principles of modularity, security, and zero external exposure. Every service is containerized, centrally managed, and accessible from anywhere — without opening a single port on the router.

---

## Philosophy

Most home lab setups grow organically: a container here, a compose file there, credentials scattered in plain text. This project takes a different approach.

The goal is to run self-hosted services with the same operational discipline you'd apply to a real infrastructure: declarative configuration, secret management, reverse proxying with valid TLS, centralized observability, and secure remote access. Docker Swarm provides the orchestration layer — lightweight enough for a single node, but ready to scale horizontally the moment a second machine joins.

Everything is version-controlled. Nothing requires SSH-ing into the server to make a change.

---

## Architecture

The infrastructure is organized into independent stacks, all communicating over a shared Docker overlay network (`infra_network`). Portainer acts as the single control plane for deploying and managing every stack.

```
┌─────────────────────────────────────────────────────────────┐
│                        Docker Swarm                         │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │  Portainer  │  │  NPM + Pihole│  │   Vaultwarden    │    │
│  │    Stack    │  │    Stack     │  │      Stack       │    │
│  └──────┬──────┘  └──────┬───────┘  └────────┬─────────┘    │
│         └────────────────┴───────────────────┘              │
│                    infra_network (overlay)                  │
│                                                             │
│  ┌──────────────────────┐   ┌──────────────────────────┐    │
│  │   Monitoring Stack   │   │     Twingate Connector   │    │
│  │  Prometheus · Grafana│   │   (Zero-Trust Access)    │    │
│  │  Node Exporter (global)  └──────────────────────────┘    │
│  │  cAdvisor      (global)                                  │
│  └──────────────────────┘                                   │
└─────────────────────────────────────────────────────────────┘
```

### TLS & DNS

All services are exposed internally via **Nginx Proxy Manager** using a wildcard certificate for `*.home.lab`, generated with `mkcert`. A local **Pi-hole** instance handles DNS resolution for all `.home.lab` domains, doubling as a network-wide ad blocker.

```
Client (any device, any network)
        │  HTTPS  ──────────────────────────────┐
        │                               Twingate tunnel
        ▼                                       │
  Nginx Proxy Manager :443           (if remote)│
        │                                       ┘
        ├──► portainer.home.lab  → portainer:9443
        ├──► vault.home.lab      → vaultwarden:80
        ├──► grafana.home.lab    → grafana:3000
        ├──► pi-hole.home.lab    → pihole:80
        └──► proxy-manager.home.lab → npm:81
```

---

## Services

| Service | Stack | Description |
|---------|-------|-------------|
| [Portainer CE](https://www.portainer.io/) | `portainer` | Container management UI for Docker Swarm |
| [Nginx Proxy Manager](https://nginxproxymanager.com/) | `proxy-pihole` | Reverse proxy with SSL termination |
| [Pi-hole](https://pi-hole.net/) | `proxy-pihole` | DNS-level ad blocking & local DNS |
| [Vaultwarden](https://github.com/dani-garcia/vaultwarden) | `vaultwarden` | Self-hosted Bitwarden-compatible password manager |
| [Prometheus](https://prometheus.io/) | `monitoring` | Metrics collection & time-series database |
| [Grafana](https://grafana.com/) | `monitoring` | Observability dashboards |
| [Node Exporter](https://github.com/prometheus/node_exporter) | `monitoring` | Host-level hardware & OS metrics |
| [cAdvisor](https://github.com/google/cadvisor) | `monitoring` | Per-container resource metrics |
| [Twingate](https://www.twingate.com/) | `twingate` | Zero-trust remote access — no open ports |

---

## Security Model

- **No open ports** — remote access is handled entirely by Twingate, which uses outbound-only connections from the connector to a relay. The router firewall remains untouched.
- **Docker Secrets** — sensitive values (e.g. Vaultwarden admin token) are stored as Swarm secrets and mounted at `/run/secrets/`, never as plain environment variables.
- **TLS everywhere** — all services are served over HTTPS using a locally-trusted wildcard certificate. Browsers show no warnings on devices that have imported the local CA.
- **Signup lockdown** — Vaultwarden public registration is disabled after the initial account setup.

---

## Repository Structure

```
/
├── infrastructure/
│   ├── monitoring/
│   │   ├── docker-compose.yaml
│   │   └── prometheus/
│   │       └── prometheus.yml
│   ├── password-manager/
│   │   └── docker-compose.yaml
│   ├── portainer/
│   │   └── docker-compose.yaml
│   ├── proxy-pihole/
│   │   └── docker-compose.yaml
│   └── twingate/
│       └── docker-compose.yaml
├── .wiki/
│   ├── INFRASTRUCTURE.md
│   ├── MONITORING.md
│   └── REMOTE-CONNECTION.md
└── README.md
```

---

## Documentation

Detailed setup guides and operational notes live in the `.wiki/` directory:

- **[INFRASTRUCTURE.md](.wiki/INFRASTRUCTURE.md)** — Full setup guide: Swarm init, network creation, stack deploy order, TLS with mkcert, NPM proxy host configuration, Pi-hole DNS records, Vaultwarden hardening, and future node expansion.
- **[MONITORING.md](.wiki/MONITORING.md)** — Monitoring stack architecture, Prometheus scrape configuration for Swarm services, Grafana data source setup, and recommended dashboard IDs.
- **[REMOTE-CONNECTION.md](.wiki/REMOTE-CONNECTION.md)** — Twingate setup: network creation, connector deploy, resource definition, and client installation.

---

## Scalability

The Swarm setup is single-node today but designed to grow. Node Exporter and cAdvisor are deployed in `global` mode — they automatically start on every new node added to the cluster. Prometheus uses the `tasks.` DNS prefix to scrape all instances. Adding a second machine is a single command:

```bash
# On the manager
docker swarm join-token worker

# On the new node
docker swarm join --token <TOKEN> <MANAGER_IP>:2377
```

No configuration changes required anywhere else.

---

## Stack Deploy Order

If rebuilding from scratch:

1. `docker swarm init` + create `infra_network` overlay
2. Deploy **portainer** stack via CLI
3. From Portainer UI, deploy in order: **proxy-pihole** → **vaultwarden** → **monitoring** → **twingate**

See [INFRASTRUCTURE.md](.wiki/INFRASTRUCTURE.md) for the full step-by-step procedure.
