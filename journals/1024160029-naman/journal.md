# Weekly Progress Journal — Naman Arora (Roll No: 1024160029)

**Project Name:** PrivaLens (Automated Privacy & Regulatory Compliance Scanner)
**Role:** Project Lead, Full-Stack Dashboard Architect, & Git Coordinator

---

## Week 1 (Aug 3 - Aug 9): Project Inception & Ideation
- Formed the team with Prabhrajwin and Ishmanjot for the UCS503 Software Engineering project.
- Guided the team's brainstorming sessions to finalize our project concept: **PrivaLens** (an automated web compliance scanner).
- Researched the target frontend stack (Next.js, Tailwind CSS, and Lucide icons) to plan a clean, modern compliance dashboard.

## Week 2 (Aug 10 - Aug 16): Git Repository Setup & Project Structure
- Initialized the team's GitHub repository (`ucs503p-202627-privalens`) from the course template.
- Set up local git environments, established branching workflows, and created the project folder structure.
- Researched tools for compiling our documentation site online.

## Week 3 (Aug 17 - Aug 23): Pitch Slide Deck & GitHub Pages Deployment
- Designed and created the project pitch presentation deck (`PrivaLens_Proposal.pptx`), using a slate-themed palette, professional typography, and layout spacing.
- Configured the MkDocs configuration (`mkdocs.yml`) and wrote the homepage documentation (`docs/index.md`).
- Configured the GitHub Actions build pipeline to automatically compile and deploy our documentation site to GitHub Pages (`gh-pages` branch).

## Week 4 (Aug 24 - Aug 30): LaTeX Proposal & UML Use Case Diagram
- Handled the drafting and typesetting of the LaTeX project proposal document (`project-proposal/main.tex`).
- Coded and designed the standalone **UML Use Case Diagram** (`usecase.tex`) using TikZ from scratch.
- Handled actor coordinates, boundaries, and labeled arrows for `include` (solid lines) and `exclude` (dashed lines) relationships, ensuring no overlapping text.
- Managed remote repository branch pushes and git operations for the team.

## Week 5 (Aug 31 - Sep 6): DFD Alignment & Master Gantt Chart Construction
- Perfected TikZ Data Flow Diagram Level 0 Context diagram to ensure 100% straight, horizontal arrow connections without text clipping.
- Formulated the comprehensive 5-phase semester project schedule and built the automated Excel Gantt tracking template (`docs/PrivaLens_Gantt_Chart.xlsx`) covering all 25 development tasks with dynamic date formulas and progress bars.
- Diagnosed and fixed the MkDocs theme deployment pipeline, restoring automated GitHub Pages compilation for the project documentation site.

## Week 6 (Sep 7 - Sep 13): Full-Stack Prototype Implementation & Mid-Evaluation Demonstration
- Architected and implemented the interactive full-stack **PrivaLens Prototype Demo (v0.3)** for the Wednesday instructor evaluation.
- Built the modern frontend dashboard using Tailwind CSS and Lucide icons, featuring a live 5-step crawler progress pipeline animation.
- Engineered the interactive **Compliance Scorecard** (circular health gauge, letter grade, and KPI metric cards), **Discrepancy Matrix View** (side-by-side policy vs reality mismatch inspection), and one-click printable PDF audit report generator.
- Integrated the Express REST API with the frontend client and set up local execution environments for seamless demonstration.

## Week 7 (Sep 14 - Sep 20 / till Sep 16): System Modeling Milestone, Comprehensive Report & Evaluation Deck
- Designed and engineered the publication-quality **Entity-Relationship (ER) Diagram** (`docs/Diagrams/PrivaLens_ER_Diagram.pdf`) in LaTeX/TikZ, incorporating primary keys, multi-valued attributes, weak entities, identifying relationships, and cardinality notations in a clean pastel color theme with zero overlaps.
- Designed, tested, and coded the standalone **UML Activity & Swimlane Diagram** (`docs/Diagrams/PrivaLens_Swinlane.pdf`) in TikZ across three architectural partitions (`Auditor Client`, `Crawling & Interception Layer`, `NLP Compliance Core`), implementing concurrency synchronization bars (Fork/Join) and collision-free gutter error routing.
- Authored the exhaustive **Mid-Semester Prototype Evaluation Report** (`project-report-prototype-stage/PrivaLens_Report_Prototype.tex` and `.pdf`) adhering to departmental guidelines, embedding 4 custom TikZ system architecture and pipeline diagrams, testing methodologies, and quantitative benchmarking tables.
- Designed and generated the 6-slide **MidTone Prototype Presentation Deck** (`PrivaLens_Prototype_Presentation.pptx`) incorporating custom data flow diagrams, regulatory framework logic, live prototype demonstration cards, and quantitative engineering metrics.
- Updated and synchronized the automated **Master Gantt Schedule** (`docs/PrivaLens_Gantt_Chart.xlsx` and PDF export) reflecting active Phase 3 milestone completions through September 16, 2026.
- Coordinated all repository commits, branch management, and GitHub synchronization across all project deliverables.

