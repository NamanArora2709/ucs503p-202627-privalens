# 🛡️ PrivaLens: Automated Web Privacy & Regulatory Compliance Scanner
### *A Dual-Engine Runtime Traffic Sniffer, NLP Policy Parser & Discrepancy Verification Platform*

[![Frontend](https://img.shields.io/badge/Frontend-Next.js%20%2F%20TailwindCSS-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%2F%20Express-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://expressjs.com/)
[![Crawler](https://img.shields.io/badge/Crawler-Puppeteer%20%2F%20Headless%20Chromium-323330?style=flat-square&logo=puppeteer&logoColor=white)](https://pptr.dev/)
[![NLP Engine](https://img.shields.io/badge/NLP%20Engine-Python%20%2F%20SpaCy-09A3D5?style=flat-square&logo=spacy&logoColor=white)](https://spacy.io/)
[![Regulatory](https://img.shields.io/badge/Compliance-GDPR%20%2B%20DPDP%202023-1F497D?style=flat-square)](https://www.meity.gov.in/content/digital-personal-data-protection-act-2023)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Institution](https://img.shields.io/badge/TIET-UCS503P%20Software%20Engineering-crimson?style=flat-square)](https://www.thapar.edu/)

---

## 📌 Overview

Modern web applications publish extensive privacy policies claiming to protect user confidentiality and restrict third-party tracking. However, their underlying JavaScript runtime bundles frequently execute undisclosed tracking scripts (Meta Pixel, Criteo retargeting), store non-essential persistent cookies without explicit user consent, and exfiltrate plaintext Personally Identifiable Information (PII) in URL query strings. 

**PrivaLens** is an automated compliance auditing platform that bridges the verification gap between *what published privacy statements promise* and *what runtime code actually executes*.

By coupling a **Headless Network Traffic Sniffer** with an **NLP Legal Policy Parser**, PrivaLens cross-references live outgoing network beacons against published privacy commitments. It uncovers runtime contradictions, calculates an automated **Compliance Health Score (0–100, Grade A–F)**, and generates actionable remediation reports mapped to the **EU General Data Protection Regulation (GDPR)** and **India's Digital Personal Data Protection (DPDP) Act 2023**.

---

## ✨ Key Features

- **📡 Live Headless Network & Beacon Sniffer:** Intercepts dynamic outgoing HTTP/HTTPS and WebSocket requests, matching destination endpoints against an extensive signature database of 16+ known ad networks (Google Analytics 4, Meta/Facebook Pixel, Criteo Retargeting, Hotjar Session Replay, TikTok Pixel, DoubleClick, Microsoft Clarity, Taboola, and Outbrain).
- **🔍 Dynamic PII Exfiltration Detection Engine:** Pattern matching regex engine that scans URL search parameters, headers, and request payloads for unencrypted user emails, phone numbers, authentication tokens, passwords, and sensitive medical telemetry.
- **🧠 NLP Policy Clause Extraction & Taxonomy:** Preprocesses unstructured legal text into discrete clauses, classifying statements into 5 compliance domains (*Advertising & Marketing, Cookies & Storage, Third-Party Sharing, PII Security, and User Rights*) with semantic intent tagging (`RESTRICTIVE_PROMISE` vs `PERMISSIVE_COLLECTION`).
- **⚖️ Cross-Verification Discrepancy Matrix:** Deterministic verification engine that compares extracted policy commitments against runtime network calls to flag high-severity regulatory breaches with exact legal citations.
- **📊 Interactive Compliance Scorecard & Health Gauge:** Calculates dynamic health scores starting from a 100 base score with weighted severity deductions (Critical -28, High -18, High -14, Medium -12) and Letter Grades (A, B, C, D, F).
- **📄 One-Click Printable Audit PDF Reports:** Generates clean, publication-ready compliance audit certificates formatted for Data Protection Officers (DPOs), legal counsels, and engineering teams.
- **🧪 Built-In Real-World Demo Test Suites:** Preloaded test scenarios (E-Commerce Store with hidden ad pixels, Healthcare Portal with PII query leaks, and Privacy-First Compliant SaaS) for live evaluation.

---

## 🏗️ System Architecture

PrivaLens decouples network sniffing, NLP parsing, and interactive visualization across a modular full-stack architecture:

```mermaid
flowchart TD
    subgraph Client["Frontend Dashboard (Next.js / Tailwind CSS)"]
        UI["Interactive Scanner & URL Bar"]
        Presets["Pre-Configured Demo Test Suites"]
        Gauge["Circular Health Score Gauge (0-100)"]
        MatrixUI["Discrepancy Matrix & Risk Badges"]
        PDF["One-Click PDF Audit Report Exporter"]
    end

    subgraph API["Backend API Gateway (Express / Node.js)"]
        Router["REST Endpoints (/api/scan, /api/presets)"]
        Orchestrator["Scan Pipeline Controller"]
    end

    subgraph Sniffer["Crawler & Network Interception Engine"]
        Fetch["Live HTTP / DOM Scraper (AbortController)"]
        ScriptRegex["Script Tag & CDN Extractor"]
        TrackerDB[("Known Tracker Database\n16+ Ad & Analytics Networks")]
        PIIScanner["Dynamic PII Regex Parser (Email, Phone, Tokens)"]
    end

    subgraph NLPEngine["NLP Policy Classification Engine"]
        Segmenter["Clause Segmentation & Preprocessing"]
        Taxonomy["5-Domain Legal Taxonomy Classifier"]
        IntentTagger["Semantic Negation & Intent Tagger"]
        LegalRules[("Compliance Rules\nGDPR & DPDP Act 2023")]
    end

    subgraph Core["Discrepancy Matrix & Scoring Engine"]
        Matrix["Policy Promises vs Runtime Telemetry Matcher"]
        Scorer["Weighted Penalty & Grade Algorithm (100 Base)"]
        Remediation["Developer Fix Generator"]
    end

    UI & Presets --> Router
    Router --> Orchestrator
    Orchestrator --> Fetch --> ScriptRegex --> TrackerDB --> PIIScanner
    Orchestrator --> Segmenter --> Taxonomy --> IntentTagger --> LegalRules
    PIIScanner & IntentTagger --> Matrix
    Matrix --> Scorer --> Remediation
    Remediation --> Router
    Router --> Gauge & MatrixUI & PDF
```

---

## 📊 Performance Targets & Engineering Benchmarks

| Metric | Target Specification | Real-World Benchmark / Evaluation |
| :--- | :--- | :--- |
| **Scan Execution Latency** | **$\le 2.5\text{--}4.0\text{ s}$** | End-to-end DOM fetching, script parsing, and scoring |
| **PII Regex Extraction Accuracy** | **$\ge 99.0\%$** | Emails, international phone formats, tokens, and health keys |
| **NLP Clause Classification Confidence** | **$\ge 92.0\%$** | Rule-based semantic classification across legal policy clauses |
| **Known Tracker Network Coverage** | **$16+\text{ Networks}$** | Meta, Google Analytics, Criteo, Hotjar, TikTok, DoubleClick, Clarity |
| **Scoring Penalization Reliability** | **$100\%$ Deterministic** | -28 (Critical PII), -18 (Ad Tracker), -14 (Session Replay), -12 (Cookies) |
| **Regulatory Framework Mapping** | **DPDP + GDPR** | India DPDP Act 2023 (Sec. 5, 6, 8, 16) & GDPR (Art. 6, 12, 17, 32) |

---

## 📂 Repository Structure

```text
ucs503p-202627-privalens/
├── assets/                          # Static themes, logos, and MkDocs overrides
│   └── theme-overrides/
├── code/                            # Full-Stack Application Codebase
│   ├── modules/                     # Backend microservices & engines
│   │   ├── crawler.js               # Live HTTP sniffer, tracker DB & PII regex engine
│   │   ├── nlpParser.js             # Policy clause segmentation & intent classifier
│   │   ├── discrepancyEngine.js     # Verification matrix & compliance scoring math
│   │   └── demoPresets.js           # Preloaded real-world demonstration datasets
│   ├── public/                      # Reactive frontend web dashboard
│   │   ├── index.html               # Slate-themed UI layout & components
│   │   ├── app.js                   # Client controller, animated pipeline & DOM renderer
│   │   └── styles.css               # Tailwind utility classes & print media stylesheet
│   ├── package.json                 # Project dependencies & run scripts
│   └── server.js                    # Express API gateway & static web server
├── docs/                            # MkDocs documentation site source
│   ├── Diagrams/                    # Architectural diagrams and rendered assets
│   ├── PrivaLens_Gantt_Chart.xlsx   # 25-Task Automated Project Master Schedule
│   ├── PrivaLens_Proposal.pptx      # 10-Slide Project Pitch Deck
│   └── index.md                     # Documentation homepage
├── journals/                        # Team weekly engineering work logs
│   ├── 1024160029-naman/            # Naman Arora (Weeks 1 to 6)
│   ├── 1024160024-prabhrajwin/      # Prabhrajwin Singh (Weeks 1 to 6)
│   └── 1024160016-ishmanjot/        # Ishmanjot Singh (Weeks 1 to 6)
├── project-proposal/                # LaTeX Academic Proposal documentation
│   ├── main.tex                     # Formal LaTeX project proposal source
│   ├── usecase.tex                  # Standalone TikZ UML Use Case Diagram
│   └── dfd.tex                      # Standalone TikZ 3-Level Data Flow Diagrams
├── mkdocs.yml                       # MkDocs Material configuration
└── README.md                        # Project master documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v18.0.0` or higher (tested on `v22.18.0`)
- **npm**: `v9.0.0` or higher (tested on `v11.5.2`)
- **Python**: `3.10+` (optional, for compiling MkDocs documentation locally)

---

### 2. Running the Full-Stack Prototype Locally

```bash
# 1. Navigate to the code directory
cd code

# 2. Install lightweight dependencies
npm install

# 3. Start the PrivaLens application
npm start
```

Once started, open your web browser and navigate to:
👉 **`http://localhost:3000`**

---

### 3. Demonstrating the 3 Core Use Cases

1. **🛒 Use Case 1 (E-Commerce Ad Tracker Mismatch):**  
   Click the **`🛒 E-Commerce (ShopVibe)`** preset chip and click **"Launch Scan"**.  
   *PrivaLens intercepts background Meta Pixel and Criteo retargeting beacons, contradicting the store's "essential cookies only" policy and assigning a **Grade D (54/100)**.*
2. **📜 Use Case 2 (NLP Policy Clause Taxonomy):**  
   Click on the **`NLP Policy Clauses`** tab on the results dashboard.  
   *Displays unstructured legal paragraphs automatically categorized into GDPR/DPDP taxonomy domains with semantic intent tags and confidence scores.*
3. **🏥 Use Case 3 (Critical Healthcare PII Exfiltration):**  
   Click the **`🏥 Healthcare Portal (CarePoint)`** preset chip.  
   *Catches unencrypted patient emails and phone numbers leaked in telemetry query strings, triggering a **DPDP Act 2023 Sec. 8(5)** violation.*
4. **🌐 Live URL Scanning:**  
   Type any live website (e.g. `https://wikipedia.org`, `https://github.com`) or custom URL query parameters directly into the search bar to run a live scan!

---

### 4. Serving the Academic Documentation Site (MkDocs)

```bash
# Build and serve the documentation locally
make docs
```
Documentation will be accessible at: `http://127.0.0.1:8000/`

---

## 👥 Authors & Team Information

This project is developed as part of **UCS503P: Software Engineering Project** at **Thapar Institute of Engineering and Technology (TIET), Patiala** under the supervision of **Dr. Jeelani Asif**.

| Name | Roll Number | Email | Department |
| :--- | :--- | :--- | :--- |
| **Naman Arora** | `1024160029` | [`narora2_be24@thapar.edu`](mailto:narora2_be24@thapar.edu) | Computer Science & Engineering |
| **Prabhrajwin Singh** | `1024160024` | [`pkhurana1_be24@thapar.edu`](mailto:pkhurana1_be24@thapar.edu) | Computer Science & Engineering |
| **Ishmanjot Singh** | `1024160016` | [`isingh6_be24@thapar.edu`](mailto:isingh6_be24@thapar.edu) | Computer Science & Engineering |

---

<p align="center">
  <b>PrivaLens</b> • Automated Privacy & Regulatory Compliance Scanner • Academic Year 2026-27
</p>
