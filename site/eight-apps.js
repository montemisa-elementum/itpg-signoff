const KINDS = {
  app: { label: "Elementum App", cls: "t-spine" },
  task: { label: "Candidate AspectTask", cls: "t-task" },
  element: { label: "Element / reference data", cls: "t-element" },
  table: { label: "External table", cls: "t-table" },
};

const APPS = [
  {
    id: "governance-foundation",
    n: 1,
    short: "Foundation",
    name: "Governance Foundation",
    handle: "GOV",
    namespace: "governance-foundation",
    record: "Governance Model Change Request",
    requirementRange: "GOV-001–026",
    requirements: { total: 26, must: 15, should: 8, could: 3 },
    purpose: "Own the shared operating model that every other application consumes: estate hierarchy, roles, approval authority, gates, scoring and controlled changes to those rules.",
    stages: ["Proposed", "Review", "Approved", "Published", "Rejected"],
    capabilities: [
      "Effective-dated portfolio hierarchy and product/platform register",
      "Objectives, architecture domains, principles and standards",
      "Roles, access and delegation of authority by value and type",
      "Versioned stage-gate and scoring models",
      "Controlled publication of governance-model changes",
    ],
    tasks: [
      "Delegation Record",
      "Gate Model Version",
      "Objective Cascade Link",
      "Role Assignment",
      "Scoring Model Version",
    ],
    elements: [
      "Portfolio Hierarchy",
      "Product & Platform Register",
      "Strategic Objective",
      "Demand & Investment Type Taxonomy",
      "Architecture Domain",
      "Architecture Principle & Standard",
      "Delegation of Authority Threshold",
      "Funding Construct Reference",
      "Stage Gate Model",
      "Gate Criterion",
      "Scoring Model & Weighting",
      "Value Band & Risk Tier Reference",
      "Value Stream",
    ],
    tables: [
      "Application & Service Catalogue",
      "Organisation / Legal Entity",
      "Business Unit",
      "Cost Centre",
      "Currency",
      "Fiscal Calendar",
      "Employee / Contractor",
      "User & Role",
    ],
    incoming: [],
    outgoing: [
      ["enterprise-demand-intake", "Types, products, objectives and routing owners"],
      ["prioritization", "Scoring, gate and approval models"],
      ["capacity", "Hierarchy, teams, roles and value bands"],
      ["execution", "Gate models, status rules and portfolio hierarchy"],
      ["value", "Objectives, outcome types and accountable roles"],
      ["dependencies", "Teams, roles and organizational ownership"],
      ["vendors", "Portfolio hierarchy and role model"],
    ],
    client: [
      "Current portfolio hierarchy and product/platform ownership",
      "Demand and investment type taxonomy",
      "Approval levels, value bands and approver-group membership",
      "Gate criteria, required evidence and waiver policy",
      "Scoring criteria, weights and model publication rules",
      "Identity, organization, finance-calendar and service-catalogue datasets",
    ],
    questions: [
      "Is Governance Foundation intended as a user-facing app for model-change requests, or only as shared configuration?",
      "Which foundational records are mastered in Elementum versus read from enterprise systems?",
    ],
  },
  {
    id: "enterprise-demand-intake",
    n: 2,
    short: "Demand",
    name: "Enterprise Demand Intake",
    handle: "DMD",
    namespace: "enterprise-demand-intake",
    record: "Demand Request",
    requirementRange: "DMD-001–024",
    requirements: { total: 24, must: 11, should: 12, could: 1 },
    purpose: "Provide one front door for every technology request and leave every request with a visible, reasoned disposition.",
    stages: ["Draft", "Submitted", "Classify", "Clarify", "Triage", "Disposed"],
    capabilities: [
      "Demand-type-specific intake with save-and-resume",
      "Mandatory quality checks before submission",
      "Classification and configurable owner routing",
      "Duplicate and backlog-overlap detection",
      "Backlog-versus-investment disposition with requester notification",
    ],
    tasks: [
      "Clarification Request",
      "Classification Result",
      "Demand Attachment",
      "Demand Status History",
      "Duplicate Match Candidate",
      "Initial Sizing Estimate",
      "Run / Change Classification",
      "Triage Disposition",
    ],
    elements: ["Intake Form Template", "Routing Rule", "Triage Reason Code"],
    tables: ["Product Backlog Item", "Service Request"],
    incoming: [["governance-foundation", "Products, request types, objectives, users and routing rules"]],
    outgoing: [
      ["prioritization", "Accepted demand and persistent Portfolio ID"],
      ["execution", "Demand linked to any in-flight initiative for overlap"],
    ],
    client: [
      "In-scope demand types and conditional form fields",
      "Mandatory fields and minimum-quality rules",
      "Product/service-to-owner routing matrix",
      "Disposition reasons and triage service-level targets",
      "Backlog and service-request datasets plus match thresholds",
    ],
    questions: [
      "Which source is authoritative for product backlog items?",
      "Does an accepted demand create the Investment Decision automatically or wait for triage confirmation?",
    ],
  },
  {
    id: "prioritization",
    n: 3,
    short: "Prioritize",
    name: "Portfolio Prioritization & Investment Decisioning",
    handle: "PRI",
    namespace: "portfolio-prioritization",
    record: "Investment Decision",
    requirementRange: "PRI-001–025",
    requirements: { total: 25, must: 16, should: 8, could: 1 },
    purpose: "Turn accepted demand into a structured, comparable investment case and record the board’s decision and approved baseline.",
    stages: ["Define Case", "Assess", "Score", "Scenario", "Board", "Baseline", "Closed"],
    capabilities: [
      "Structured and versioned business case by investment type",
      "TCO by year and cost category",
      "Architecture/security assessment and option analysis",
      "Independent scoring, composite ranking and variance flags",
      "Funding scenarios, board decision, conditions and baseline",
    ],
    tasks: [
      "Architecture & Security Assessment",
      "Assessor Score",
      "Baseline Change Request",
      "Business Case",
      "Business Case Version",
      "Composite Score",
      "Cost Line",
      "Decision Condition",
      "Funding Scenario",
      "Investment Board Meeting",
      "Option Analysis",
      "Outcome Statement",
      "Portfolio Baseline",
      "Scenario Line",
    ],
    elements: [],
    tables: [],
    incoming: [
      ["enterprise-demand-intake", "Demand Request is an upstream app relation, not a duplicate app"],
      ["governance-foundation", "Scoring model, DoA thresholds, gates, objectives and architecture standards"],
      ["capacity", "Live funding and capacity position during scenario comparison"],
    ],
    outgoing: [
      ["capacity", "Candidate investments and their role/skill demand"],
      ["execution", "Approved investment, business case, funding and outcome definitions"],
      ["value", "Named outcome statements and benefit owners"],
    ],
    client: [
      "Business-case templates by investment type",
      "Cost categories, currency and fiscal periods",
      "Scoring rubric, evidence expectations and variance threshold",
      "Board membership, decision types and authority routing",
      "Scenario comparison rules and baseline-change tolerance",
    ],
    questions: [
      "Is Investment Decision the one primary record, with Business Case and Board Meeting as Tasks?",
      "The EDB calls Demand Request an Application here; this proposal treats it as a relation to the Demand app.",
    ],
  },
  {
    id: "capacity",
    n: 4,
    short: "Capacity",
    name: "Capacity & Trade-off Planning",
    handle: "CAP",
    namespace: "capacity-tradeoff-planning",
    record: "Capacity Plan",
    requirementRange: "CAP-001–023",
    requirements: { total: 23, must: 13, should: 8, could: 2 },
    purpose: "Test candidate portfolios against money, team capacity and scarce skills, then preserve what was agreed at each planning cycle.",
    stages: ["Draft", "Model", "Trade-off", "Agreed", "Locked", "Archived"],
    capabilities: [
      "Funding envelopes by portfolio, product, business unit and year",
      "Capacity supply and demand by team, role, skill and period",
      "Run/change/mandatory allocation and unplanned demand",
      "Binding-constraint detection and trade-off options",
      "Quarterly/annual planning snapshots and rolling forecast",
    ],
    tasks: [
      "Capacity Demand",
      "Capacity Supply",
      "Constraint Breach",
      "Funding Allocation",
      "Funding Envelope",
      "Net Capacity Position",
      "Planning Cycle Snapshot",
      "Run / Change / Mandatory Allocation",
      "Specialist Capacity Pool",
      "Trade-off Option",
      "Unplanned Operational Demand",
    ],
    elements: ["Capacity Unit of Measure", "Work Type Reference"],
    tables: ["Employee / Contractor"],
    incoming: [
      ["prioritization", "Candidate investments and required capacity"],
      ["execution", "Delivery variance and actual consumption for reforecast"],
      ["governance-foundation", "Teams, skills, hierarchy, fiscal calendar and cost centres"],
    ],
    outgoing: [
      ["prioritization", "Constraint and funding position used by scenarios"],
      ["execution", "Agreed capacity and funding allocation"],
    ],
    client: [
      "Technology budget and funding envelopes",
      "Team/squad supply for at least four planning periods",
      "Role and skill taxonomy, including scarce specialists",
      "Target run/change/mandatory ratios",
      "Workforce/contractor data and planning calendar",
    ],
    questions: [
      "What is the source of actual capacity consumption?",
      "Are funding envelopes controlled here or only mirrored from finance?",
    ],
  },
  {
    id: "execution",
    n: 5,
    short: "Execute",
    name: "Portfolio Execution Command Center",
    handle: "EXE",
    namespace: "portfolio-execution",
    record: "Initiative",
    requirementRange: "EXE-001–026",
    requirements: { total: 26, must: 16, should: 9, could: 1 },
    purpose: "Carry approved work through delivery and expose only the schedule, cost, risk, gate and status exceptions that need governance attention.",
    stages: ["Mobilize", "Execute", "Control", "Close"],
    capabilities: [
      "Initiative and continuous-product delivery shapes",
      "Status cadence, RAG rules and evidence challenge",
      "Work-item, release and deployment integration",
      "Milestone, risk, issue, gate and change control",
      "Financial/run-cost tracking, command-center and exception views",
    ],
    tasks: [
      "Change Request",
      "Control Gate Record",
      "Cost Forecast",
      "Escalation Item",
      "Governance Reporting Pack",
      "Issue",
      "Milestone",
      "Milestone Baseline",
      "Period Status Report",
      "Portfolio Snapshot",
      "Risk",
    ],
    elements: ["Report Template", "Risk & Issue Severity Reference", "Status Rating Definition"],
    tables: [
      "Cloud & Infrastructure Cost",
      "Cost Actual",
      "Delivery Flow Measure",
      "Deployment Record",
      "Engineering Work Item",
      "Release Record",
    ],
    incoming: [
      ["prioritization", "Approved investment becomes an Initiative without re-entry"],
      ["capacity", "Agreed funding and capacity position"],
      ["dependencies", "Dependency risk and downstream impact"],
      ["vendors", "Vendor commitments, milestones and delivery performance"],
    ],
    outgoing: [
      ["value", "Closure, delivered scope, actual cost and delivery evidence"],
      ["capacity", "Variance and actual consumption for reforecast"],
      ["dependencies", "Provider schedules and milestones"],
      ["vendors", "Initiative progress and vendor-delivered scope"],
    ],
    client: [
      "Initiative versus continuous-product reporting rules",
      "Status cadence, RAG rubric and adverse-status thresholds",
      "Milestone/gate definitions and escalation criteria",
      "Work-management, deployment, finance and cloud-cost datasets",
      "Governance pack and command-center view specification",
    ],
    questions: [
      "Which delivery platform provides work items, releases and deployments?",
      "Which status fields remain human-owned versus calculated from evidence?",
    ],
  },
  {
    id: "value",
    n: 6,
    short: "Realize value",
    name: "Value Realization & Outcome Tracking",
    handle: "VAL",
    namespace: "value-realization",
    record: "Outcome Record",
    requirementRange: "VAL-001–024",
    requirements: { total: 24, must: 14, should: 10, could: 0 },
    purpose: "Keep outcomes open beyond delivery closure until expected value is measured, independently validated and reported without double counting.",
    stages: ["Defined", "Measuring", "Validating", "Realized", "Closed"],
    capabilities: [
      "Business and technology outcomes with baseline and phased targets",
      "Actuals and adoption from named data sources",
      "Independent validation of realized-value claims",
      "Post-implementation review and lessons learned",
      "Portfolio-level realization and forecast-accuracy reporting",
    ],
    tasks: [
      "Double-Count Flag",
      "Evidence Item",
      "Lessons Learned Note",
      "Outcome Baseline",
      "Outcome Re-forecast",
      "Outcome Target Profile",
      "Post-Implementation Review",
      "Validation Outcome",
    ],
    elements: ["Measurement Method Reference"],
    tables: [
      "Adoption Measure",
      "Cloud & Infrastructure Cost",
      "Outcome Actual",
      "Product Telemetry Measure",
    ],
    incoming: [
      ["prioritization", "Outcome statements, targets and benefit owners"],
      ["execution", "Initiative closure, actual cost and delivery evidence"],
      ["vendors", "Vendor value attribution and sourcing savings"],
      ["governance-foundation", "Outcome types, objectives, products and roles"],
    ],
    outgoing: [["prioritization", "Lessons and forecast accuracy inform future cases and scoring"]],
    client: [
      "Outcome types, measurement methods and validation owners",
      "Baseline and target profile for each approved outcome",
      "Telemetry/adoption datasets and outcome join keys",
      "Validation routing and realization reporting cadence",
      "Sourcing savings ledger for reconciliation",
    ],
    questions: [
      "The EDB calls Savings Record a separate Application. Under an eight-app limit, is it a Task under this app or an external sourcing relation?",
      "What proportion of outcome actuals must be automated for acceptance?",
    ],
  },
  {
    id: "dependencies",
    n: 7,
    short: "Dependencies",
    name: "Enterprise Dependency Management",
    handle: "DEP",
    namespace: "enterprise-dependencies",
    record: "Dependency",
    requirementRange: "DEP-001–020",
    requirements: { total: 20, must: 11, should: 8, could: 1 },
    purpose: "Turn cross-team and shared-function dependencies into two-sided commitments with lead times, breach detection and visible downstream impact.",
    stages: ["Proposed", "Accepted", "In Progress", "At Risk", "Breached", "Delivered", "Cancelled"],
    capabilities: [
      "Provider, receiver, need-by date and criticality",
      "Explicit acceptance before a commitment is counted",
      "Shared-function demand, capacity and published lead times",
      "At-risk/breach detection and two-sided escalation",
      "Dependency network, critical paths and constrained functions",
    ],
    tasks: [
      "Breach Record",
      "Dependency Acceptance",
      "Dependency Map Snapshot",
      "Dependency Status History",
      "Downstream Impact Assessment",
      "Milestone",
      "Resequencing Option",
      "Shared Function Capacity",
      "Shared Function Load",
    ],
    elements: [
      "Criticality Reference",
      "Escalation Path",
      "Shared Function Reference",
      "Standard Lead Time",
    ],
    tables: [],
    incoming: [
      ["execution", "Initiative relation, schedules, milestones and delivery signals"],
      ["capacity", "Shared-function capacity"],
      ["vendors", "Vendor-provided commitments"],
    ],
    outgoing: [
      ["execution", "At-risk/breached dependencies and downstream impact"],
      ["capacity", "Aggregated shared-function demand"],
    ],
    client: [
      "Shared technology functions and accountable owners",
      "Standard lead times, capacity and escalation path by criticality",
      "Definition of dependency commitment and waiver",
      "Known dependency set for validating the map",
    ],
    questions: [
      "The EDB calls Initiative an Application here; this proposal treats it as a relation to Execution.",
      "Is network visualization a hard acceptance criterion for the first release? DEP-014 says Must Have.",
    ],
  },
  {
    id: "vendors",
    n: 8,
    short: "Vendors",
    name: "Strategic Vendor Management",
    handle: "SVM",
    namespace: "strategic-vendor-management",
    record: "Vendor Engagement",
    requirementRange: "SVM-001–025",
    requirements: { total: 25, must: 14, should: 10, could: 1 },
    purpose: "Overlay delivery, spend, risk and value performance on vendor engagements while leaving vendor, contract and risk master data in the sourcing solution.",
    stages: ["Scoping", "Active", "Review", "Optimizing", "Closing", "Closed"],
    capabilities: [
      "Engagement, contract, initiative/product and internal owner linkage",
      "Commitments, deliverables, milestones and acceptance",
      "Spend, rate/volume variance and contractor position",
      "Risk, concentration and key-person exposure",
      "Value attribution, overlap, consolidation and optimization actions",
    ],
    tasks: [
      "Concentration Exposure",
      "Deliverable Acceptance",
      "Key-Person Dependency",
      "Realized Value Attribution",
      "Spend Forecast",
      "Vendor Commitment",
      "Vendor Milestone",
      "Vendor Optimization Action",
      "Vendor Performance Score",
    ],
    elements: [
      "Commercial Construct Reference",
      "Engagement Type Reference",
      "Rate Card",
      "Technology Capability Taxonomy",
    ],
    tables: [
      "Contract",
      "Contractor Assignment",
      "Invoice",
      "Service Level Measurement",
      "Spend Commitment",
      "Vendor Deliverable",
      "Vendor Risk Status",
    ],
    incoming: [
      ["execution", "Initiative relation and delivered scope"],
      ["dependencies", "Vendor-provided dependencies"],
      ["governance-foundation", "Hierarchy, users, currency and business units"],
    ],
    outgoing: [
      ["execution", "Commitment, milestone and delivery-performance exceptions"],
      ["value", "Realized value attribution and savings-ledger reconciliation"],
      ["dependencies", "Vendor commitments and key-person dependencies"],
    ],
    client: [
      "Vendor/contract/risk source from Strategic Sourcing & TPRM",
      "ERP invoice, commitment and contractor-spend datasets",
      "Engagement types, commercial constructs and rate cards",
      "Performance scorecard, cadence and deterioration thresholds",
      "Definitions of concentration, overlap and optimization",
    ],
    questions: [
      "The EDB calls Initiative an Application here; this proposal treats it as a relation to Execution.",
      "Does the sourcing/TPRM solution exist and expose every required dataset?",
    ],
  },
];