## Week 8 (Sep 21 - Sep 27): Architecture Refinement & High-Concurrency Pipeline Planning
- Reviewed instructor feedback from the mid-semester evaluation and planned structural enhancements for high-concurrency auditing.
- Planned the formal Object-Oriented system architecture to decouple the presentation layer, network interception pipeline, legal NLP policy engine, and compliance discrepancy evaluator.
- Formulated microservice interface contracts between the Node.js API Gateway and downstream background workers.

## Week 9 (Sep 28 - Oct 4): Object-Oriented Domain Analysis & Verification Matrix Formalization
- Formalized the complete structural domain model for PrivaLens, defining all 12 core system entities, attribute types, and operational methods.
- Mapped class relationships, establishing strict inheritance hierarchies for compliance violations (`DiscrepancyViolation` parent with `TrackerViolation`, `CookieViolation`, and `PIIViolation` specialized subclasses).
- Defined multi-jurisdiction regulatory scoring logic and penalty weight models across GDPR Articles 6, 12, 13, 32 and DPDP Act 2023 Sections 5, 8, 16.

## Week 10 (Oct 5 - Oct 11): UML Class Diagram Engineering in LaTeX/TikZ (Sole Author)
- **Solely authored, designed, and engineered** the publication-quality **12-Class UML Class Diagram** (`docs/Diagrams/Class_Diagram_PrivaLens.pdf`) in LaTeX using TikZ from scratch.
- Modeled structural components across four distinct architectural tiers:
  - *Client & Presentation Tier:* `Auditor` and `WebDashboard` (interactive scan controller, health gauges, and PDF export trigger).
  - *Crawling & Interception Core:* `NetworkSniffer`, `TrackingSignatureDB`, and `NetworkEvidenceLog` (headless interception and PII telemetry detection).
  - *NLP Policy Classification Core:* `PolicyParser`, `ClauseClassifier`, and `LegalClause` (segmentation and intent tagging).
  - *Verification & Scoring Core:* `DiscrepancyEngine`, `VerificationMatrix`, and `DiscrepancyViolation` with its inheritance hierarchy.
- Implemented clean orthogonal routing, standard UML visibility adornments (`+`, `-`, `#`), exact multiplicity annotations (`1`, `1..*`, `0..*`), and an inheritance fork (`<|--`) with zero line collisions, fitting precisely on a single A4 page.

## Week 11 (Oct 12 - Oct 18): UML Sequence Diagram Engineering & Master Documentation Synchronization (Sole Author)
- **Solely authored, designed, and engineered** the comprehensive **UML Sequence Diagram** (`docs/Diagrams/SequenceDiagram_PrivaLens.pdf`) adhering to Visual Paradigm industry publication standards in LaTeX/TikZ.
- Modeled the end-to-end interactive audit workflow across 5 participants: `usr : Auditor` (Actor), `ui : WebDashboard`, `crawler : NetworkSniffer`, `nlp : PolicyParser`, and `engine : DiscrepancyEngine`.
- Handled all 15 synchronous call messages, dashed return responses, and reflexive self-invocations (request interception, clause classification, and multi-factor compliance score calculation) with border-free labels, perfectly calibrated clearance padding, and zero line overlap.
- Updated and synchronized the project **Master Gantt Schedule** (`docs/PrivaLens_Gantt_Chart.xlsx`) to reflect Phase 3 prototype completion and active Phase 4 compliance scoring milestones through October 17, 2026.
- Updated repository documentation (`README.md` and `docs/index.md`) with the new architectural deliverables and project structure, and coordinated Git commits and branch management for the team.
