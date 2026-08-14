![Tiet Logo](assets/tiet-logo.svg){ .tiet-logo }

**UCS503: Software Engineering (Project)**  
**TIET Patiala**

# PrivaLens - Automated Web Privacy & Regulatory Compliance Scanner

**Author(s)**:
* Naman Arora (Roll No: `1024160029`)
* Prabhrajwin Singh (Roll No: `1024160024`)
* Ishmanjot Singh (Roll No: `1024160016`)

**Lab Instructor**: Dr. Raghav B. Venkataramaiyer

---

## Project Overview

**PrivaLens** is an automated privacy and regulatory compliance scanner that bridges legal promises with actual runtime technical behavior. It navigates a target website using a headless browser, intercepts network requests to identify third-party trackers or PII (Personally Identifiable Information) leaks, and uses Natural Language Processing (NLP) to audit the website's privacy policy text for mismatches or discrepancies under regulations like the EU GDPR and India's DPDP Act 2023.

## System Architecture

PrivaLens uses a decoupled 3-tier architecture:
1. **Frontend Dashboard (Next.js / React)**: Submission portal and interactive compliance scorecards.
2. **Headless Crawler & Queue (Node.js + Puppeteer + Redis / Bull)**: Headless browser environment executing scans and intercepting dynamic telemetry.
3. **NLP Engine & Storage (Python + SpaCy + PostgreSQL)**: Natural language parsing of policy clauses, discrepancy cross-examination, and historical scan storage.

## Installation

To run the project locally:
```shell
# Clone the repository
git clone https://github.com/namanarora-29/ucs503p-202627-privalens.git
cd ucs503p-202627-privalens

# Follow installation steps in /code
```
