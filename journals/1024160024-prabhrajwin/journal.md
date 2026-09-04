# Weekly Progress Journal — Prabhrajwin Singh (Roll No: 1024160024)

**Project Name:** PrivaLens (Automated Privacy & Regulatory Compliance Scanner)
**Role:** Backend & Crawler Lead, System Architect & DFD Designer

---

## Week 1 (Aug 3 - Aug 9): Dynamic Web Scraping Research
- Participated in brainstorming and project selection meetings.
- Researched dynamic crawling methods and evaluated the feasibility of using headless browser instances (Puppeteer) to catch tracking cookies and network beacons.

## Week 2 (Aug 10 - Aug 16): Backend Architecture Definition
- Designed the system's structural architecture, outlining a three-tier model: a Next.js frontend, an Express/Node.js crawler API with a Redis task queue, and a Python FastAPI backend for NLP parsing.
- Drafted database schemas for recording cookie data and compliance logs.

## Week 3 (Aug 17 - Aug 23): Slide Deck & Proposal Contributions
- Wrote the backend system description and tech stack justifications for the project slide deck.
- Contributed backend architecture sections to the LaTeX project proposal report.

## Week 4 (Aug 24 - Aug 30): LaTeX Data Flow Diagram (DFD) Creation
- Coded and compiled the standalone **Data Flow Diagrams** (`project-proposal/dfd.tex`) in LaTeX using TikZ.
- Designed three structural layouts:
  - **Level 0 (Context):** User/Admin boundaries.
  - **Level 1 (Process Detail):** Visualizing input, crawling, parsing, scoring, and databases.
  - **Level 2 (Sub-Process Detail):** Detailing request matching logic.
- Managed coordinate mapping and curved arrows to ensure a zero-overlap, readable layout.

## Week 5 (Aug 31 - Sep 6): Relational DB Modeling & Diagram Verification
- Designed the PostgreSQL relational database schema for storing scan audits, tracking beacon logs, cookie attributes, and discrepancy records.
- Verified and refined the Level 1 and Level 2 TikZ Data Flow Diagram coordinate anchors alongside Naman.
- Defined microservice communication contracts between the crawler sniffer and the discrepancy matching engine.

## Week 6 (Sep 7 - Sep 13): Headless Sniffer & Real-Time PII Exfiltration Detection Engine
- Developed the Node.js network sniffer module capable of live HTTP fetching, script tag extraction, and DOM network inspection.
- Built the known third-party tracker identification database (Google Analytics, Meta/Facebook Pixel, Criteo, Hotjar, TikTok, DoubleClick, etc.).
- Implemented the dynamic PII leak detector using regex pattern matching across URL query parameters and headers (catching exposed emails, phone numbers, auth tokens, and healthcare telemetry).