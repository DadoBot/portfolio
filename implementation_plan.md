# Piano di Implementazione — Portfolio Personale

## Descrizione

Sviluppo di un portfolio personale ispirato allo stile di [perryw-2023.webflow.io](https://perryw-2023.webflow.io/), che adotta un'estetica **dark minimalista premium**. Il sito sarà realizzato in **HTML + CSS + JavaScript vanilla** (nessun framework), così da essere semplice da mantenere e distribuire come sito statico.

---

## Decisioni di Design

> [!IMPORTANT]
> Il sito di Perry Wang usa un layout ispirato alle finestre del browser (bordi arrotondati, "window controls" stile macOS). Propongo di riprendere questo elemento visivo come tratto distintivo del tuo portfolio.

> [!NOTE]
> La struttura sarà **single-page** con due "viste" distinte: **Work** e **About** (navigabili tramite un toggle centrale nella navbar), senza ricaricare la pagina. Questo replica fedelmente il funzionamento del sito di riferimento.

---

## Architettura del Sito

Il sito sarà composto da **un singolo file `index.html`** e relativi file di stile e logica separati per manutenibilità.

```
Portfolio/
├── index.html          # Struttura principale
├── style.css           # Design system e tutti gli stili
├── script.js           # Logica di navigazione e animazioni
└── assets/
    └── images/         # Immagini dei progetti (generate o placeholder)
```

---

## Sezioni e Contenuto

### 1. Navbar (fissa in alto)
| Zona | Contenuto |
|------|-----------|
| Sinistra | Nome + Ruolo (es. "Davide — Developer & Designer") |
| Centro | Toggle pill: **Work** / **About** |
| Destra | Link a LinkedIn + CV con icona freccia diagonale ↗ |

---

### 2. Vista "Work" (Homepage)

#### Hero Section
- Container con stile "browser window" (bordo 1px, angoli arrotondati, 3 dot colorati in alto)
- Headline grande e impattante con mix di font sans-serif + serif in corsivo
- Esempio: *"Progetto sistemi, esperienze & **soluzioni**."*
- Indicatore di scroll (freccia verso il basso)

#### Lista Progetti
Ogni progetto è un modulo verticale espandibile (o una card cliccabile) con:

| Campo | Descrizione |
|-------|-------------|
| **Label** | Ruolo + Anno (piccolo, maiuscolo, grigio) |
| **Titolo** | Nome del progetto (grande, bold, bianco) |
| **Tagline** | Una riga descrittiva del progetto |
| **Immagine** | Screenshot/mockup del progetto nel container "window" |
| **Ruolo** | Badge/tag con il ruolo ricoperto |
| **Approccio** | Paragrafo narrativo del processo seguito |
| **Insegnamenti** | Lista bullet con i learnings chiave |

##### Marvelli
- **Ruolo:** Progettista, design schema ER, raccolta requisiti
- **Approccio:** Raccolta requisiti insieme a Winner Ozekhome, strutturazione ER, definizione flusso UI, design con Google Stitch, sviluppo FE React tramite Gemini CLI
- **Insegnamenti:** Analisi requisiti funzionali, navigazione UX semplice, React

##### Home Server
- **Ruolo:** Owner — progetto personale
- **Approccio:** Approccio professionale ispirato a pratiche aziendali; self-hosted con stack Docker
- **Insegnamenti:** Docker networking, documentazioni e best practice, principio del "least privilege", fondamenta del self-hosting

---

### 3. Vista "About Me"

Layout a due colonne (o a sezioni verticali) con:
- **Foto personale** nel container "window" (se disponibile)
- **Bio narrativa** con tocco personale (chi sei, da dove vieni, interessi)
- **Sezione Interessi** con icone o tag visivi
- **Link** a LinkedIn, GitHub, Email

> [!NOTE]
> Questa sezione è dove puoi aggiungere la tua voce personale. Nel piano finale puoi dirmi cosa vuoi che compaia: interessi, hobby, percorso formativo, ecc.

---

## Design System

### Palette Colori
| Token | Valore | Uso |
|-------|--------|-----|
| `--bg` | `#0A0A0A` | Background principale |
| `--surface` | `#111111` | Card / container |
| `--border` | `rgba(255,255,255,0.1)` | Bordi e divisori |
| `--text-primary` | `#FFFFFF` | Titoli, nav attivo |
| `--text-secondary` | `#A1A1A1` | Metadati, descrizioni |
| `--accent-glow` | `rgba(100,130,255,0.15)` | Glow esterno sui container |
| `--dot-red` | `#FF5F57` | Window control |
| `--dot-yellow` | `#FFBD2E` | Window control |
| `--dot-green` | `#28C840` | Window control |

### Tipografia
| Elemento | Font | Dimensione | Peso |
|----------|------|-----------|------|
| Heading Hero | Inter | 72–88px | 700 |
| Serif accent | EB Garamond | stesso | italic |
| Titolo progetto | Inter | 32–40px | 700 |
| Label / Tag | Inter | 11–12px | 600, uppercase |
| Body | Inter | 16–18px | 400 |
| Nav | Inter | 14px | 500 |

### Componenti Chiave
- **Window Container:** `border-radius: 12px`, `border: 1px solid var(--border)`, `box-shadow: 0 0 40px var(--accent-glow)`
- **Window Controls:** 3 dot `12px` con colori macOS
- **Nav Pill:** `background: rgba(255,255,255,0.08)`, `border-radius: 999px`, `border: 1px solid var(--border)`
- **Hover su progetti:** Leggera scala `transform: scale(1.01)` + aumento brightness del border

### Animazioni
- Fade-in su scroll (Intersection Observer)
- Smooth toggle tra Work / About con opacity + translate
- Transizione hover su card con `transition: all 0.3s ease`
- Loading transition iniziale (`opacity: 0` → `opacity: 1`)

---

## Domande Aperte

> [!IMPORTANT]
> **Contenuto "About Me":** Cosa vuoi raccontare di te stesso? Percorso formativo, interessi personali, hobby? Ho bisogno di testi concreti per questa sezione.

> [!IMPORTANT]
> **Foto personale:** Hai una tua foto da includere nella sezione About? Se no, posso generare un avatar stilizzato o usare un placeholder grafico.

> [!IMPORTANT]
> **Lingua:** Il portfolio sarà in **italiano** o in **inglese**? Considerando che è un portfolio professionale, l'inglese è consigliato per raggiungere un pubblico internazionale.

> [!NOTE]
> **Link ai progetti:** Hai URL, repository GitHub o demo live da linkare per Marvelli e Home-server? Se non sono pubblici, possiamo indicarlo esplicitamente.

> [!NOTE]
> **Immagini dei progetti:** Hai screenshot o mockup da mostrare? Se no, posso generare delle immagini rappresentative con l'AI per ciascun progetto.

---

## Piano di Verifica

### Test visivi
- Aprire `index.html` nel browser e verificare la resa su schermo grande
- Verificare il comportamento del toggle Work / About
- Verificare hover effects e animazioni

### Responsività
- Test su viewport mobile (375px), tablet (768px), desktop (1440px)

### Qualità contenuto
- Revisione dei testi con l'utente prima del rilascio
