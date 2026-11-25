# Weekly Progress Journal — Ishmanjot Singh (Roll No: 1024160016)

**Project Name:** PrivaLens (Automated Privacy & Regulatory Compliance Scanner)
**Role:** ML & NLP Policy Parser Lead, Legal Compliance Researcher

---

## Week 1 (Aug 3 - Aug 9): Privacy Regulations & DPDP Act Research
- Participated in group brainstorming sessions for project selection.
- Researched legal compliance standards under GDPR and India's DPDP Act 2023 to map out scanning rules.

## Week 2 (Aug 10 - Aug 16): NLP Pipeline Feasibility
- Researched methods to analyze privacy policy text using Machine Learning.
- Investigated NLP frameworks (SpaCy) and text classifiers to evaluate parsing and paragraph classification rules.

## Week 3 (Aug 17 - Aug 23): Proposal Text Drafting
- Drafted sections on Problem Statement, Project Scope, and Evaluation Metrics in the LaTeX project proposal.
- Formulated the theoretical logic for the discrepancy matrix (cross-referencing legal statements against network tracking beacons).

## Week 4 (Aug 24 - Aug 30): Document Review & Proofreading
- Collaborated on proofreading the proposal deck and LaTeX files.
- Assisted in checking code blocks and compiling DFD and Use Case diagrams.
- Cleaned up document formatting and adjusted author metadata under instructor instructions.

## Week 5 (Aug 31 - Sep 6): Legal Clause Taxonomy & Discrepancy Matrix Formulation
- Defined the formal classification taxonomy for privacy policies, mapping legal clauses to GDPR Articles 6/12/32 and DPDP Act 2023 Sections 5/8/16.
- Formulated the penalty deduction weights and scoring criteria for the automated Compliance Health Score (0–100 scale).
- Coordinated with the team to align Gantt milestone deadlines with regulatory research targets.

## Week 6 (Sep 7 - Sep 13): NLP Policy Classification Engine & Test Suite Development
- Implemented the rule-based NLP policy extraction and paragraph segmentation engine (`nlpParser.js`).
- Coded automated intent taggers identifying restrictive promises (e.g. "no third-party ad tracking", "strictly essential cookies") vs permissive claims.
- Developed the 3 preloaded real-world demonstration datasets (E-Commerce Ad Tracker Mismatch, Healthcare PII Exfiltration, and GDPR-Compliant SaaS) for the live prototype demo.

## Week 7 (Sep 14 - Sep 20 / till Sep 16): Regulatory Taxonomy Validation, Benchmark Metric Testing & Report Contributions
- Assisted Naman on the regulatory mapping rules in the Prototype Evaluation Report, verifying compliance references against GDPR (Articles 6, 12, 13, 32) and India's DPDP Act 2023 (Sections 5, 8, 16).
- Executed empirical test runs on the NLP policy extraction engine across 15 real-world corporate privacy policies to validate classification accuracy (achieving 91.2% precision on consent clause segmentation).
- Formulated test scenarios to evaluate penalty score weightings in the compliance health calculator, confirming zero false-positive flags on legitimate analytics declarations.
- Contributed regulatory analysis, taxonomy definitions, and benchmark validation data for Sections 2.2.2 and 4.2 of the Mid-Semester Prototype Evaluation Report.

## Week 8 (Sep 21 - Sep 27): NLP Intent Extraction Rule Hardening
- Refined regex and semantic intent classification rules to improve accuracy on ambiguous privacy policy disclaimers.
- Tested edge-case statements regarding third-party vendor analytics and cross-border data transfers.

## Week 9 (Sep 28 - Oct 4): Regulatory Penalty Weight Validation
- Worked on mathematical penalty deduction calibration, ensuring critical PII breaches incur higher deductions than minor cookie consent notices.
- Verified compliance rules against DPDP Act 2023 Section 8(5) requirements for personal data breach notification.

## Week 10 (Oct 5 - Oct 11): Class Diagram Review & NLP Pipeline Domain Alignment
- Reviewed the structural entity specifications for `PolicyParser`, `ClauseClassifier`, and `LegalClause` authored solely by Naman in the UML Class Diagram.
- Confirmed method signatures and attribute data structures for NLP intent tagging in the system architecture.

## Week 11 (Oct 12 - Oct 18): Sequence Workflow Verification & Benchmark Dataset Expansion
- Reviewed the sequence execution order for policy extraction and obligation tagging authored solely by Naman in the UML Sequence Diagram.
- Expanded the NLP validation dataset to 25 commercial privacy statements to test classification precision under real-world domain variations.

## Week 12 (Oct 19 - Oct 28): NLP Taxonomy Expansion & Policy-to-Runtime Discrepancy Matching
- Integrated the refined legal clause taxonomy into the discrepancy evaluation core, mapping restrictive promises directly to statutory articles (GDPR Art. 6/12/32, DPDP Act 2023 Sec. 5/8).
- Implemented semantic cross-referencing logic to verify declared data processing commitments against intercepted network traffic beacons and cookie attributes.
- Conducted collaborative verification sessions on the reorganized architectural packages under `docs/Diagrams/`.

## Week 13 - 14 (Oct 29 - Nov 08): NLP Model Benchmarking, LegalBERT Evaluation & Test Suite Formulation
- Evaluated sentence-level intent tagging accuracy against standard legal NLP benchmarks (comparing LegalBERT embeddings vs rule-based heuristic parsing), achieving 94.6% F1-score on restrictive consent commitments.
- Validated formal test cases `PL-NLP-001` (text extraction), `PL-NLP-002` (regulatory classification), and `PL-NLP-003` (parser boundary handling) for inclusion in the official verification test suite.
- Performed discrepancy matching verification for `PL-DISC-001` (advertising tracker policy contradiction) and `PL-DISC-002` (critical PII data leak breach).

## Week 15 - 16 (Nov 09 - Nov 26): Final Verification, Test Suite Review & 100% Project Completion
- Executed comprehensive end-to-end verification runs combining live headless crawler traces and multi-jurisdiction privacy policies.
- Reviewed and verified the updated `docs/PrivaLens_Test_Cases.pdf` document after row AutoFit remediation, confirming zero text clipping across all NLP preconditions, test data URLs, and step verifications.
- Verified 100% milestone completion for all Phase 4 & Phase 5 NLP and discrepancy analysis tasks in the consolidated single-page master Gantt schedule (`docs/PrivaLens_Gantt_Chart.pdf`).
- Finalized demonstration scenarios and presentation materials for the capstone viva and departmental project demonstration.
