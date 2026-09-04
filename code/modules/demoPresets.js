// PrivaLens Demo Test Scenarios (Prototype v0.3)

const DEMO_PRESETS = [
  {
    id: "ecommerce-ad-trackers",
    name: "ShopVibe E-Commerce Store",
    url: "https://shopvibe-store.test",
    industry: "E-Commerce / Retail",
    description: "Online retail storefront with hidden Meta & Criteo ad tracking scripts conflicting with their 'essential cookies only' policy.",
    policyText: `ShopVibe Privacy Statement:
1. Data Collection: We collect account emails and shipping addresses strictly to fulfill customer orders.
2. Cookie Usage: Our website only uses essential cookies strictly necessary for shopping cart retention and checkout processing. We do not use third-party marketing or cross-site tracking cookies.
3. Third-Party Sharing: We never transmit your browsing habits, page visits, or device identifiers to external advertising brokers or behavioral analytics networks.
4. Data Retention: Customer transaction records are stored for 180 days for invoicing compliance.`,
    runtimeNetworkLogs: [
      {
        url: "https://shopvibe-store.test/api/cart/items",
        method: "POST",
        domain: "shopvibe-store.test",
        category: "First-Party Essential",
        status: 200,
        payloadSize: "1.2 KB",
        isTracker: false,
        risk: "LOW",
        headers: { "Content-Type": "application/json" }
      },
      {
        url: "https://connect.facebook.net/en_US/fbevents.js",
        method: "GET",
        domain: "connect.facebook.net",
        category: "Third-Party Advertising",
        status: 200,
        payloadSize: "48.6 KB",
        isTracker: true,
        trackerName: "Meta / Facebook Pixel",
        risk: "HIGH",
        details: "Dynamic advertising pixel tracking product views and cart interactions."
      },
      {
        url: "https://static.criteo.net/js/ld/ld.js?v=2026",
        method: "GET",
        domain: "static.criteo.net",
        category: "Third-Party Behavioral Retargeting",
        status: 200,
        payloadSize: "32.1 KB",
        isTracker: true,
        trackerName: "Criteo Dynamic Retargeting",
        risk: "HIGH",
        details: "Cross-site retargeting beacon sending SKU views to advertising exchange."
      },
      {
        url: "https://www.google-analytics.com/g/collect?v=2&tid=G-9842XKL&cid=1498213.91823",
        method: "POST",
        domain: "google-analytics.com",
        category: "Third-Party Analytics",
        status: 204,
        payloadSize: "0.4 KB",
        isTracker: true,
        trackerName: "Google Analytics 4",
        risk: "MEDIUM",
        details: "Transmits persistent client identifier and page referral journey."
      }
    ],
    cookies: [
      { name: "cart_session_id", domain: "shopvibe-store.test", category: "Essential", expires: "7 Days", secure: true, httpOnly: true },
      { name: "_fbp", domain: ".facebook.com", category: "Advertising", expires: "90 Days", secure: true, httpOnly: false },
      { name: "_ga", domain: ".google-analytics.com", category: "Analytics", expires: "730 Days", secure: true, httpOnly: false },
      { name: "cto_bundle", domain: ".criteo.com", category: "Retargeting", expires: "390 Days", secure: true, httpOnly: false }
    ],
    detectedPII: [
      { field: "Session Device Fingerprint", location: "Header / Request Payload", risk: "MEDIUM" }
    ]
  },
  {
    id: "healthcare-pii-leak",
    name: "CarePoint Healthcare & Appointment Portal",
    url: "https://carepoint-clinic.test",
    industry: "Healthcare / Telemedicine",
    description: "Medical clinic appointment portal leaking patient contact numbers and emails into unencrypted telemetry URLs.",
    policyText: `CarePoint Patient Privacy Policy:
1. Patient Confidentiality: All patient consultation records, contact numbers, and diagnostic submissions are strictly confidential.
2. Encryption & Telemetry: Personal Identifiable Information (PII) is encrypted at rest and never transferred in cleartext query strings.
3. Analytics: We do not deploy third-party session screen-recording tools on diagnostic booking forms.
4. Compliance: We adhere to India DPDP Act 2023 principles regarding purposeful data minimization.`,
    runtimeNetworkLogs: [
      {
        url: "https://carepoint-clinic.test/api/v1/appointments/book",
        method: "POST",
        domain: "carepoint-clinic.test",
        category: "First-Party Essential",
        status: 200,
        payloadSize: "2.4 KB",
        isTracker: false,
        risk: "LOW",
        headers: { "Content-Type": "application/json" }
      },
      {
        url: "https://telemetry-analytics.io/v1/event?patient_email=sarah.patel@gmail.com&phone=+919876543210&dept=Cardiology",
        method: "GET",
        domain: "telemetry-analytics.io",
        category: "Third-Party Telemetry (PII Leak)",
        status: 200,
        payloadSize: "0.8 KB",
        isTracker: true,
        trackerName: "TelemetryAnalytics Unsafe Beacon",
        risk: "CRITICAL",
        details: "Plaintext patient email and phone number sent as URL query parameters."
      },
      {
        url: "https://static.hotjar.com/c/hotjar-98271.js?sv=6",
        method: "GET",
        domain: "static.hotjar.com",
        category: "Third-Party Session Recording",
        status: 200,
        payloadSize: "64.2 KB",
        isTracker: true,
        trackerName: "Hotjar Session Recorder",
        risk: "HIGH",
        details: "Captures mouse heatmaps and user input events on confidential appointment scheduling page."
      }
    ],
    cookies: [
      { name: "auth_token", domain: "carepoint-clinic.test", category: "Essential", expires: "Session", secure: true, httpOnly: true },
      { name: "_hjSessionUser_98271", domain: ".hotjar.com", category: "Session Replay", expires: "365 Days", secure: true, httpOnly: false }
    ],
    detectedPII: [
      { field: "Email (sarah.patel@gmail.com)", location: "URL Query Param", risk: "CRITICAL" },
      { field: "Phone (+919876543210)", location: "URL Query Param", risk: "CRITICAL" },
      { field: "Medical Department (Cardiology)", location: "URL Query Param", risk: "HIGH" }
    ]
  },
  {
    id: "saas-gdpr-compliant",
    name: "PrivaFlow Cloud Workspace",
    url: "https://privaflow-workspace.test",
    industry: "Enterprise SaaS",
    description: "Privacy-first team collaboration workspace implementing strict first-party cookies with zero external advertising beacons.",
    policyText: `PrivaFlow Privacy & Security Charter:
1. Zero Third-Party Advertising: PrivaFlow is a privacy-first platform. We never embed external ad trackers, marketing pixels, or broker beacons.
2. Essential Cookies Only: Our service sets only single-origin HTTPOnly session authentication cookies.
3. Telemetry: Anonymous server performance metrics are processed strictly on self-hosted infrastructure.
4. GDPR & DPDP Compliance: Users retain full rights to inspect, export, and purge their account data at any time.`,
    runtimeNetworkLogs: [
      {
        url: "https://privaflow-workspace.test/api/auth/session",
        method: "GET",
        domain: "privaflow-workspace.test",
        category: "First-Party Essential",
        status: 200,
        payloadSize: "0.9 KB",
        isTracker: false,
        risk: "LOW",
        headers: { "Content-Type": "application/json" }
      },
      {
        url: "https://privaflow-workspace.test/api/v2/metrics",
        method: "POST",
        domain: "privaflow-workspace.test",
        category: "First-Party Telemetry",
        status: 204,
        payloadSize: "0.3 KB",
        isTracker: false,
        risk: "LOW",
        details: "Self-hosted performance metrics without third-party network exfiltration."
      }
    ],
    cookies: [
      { name: "__Host-pf_sess", domain: "privaflow-workspace.test", category: "Essential", expires: "14 Days", secure: true, httpOnly: true }
    ],
    detectedPII: []
  }
];

module.exports = { DEMO_PRESETS };