const FLOWS = [
  {
    id: "investment",
    tag: "A",
    name: "New capability becomes measured value",
    lede: "The full workbook path. All eight applications participate, but Dependency and Vendor Management join only when the investment needs them.",
    steps: [
      ["governance-foundation", "Configure the rules", "Publish the hierarchy, ownership, demand types, scoring model, gates and approval thresholds used downstream."],
      ["enterprise-demand-intake", "Capture and triage demand", "Validate the request, screen overlap and accept it as an investment with a persistent Portfolio ID."],
      ["prioritization", "Build and compare the case", "Structure TCO, options and outcomes; score the case; compare funding scenarios; record the board decision."],
      ["capacity", "Test whether it is deliverable", "Compare funding, teams and scarce specialists; return the binding constraint and trade-off options."],
      ["prioritization", "Lock the approved baseline", "Resolve the capacity trade-off, close decision conditions and preserve the approved portfolio position."],
      ["execution", "Deliver against the baseline", "Track status, milestones, gates, risks, changes, actual cost and engineering evidence."],
      ["dependencies", "Manage cross-team commitments", "Accept shared-function or vendor dependencies; expose breach risk and downstream impact to Execution."],
      ["vendors", "Manage vendor commitments", "Track vendor deliverables, milestones, spend, risk and performance against the initiatives they support."],
      ["value", "Measure and validate outcomes", "Keep outcomes open after delivery; ingest actuals; validate claims; run the post-implementation review."],
      ["governance-foundation", "Improve the operating model", "Use lessons and forecast accuracy to propose a controlled new scoring, gate or threshold version."],
    ],
  },
  {
    id: "backlog",
    tag: "B",
    name: "Existing-product enhancement stops at the backlog",
    lede: "Not every request should traverse all eight applications. This is the expected short path.",
    steps: [
      ["governance-foundation", "Resolve product ownership", "The product register identifies the accountable owner and the demand type defaults to backlog handling."],
      ["enterprise-demand-intake", "Capture, route and screen", "The request is checked against open demand, approved initiatives and product backlog items."],
      ["enterprise-demand-intake", "Dispose to backlog", "The owner links the matching work item, records the reason and notifies the requester. No investment is created."],
    ],
  },
  {
    id: "mandatory",
    tag: "C",
    name: "Mandatory remediation competes visibly for capacity",
    lede: "Security and regulatory work follows the same route so it cannot consume capacity invisibly.",
    steps: [
      ["enterprise-demand-intake", "Classify mandatory demand", "A security or compliance request is first-class demand, not an exception side door."],
      ["prioritization", "Score and decide visibly", "The work is ranked beside discretionary change, using the model and gate set for its type."],
      ["capacity", "Expose displaced change capacity", "The plan shows how mandatory load changes team and specialist availability."],
      ["execution", "Deliver through control gates", "Evidence closes the control points; any waiver records secondary approval and residual risk."],
    ],
  },
];

