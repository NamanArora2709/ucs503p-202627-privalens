// PrivaLens Discrepancy Matrix & Compliance Scoring Engine (Prototype v0.3)

/**
 * Cross-references extracted policy promises against intercepted runtime network flows and cookies.
 */
function analyzeComplianceDiscrepancies(parsedPolicy, networkLogs, cookies, detectedPII) {
  const discrepancies = [];
  let score = 100;

  const trackers = networkLogs.filter(req => req.isTracker);
  const adTrackers = trackers.filter(t => t.category.toLowerCase().includes("advertising") || t.category.toLowerCase().includes("retargeting"));
  const nonEssentialCookies = cookies.filter(c => c.category !== "Essential");

  // Discrepancy 1: Advertising Beacons vs Restrictive Policy
  if (adTrackers.length > 0 && !parsedPolicy.declaredPromises.allowsAdvertising) {
    const trackerNames = adTrackers.map(t => t.trackerName || t.domain).join(", ");
    discrepancies.push({
      id: "DISC-AD-01",
      severity: "HIGH",
      deduction: 18,
      title: "Undisclosed Advertising & Retargeting Beacons Detected",
      policyClaim: "Privacy statement claims no third-party marketing or behavioral retargeting cookies are used.",
      runtimeReality: `Detected active outgoing beacons to: ${trackerNames}.`,
      violation: "GDPR Article 6(1)(a) & ePrivacy Directive Art. 5(3)",
      remediation: "Deploy a compliant Cookie Consent Management Platform (CMP) or disable advertising pixels until explicit user consent is granted."
    });
    score -= 18;
  }

  // Discrepancy 2: Essential Cookies Only vs Third-Party Cookies
  if (parsedPolicy.declaredPromises.claimsEssentialCookiesOnly && nonEssentialCookies.length > 0) {
    const cookieNames = nonEssentialCookies.map(c => c.name).join(", ");
    discrepancies.push({
      id: "DISC-COOKIE-02",
      severity: "MEDIUM",
      deduction: 12,
      title: "Non-Essential Analytics/Advertising Cookies Set on Load",
      policyClaim: "Website claims only strictly necessary/essential cookies are set.",
      runtimeReality: `Browser storage contains non-essential tracking cookies: [${cookieNames}].`,
      violation: "ePrivacy Directive (Cookie Law)",
      remediation: "Block script execution of analytics and retargeting SDKs until the visitor gives consent on the cookie banner."
    });
    score -= 12;
  }

  // Discrepancy 3: Plaintext PII in Network Telemetry / Query Parameters
  if (detectedPII && detectedPII.length > 0) {
    const piiFields = detectedPII.map(p => p.field).join(", ");
    discrepancies.push({
      id: "DISC-PII-03",
      severity: "CRITICAL",
      deduction: 28,
      title: "Plaintext Personally Identifiable Information (PII) Exfiltration",
      policyClaim: "Policy commits to strict data confidentiality and secure handling of user data.",
      runtimeReality: `Plaintext sensitive parameters detected in outgoing network requests: [${piiFields}].`,
      violation: "DPDP Act 2023 Section 8(5) & GDPR Article 32 (Security of Processing)",
      remediation: "Immediately sanitize outgoing telemetry URLs. Never pass emails, phone numbers, or health parameters in query strings or unencrypted payloads."
    });
    score -= 28;
  }

  // Discrepancy 4: Session Recording / Heatmap Scripts
  const sessionRecorders = trackers.filter(t => t.category.toLowerCase().includes("session recording") || t.trackerName?.includes("Hotjar"));
  if (sessionRecorders.length > 0) {
    discrepancies.push({
      id: "DISC-REPLAY-04",
      severity: "HIGH",
      deduction: 14,
      title: "Undisclosed Session Screen Replay / Keystroke Telemetry",
      policyClaim: "No disclosure of session replay or form interaction monitoring tools.",
      runtimeReality: "Hotjar/Session Recording scripts actively capturing DOM keystrokes and pointer coordinates.",
      violation: "GDPR Article 5(1)(a) (Transparency Principle)",
      remediation: "Explicitly disclose session replay tools in your policy, mask all form input fields, and ensure user opt-in."
    });
    score -= 14;
  }

  // Clamp score
  score = Math.max(10, Math.min(100, score));

  // Determine Grade
  let grade = "A";
  let gradeStatus = "Compliant";
  let gradeColor = "emerald";

  if (score < 45) {
    grade = "F";
    gradeStatus = "Critical Non-Compliance";
    gradeColor = "rose";
  } else if (score < 60) {
    grade = "D";
    gradeStatus = "High Compliance Risk";
    gradeColor = "amber";
  } else if (score < 75) {
    grade = "C";
    gradeStatus = "Moderate Discrepancies";
    gradeColor = "yellow";
  } else if (score < 90) {
    grade = "B";
    gradeStatus = "Minor Warnings";
    gradeColor = "blue";
  }

  return {
    score,
    grade,
    gradeStatus,
    gradeColor,
    metrics: {
      totalRequests: networkLogs.length,
      trackersDetected: trackers.length,
      cookiesLogged: cookies.length,
      piiLeaksDetected: detectedPII ? detectedPII.length : 0,
      discrepanciesFound: discrepancies.length
    },
    discrepancies
  };
}

module.exports = { analyzeComplianceDiscrepancies };
