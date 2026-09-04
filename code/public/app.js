// PrivaLens Prototype Demo Frontend Application (Prototype v0.3)

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // DOM Elements
  const scanForm = document.getElementById("scan-form");
  const urlInput = document.getElementById("url-input");
  const scanButton = document.getElementById("scan-button");
  const presetButtons = document.querySelectorAll(".preset-btn");
  const togglePolicyBtn = document.getElementById("toggle-custom-policy");
  const policyContainer = document.getElementById("custom-policy-container");
  const policyChevron = document.getElementById("policy-chevron");
  const customPolicyInput = document.getElementById("custom-policy-input");

  const progressSection = document.getElementById("scan-progress-section");
  const progressBarFill = document.getElementById("progress-bar-fill");
  const progressPercentage = document.getElementById("progress-percentage");
  const resultsSection = document.getElementById("results-section");

  const printReportBtn = document.getElementById("print-report-btn");

  let activePresetId = null;

  // When user types or edits in URL input, clear preset selection
  urlInput.addEventListener("input", () => {
    activePresetId = null;
    presetButtons.forEach(b => b.classList.remove("active-preset"));
  });

  // Toggle Custom Policy Box
  togglePolicyBtn.addEventListener("click", () => {
    const isHidden = policyContainer.classList.contains("hidden");
    if (isHidden) {
      policyContainer.classList.remove("hidden");
      policyChevron.classList.add("rotate-90");
    } else {
      policyContainer.classList.add("hidden");
      policyChevron.classList.remove("rotate-90");
    }
  });

  // Preset Selection
  presetButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      presetButtons.forEach(b => b.classList.remove("active-preset"));
      btn.classList.add("active-preset");
      activePresetId = btn.getAttribute("data-preset");

      if (activePresetId === "ecommerce-ad-trackers") {
        urlInput.value = "https://shopvibe-store.test";
      } else if (activePresetId === "healthcare-pii-leak") {
        urlInput.value = "https://carepoint-clinic.test";
      } else if (activePresetId === "saas-gdpr-compliant") {
        urlInput.value = "https://privaflow-workspace.test";
      }
    });
  });

  // Handle Form Submit
  scanForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    if (!url) return;

    // Reset UI
    resultsSection.classList.add("hidden");
    progressSection.classList.remove("hidden");
    scanButton.disabled = true;
    scanButton.classList.add("opacity-60", "cursor-not-allowed");

    // Animate Progress Pipeline
    await runPipelineAnimation();

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url,
          presetId: activePresetId || undefined,
          customPolicy: customPolicyInput.value.trim() || undefined
        })
      });

      const data = await response.json();
      if (!data.success) {
        alert("Scan Error: " + (data.error || "Failed to analyze target."));
        progressSection.classList.add("hidden");
        scanButton.disabled = false;
        scanButton.classList.remove("opacity-60", "cursor-not-allowed");
        return;
      }

      renderResults(data);

      progressSection.classList.add("hidden");
      resultsSection.classList.remove("hidden");
      resultsSection.scrollIntoView({ behavior: "smooth" });

      if (window.lucide) {
        window.lucide.createIcons();
      }
    } catch (err) {
      console.error(err);
      alert("Network or API Error: " + err.message);
      progressSection.classList.add("hidden");
    } finally {
      scanButton.disabled = false;
      scanButton.classList.remove("opacity-60", "cursor-not-allowed");
    }
  });

  // Animated Pipeline Simulator
  function runPipelineAnimation() {
    return new Promise(resolve => {
      let step = 1;
      const stepCards = [
        document.getElementById("step-1"),
        document.getElementById("step-2"),
        document.getElementById("step-3"),
        document.getElementById("step-4"),
        document.getElementById("step-5")
      ];

      stepCards.forEach(c => c.className = "step-card");

      const interval = setInterval(() => {
        if (step <= 5) {
          stepCards.forEach((c, idx) => {
            if (idx + 1 < step) {
              c.className = "step-card completed";
            } else if (idx + 1 === step) {
              c.className = "step-card active";
            } else {
              c.className = "step-card";
            }
          });

          const pct = Math.min(100, step * 20);
          progressBarFill.style.width = `${pct}%`;
          progressPercentage.textContent = `${pct}%`;
          step++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, 350);
    });
  }

  // Render Full Scorecard & Detailed Tabs
  function renderResults(data) {
    const analysis = data.analysis;
    const target = data.target;

    // Header Metadata
    document.getElementById("res-domain").textContent = target.domain;
    document.getElementById("res-timestamp").textContent = new Date(data.timestamp).toLocaleTimeString();
    document.getElementById("res-title").textContent = `Audit Report: ${target.domain}`;

    // Score & Grade
    const scoreDisplay = document.getElementById("score-display");
    const gradeBadge = document.getElementById("grade-badge");
    const gradeStatus = document.getElementById("grade-status");

    scoreDisplay.textContent = analysis.score;
    gradeBadge.textContent = analysis.grade;
    gradeStatus.textContent = analysis.gradeStatus;

    // Colorize based on grade
    const colorClasses = {
      rose: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
      blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    };
    const chosenClass = colorClasses[analysis.gradeColor] || colorClasses.emerald;
    gradeBadge.className = `text-2xl font-black px-3 py-0.5 rounded-lg border ${chosenClass}`;
    scoreDisplay.className = `text-3xl font-black ${chosenClass.split(" ")[0]}`;

    // KPI Summary
    document.getElementById("kpi-trackers").textContent = analysis.metrics.trackersDetected;
    document.getElementById("kpi-cookies").textContent = analysis.metrics.cookiesLogged;
    document.getElementById("kpi-pii").textContent = analysis.metrics.piiLeaksDetected;
    document.getElementById("kpi-discrepancies").textContent = analysis.metrics.discrepanciesFound;

    // Tab Badges
    document.getElementById("badge-discrepancies").textContent = analysis.discrepancies.length;
    document.getElementById("badge-network").textContent = data.networkLogs.length;
    document.getElementById("badge-cookies").textContent = data.cookies.length;
    document.getElementById("badge-nlp").textContent = data.parsedPolicy.clausesCount;

    // Render Tab 1: Discrepancy Matrix
    const discList = document.getElementById("discrepancies-list");
    discList.innerHTML = "";

    if (analysis.discrepancies.length === 0) {
      discList.innerHTML = `
        <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center">
          <i data-lucide="check-circle" class="w-8 h-8 text-emerald-400 mx-auto mb-2"></i>
          <h5 class="text-sm font-bold text-white">Full Privacy Alignment Verified</h5>
          <p class="text-xs text-slate-400 mt-1 max-w-lg mx-auto">
            No runtime discrepancies detected! All intercepted network calls adhere strictly to the published privacy statement and GDPR/DPDP rules.
          </p>
        </div>
      `;
    } else {
      analysis.discrepancies.forEach(d => {
        const severityBadges = {
          CRITICAL: "bg-rose-500/10 text-rose-400 border-rose-500/30",
          HIGH: "bg-amber-500/10 text-amber-400 border-amber-500/30",
          MEDIUM: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
          LOW: "bg-blue-500/10 text-blue-400 border-blue-500/30"
        };
        const badgeCls = severityBadges[d.severity] || severityBadges.MEDIUM;

        const card = document.createElement("div");
        card.className = "bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3";
        card.innerHTML = `
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center space-x-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${badgeCls}">
                ${d.severity} RISK (-${d.deduction} pts)
              </span>
              <h5 class="text-sm font-bold text-white">${d.title}</h5>
            </div>
            <span class="text-[11px] text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
              Violates: <strong class="text-indigo-300">${d.violation}</strong>
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div class="bg-slate-900/90 border border-slate-800/80 rounded-lg p-3 text-xs">
              <div class="text-[10px] uppercase font-bold text-slate-500 mb-1 flex items-center gap-1">
                <i data-lucide="file-text" class="w-3 h-3 text-indigo-400"></i> What Published Policy Claims:
              </div>
              <p class="text-slate-300 italic font-mono text-[11px]">"${d.policyClaim}"</p>
            </div>
            <div class="bg-rose-950/20 border border-rose-900/30 rounded-lg p-3 text-xs">
              <div class="text-[10px] uppercase font-bold text-rose-400 mb-1 flex items-center gap-1">
                <i data-lucide="alert-octagon" class="w-3 h-3"></i> Intercepted Runtime Reality:
              </div>
              <p class="text-rose-200 font-mono text-[11px]">${d.runtimeReality}</p>
            </div>
          </div>

          <div class="bg-indigo-950/20 border border-indigo-900/30 rounded-lg p-2.5 flex items-start space-x-2 text-xs">
            <i data-lucide="wrench" class="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5"></i>
            <div class="text-indigo-200 text-[11px]">
              <strong>Remediation:</strong> ${d.remediation}
            </div>
          </div>
        `;
        discList.appendChild(card);
      });
    }

    // Render Tab 2: Network Beacons
    const netTbody = document.getElementById("network-table-body");
    netTbody.innerHTML = "";
    document.getElementById("network-count-summary").textContent = `${data.networkLogs.length} requests intercepted during scan`;

    data.networkLogs.forEach(req => {
      const tr = document.createElement("tr");
      tr.className = "hover:bg-slate-800/40 transition";
      const riskCls = req.risk === "CRITICAL" ? "text-rose-400 font-bold" : req.risk === "HIGH" ? "text-amber-400" : "text-slate-400";
      tr.innerHTML = `
        <td class="py-2.5 px-3">
          <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${req.method === 'POST' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-emerald-500/20 text-emerald-300'}">${req.method}</span>
        </td>
        <td class="py-2.5 px-3 max-w-xs truncate" title="${req.url}">
          <span class="text-slate-200 font-medium">${req.domain}</span>
          <div class="text-[10px] text-slate-500 truncate">${req.url}</div>
        </td>
        <td class="py-2.5 px-3 text-slate-300">${req.category}</td>
        <td class="py-2.5 px-3">
          ${req.isTracker ? `<span class="text-amber-400 font-semibold">${req.trackerName || 'Tracker'}</span>` : `<span class="text-slate-500">First-Party</span>`}
        </td>
        <td class="py-2.5 px-3 ${riskCls}">${req.risk}</td>
      `;
      netTbody.appendChild(tr);
    });

    // Render Tab 3: Cookies Table
    const cookTbody = document.getElementById("cookies-table-body");
    cookTbody.innerHTML = "";
    document.getElementById("cookies-count-summary").textContent = `${data.cookies.length} storage items logged`;

    data.cookies.forEach(c => {
      const tr = document.createElement("tr");
      tr.className = "hover:bg-slate-800/40 transition";
      tr.innerHTML = `
        <td class="py-2.5 px-3 font-semibold text-white">${c.name}</td>
        <td class="py-2.5 px-3 text-slate-400">${c.domain}</td>
        <td class="py-2.5 px-3">
          <span class="px-2 py-0.5 rounded text-[10px] ${c.category === 'Essential' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}">${c.category}</span>
        </td>
        <td class="py-2.5 px-3 text-slate-400">${c.expires}</td>
        <td class="py-2.5 px-3 text-[10px]">
          ${c.secure ? '<span class="text-emerald-400 mr-1.5 font-bold">Secure</span>' : ''}
          ${c.httpOnly ? '<span class="text-blue-400 font-bold">HttpOnly</span>' : ''}
        </td>
      `;
      cookTbody.appendChild(tr);
    });

    // Render Tab 4: NLP Policy Clauses
    const nlpList = document.getElementById("nlp-clauses-list");
    nlpList.innerHTML = "";

    data.parsedPolicy.clauses.forEach(clause => {
      const div = document.createElement("div");
      div.className = "bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2";
      div.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center space-x-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              ${clause.category.replace(/_/g, " ")}
            </span>
            <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
              Intent: <strong class="text-slate-200">${clause.intent}</strong>
            </span>
          </div>
          <span class="text-[10px] text-emerald-400 font-mono font-semibold">Confidence: ${clause.confidence}</span>
        </div>
        <p class="text-xs text-slate-300 font-mono italic">"${clause.text}"</p>
        <div class="text-[10px] text-slate-500 flex items-center gap-1.5 pt-1">
          <span>Applicable Frameworks:</span>
          ${clause.regulations.map(r => `<span class="bg-slate-900 text-indigo-300 px-1.5 py-0.5 rounded border border-slate-800">${r}</span>`).join(" ")}
        </div>
      `;
      nlpList.appendChild(div);
    });
  }

  // Tab Switching Logic
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active-tab"));
      tabPanes.forEach(p => p.classList.add("hidden"));

      btn.classList.add("active-tab");
      const targetTab = btn.getAttribute("data-tab");
      const targetPane = document.getElementById(targetTab);
      if (targetPane) {
        targetPane.classList.remove("hidden");
      }
    });
  });

  // Export PDF / Print Handler
  printReportBtn.addEventListener("click", () => {
    window.print();
  });
});