const CLIENT_CONFIG = [
  {
    app: "governance-foundation",
    needs: "Hierarchy, product/platform ownership, roles, DoA levels, gate criteria, scoring weights, identity/finance/catalogue feeds",
    owners: "Portfolio lead, CIO office, architecture, security, finance",
  },
  {
    app: "enterprise-demand-intake",
    needs: "Demand types, forms, mandatory fields, routing matrix, reason codes, triage SLAs, backlog source",
    owners: "Demand process owner, product operations",
  },
  {
    app: "prioritization",
    needs: "Case templates, cost taxonomy, scoring rubric, board membership, decision rules, scenario definitions",
    owners: "Investment board, finance, architecture",
  },
  {
    app: "capacity",
    needs: "Funding envelopes, team/skill supply, scarce specialists, allocation targets, planning calendar",
    owners: "Engineering leadership, workforce planning, finance",
  },
  {
    app: "execution",
    needs: "Status cadence/RAG rubric, milestones, escalation criteria, reporting-pack specification, toolchain and cost feeds",
    owners: "PMO, delivery leads, finance",
  },
  {
    app: "value",
    needs: "Outcome types, measures, baselines, targets, validation owners, telemetry/adoption feeds",
    owners: "Benefit owners, finance/assurance, product analytics",
  },
  {
    app: "dependencies",
    needs: "Shared functions, owners, lead times, criticality, capacity, escalation paths and a known map test set",
    owners: "Architecture, security, platform/shared-function leads",
  },
  {
    app: "vendors",
    needs: "TPRM/vendor/contract source, ERP spend, engagement taxonomy, scorecard, concentration and optimization definitions",
    owners: "Sourcing, vendor managers, finance, third-party risk",
  },
];

