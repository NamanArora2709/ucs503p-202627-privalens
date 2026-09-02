# PrivaLens - Automated Web Privacy & Regulatory Compliance Scanner

**Course Project for UCS503: Software Engineering**  
**Department of Computer Science & Engineering, TIET Patiala**

---

## 👥 Group Members & Roles
1. **Naman Arora** (Roll No: `1024160029`) 
2. **Prabhrajwin Singh** (Roll No: `1024160024`) 
3. **Ishmanjot Singh** (Roll No: `1024160016`) 

**Lab Instructor:** Jeelani Asif

---

## 📌 Project Overview
**PrivaLens** is a dynamic, automated compliance scanning platform that audits web applications for privacy violations under frameworks like the EU GDPR and India's DPDP Act 2023. By crawling pages, simulating interactions, and sniffing runtime network requests, PrivaLens identifies hidden third-party tracking scripts, cookie compliance errors, and potential PII leakage. It then cross-references these live network flows against the website's published Privacy Policy using NLP (Natural Language Processing) text classification, alerting owners to mismatches and generating actionable PDF remediation reports.

---

## 🏗️ System Architecture
PrivaLens utilizes a decoupled microservices design:
* **Frontend Web Dashboard (React / Next.js):** Submission forms, live scan monitoring via WebSockets, and interactive compliance scorecards.
* **Crawler & Queue Microservice (Node.js + Puppeteer + Redis / Bull):** Headless browser environment simulating real user visits and capturing network payloads.
* **NLP Processing Engine (Python + FastAPI + SpaCy):** Text extraction and paragraph classification of privacy policies to identify legal commitments.
* **Persistence & History (PostgreSQL):** Relational schema storing historic scans, domain analytics, and audit trials.

---

## 📂 Directory Structure
* [**`project-proposal/`**](./project-proposal) — Contains the LaTeX source (`main.tex`) and compiled PDF for the project proposal.
* [**`journals/`**](./journals) — Weekly progress logs for each team member:
  * [Naman Arora (`1024160029-naman`)](./journals/1024160029-naman/)
  * [Prabhrajwin Singh (`1024160024-prabhrajwin`)](./journals/1024160024-prabhrajwin/)
  * [Ishmanjot Singh (`1024160016-ishmanjot`)](./journals/1024160016-ishmanjot/)
* [**`docs/`**](./docs) — Source markdown files for the documentation website published via GitHub Pages.
* [**`code/`**](./code) — Raw project source code and implementation layers.
* [**`assets/`**](./assets) — Shared graphical resources and static assets.

---

## 🚀 Running Local Documentation
To view and compile a local dev version of the project documentation:
```shell
# Install dependencies
pip install -r pyproject.toml

# Run the local MkDocs server
make docs
```
The documentation will be live locally at `http://127.0.0.1:8000/`.
