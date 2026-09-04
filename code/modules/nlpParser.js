// PrivaLens NLP Policy Extraction & Classification Engine (Prototype v0.3)

/**
 * Segments and classifies privacy policy clauses using rule-based pattern taxonomy.
 * Matches project specification for GDPR & DPDP Act 2023 compliance auditing.
 */
function parsePrivacyPolicy(rawText) {
  if (!rawText || typeof rawText !== "string") {
    return {
      rawLength: 0,
      clauses: [],
      declaredPromises: {
        allowsAdvertising: false,
        allowsAnalytics: false,
        allowsThirdPartySharing: false,
        claimsEssentialCookiesOnly: false,
        claimsNoPIILeaks: false
      }
    };
  }

  const lines = rawText
    .split(/\n+/)
    .map(line => line.trim())
    .filter(line => line.length > 10);

  const clauses = [];
  const declaredPromises = {
    allowsAdvertising: false,
    allowsAnalytics: false,
    allowsThirdPartySharing: false,
    claimsEssentialCookiesOnly: false,
    claimsNoPIILeaks: false
  };

  lines.forEach((line, index) => {
    const lower = line.toLowerCase();
    let category = "GENERAL_PROVISION";
    let intent = "INFORMATIONAL";
    let confidence = 0.85;
    let relevantRegulations = ["GDPR Art. 12", "DPDP Act 2023 Sec. 5"];

    // Rule 1: Advertising & Retargeting
    if (lower.includes("advertis") || lower.includes("marketing") || lower.includes("retarget") || lower.includes("broker")) {
      category = "ADVERTISING_AND_MARKETING";
      relevantRegulations.push("ePrivacy Directive", "GDPR Art. 6");
      if (lower.includes("not") || lower.includes("never") || lower.includes("do not") || lower.includes("zero")) {
        intent = "RESTRICTIVE_PROMISE";
        declaredPromises.allowsAdvertising = false;
        confidence = 0.94;
      } else {
        intent = "PERMISSIVE_COLLECTION";
        declaredPromises.allowsAdvertising = true;
        confidence = 0.90;
      }
    }
    // Rule 2: Cookies & Local Storage
    else if (lower.includes("cookie") || lower.includes("tracker") || lower.includes("beacon") || lower.includes("pixel")) {
      category = "COOKIE_AND_TRACKING_TELEMETRY";
      relevantRegulations.push("ePrivacy Directive Art. 5(3)", "DPDP Act 2023 Sec. 6");
      if (lower.includes("essential only") || lower.includes("only essential") || lower.includes("strictly necessary") || lower.includes("no third-party")) {
        intent = "RESTRICTIVE_PROMISE";
        declaredPromises.claimsEssentialCookiesOnly = true;
        confidence = 0.96;
      } else {
        intent = "PERMISSIVE_COLLECTION";
        confidence = 0.88;
      }
    }
    // Rule 3: Third-Party Data Transmission
    else if (lower.includes("third-party") || lower.includes("third party") || lower.includes("partner") || lower.includes("external") || lower.includes("share")) {
      category = "THIRD_PARTY_DATA_SHARING";
      relevantRegulations.push("GDPR Art. 44 (Cross-Border Transfer)", "DPDP Act 2023 Sec. 16");
      if (lower.includes("never") || lower.includes("do not") || lower.includes("no third-party")) {
        intent = "RESTRICTIVE_PROMISE";
        declaredPromises.allowsThirdPartySharing = false;
        confidence = 0.92;
      } else {
        intent = "PERMISSIVE_COLLECTION";
        declaredPromises.allowsThirdPartySharing = true;
        confidence = 0.89;
      }
    }
    // Rule 4: PII Confidentiality & Encryption
    else if (lower.includes("confidential") || lower.includes("encrypt") || lower.includes("pii") || lower.includes("personal information") || lower.includes("patient")) {
      category = "PII_PROTECTION_AND_SECURITY";
      relevantRegulations.push("GDPR Art. 32", "DPDP Act 2023 Sec. 8(5)");
      intent = "SECURITY_GUARANTEE";
      declaredPromises.claimsNoPIILeaks = true;
      confidence = 0.95;
    }
    // Rule 5: User Rights & Data Purging
    else if (lower.includes("right") || lower.includes("delete") || lower.includes("access") || lower.includes("purge") || lower.includes("opt-out")) {
      category = "USER_RIGHTS_AND_CONSENT";
      relevantRegulations.push("GDPR Art. 17 (Right to Erasure)", "DPDP Act 2023 Sec. 12");
      intent = "COMPLIANCE_MANDATE";
      confidence = 0.91;
    }

    clauses.push({
      id: `clause-${index + 1}`,
      text: line,
      category,
      intent,
      confidence: `${(confidence * 100).toFixed(0)}%`,
      regulations: relevantRegulations
    });
  });

  return {
    rawLength: rawText.length,
    clausesCount: clauses.length,
    clauses,
    declaredPromises
  };
}

module.exports = { parsePrivacyPolicy };