const OPEN_QUESTIONS = [
  {
    title: "Are the eight workbook headings literally eight Elementum Apps?",
    why: "This proposal assumes yes. The EDB also labels several upstream objects as Application inside downstream areas, so “Application” may instead mean a business data object.",
    decision: "Confirm one deployed app per workbook heading and one primary record per app.",
  },
  {
    title: "Are EDB rows typed Task intended to be AspectTask?",
    why: "The platform supports AspectTask. It has fields, records, statuses, automations, layouts and relationships, but no stages. Whether it is the intended mapping for these workbook rows needs confirmation.",
    decision: "Confirm the product intent and approved authoring path for these entities.",
  },
  {
    title: "Which Task rows need independent records?",
    why: "A Composite Score may be a calculated field; a Status History may be native; a Cost Line or Milestone clearly repeats and needs its own data. The EDB classification alone does not settle that distinction.",
    decision: "Review the 75 candidates app by app: AspectTask, field/native behavior, generated artifact, or external record.",
  },
  {
    title: "Where is the separate process document?",
    why: "The packet currently available contains functional requirements, acceptance criteria, the EDB inventory and pain points. It does not include a process document with actors, transitions and exception paths.",
    decision: "Obtain it and reconcile every proposed stage and handoff before implementation.",
  },
  {
    title: "How are the extra Application rows represented?",
    why: "Value lists Outcome Record and Savings Record; Prioritization lists Demand Request; Dependency and Vendor list Initiative. Exact eight-app architecture requires some to be relations rather than locally owned app schemas.",
    decision: "Confirm ownership, especially Savings Record.",
  },
];

