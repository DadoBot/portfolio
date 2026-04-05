import marvelliImg from '../assets/images/marvelli-ui.png';
import homeServerImg from '../assets/images/homeserver-ui.png';

const projects = [
  {
    id: 'marvelli',
    year: '2025',
    image: marvelliImg,
    imageAlt: 'Marvelli Management System UI',
    tech: ['Laravel 12', 'React 19', 'MySQL', 'Docker', 'Nginx', 'Sanctum'],
    links: {},
    en: {
      meta: 'Product Design & Development · 2025',
      title: 'Marvelli',
      tagline: 'A production-ready management platform for social assistance distribution.',
      role: 'Product Designer & Frontend Developer. Requirements gathering, ER schema design, UI flow definition, and React frontend development.',
      approach:
        'I gathered requirements alongside my friend and collaborator Winner Ozekhome, and together we structured the ER schema. I defined the user flow and the system components needed to satisfy each requirement. UI was designed with Google Stitch; the React frontend was built with the help of Gemini CLI.',
      learnings: [
        'Analysing and understanding functional requirements',
        'Designing simple, intuitive navigation for end users',
        'React 19 component architecture',
        'Docker containerisation and multi-service orchestration',
        'Collaborating across design and engineering disciplines',
      ],
    },
    it: {
      meta: 'Product Design & Sviluppo · 2025',
      title: 'Marvelli',
      tagline: 'Una piattaforma gestionale production-ready per la distribuzione di assistenza sociale.',
      role: 'Product Designer & Frontend Developer. Raccolta requisiti, design schema ER, definizione flusso UI, sviluppo frontend React.',
      approach:
        'Ho raccolto i requisiti insieme al mio amico e collaboratore Winner Ozekhome, strutturando insieme lo schema ER del sistema. Ho definito il flusso UI e le componenti necessarie a soddisfare ogni requisito. La UI è stata disegnata con Google Stitch; il frontend React è stato sviluppato con l\'aiuto di Gemini CLI.',
      learnings: [
        'Analizzare e comprendere i requisiti funzionali',
        'Progettare una navigazione semplice e intuitiva',
        'Architettura a componenti con React 19',
        'Containerizzazione Docker e orchestrazione multi-servizio',
        'Collaborazione tra design e ingegneria',
      ],
    },
  },
  {
    id: 'homeserver',
    year: '2024–ongoing',
    image: homeServerImg,
    imageAlt: 'Home Lab Infrastructure Dashboard',
    tech: ['Docker Swarm', 'Nginx Proxy Manager', 'Pi-hole', 'Vaultwarden', 'Prometheus', 'Grafana', 'Twingate'],
    links: {},
    en: {
      meta: 'Personal Project · 2024 – ongoing',
      title: 'Home Lab',
      tagline: 'A production-grade self-hosted infrastructure built on zero-trust principles.',
      role: 'Infrastructure Owner. Full ownership of architecture, deployment, security model, and documentation.',
      approach:
        'I approached this project with the same operational discipline used in professional environments: declarative configuration, secret management via Docker Swarm Secrets, TLS everywhere with mkcert, centralized observability with Prometheus and Grafana, and zero-trust remote access via Twingate — no open ports on the router.',
      learnings: [
        'Docker Swarm networking and stack management',
        'Reading and applying industry documentation and best practices',
        'Implementing the principle of least privilege',
        'Zero-trust access with Twingate (no open router ports)',
        'Understanding the foundations of running a self-hosted system',
      ],
    },
    it: {
      meta: 'Progetto Personale · 2024 – in corso',
      title: 'Home Lab',
      tagline: 'Un\'infrastruttura self-hosted di livello produzione, basata su principi zero-trust.',
      role: 'Infrastructure Owner. Responsabilità completa su architettura, deployment, modello di sicurezza e documentazione.',
      approach:
        'Ho approcciato questo progetto con la stessa disciplina operativa dei contesti professionali: configurazione dichiarativa, gestione dei segreti tramite Docker Swarm Secrets, TLS ovunque con mkcert, osservabilità centralizzata con Prometheus e Grafana, e accesso remoto zero-trust via Twingate — senza aprire una sola porta sul router.',
      learnings: [
        'Gestione di reti Docker Swarm e stack',
        'Lettura e applicazione di documentazioni e best practice del settore',
        'Implementazione del principio del "least privilege"',
        'Accesso zero-trust con Twingate',
        'Capire le basi per gestire un sistema self-hosted',
      ],
    },
  },
];

export default projects;
