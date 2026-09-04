// PrivaLens Full-Stack Prototype Server (Prototype v0.3 - Sept 2026)
// Authors: Naman Arora (Lead), Prabhrajwin Singh, Ishmanjot Singh
// TIET Patiala • UCS503 Software Engineering

const express = require("express");
const path = require("path");
const cors = require("cors");

const { DEMO_PRESETS } = require("./modules/demoPresets");
const { sniffUrl } = require("./modules/crawler");
const { parsePrivacyPolicy } = require("./modules/nlpParser");
const { analyzeComplianceDiscrepancies } = require("./modules/discrepancyEngine");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));

// API 1: Get available demo presets
app.get("/api/presets", (req, res) => {
  res.json({
    success: true,
    presets: DEMO_PRESETS.map(p => ({
      id: p.id,
      name: p.name,
      url: p.url,
      industry: p.industry,
      description: p.description
    }))
  });
});

// API 2: Execute Scan (Live URL or Preset)
app.post("/api/scan", async (req, res) => {
  try {
    const { url, presetId, customPolicy } = req.body;

    let scanData = null;

    // If a preset was explicitly chosen AND url matches the preset or is blank, use preset
    if (presetId) {
      const found = DEMO_PRESETS.find(p => p.id === presetId);
      if (found && (!url || url.includes(found.id) || url.includes(".test"))) {
        scanData = {
          success: true,
          url: found.url,
          domain: new URL(found.url).hostname,
          policyText: customPolicy || found.policyText,
          networkLogs: found.runtimeNetworkLogs,
          cookies: found.cookies,
          detectedPII: found.detectedPII
        };
      }
    }

    // Otherwise run crawler sniffer on live URL
    if (!scanData) {
      if (!url) {
        return res.status(400).json({ success: false, error: "Please provide a target URL or select a preset." });
      }
      let target = url.trim();
      if (!target.startsWith("http://") && !target.startsWith("https://")) {
        target = "https://" + target;
      }
      scanData = await sniffUrl(target);
      if (customPolicy) {
        scanData.policyText = customPolicy;
      }
    }

    if (!scanData.success) {
      return res.status(400).json(scanData);
    }

    // Step 2: NLP Policy Extraction & Classification
    const parsedPolicy = parsePrivacyPolicy(scanData.policyText);

    // Step 3: Discrepancy Matrix & Compliance Scoring
    const analysis = analyzeComplianceDiscrepancies(
      parsedPolicy,
      scanData.networkLogs,
      scanData.cookies,
      scanData.detectedPII
    );

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      target: {
        url: scanData.url,
        domain: scanData.domain
      },
      analysis,
      parsedPolicy,
      networkLogs: scanData.networkLogs,
      cookies: scanData.cookies,
      detectedPII: scanData.detectedPII
    });
  } catch (error) {
    console.error("Scan error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API 3: Direct NLP policy text analyzer
app.post("/api/analyze-policy", (req, res) => {
  try {
    const { policyText } = req.body;
    if (!policyText) {
      return res.status(400).json({ success: false, error: "Policy text is required." });
    }
    const result = parsePrivacyPolicy(policyText);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Fallback to index.html for single-page app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 PrivaLens Prototype Demo v0.3 is live!`);
  console.log(`🌐 Local URL: http://localhost:${PORT}`);
  console.log(`👥 Project Lead: Naman Arora (1024160029)`);
  console.log(`🏫 TIET Patiala • UCS503 Software Engineering`);
  console.log(`======================================================\n`);
});