const byId = new Map(APPS.map((app) => [app.id, app]));

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function appLink(id, note = "") {
  const app = byId.get(id);
  if (!app) return "";
  return `<a class="chip-ref t-spine" href="#app-${app.id}" data-app="${app.id}">
    <span class="chip-name">${escapeHtml(app.name)}</span>
    ${note ? `<span class="chip-note">${escapeHtml(note)}</span>` : ""}
  </a>`;
}

function list(items, className = "") {
  return `<ul${className ? ` class="${className}"` : ""}>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function pills(items, cls) {
  return `<div class="entity-pills">${items.map((item) => `<span class="entity-pill ${cls}">${escapeHtml(item)}</span>`).join("")}</div>`;
}

function appCard(app) {
  return `<button class="eight-card" type="button" data-app="${app.id}">
    <span class="eight-n">${app.n}</span>
    <span class="tile-type">Elementum App</span>
    <strong>${escapeHtml(app.name)}</strong>
    <span>${escapeHtml(app.record)}</span>
    <small>${app.requirementRange} · ${app.requirements.must} Must Haves</small>
  </button>`;
}

function appDetail(app) {
  const req = app.requirements;
  return `<details class="app-spec" id="app-${app.id}">
    <summary>
      <span class="app-summary-n">${app.n}</span>
      <span>
        <span class="tile-type">Elementum App · ${app.requirementRange}</span>
        <span class="app-summary-title">${escapeHtml(app.name)}</span>
        <span class="app-summary-copy">${escapeHtml(app.purpose)}</span>
      </span>
      <span class="app-summary-meta">${req.total} requirements<br>${req.must} Must · ${req.should} Should · ${req.could} Could</span>
    </summary>
    <div class="app-spec-body">
      <div class="app-identity">
        <div><span>Primary record</span><strong>${escapeHtml(app.record)}</strong></div>
        <div><span>Handle</span><strong class="mono">${app.handle}</strong></div>
        <div><span>Namespace</span><strong class="mono">${app.namespace}</strong></div>
      </div>

      <h4>Proposed lifecycle</h4>
      <div class="stage-strip">${app.stages.map((stage) => `<span>${escapeHtml(stage)}</span>`).join("")}</div>

      <div class="grid two spec-grid">
        <div><h4>What this app owns</h4>${list(app.capabilities, "checklist")}</div>
        <div><h4>What the client must configure</h4>${list(app.client, "checklist")}</div>
      </div>

      <h4>Candidate AspectTask entities from the EDB (${app.tasks.length})</h4>
      ${pills(app.tasks, "task")}

      ${app.elements.length ? `<h4>Elements / reference data owned or consumed</h4>${pills(app.elements, "element")}` : ""}
      ${app.tables.length ? `<h4>External or transactional tables consumed</h4>${pills(app.tables, "table")}` : ""}

      <div class="grid two spec-grid">
        <div><h4>Inputs from other apps</h4>${app.incoming.length ? list(app.incoming.map(([id, note]) => `${appLink(id)}<span class="handoff-note">${escapeHtml(note)}</span>`), "handoffs") : "<p class=\"small\">None — this app establishes the shared foundation.</p>"}</div>
        <div><h4>Outputs to other apps</h4>${list(app.outgoing.map(([id, note]) => `${appLink(id)}<span class="handoff-note">${escapeHtml(note)}</span>`), "handoffs")}</div>
      </div>

      <div class="callout warning"><strong>Validate with the process owner</strong>${list(app.questions)}</div>
    </div>
  </details>`;
}

function flowBlock(flow) {
  const cards = flow.steps.map(([appId, title], index) => {
    const app = byId.get(appId);
    return `<button class="snake-card" type="button" data-flow="${flow.id}" data-step="${index}">
      <span class="snake-top"><span class="snake-n">${index + 1}</span><span class="step-actor">${app.short}</span></span>
      <span class="snake-title">${escapeHtml(title)}</span>
      <span class="snake-count">${escapeHtml(app.name)}</span>
    </button>`;
  }).join("");

  return `<article class="journey" id="flow-${flow.id}">
    <header>
      <span class="tile-type">Scenario ${flow.tag}</span>
      <h3>${escapeHtml(flow.name)}</h3>
      <p>${escapeHtml(flow.lede)}</p>
    </header>
    <div class="snake" data-flow="${flow.id}">${cards}</div>
  </article>`;
}

function clientTable() {
  return `<div class="table-wrap"><table>
    <thead><tr><th>Application</th><th>What we need from the client</th><th>Likely owners</th></tr></thead>
    <tbody>${CLIENT_CONFIG.map((row) => {
      const app = byId.get(row.app);
      return `<tr><td>${appLink(app.id)}</td><td>${escapeHtml(row.needs)}</td><td>${escapeHtml(row.owners)}</td></tr>`;
    }).join("")}</tbody>
  </table></div>`;
}

function openApp(id) {
  const detail = document.getElementById(`app-${id}`);
  if (!detail) return;
  detail.open = true;
  detail.scrollIntoView({ behavior: "smooth", block: "start" });
  detail.classList.add("is-flash");
  setTimeout(() => detail.classList.remove("is-flash"), 1200);
}

function snakeColumns() {
  if (window.matchMedia("(max-width: 720px)").matches) return 1;
  if (window.matchMedia("(max-width: 1080px)").matches) return 2;
  return 4;
}

function layoutSnakes() {
  const cols = snakeColumns();
  document.querySelectorAll(".snake").forEach((board) => {
    const cards = [...board.children];
    board.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
    cards.forEach((card, i) => {
      const row = Math.floor(i / cols);
      const slot = i % cols;
      const leftToRight = row % 2 === 0;
      card.style.gridColumn = String((leftToRight ? slot : cols - 1 - slot) + 1);
      card.style.gridRow = String(row + 1);
      const endOfRow = slot === cols - 1;
      card.dataset.dir = i === cards.length - 1 ? "end" : endOfRow ? "down" : leftToRight ? "right" : "left";
    });
  });
}

let activeStep = null;

function openStep(flowId, index) {
  const flow = FLOWS.find((candidate) => candidate.id === flowId);
  const modal = document.getElementById("step-modal");
  if (!flow || !modal || !flow.steps[index]) return;
  const [appId, title, detail] = flow.steps[index];
  const app = byId.get(appId);
  activeStep = { flowId, index };

  modal.querySelector(".modal-eyebrow").textContent = `Scenario ${flow.tag} · step ${index + 1} of ${flow.steps.length}`;
  modal.querySelector(".modal-flow").textContent = flow.name;
  modal.querySelector(".modal-actor").textContent = app.name;
  modal.querySelector(".modal-title").textContent = title;
  modal.querySelector(".modal-body").innerHTML = `
    <p class="modal-what">${escapeHtml(detail)}</p>
    <h5>Application involved</h5>
    <div class="chips">${appLink(app.id, `${app.record} · ${app.requirementRange}`)}</div>`;
  modal.querySelector('[data-nav="prev"]').disabled = index === 0;
  modal.querySelector('[data-nav="next"]').disabled = index === flow.steps.length - 1;
  if (!modal.open) {
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
  }
}

function closeStep() {
  const modal = document.getElementById("step-modal");
  if (!modal) return;
  if (typeof modal.close === "function") modal.close();
  else modal.removeAttribute("open");
  activeStep = null;
}

function stepBy(delta) {
  if (!activeStep) return;
  openStep(activeStep.flowId, activeStep.index + delta);
}

function wireModal() {
  const modal = document.getElementById("step-modal");
  if (!modal) return;
  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest(".modal-close")) {
      closeStep();
      return;
    }
    const nav = event.target.closest("[data-nav]");
    if (nav && !nav.disabled) {
      stepBy(nav.dataset.nav === "next" ? 1 : -1);
      return;
    }
    const app = event.target.closest("[data-app]");
    if (app) {
      event.preventDefault();
      closeStep();
      openApp(app.dataset.app);
    }
  });
  modal.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") stepBy(1);
    if (event.key === "ArrowLeft") stepBy(-1);
  });
  modal.addEventListener("close", () => { activeStep = null; });
}

function init() {
  const cards = document.getElementById("eight-apps");
  if (cards) cards.innerHTML = APPS.map(appCard).join("");

  const specs = document.getElementById("app-specs");
  if (specs) specs.innerHTML = APPS.map(appDetail).join("");

  const flows = document.getElementById("flow-boards");
  if (flows) flows.innerHTML = FLOWS.map(flowBlock).join("");

  const config = document.getElementById("client-config");
  if (config) config.innerHTML = clientTable();

  const questions = document.getElementById("open-questions");
  if (questions) {
    questions.innerHTML = OPEN_QUESTIONS.map((item, index) => `<article class="question-card">
      <span>${index + 1}</span>
      <div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.why)}</p><p><strong>Decision needed:</strong> ${escapeHtml(item.decision)}</p></div>
    </article>`).join("");
  }

  document.body.addEventListener("click", (event) => {
    const app = event.target.closest("[data-app]");
    if (app && !app.closest(".modal")) {
      event.preventDefault();
      openApp(app.dataset.app);
      return;
    }
    const step = event.target.closest(".snake-card");
    if (step) openStep(step.dataset.flow, Number(step.dataset.step));
  });

  layoutSnakes();
  window.addEventListener("resize", layoutSnakes);
  wireModal();

  if (location.hash.startsWith("#app-")) openApp(location.hash.replace("#app-", ""));
}

document.addEventListener("DOMContentLoaded", init);
