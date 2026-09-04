/* ITPG component explorer.
   One dataset drives both the relationship map and the entity tiles. */

const TYPES = {
  spine: { label: "Spine app", cls: "t-spine" },
  app: { label: "App", cls: "t-app" },
  child: { label: "Child app", cls: "t-child" },
  element: { label: "Element", cls: "t-element" },
  table: { label: "Table port", cls: "t-table" },
};

/* Optional modules are ordinary apps, elements, and table ports that are only
   deployed when the module is selected. Membership lives on the entity. */
const MODULES = [
  { id: "scenarios", name: "Scenario planning", wave: "2–4",
    blurb: "Compare candidate portfolios before committing: what is in, what is out, and what that costs.",
    prereq: "No integration needed. Worth deploying once there are enough candidates to trade off.",
    plugsIn: "Between scoring and the board decision in scenario A — comparing candidates before any one of them is approved." },
  { id: "capacity", name: "Capacity", wave: "4",
    blurb: "Test funding against the teams and scarce specialists who actually have to deliver the work.",
    prereq: "Needs the workforce and directory port, and teams willing to declare available capacity.",
    plugsIn: "Alongside the board decision in scenario A — testing whether the approved list is deliverable by real teams." },
  { id: "outcomes", name: "Outcomes", wave: "5",
    blurb: "Keep benefits open after delivery closes, measured against a baseline captured before approval.",
    prereq: "Needs the telemetry and adoption port, or benefit claims stay self-reported.",
    plugsIn: "Created from the case at qualification in scenario A, and stays open after the close step." },
  { id: "dependencies", name: "Dependencies", wave: "6",
    blurb: "Two-sided commitments between investments and shared functions, with lead times and escalation.",
    prereq: "Needs shared functions to publish lead times and to accept commitments.",
    plugsIn: "During execute in scenario A — a breached commitment moves milestones and blocks closure." },
  { id: "vendors", name: "Vendors", wave: "7",
    blurb: "Engagement performance on top of the vendor system of record. No local vendor master.",
    prereq: "Blocked until the sourcing and third-party risk solution is live in the same environment.",
    plugsIn: "Across execute and close in scenario A, wherever a vendor is delivering the work." },
];

const ENTITIES = [
  {
    id: "demand-request",
    name: "Demand Request",
    short: "Demand",
    type: "spine",
    handle: "DMD",
    ns: "demand-request",
    wave: "1",
    blurb: "The single front door. Every technology request lands here and leaves with a recorded disposition.",
    stages: ["Draft", "Submitted", "Clarification", "Triage", "Disposed"],
    statuses: {
      open: ["Draft", "Submitted", "Clarification requested", "In triage"],
      closed: ["Routed to backlog", "Accepted as investment", "Merged", "Deferred", "Rejected", "Redirected"],
    },
    fields: [
      ["Title", "Text (record title)", "Short problem name", "Yes"],
      ["Demand type", "Dropdown (dynamic)", "Demand & Investment Type", "On submit"],
      ["Requester", "User", "Defaults to creator", "Yes"],
      ["Sponsor", "User", "Business accountable person", "On submit"],
      ["Business unit", "Text or table lookup", "Finance/HR port when available", "On submit"],
      ["Cost centre", "Text", "Finance reference", "No"],
      ["Affected product", "Dropdown (dynamic)", "Product & Platform Register", "On submit"],
      ["Objectives", "Multi-select (dynamic)", "Strategic Objective", "No"],
      ["Problem statement", "Long text", "—", "Yes"],
      ["Desired outcome", "Long text", "—", "On submit"],
      ["Required timing", "Date", "—", "No"],
      ["Work type", "Dropdown", "Run · Change · Mandatory", "On submit"],
      ["Supporting files", "Attachment", "—", "No"],
      ["Triage owner", "User (assignee)", "Set by routing automation", "No"],
      ["Initial cost estimate", "Decimal", "Order of magnitude", "No"],
      ["Initial effort", "Number", "Person-days or points", "No"],
      ["Initial duration", "Number", "Weeks", "No"],
      ["Disposition reason", "Dropdown", "Duplicate · Out of scope · Backlog · Needs funding · Other", "On disposal"],
      ["Disposition notes", "Long text", "—", "No"],
      ["Portfolio ID", "Text", "Written on acceptance", "No"],
      ["Related demand", "Relation (self)", "Merge and duplicate linkage", "No"],
      ["Related portfolio item", "Relation", "Portfolio Item", "No"],
    ],
    views: [
      ["My demand", "Created by current user", "Requesters"],
      ["Triage inbox", "In triage, assigned to me", "Product and platform owners"],
      ["Pipeline", "Not disposed, grouped by stage and type", "Governance lead"],
      ["Ageing", "Submitted or triage, oldest first", "Governance lead"],
    ],
    layouts: [
      ["Draft / Submitted", "Type, product, problem, outcome, timing, attachments", "No scores or triage fields"],
      ["Triage", "Summary, duplicate candidates, disposition and reason", "No repeated intake form"],
      ["Disposed", "Read-mostly outcome, next step, related item", "No editable intake fields"],
    ],
    rels: [
      ["portfolio-item", "Acceptance mints the Portfolio ID and creates the item"],
      ["clarification-request", "Questions back to the requester, with a target date"],
      ["demand-investment-type", "Type drives which fields show and which models apply"],
      ["product-platform", "Affected product determines the routing owner"],
      ["strategic-objective", "Objective alignment captured at intake"],
      ["work-management", "Duplicate and backlog overlap screening"],
    ],
  },
  {
    id: "portfolio-item",
    name: "Portfolio Item",
    short: "Portfolio Item",
    type: "spine",
    handle: "PFI",
    ns: "portfolio-item",
    wave: "2–3",
    blurb: "The funded bet. One record carries the business case, board decision, baseline, delivery health, and closure.",
    stages: ["Qualify", "Score", "Board", "Baseline", "Execute", "Realize", "Close"],
    statuses: {
      open: ["Qualifying", "Scoring", "Awaiting board", "Approved", "Conditionally approved", "In delivery", "Realizing"],
      closed: ["Rejected", "Deferred", "Completed", "Cancelled", "Retired"],
    },
    fields: [
      ["Portfolio ID", "Text", "Minted from accepted demand", "Yes"],
      ["Source demand", "Relation", "Demand Request", "Yes"],
      ["Investment type", "Dropdown (dynamic)", "Demand & Investment Type", "Yes"],
      ["Funding construct", "Dropdown", "Persistent product funding · Discrete initiative", "Yes"],
      ["Product / platform", "Dropdown (dynamic)", "Product & Platform Register", "Yes"],
      ["Objectives", "Multi-select (dynamic)", "Strategic Objective", "No"],
      ["Options considered", "Long text", "Must include do-nothing and reuse-platform", "Before scoring"],
      ["Architecture & security implications", "Long text", "—", "Before scoring"],
      ["Exception required", "Boolean + long text", "Target-state deviation", "No"],
      ["Benefit owner", "User", "—", "Before scoring"],
      ["Outcome statements", "Long text", "Becomes Outcome records", "Before scoring"],
      ["Scoring model version", "Dropdown (dynamic)", "Scoring Model Version", "At scoring"],
      ["Criterion scores (6)", "Number", "Value · fit · reuse · run cost · risk · debt", "At scoring"],
      ["Composite score", "Calculated", "Weighted from the model version", "Derived"],
      ["DoA level", "Text", "Matched from DoA Threshold", "Derived"],
      ["Decision", "Dropdown", "Approve · Conditionally approve · Reject · Defer", "At board"],
      ["Decision rationale / date / attendees", "Long text · Date · Long text", "Audit trail", "At board"],
      ["Approved funding", "Decimal", "Copied at baseline lock", "At baseline"],
      ["Baseline locked / locked at", "Boolean · Date-time", "Baseline is mandatory", "At baseline"],
      ["TCO total", "Calculated", "Sum of Cost Line children", "Derived"],
      ["Gate model version", "Dropdown (dynamic)", "Stage Gate Model", "Yes"],
      ["Health (RAG)", "Dropdown", "Green · Amber · Red", "In execution"],
      ["Status narrative", "Long text", "Each cadence period", "In execution"],
      ["Recovery action", "Long text", "Required when Amber or Red", "Conditional"],
      ["Last status submitted", "Date-time", "Drives the overdue flag", "Derived"],
      ["Cadence days", "Number", "Reporting frequency", "In execution"],
      ["Status overdue", "Calculated", "Feeds the exception view", "Derived"],
    ],
    views: [
      ["Ranked candidates", "Scoring or awaiting board, by composite score", "Investment board"],
      ["Approved baseline", "Baseline locked, grouped by product", "Finance and PMO"],
      ["In delivery", "Execute stage, grouped by portfolio node", "PMO"],
      ["Exceptions", "Adverse RAG, overdue status, or open conditions", "Governance forum"],
      ["Mandatory work", "Work type Mandatory, all stages", "Security and architecture"],
    ],
    layouts: [
      ["Qualify", "Complete the case: options, cost lines, benefit owner, outcomes", "Submit for scoring"],
      ["Score / Board", "Scores with commentary, TCO summary, decision block", "Record decision"],
      ["Baseline", "Approved funding, conditions, gate model", "Lock baseline"],
      ["Execute", "RAG, narrative, milestones, gates, risks, cost variance", "Submit status update"],
      ["Realize / Close", "Outcome summary and closure evidence", "Close delivery"],
    ],
    rels: [
      ["demand-request", "Originating request, kept for traceability"],
      ["cost-line", "Total cost of ownership by year and cost type"],
      ["decision-condition", "Conditions of approval that block Execute"],
      ["assessor-score", "Independent scores and variance"],
      ["milestone", "Baseline versus forecast dates"],
      ["control-gate-record", "Gate evidence, waivers, and residual risk"],
      ["portfolio-risk", "Risk register for this item"],
      ["portfolio-issue", "Issue register for this item"],
      ["portfolio-change-request", "Change beyond tolerance against the baseline"],
      ["capacity-plan", "Consumes team and specialist capacity"],
      ["outcome-record", "Benefits that outlive delivery"],
      ["dependency", "Inbound commitments from shared functions"],
      ["vendor-engagement", "Vendor work supporting this item"],
      ["funding-scenario", "Included in or excluded from a candidate portfolio"],
      ["scoring-model-version", "Model version recorded with the score"],
      ["stage-gate-model", "Gate model in force when it entered"],
      ["doa-threshold", "Value and type select the approval authority"],
      ["finance-actuals", "Actual and committed cost"],
      ["cloud-consumption", "Run cost during delivery"],
      ["work-management", "Delivery progress without re-entry"],
    ],
  },

  { id: "clarification-request", name: "Clarification Request", short: "Clarification", type: "child", handle: "CLR", ns: "clarification-request", wave: "1",
    blurb: "A tracked question back to the requester, so triage is not blocked by an email thread.",
    fields: [["Demand Request","Relation","Parent request","Yes"],["Question","Long text","—","Yes"],["Requested from","User","Usually the requester","Yes"],["Target date","Date","Response service level","Yes"],["Response","Long text","—","No"],["Status","Dropdown","Open · Answered · Closed","Yes"]],
    rels: [["demand-request", "Belongs to one demand record"]] },

  { id: "cost-line", name: "Cost Line", short: "Cost Line", type: "child", handle: "CLN", ns: "cost-line", wave: "2",
    blurb: "One row per year and cost type, so total cost of ownership is structured rather than a single number.",
    fields: [["Portfolio Item","Relation","Parent item","Yes"],["Fiscal year","Number","Planning year","Yes"],["Cost type","Dropdown","Build · Licence · Cloud run · Support","Yes"],["Amount","Decimal","—","Yes"],["Currency","Text","—","No"],["Notes","Long text","Assumption or source","No"]],
    rels: [["portfolio-item", "Rolls up into TCO total"],["finance-actuals", "Compared against actual cost"]] },

  { id: "decision-condition", name: "Decision Condition", short: "Condition", type: "child", handle: "DCN", ns: "decision-condition", wave: "2",
    blurb: "A condition of approval with an owner and a due date, tracked to closure instead of forgotten.",
    fields: [["Portfolio Item","Relation","Parent item","Yes"],["Condition","Long text","—","Yes"],["Owner","User","Accountable person","Yes"],["Due date","Date","—","Yes"],["Status","Dropdown","Open · Closed","Yes"],["Evidence","Attachment","Closure proof","No"]],
    rels: [["portfolio-item", "Open conditions block the Execute stage"]] },

  { id: "assessor-score", name: "Assessor Score", short: "Assessor Score", type: "child", handle: "ASC", ns: "assessor-score", wave: "2 (optional)",
    blurb: "Independent scoring by multiple assessors, so variance is visible rather than averaged away.",
    fields: [["Portfolio Item","Relation","Parent item","Yes"],["Assessor","User","—","Yes"],["Criterion scores (6)","Number","Same criteria as the model","Yes"],["Commentary","Long text","Evidence per criterion","Yes"],["Variance flagged","Boolean","Beyond threshold","Derived"]],
    rels: [["portfolio-item", "Feeds the moderated composite score"],["scoring-model-version", "Uses the published criteria and weights"]] },

  { id: "milestone", name: "Milestone", short: "Milestone", type: "child", handle: "MSN", ns: "milestone", wave: "3",
    blurb: "Delivery and control-gate dates with baseline versus forecast, so slippage is detected rather than reported.",
    fields: [["Portfolio Item","Relation","Parent item","Yes"],["Name","Text","—","Yes"],["Kind","Dropdown","Delivery · Control gate","Yes"],["Baseline date","Date","Set at baseline lock","Yes"],["Forecast date","Date","Current expectation","Yes"],["Actual date","Date","—","No"],["Slippage days","Calculated","Forecast minus baseline","Derived"],["Owner","User","—","Yes"]],
    rels: [["portfolio-item", "Rolls up to delivery health"],["control-gate-record", "Control-gate milestones pair with a gate record"],["dependency", "A breached dependency moves dependent milestones"]] },

  { id: "control-gate-record", name: "Control Gate Record", short: "Gate Record", type: "child", handle: "CGR", ns: "control-gate-record", wave: "3",
    blurb: "A gate instance with evidence. Passing requires artefacts, or a waiver with named residual risk and a second approver.",
    fields: [["Portfolio Item","Relation","Parent item","Yes"],["Gate criterion","Relation","Gate Criterion element","Yes"],["Status","Dropdown","Pending · Passed · Waived","Yes"],["Evidence","Attachment","Required to pass","Conditional"],["Waiver rationale","Long text","Required to waive","Conditional"],["Residual risk accepted","Long text","Required to waive","Conditional"],["Second approver","User","Required to waive","Conditional"]],
    rels: [["portfolio-item", "Blocks stage progression until resolved"],["gate-criterion", "Instance of a configured criterion"],["stage-gate-model", "Belongs to the model version in force"]] },

  { id: "portfolio-risk", name: "Portfolio Risk", short: "Risk", type: "child", handle: "RSK", ns: "portfolio-risk", wave: "3",
    blurb: "Risk register entries with severity, owner, mitigation, and escalation criteria.",
    fields: [["Portfolio Item","Relation","Parent item","Yes"],["Description","Long text","—","Yes"],["Severity","Dropdown","From severity reference","Yes"],["Owner","User","—","Yes"],["Mitigation","Long text","—","Yes"],["Target resolution","Date","—","Yes"],["Escalation forum","Text","Where it will be heard","No"],["Outcome","Long text","Recorded after the forum","No"]],
    rels: [["portfolio-item", "Feeds the exception view"],["value-band", "Severity and tolerance thresholds"]] },

  { id: "portfolio-issue", name: "Portfolio Issue", short: "Issue", type: "child", handle: "ISS", ns: "portfolio-issue", wave: "3",
    blurb: "Realized problems, separated from risks so ownership and resolution dates are unambiguous.",
    fields: [["Portfolio Item","Relation","Parent item","Yes"],["Description","Long text","—","Yes"],["Severity","Dropdown","From severity reference","Yes"],["Owner","User","—","Yes"],["Resolution plan","Long text","—","Yes"],["Target resolution","Date","—","Yes"]],
    rels: [["portfolio-item", "Feeds the exception view"]] },

  { id: "portfolio-change-request", name: "Portfolio Change Request", short: "Change Request", type: "child", handle: "CHG", ns: "portfolio-change-request", wave: "3",
    blurb: "Formal change control when scope, cost, schedule, or outcome moves beyond tolerance.",
    fields: [["Portfolio Item","Relation","Parent item","Yes"],["Change type","Dropdown","Scope · Cost · Schedule · Outcome","Yes"],["Requested change","Long text","—","Yes"],["Tolerance breached","Boolean","Against value band","Derived"],["Authority level","Text","From DoA threshold","Derived"],["Decision","Dropdown","Approve · Reject · Defer","Yes"],["Baseline impact","Long text","What the baseline becomes","Yes"]],
    rels: [["portfolio-item", "Amends the locked baseline"],["doa-threshold", "Change value selects the approval authority"],["value-band", "Tolerance definition"]] },

  { id: "governance-change-request", name: "Governance Change Request", short: "Gov Change", type: "child", handle: "GCR", ns: "governance-change-request", wave: "0–2",
    blurb: "Controlled edits to gates, scoring models, and thresholds, so configuration changes are reviewable rather than silent.",
    stages: ["Proposed", "Review", "Approved", "Published"],
    fields: [["Change target","Dropdown","Gate model · Scoring model · Threshold · Routing","Yes"],["Proposed change","Long text","—","Yes"],["Rationale","Long text","—","Yes"],["Approver","User","Governance authority","Yes"],["Published version","Text","Resulting element version","No"],["Status","Dropdown","Proposed · Approved · Rejected · Published","Yes"]],
    rels: [["stage-gate-model", "Publishes a new gate model version"],["scoring-model-version", "Publishes a new scoring version"],["doa-threshold", "Changes approval authority bands"]] },

  { id: "capacity-plan", scope: "optional", module: "capacity", name: "Capacity Plan", short: "Capacity Plan", type: "app", handle: "CAP", ns: "capacity-plan", wave: "4",
    blurb: "One record per team and planning period. Tests funding, general capacity, and scarce specialists together.",
    stages: ["Draft", "Constraint check", "Agreed", "Locked", "Archived"],
    statuses: { open: ["Draft", "Constraint check", "Agreed"], closed: ["Locked", "Superseded"] },
    fields: [["Team","Relation","Team & Squad element","Yes"],["Planning period","Text","Quarter or year","Yes"],["Supply rows","Child records","Role, skill, available FTE","Yes"],["Demand rows","Child records","From Portfolio Items, classified run/change/mandatory","Derived"],["Funding envelope rows","Child records","Year, amount, committed versus planned","Yes"],["Net position","Calculated","Supply minus demand","Derived"],["Over-committed","Calculated","Beyond available capacity","Derived"],["Binding constraint","Text","Which limit makes it undeliverable","Derived"]],
    rels: [["portfolio-item", "Demand generated from investment role and period needs"],["team-squad", "Capacity supply owner"],["role-skill", "Scarce specialist pools"],["workforce", "Employee and contractor roster"]] },

  { id: "outcome-record", scope: "optional", module: "outcomes", name: "Outcome Record", short: "Outcome", type: "child", handle: "OUT", ns: "outcome-record", wave: "5",
    blurb: "One named benefit with a baseline, target, and data source. Stays open after delivery closes.",
    stages: ["Defined", "Measuring", "Validating", "Closed"],
    statuses: { open: ["Defined", "Measuring", "Validating"], closed: ["Realized", "Partial", "Not realized", "Written off"] },
    fields: [["Portfolio Item","Relation","Parent item","Yes"],["Outcome type","Dropdown (dynamic)","Outcome Type element","Yes"],["Owner","User","Benefit owner","Yes"],["Measure","Text","What is counted","Yes"],["Measurement method","Text","How it is counted","Yes"],["Data source","Text","Named system","Yes"],["Baseline value / date","Decimal · Date","Captured before approval","Yes"],["Target profile","Child records","Value per period","Yes"],["Actuals","Child records or table","Per measurement period","Derived"],["Adoption measure","Decimal","Take-up of delivered capability","Yes"],["Validated by","User","Finance or assurance","Before Realized"]],
    rels: [["portfolio-item", "Created from the approved case outcome statements"],["outcome-type", "Business and technology outcome classes"],["telemetry", "Actuals and adoption from source systems"],["vendor-engagement", "Value attributed to vendor delivery"]] },

  { id: "dependency", scope: "optional", module: "dependencies", name: "Dependency", short: "Dependency", type: "app", handle: "DEP", ns: "dependency", wave: "6",
    blurb: "A two-sided commitment. Nothing is committed until the providing party accepts it.",
    stages: ["Proposed", "Accepted", "In progress", "At risk", "Closed"],
    statuses: { open: ["Proposed", "Accepted", "In progress", "At risk"], closed: ["Delivered", "Breached", "Cancelled", "Waived"] },
    fields: [["Receiving Portfolio Item","Relation","Who needs it","Yes"],["Providing party","Relation","Shared Function, team, or vendor engagement","Yes"],["Description","Long text","—","Yes"],["Need-by date","Date","Validated against lead time","Yes"],["Criticality","Dropdown","From criticality reference","Yes"],["Accepted by / at","User · Date-time","Provider acceptance","On accept"],["Lead time met","Calculated","Against published standard","Derived"],["Downstream impact","Long text","Affected milestones and gates","No"],["Escalation path","Relation","From Shared Function","Derived"]],
    rels: [["portfolio-item", "Inbound commitment; open ones block closure"],["shared-function", "Published owner, lead time, and escalation"],["milestone", "Breach moves dependent dates"],["vendor-engagement", "Vendor-provided dependencies resolve to an engagement"]] },

  { id: "vendor-engagement", scope: "optional", module: "vendors", name: "Vendor Engagement", short: "Vendor", type: "app", handle: "VEN", ns: "vendor-engagement", wave: "7",
    blurb: "Engagement performance on top of the vendor system of record. No local vendor master is created.",
    stages: ["Scoping", "Active", "Review", "Closing"],
    statuses: { open: ["Scoping", "Active", "Review"], closed: ["Completed", "Terminated"] },
    fields: [["Vendor reference","Table lookup","Vendor system of record","Yes"],["Contract reference","Table lookup","Vendor system of record","Yes"],["Engagement type","Dropdown","Systems integration · Managed service · Staff augmentation · Subscription","Yes"],["Internal owner","User","Accountable owner","Yes"],["Supported items","Relation","Portfolio Items and products","Yes"],["Commercial construct","Dropdown","Fixed price · Time and materials · Outcome-based","Yes"],["Committed / invoiced / forecast spend","Decimal","Against plan","Derived"],["Deliverables","Child records","Acceptance criteria and outcome","Yes"],["Performance score","Child records","Per review period","Yes"]],
    rels: [["portfolio-item", "Vendor work supporting funded items"],["vendor-sor", "Vendor, contract, risk, and SLA data consumed, not copied"],["finance-actuals", "Invoiced and committed spend"],["outcome-record", "Value realized through the vendor"]] },

  { id: "funding-scenario", scope: "optional", module: "scenarios", name: "Funding Scenario", short: "Scenario", type: "app", handle: "SCN", ns: "funding-scenario", wave: "2–4",
    blurb: "A candidate portfolio: which investments are in, which are out, and what that costs. Include/exclude only, not an optimizer.",
    fields: [["Name","Text","Scenario label","Yes"],["Planning period","Text","—","Yes"],["Scenario lines","Child records","One per candidate item","Yes"],["Total value / cost","Calculated","Rolled up from lines","Derived"],["Run / change / mandatory split","Calculated","From included items","Derived"],["Locked as baseline","Boolean","Becomes the approved portfolio","No"]],
    rels: [["scenario-line", "One line per candidate investment"],["portfolio-item", "Locking a scenario sets approved funding"],["capacity-plan", "Tested against funding and capacity limits"]] },

  { id: "scenario-line", scope: "optional", module: "scenarios", name: "Scenario Line", short: "Scenario Line", type: "child", handle: "SLN", ns: "scenario-line", wave: "2–4",
    blurb: "One investment inside a scenario, marked included or excluded with the reason.",
    fields: [["Funding Scenario","Relation","Parent scenario","Yes"],["Portfolio Item","Relation","Candidate investment","Yes"],["Included","Boolean","In or out of this scenario","Yes"],["Rationale","Long text","Why in or out","No"]],
    rels: [["funding-scenario", "Belongs to one scenario"],["portfolio-item", "References a candidate investment"]] },

  { id: "portfolio-hierarchy", name: "Portfolio Hierarchy", short: "Hierarchy", type: "element", handle: "PHR", ns: "portfolio-hierarchy", wave: "0",
    blurb: "Value stream, product, platform, and service nodes with effective dating, so reorganisation does not rewrite history.",
    fields: [["Name","Text","—","Yes"],["Parent","Relation (self)","Hierarchy position","No"],["Level","Dropdown","Value stream · Product · Platform · Service","Yes"],["Valid from / to","Date","Effective dating","Yes"],["Active","Boolean","—","Yes"]],
    rels: [["product-platform", "Products hang off hierarchy nodes"],["portfolio-item", "Roll-up and drill-down dimension"]] },

  { id: "product-platform", name: "Product & Platform Register", short: "Products", type: "element", handle: "PPR", ns: "product-platform", wave: "0",
    blurb: "The durable funding targets and their owners. This is what routing and roll-up depend on.",
    fields: [["Name","Text","—","Yes"],["Hierarchy node","Relation","Portfolio Hierarchy","Yes"],["Product owner","User","Routing target","Yes"],["Platform owner","User","—","No"],["Engineering lead","User","—","No"],["Accountable team","Relation","Team & Squad","No"],["Catalogue key","Text","Match to service catalogue","No"]],
    rels: [["demand-request", "Determines who receives new demand"],["portfolio-item", "Investment target and reporting dimension"],["portfolio-hierarchy", "Positioned in the hierarchy"]] },

  { id: "strategic-objective", name: "Strategic Objective", short: "Objectives", type: "element", handle: "OBJ", ns: "strategic-objective", wave: "0",
    blurb: "Enterprise and technology objectives with owners and measures, used for alignment and coverage reporting.",
    fields: [["Name","Text","—","Yes"],["Owner","User","—","Yes"],["Horizon","Text","Time frame","Yes"],["Measure","Text","How progress is judged","Yes"]],
    rels: [["demand-request", "Alignment captured at intake"],["portfolio-item", "Alignment with relative weighting"]] },

  { id: "demand-investment-type", name: "Demand & Investment Type", short: "Demand Types", type: "element", handle: "DTY", ns: "demand-investment-type", wave: "0",
    blurb: "New capability, enhancement, integration, infrastructure, compliance, security remediation, technical debt. Records, not hard-coded options.",
    fields: [["Name","Text","—","Yes"],["Class","Dropdown","Grouping for reporting","Yes"],["Default handling","Dropdown","Backlog · Investment","Yes"],["Active","Boolean","—","Yes"]],
    rels: [["demand-request", "Drives conditional intake fields"],["portfolio-item", "Selects gate and scoring models"],["stage-gate-model", "Gate model per investment type"]] },

  { id: "architecture-domain", name: "Architecture Domain", short: "Arch Domain", type: "element", handle: "ADM", ns: "architecture-domain", wave: "0",
    blurb: "Domains used to report investment concentration and coverage.",
    fields: [["Name","Text","—","Yes"],["Owner","User","Domain architect","Yes"]],
    rels: [["portfolio-item", "Concentration reporting dimension"]] },

  { id: "architecture-principle", name: "Architecture Principle & Standard", short: "Arch Principles", type: "element", handle: "APR", ns: "architecture-principle", wave: "0",
    blurb: "The principles and standards an investment is assessed against for conformance.",
    fields: [["Name","Text","—","Yes"],["Statement","Long text","—","Yes"],["Standard reference","Text","—","No"]],
    rels: [["portfolio-item", "Conformance assessment on the case"],["control-gate-record", "Evidence at architecture gates"]] },

  { id: "stage-gate-model", name: "Stage Gate Model", short: "Gate Model", type: "element", handle: "SGM", ns: "stage-gate-model", wave: "0",
    blurb: "A versioned gate model per investment type. In-flight items keep the version they entered under.",
    fields: [["Name","Text","—","Yes"],["Investment type","Relation","Demand & Investment Type","Yes"],["Version","Text","Published identifier","Yes"],["Effective from","Date","—","Yes"],["Status","Dropdown","Draft · Published · Retired","Yes"]],
    rels: [["gate-criterion", "Contains the gates and their artefacts"],["portfolio-item", "Recorded on the item at qualification"],["governance-change-request", "New versions published under change control"]] },

  { id: "gate-criterion", name: "Gate Criterion", short: "Gate Criteria", type: "element", handle: "GCRI", ns: "gate-criterion", wave: "0",
    blurb: "The individual control points: architecture review, security assessment, privacy review, production readiness.",
    fields: [["Name","Text","—","Yes"],["Gate model","Relation","Stage Gate Model","Yes"],["Gate key","Text","Control point identifier","Yes"],["Mandatory artefacts","Long text","Required to pass","Yes"],["Sequence","Number","Order within the model","Yes"]],
    rels: [["stage-gate-model", "Belongs to a model version"],["control-gate-record", "Instantiated per investment"]] },

  { id: "scoring-model-version", name: "Scoring Model Version", short: "Scoring Model", type: "element", handle: "SMV", ns: "scoring-model-version", wave: "0",
    blurb: "Published criteria and weights. The version is recorded with every score so history stays explainable.",
    fields: [["Name","Text","—","Yes"],["Version","Text","Published identifier","Yes"],["Published date","Date","—","Yes"],["Status","Dropdown","Draft · Published · Retired","Yes"],["Criterion weights (6)","Number","Value · fit · reuse · run cost · risk · debt","Yes"]],
    rels: [["portfolio-item", "Produces the composite score"],["assessor-score", "Criteria for independent assessors"],["governance-change-request", "New versions published under change control"]] },

  { id: "doa-threshold", name: "DoA Threshold", short: "DoA", type: "element", handle: "DOA", ns: "doa-threshold", wave: "0",
    blurb: "Delegation of authority: value and type decide who must approve. Authority labels are your records, not product code.",
    fields: [["Name","Text","—","Yes"],["Investment type","Relation","Demand & Investment Type","No"],["Min value / Max value","Decimal","Value band","Yes"],["Authority level","Text or relation","Approving authority","Yes"],["Active","Boolean","—","Yes"]],
    rels: [["portfolio-item", "Selects the board or approver at submission"],["portfolio-change-request", "Authority for baseline changes"],["value-band", "Shared value banding"]] },

  { id: "team-squad", name: "Team & Squad", short: "Teams", type: "element", handle: "TMS", ns: "team-squad", wave: "0",
    blurb: "Delivery teams, platform teams, and shared-function teams that own capacity.",
    fields: [["Name","Text","—","Yes"],["Type","Dropdown","Product · Platform · Shared function","Yes"],["Portfolio node","Relation","Portfolio Hierarchy","No"],["Owner","User","—","Yes"]],
    rels: [["capacity-plan", "One plan per team and period"],["product-platform", "Accountable team for a product"]] },

  { id: "role-skill", scope: "optional", module: "capacity", name: "Role & Skill", short: "Roles & Skills", type: "element", handle: "RSKIL", ns: "role-skill", wave: "0",
    blurb: "Roles and skills, flagging the scarce specialists that are usually the real constraint.",
    fields: [["Name","Text","—","Yes"],["Category","Text","Engineering, architecture, security, data","Yes"],["Scarce specialist","Boolean","Constraint pool","Yes"]],
    rels: [["capacity-plan", "Supply and demand are expressed by role and skill"]] },

  { id: "shared-function", scope: "optional", module: "dependencies", name: "Shared Function", short: "Shared Functions", type: "element", handle: "SHF", ns: "shared-function", wave: "0",
    blurb: "Architecture, security, cloud platform, identity, data, integration, network — with published lead times.",
    fields: [["Name","Text","—","Yes"],["Owner","User","Accountable owner","Yes"],["Standard lead time (days)","Number","Published expectation","Yes"],["Capacity units","Number","Declared capacity","No"],["Escalation path","Text","By criticality","Yes"]],
    rels: [["dependency", "Validates need-by dates and routes requests"]] },

  { id: "outcome-type", scope: "optional", module: "outcomes", name: "Outcome Type", short: "Outcome Types", type: "element", handle: "OTP", ns: "outcome-type", wave: "0",
    blurb: "Business and technology outcome classes: run cost, unit cost, incident reduction, cycle time, adoption.",
    fields: [["Name","Text","—","Yes"],["Class","Dropdown","Business · Technology","Yes"],["Default measurement method","Text","—","No"]],
    rels: [["outcome-record", "Classifies each benefit"]] },

  { id: "value-band", name: "Value Band & Risk Tier", short: "Value Bands", type: "element", handle: "VBD", ns: "value-band", wave: "0",
    blurb: "Shared thresholds reused across the suite: value bands, risk tiers, and variance tolerances.",
    fields: [["Name","Text","—","Yes"],["Lower bound / Upper bound","Decimal","Band range","Yes"],["Risk tier","Text","—","No"],["Variance tolerance","Decimal","Change-control trigger","No"]],
    rels: [["doa-threshold", "Value banding for authority"],["portfolio-change-request", "Tolerance breach definition"],["portfolio-risk", "Severity tiering"]] },

  { id: "work-management", name: "Work management", short: "Work Items", type: "table", handle: "—", ns: "table port", wave: "1 / 3",
    blurb: "Engineering work items, releases, and deployments. Read for duplicate screening and delivery progress so teams never re-enter status.",
    fields: [["External system","Text","Which tool produced it","Yes"],["External work item ID","Text","Stable external key","Yes"],["Title","Text","—","Yes"],["Status","Text","Source status","Yes"],["Portfolio ID","Text","Mapping back to the funded item","Yes"],["Team","Text","Delivering team","No"]],
    rels: [["demand-request", "Backlog overlap and duplicate candidates"],["portfolio-item", "Progress and delivered scope"]] },

  { id: "finance-actuals", name: "Finance actuals", short: "Finance", type: "table", handle: "—", ns: "table port", wave: "3",
    blurb: "Actual, committed, and forecast cost from the finance and procurement systems rather than manual entry.",
    fields: [["Portfolio ID","Text","Mapping key","Yes"],["Period","Text","Accounting period","Yes"],["Actual / Commitment / Forecast","Decimal","Cost position","Yes"],["Cost centre","Text","—","No"]],
    rels: [["portfolio-item", "Burn rate and forecast variance"],["cost-line", "Plan versus actual comparison"],["vendor-engagement", "Invoiced and committed spend"]] },

  { id: "cloud-consumption", name: "Cloud consumption", short: "Cloud Cost", type: "table", handle: "—", ns: "table port", wave: "3",
    blurb: "Cloud and infrastructure consumption cost attributed to the products and investments that generate it.",
    fields: [["Product or Portfolio ID","Text","Mapping key","Yes"],["Period","Text","—","Yes"],["Consumption cost","Decimal","—","Yes"],["Service","Text","Cloud service","No"]],
    rels: [["portfolio-item", "Run cost visible during delivery"],["outcome-record", "Run cost reduction outcomes"]] },

  { id: "workforce", name: "Workforce & directory", short: "Workforce", type: "table", handle: "—", ns: "table port", wave: "0 / 4",
    blurb: "People, employment status, and team from identity and HR. Used to flag stale owners and to build capacity supply.",
    fields: [["Person key","Text","Directory identifier","Yes"],["Status","Text","Active or leaver","Yes"],["Team","Text","—","No"],["Role","Text","—","No"],["Effective dates","Date","—","No"]],
    rels: [["capacity-plan", "Employee and contractor supply"],["product-platform", "Detects owners who have left or changed role"]] },

  { id: "telemetry", scope: "optional", module: "outcomes", name: "Telemetry & adoption", short: "Telemetry", type: "table", handle: "—", ns: "table port", wave: "5",
    blurb: "Product telemetry and adoption measures, so benefit claims are evidenced rather than asserted.",
    fields: [["Outcome key","Text","Mapping key","Yes"],["Period","Text","—","Yes"],["Actual value","Decimal","—","Yes"],["Source timestamp","Date-time","Freshness","Yes"]],
    rels: [["outcome-record", "Actuals and adoption without manual entry"]] },

  { id: "vendor-sor", scope: "optional", module: "vendors", name: "Vendor system of record", short: "Vendor SoR", type: "table", handle: "—", ns: "table port", wave: "7",
    blurb: "Vendor master, contract, risk position, SLA breaches, and the savings ledger from the sourcing and third-party risk solution.",
    fields: [["Vendor","Text","Vendor identity","Yes"],["Contract","Text","Governing contract","Yes"],["Risk position","Text","Current risk rating","Yes"],["SLA breach","Text","Service level record","No"],["Savings ledger entry","Decimal","Claimed sourcing savings","No"]],
    rels: [["vendor-engagement", "Consumed, never duplicated locally"],["outcome-record", "Savings reconciled to avoid double counting"]] },
];

/* Curated relationship map. Only load-bearing edges are drawn; each tile lists
   its full relationship set. */
const MAP_NODES = [
  { id: "demand-investment-type", x: 120, y: 78 },
  { id: "product-platform", x: 330, y: 78 },
  { id: "strategic-objective", x: 540, y: 78 },
  { id: "scoring-model-version", x: 750, y: 78 },
  { id: "stage-gate-model", x: 950, y: 78 },
  { id: "doa-threshold", x: 1140, y: 78 },

  { id: "clarification-request", x: 90, y: 248 },
  { id: "demand-request", x: 350, y: 248, hub: true },
  { id: "portfolio-item", x: 800, y: 248, hub: true },
  { id: "optional-modules", x: 1105, y: 248, label: "Optional modules", cls: "t-optional", target: "optional" },

  { id: "cost-line", x: 120, y: 402 },
  { id: "decision-condition", x: 310, y: 402 },
  { id: "milestone", x: 500, y: 402 },
  { id: "control-gate-record", x: 690, y: 402 },
  { id: "portfolio-risk", x: 880, y: 402 },
  { id: "portfolio-change-request", x: 1080, y: 402 },

  { id: "work-management", x: 280, y: 522 },
  { id: "finance-actuals", x: 600, y: 522 },
  { id: "cloud-consumption", x: 900, y: 522 },
];

const MAP_EDGES = [
  ["demand-investment-type", "demand-request", "type"],
  ["product-platform", "demand-request", "routing"],
  ["strategic-objective", "demand-request", "alignment"],
  ["product-platform", "portfolio-item", "roll-up"],
  ["scoring-model-version", "portfolio-item", "score"],
  ["stage-gate-model", "portfolio-item", "gates"],
  ["doa-threshold", "portfolio-item", "authority"],

  ["demand-request", "clarification-request", ""],
  ["demand-request", "portfolio-item", "mints Portfolio ID"],

  ["portfolio-item", "cost-line", ""],
  ["portfolio-item", "decision-condition", ""],
  ["portfolio-item", "milestone", ""],
  ["portfolio-item", "control-gate-record", ""],
  ["portfolio-item", "portfolio-risk", ""],
  ["portfolio-item", "portfolio-change-request", ""],

  ["portfolio-item", "optional-modules", "if selected"],

  ["work-management", "demand-request", "duplicates"],
  ["work-management", "portfolio-item", "progress"],
  ["finance-actuals", "portfolio-item", "cost"],
  ["cloud-consumption", "portfolio-item", "run cost"],
];

/* Flow walkthroughs. Every core component must appear in at least one step —
   the coverage table under the flows is generated from this data. */
const FLOWS = [
  {
    tag: "A",
    id: "funded",
    name: "A business request that becomes a funded investment",
    lede: "The long path, start to finish. Most components appear here at least once.",
    starts: "A business unit wants a capability that does not exist yet",
    ends: "Delivery closes against a locked baseline",
    steps: [
      {
        actor: "Governance admin · day 0",
        title: "Describe the estate",
        what: "Before a single request is raised, the organization exists as records: the structure, the funding targets and their owners, the teams, what the organization is trying to achieve, and the kinds of request it accepts.",
        uses: [
          ["portfolio-hierarchy", "value stream, product, platform, service tree"],
          ["product-platform", "the durable funding targets and their owners"],
          ["team-squad", "who actually delivers"],
          ["strategic-objective", "what the organization is trying to achieve"],
          ["demand-investment-type", "the request types accepted"],
          ["workforce", "directory feed that keeps owners current"],
        ],
      },
      {
        actor: "Requester",
        title: "Raise the request",
        what: "One front door. The form changes by demand type so a requester is not asked for infrastructure detail on a reporting request. Drafts can be saved and resumed.",
        uses: [
          ["demand-request", "record created in Draft"],
          ["demand-investment-type", "decides which fields appear"],
          ["product-platform", "the affected product"],
          ["strategic-objective", "alignment captured at intake"],
        ],
      },
      {
        actor: "Automation",
        title: "Validate and route on submit",
        what: "Submit enforces the mandatory set, then the affected product decides the accountable owner. Nobody routes by memory or by asking in a channel.",
        uses: [
          ["demand-request", "status becomes Submitted, owner assigned"],
          ["product-platform", "owner lookup drives the assignment"],
        ],
      },
      {
        actor: "Triage owner",
        title: "Screen for duplicates and overlap",
        what: "Check open demand, in-flight investments, and the engineering backlog before anything is accepted. Missing information becomes a tracked question, not an email thread.",
        uses: [
          ["work-management", "existing backlog and in-flight work"],
          ["demand-request", "related demand link for merges and duplicates"],
          ["clarification-request", "a question with a response target date"],
        ],
      },
      {
        actor: "Triage owner",
        title: "Dispose",
        what: "Every request leaves triage with a recorded outcome and reason. Most are routed to an existing product backlog — that is a legitimate result, and the requester is told.",
        uses: [
          ["demand-request", "disposition, reason, and notification"],
          ["work-management", "where backlog-routed demand actually goes"],
        ],
      },
      {
        actor: "Automation",
        title: "Accept as investment",
        what: "Acceptance mints the identifier and creates the investment record with the case context already in it. Nothing is retyped, and the two records stay linked.",
        uses: [
          ["portfolio-item", "created, Portfolio ID minted"],
          ["demand-request", "linked, with the Portfolio ID written back"],
          ["portfolio-hierarchy", "the roll-up node it reports into"],
          ["team-squad", "the accountable team"],
        ],
      },
      {
        actor: "Product owner",
        title: "Build the case",
        what: "A structured case, not an attached spreadsheet: options including do-nothing, cost by year and type, named outcomes, and an honest architecture position.",
        uses: [
          ["portfolio-item", "options, outcomes, benefit owner"],
          ["cost-line", "cost by fiscal year and cost type, rolled into TCO"],
          ["architecture-domain", "where the investment lands"],
          ["architecture-principle", "conformance, and any exception being requested"],
        ],
      },
      {
        actor: "Assessors",
        title: "Score against the published model",
        what: "Scoring uses the model version in force, and the version is stamped on the record — so a score from two quarters ago is still explainable.",
        uses: [
          ["scoring-model-version", "criteria and weights in force"],
          ["assessor-score", "independent scores, with variance visible"],
          ["portfolio-item", "composite score and rank"],
        ],
      },
      {
        actor: "Investment board",
        title: "Decide",
        what: "Value and type select who is allowed to approve. Conditions of approval are recorded with an owner and a due date instead of living in minutes.",
        uses: [
          ["doa-threshold", "who may approve at this value and type"],
          ["value-band", "the bands behind that decision"],
          ["portfolio-item", "decision, rationale, attendees, date"],
          ["decision-condition", "each condition, owned and dated"],
        ],
      },
      {
        actor: "Finance partner · PMO",
        title: "Lock the baseline",
        what: "Approved funding and baseline dates are locked. This is what makes every later variance number mean something.",
        uses: [
          ["portfolio-item", "approved funding copied, baseline stamped"],
          ["milestone", "baseline dates set against forecast"],
          ["stage-gate-model", "the gate model version it entered under"],
          ["gate-criterion", "the control points it must clear"],
        ],
      },
      {
        actor: "Delivery team",
        title: "Execute and report",
        what: "Health on a cadence with mandatory commentary, gates that need real evidence, and cost read from the finance and cloud systems rather than retyped.",
        uses: [
          ["portfolio-item", "RAG, narrative, recovery action"],
          ["milestone", "forecast against baseline, slippage detected"],
          ["control-gate-record", "evidence to pass; a waiver needs residual risk and a second approver"],
          ["portfolio-risk", "risk register with owner and mitigation"],
          ["portfolio-issue", "realized problems and their resolution plan"],
          ["work-management", "delivery progress without re-entry"],
          ["finance-actuals", "actual and committed cost"],
          ["cloud-consumption", "run cost accruing during delivery"],
        ],
      },
      {
        actor: "PMO",
        title: "Handle change beyond tolerance",
        what: "Scope, cost, schedule, or outcome moving past the agreed tolerance is formal change control against the locked baseline, approved at the right level.",
        uses: [
          ["portfolio-change-request", "the requested change and its baseline impact"],
          ["value-band", "the tolerance that was breached"],
          ["doa-threshold", "authority for a change of this size"],
          ["milestone", "re-baselined dates once approved"],
        ],
      },
      {
        actor: "PMO",
        title: "Close",
        what: "Closure requires the conditions closed and the final gate resolved, so nothing quietly ends with open commitments.",
        uses: [
          ["portfolio-item", "closure and closure evidence"],
          ["decision-condition", "all conditions closed"],
          ["control-gate-record", "final gate resolved or waived"],
        ],
      },
    ],
  },
  {
    tag: "B",
    id: "backlog",
    name: "A request that ends at a team backlog",
    lede: "The common case — and the one that fails today, because a request that is not an investment currently just goes quiet.",
    starts: "Someone asks for a change to an existing product",
    ends: "It is on the owning team's backlog and the requester knows",
    steps: [
      {
        actor: "Requester",
        title: "Raise it in the same place",
        what: "There is no separate small-change channel. The type marks it as an enhancement, which is what makes the short path possible.",
        uses: [
          ["demand-request", "same front door, same record"],
          ["demand-investment-type", "default handling is backlog, not investment"],
        ],
      },
      {
        actor: "Product owner",
        title: "Recognize it as existing work",
        what: "The backlog already contains the same ask, or it fits inside funded work in flight. That is visible in one screen instead of a conversation.",
        uses: [
          ["product-platform", "routed to the owning product"],
          ["work-management", "the matching backlog item"],
        ],
      },
      {
        actor: "Product owner",
        title: "Dispose to backlog and tell the requester",
        what: "Recorded disposition with a reason and a link to the work item. The request is closed here; it never becomes a portfolio item.",
        uses: [
          ["demand-request", "routed to backlog, requester notified"],
          ["work-management", "the work item it was merged into"],
        ],
      },
    ],
  },
  {
    tag: "C",
    id: "mandatory",
    name: "Mandatory security remediation",
    lede: "Shows how the same machinery behaves differently when the type is different — mandatory work still competes for capacity, but it is not optional.",
    starts: "A security finding requires remediation",
    ends: "Remediation is funded and gated like any other investment",
    steps: [
      {
        actor: "Security reviewer",
        title: "Raise it as mandatory work",
        what: "The demand type is security remediation and the work type is mandatory, so it appears in the ranked list rather than bypassing it.",
        uses: [
          ["demand-request", "raised with work type Mandatory"],
          ["demand-investment-type", "type defaults it to investment handling"],
        ],
      },
      {
        actor: "Architect",
        title: "Assess against standards",
        what: "The remediation is assessed against the principles it restores, and any deviation left in place is stated rather than implied.",
        uses: [
          ["architecture-principle", "the standard being restored"],
          ["portfolio-item", "exception recorded when a deviation remains"],
        ],
      },
      {
        actor: "Governance",
        title: "Apply the gate model for this type",
        what: "Security remediation carries its own gate model, so the control points differ from an enhancement even though the process is the same.",
        uses: [
          ["stage-gate-model", "model version selected by investment type"],
          ["gate-criterion", "security assessment and production readiness"],
        ],
      },
      {
        actor: "Security reviewer",
        title: "Pass or waive the gate honestly",
        what: "Evidence passes the gate. A waiver is allowed, but it costs a named residual risk and a second approver — which is the point.",
        uses: [
          ["control-gate-record", "evidence, or waiver with residual risk"],
        ],
      },
    ],
  },
  {
    tag: "D",
    id: "governance",
    name: "Governance changes its own rules",
    lede: "Gates, weights, and approval authority change over time. The change itself is reviewable, and in-flight investments are not re-judged retroactively.",
    starts: "The board wants to reweight scoring for next year",
    ends: "A new published version applies to new work only",
    steps: [
      {
        actor: "Governance admin",
        title: "Propose the change",
        what: "The proposed change, its rationale, and its approver are a record — not a quiet edit to a configuration screen.",
        uses: [["governance-change-request", "proposal, rationale, approver"]],
      },
      {
        actor: "Governance authority",
        title: "Approve and publish a new version",
        what: "Publishing creates a new version of the model rather than editing the one investments were judged under.",
        uses: [
          ["scoring-model-version", "new version published"],
          ["stage-gate-model", "or a new gate model version"],
          ["doa-threshold", "or changed approval authority bands"],
        ],
      },
      {
        actor: "Everyone",
        title: "In-flight work keeps its version",
        what: "Each investment records the versions it entered under, so history stays explainable and nobody re-argues an approved case.",
        uses: [["portfolio-item", "recorded scoring and gate model versions"]],
      },
    ],
  },
  {
    tag: "E",
    id: "estate",
    name: "Keeping the estate honest",
    lede: "Running quietly underneath everything: ownership and structure change, and stale configuration is what silently breaks routing.",
    starts: "A product owner leaves, or the organization reorganizes",
    ends: "Routing and roll-up still point at real people and real nodes",
    steps: [
      {
        actor: "Directory feed",
        title: "Detect the stale owner",
        what: "Leavers and role changes arrive from identity and HR, so an unowned product surfaces instead of quietly misrouting new demand.",
        uses: [
          ["workforce", "employment status and team from the source system"],
          ["product-platform", "owner reassigned before demand misroutes"],
        ],
      },
      {
        actor: "Portfolio lead",
        title: "Reorganize without rewriting history",
        what: "Hierarchy nodes are effective-dated and teams change, so last year's reporting still reflects how the organization looked last year.",
        uses: [
          ["portfolio-hierarchy", "effective-dated nodes"],
          ["team-squad", "new accountable team"],
        ],
      },
    ],
  },
];

/* What the client has to supply. Rows referencing an entity render a link. */
const CLIENT_CONFIG = [
  {
    id: "cfg-records",
    name: "Configuration records you seed",
    lede: "We build the schemas; these records are yours. A governance admin maintains them after deployment — changing them is editing data, not a redeploy.",
    columns: ["Element", "What you decide", "Typical owner", "Needed before"],
    rows: [
      ["portfolio-hierarchy", "Your value stream, product, platform, and service tree, and when each node became valid", "Portfolio lead", "Anything is used"],
      ["product-platform", "The funding targets, and the named product, platform, and engineering owner of each", "Portfolio lead", "Demand routing works"],
      ["strategic-objective", "The objectives investments are aligned to, their owners and measures", "Strategy / CIO office", "Intake goes live"],
      ["demand-investment-type", "Which request types you accept, and whether each defaults to backlog or investment", "Governance lead", "Intake goes live"],
      ["architecture-domain", "The domains you report investment concentration across", "Chief architect", "Case capture"],
      ["architecture-principle", "The principles and standards a case is assessed against", "Chief architect", "Case capture"],
      ["stage-gate-model", "Which gates apply to which investment type, and the version in force", "Governance lead", "First baseline lock"],
      ["gate-criterion", "The individual control points and the artefacts each demands to pass", "Architecture &amp; security", "First baseline lock"],
      ["scoring-model-version", "The six criterion weights, and what a published version means", "Investment board", "First scoring round"],
      ["doa-threshold", "The value bands and the authority label that approves each one", "CFO / finance partner", "First board decision"],
      ["team-squad", "Delivery, platform, and shared-function teams and their owners", "Delivery lead", "Roll-up reporting"],
      ["value-band", "Shared thresholds: value bands, risk tiers, variance tolerance", "Finance partner", "Change control"],
    ],
  },
  {
    id: "cfg-people",
    name: "People, groups, and approvers",
    lede: "Group names are the product's role model; membership is entirely yours. Approver identity is a record, so changing who approves is a data edit.",
    columns: ["Group", "Who you put in it", "What it unlocks"],
    rows: [
      [null, "Requesters", "Anyone who may raise demand", "Raise and track their own requests; no portfolio financials"],
      [null, "Product &amp; Platform Owners", "The named owners on your product register", "Receive routed demand, own triage and disposition"],
      [null, "Engineering Leads", "Delivery leads per team", "Delivery status, milestones, and progress"],
      [null, "Architects", "Domain and chief architects", "Architecture gates, exceptions, conformance"],
      [null, "Security Reviewers", "Security assessment owners", "Security gates and waiver approvals"],
      [null, "Finance Partners", "Finance business partners", "Cost lines, approved funding, actuals and variance"],
      [null, "Benefit Owners", "The accountable business owners", "Outcome ownership after delivery"],
      [null, "Investment Board", "Whoever actually decides", "Record decisions, conditions, and rationale"],
      [null, "Governance Admins", "The small group that owns the model", "Edit configuration elements and publish versions"],
    ],
    note: "How approver identity resolves: a <strong>DoA Threshold</strong> record matches the value and type, names an authority level, and that level maps to a group or person you nominate. Nothing about who approves is hard-coded.",
  },
  {
    id: "cfg-datasets",
    name: "Datasets we need from you",
    lede: "Each is a read-only feed behind a CloudLink. The join key is the part that usually needs a decision on your side — without it the data cannot be attributed.",
    columns: ["Dataset", "Likely source", "Minimum fields", "Join key you must provide", "Refresh"],
    rows: [
      ["work-management", "Jira, Azure DevOps, or one agreed system", "Work item ID, title, status, team", "Portfolio ID present on the work item", "Daily"],
      ["finance-actuals", "ERP / procurement", "Period, actual, commitment, forecast, cost centre", "Portfolio ID on the cost record", "Monthly close"],
      ["cloud-consumption", "Cloud billing export", "Period, service, consumption cost", "Tag carrying product or Portfolio ID", "Monthly"],
      ["workforce", "Identity provider / HR", "Person key, employment status, team, role, dates", "Person key that matches platform users", "Daily"],
      ["telemetry", "Product analytics", "Period, actual value, source timestamp", "Outcome key agreed per measure", "Per measurement period"],
      ["vendor-sor", "Sourcing &amp; third-party risk", "Vendor, contract, risk position, SLA breach, savings", "Vendor and contract reference", "Monthly"],
    ],
  },
  {
    id: "cfg-rules",
    name: "Rules and thresholds you set",
    lede: "Numbers and policy choices we cannot pick for you. Each one changes behavior the day it is set.",
    columns: ["Setting", "What you decide", "Where it bites"],
    rows: [
      [null, "Reporting cadence", "How many days between required status updates", "Overdue flag and the exceptions view"],
      [null, "Variance tolerance", "The movement in cost, schedule, or scope that forces change control", "When a Portfolio Change Request becomes mandatory"],
      [null, "Authority labels", "What your levels are called and which group holds each", "Who the board step routes to"],
      [null, "Scoring weights", "Relative weight of value, fit, reuse, run cost, risk, and debt", "The ranked candidate list"],
      [null, "Waiver policy", "Whether every gate waiver needs a second approver", "Gate evidence enforcement"],
      [null, "Clarification target", "Days a requester has to answer before triage escalates", "Clarification Request service level"],
      [null, "Fiscal year and currency", "Planning year start and reporting currency", "Cost lines and finance comparison"],
      [null, "Duplicate screening scope", "Which backlogs and systems are searched at triage", "Triage duplicate detection quality"],
    ],
  },
];

const byId = new Map(ENTITIES.map((e) => [e.id, e]));
const NODE_W = 150;
const NODE_H = 40;

function svgEl(name, attrs = {}) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
}

function renderMap(container) {
  const svg = svgEl("svg", {
    viewBox: "0 0 1260 580",
    class: "map-svg",
    role: "img",
    "aria-label": "Relationship map of ITPG apps, elements, and table ports",
  });

  const edgeLayer = svgEl("g", { class: "map-edges" });
  const nodeLayer = svgEl("g", { class: "map-nodes" });
  const positions = new Map(MAP_NODES.map((n) => [n.id, n]));

  for (const [from, to, label] of MAP_EDGES) {
    const a = positions.get(from);
    const b = positions.get(to);
    if (!a || !b) continue;
    const sameRow = Math.abs(a.y - b.y) < 12;
    const x1 = a.x;
    const y1 = sameRow ? a.y : a.y + (b.y > a.y ? NODE_H / 2 : -NODE_H / 2);
    const x2 = b.x;
    const y2 = sameRow ? b.y : b.y + (b.y > a.y ? -NODE_H / 2 : NODE_H / 2);
    const path = sameRow
      ? `M ${x1 + NODE_W / 2} ${y1} L ${x2 - NODE_W / 2} ${y2}`
      : `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
    edgeLayer.appendChild(
      svgEl("path", { d: path, class: "edge", "data-from": from, "data-to": to }),
    );
    if (label) {
      const text = svgEl("text", {
        x: (x1 + x2) / 2,
        y: (y1 + y2) / 2 - 4,
        class: "edge-label",
        "text-anchor": "middle",
      });
      text.textContent = label;
      edgeLayer.appendChild(text);
    }
  }

  for (const node of MAP_NODES) {
    const entity = byId.get(node.id);
    const cls = entity ? TYPES[entity.type].cls : node.cls;
    const group = svgEl("a", {
      class: `map-node ${cls}${node.hub ? " is-hub" : ""}`,
      href: entity ? `#entity-${node.id}` : `#${node.target}`,
      "data-id": node.id,
      "data-target": node.target || "",
      tabindex: "0",
    });
    group.appendChild(
      svgEl("rect", {
        x: node.x - NODE_W / 2,
        y: node.y - NODE_H / 2,
        width: NODE_W,
        height: NODE_H,
        rx: node.hub ? 10 : 8,
      }),
    );
    const label = svgEl("text", { x: node.x, y: node.y + 4, "text-anchor": "middle" });
    label.textContent = entity ? entity.short : node.label;
    group.appendChild(label);
    const title = svgEl("title");
    title.textContent = entity
      ? `${entity.name} — ${TYPES[entity.type].label}`
      : "Optional modules — selected per organization";
    group.appendChild(title);
    nodeLayer.appendChild(group);
  }

  svg.append(edgeLayer, nodeLayer);
  container.appendChild(svg);

  const setActive = (id) => {
    svg.querySelectorAll(".edge").forEach((edge) => {
      const on = id && (edge.dataset.from === id || edge.dataset.to === id);
      edge.classList.toggle("is-active", Boolean(on));
    });
    svg.querySelectorAll(".map-node").forEach((n) => {
      n.classList.toggle("is-dim", Boolean(id) && n.dataset.id !== id && !isNeighbour(id, n.dataset.id));
    });
  };
  const isNeighbour = (id, other) =>
    MAP_EDGES.some(([f, t]) => (f === id && t === other) || (t === id && f === other));

  svg.querySelectorAll(".map-node").forEach((node) => {
    node.addEventListener("mouseenter", () => setActive(node.dataset.id));
    node.addEventListener("focus", () => setActive(node.dataset.id));
    node.addEventListener("mouseleave", () => setActive(null));
    node.addEventListener("blur", () => setActive(null));
    node.addEventListener("click", (event) => {
      event.preventDefault();
      const target = node.dataset.target;
      if (target) {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      openEntity(node.dataset.id);
    });
  });
}

function fieldTable(entity) {
  if (!entity.fields) return "";
  const rows = entity.fields
    .map(
      ([name, type, source, required]) =>
        `<tr><td><strong>${name}</strong></td><td>${type}</td><td>${source}</td><td>${required}</td></tr>`,
    )
    .join("");
  return `<h5>Fields</h5><div class="table-wrap"><table><thead><tr><th>Field</th><th>Type</th><th>Source / options</th><th>Required</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function simpleTable(title, headers, rows) {
  if (!rows || !rows.length) return "";
  const head = headers.map((h) => `<th>${h}</th>`).join("");
  const body = rows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("");
  return `<h5>${title}</h5><div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function relList(entity) {
  if (!entity.rels || !entity.rels.length) return "";
  const items = entity.rels
    .map(([target, note]) => {
      const other = byId.get(target);
      if (!other) return "";
      return `<li><a class="rel" href="#entity-${target}" data-jump="${target}"><span class="dot ${TYPES[other.type].cls}"></span>${other.name}</a><span class="rel-note">${note}</span></li>`;
    })
    .join("");
  return `<h5>Relationships</h5><ul class="rel-list">${items}</ul>`;
}

function stageRow(entity) {
  if (!entity.stages) return "";
  const nodes = entity.stages
    .map((s, i) => `<div class="flow-node${i === 0 ? " active" : ""}"><strong>${s}</strong></div>`)
    .join("");
  return `<h5>Stages</h5><div class="flow flow-tight">${nodes}</div>`;
}

function statusRow(entity) {
  if (!entity.statuses) return "";
  const open = (entity.statuses.open || []).map((s) => `<span class="pill open">${s}</span>`).join("");
  const closed = (entity.statuses.closed || []).map((s) => `<span class="pill closed">${s}</span>`).join("");
  return `<h5>Status options</h5><p>${open}${closed}</p>`;
}

function tile(entity) {
  const t = TYPES[entity.type];
  const ids = entity.handle === "—" ? entity.ns : `${entity.handle} · ${entity.ns}`;
  return `
    <details class="tile ${t.cls}" id="entity-${entity.id}" data-type="${entity.type}">
      <summary>
        <span class="tile-type">${t.label}</span>
        <span class="tile-title">${entity.name}</span>
        <span class="tile-blurb">${entity.blurb}</span>
        <span class="tile-meta"><span class="mono">${ids}</span> · wave ${entity.wave}<span class="tile-more">Details</span></span>
      </summary>
      <div class="tile-detail">
        ${stageRow(entity)}
        ${statusRow(entity)}
        ${fieldTable(entity)}
        ${simpleTable("List views", ["View", "Filter", "Audience"], entity.views)}
        ${simpleTable("Stage layouts", ["Stage", "Job on the page", "Notes"], entity.layouts)}
        ${relList(entity)}
      </div>
    </details>`;
}

function chipRef(id, note) {
  const entity = byId.get(id);
  if (!entity) return "";
  return `<a class="chip-ref ${TYPES[entity.type].cls}" href="#entity-${id}" data-jump="${id}"><span class="chip-name">${entity.name}</span><span class="chip-note">${note}</span></a>`;
}

function stepDots(step) {
  return step.uses
    .map(([id]) => {
      const entity = byId.get(id);
      return entity ? `<i class="dot ${TYPES[entity.type].cls}"></i>` : "";
    })
    .join("");
}

function flowBlock(flow) {
  const cards = flow.steps
    .map(
      (step, i) => `
      <button class="snake-card" type="button" data-flow="${flow.id}" data-step="${i}">
        <span class="snake-top"><span class="snake-n">${i + 1}</span><span class="step-actor">${step.actor}</span></span>
        <span class="snake-title">${step.title}</span>
        <span class="snake-foot"><span class="dots">${stepDots(step)}</span><span class="snake-count">${step.uses.length} component${step.uses.length === 1 ? "" : "s"}</span></span>
      </button>`,
    )
    .join("");
  return `
    <article class="journey" id="flow-${flow.id}">
      <header>
        <span class="tile-type">Scenario ${flow.tag}</span>
        <h3>${flow.name}</h3>
        <p>${flow.lede}</p>
        <p class="journey-meta"><span><b>Starts</b> ${flow.starts}</span><span><b>Ends</b> ${flow.ends}</span></p>
      </header>
      <div class="snake" data-flow="${flow.id}">${cards}</div>
    </article>`;
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
  const flow = FLOWS.find((f) => f.id === flowId);
  const modal = document.getElementById("step-modal");
  if (!flow || !modal || !flow.steps[index]) return;
  const step = flow.steps[index];
  activeStep = { flowId, index };

  modal.querySelector(".modal-eyebrow").textContent = `Scenario ${flow.tag} · step ${index + 1} of ${flow.steps.length}`;
  modal.querySelector(".modal-flow").textContent = flow.name;
  modal.querySelector(".modal-actor").textContent = step.actor;
  modal.querySelector(".modal-title").textContent = step.title;
  modal.querySelector(".modal-body").innerHTML = `
    <p class="modal-what">${step.what}</p>
    <h5>Components involved</h5>
    <div class="chips">${step.uses.map(([id, note]) => chipRef(id, note)).join("")}</div>`;
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
    if (event.target === modal) { closeStep(); return; }
    const nav = event.target.closest("[data-nav]");
    if (nav) { stepBy(nav.dataset.nav === "next" ? 1 : -1); return; }
    if (event.target.closest(".modal-close")) { closeStep(); return; }
    const jump = event.target.closest("[data-jump]");
    if (jump) {
      event.preventDefault();
      closeStep();
      openEntity(jump.dataset.jump);
    }
  });
  modal.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") stepBy(1);
    if (event.key === "ArrowLeft") stepBy(-1);
  });
  modal.addEventListener("close", () => { activeStep = null; });
}

function coverageTable() {
  const seen = new Map();
  for (const flow of FLOWS) {
    for (const step of flow.steps) {
      for (const [id] of step.uses) {
        if (!seen.has(id)) seen.set(id, []);
        const where = `${flow.tag}${flow.steps.indexOf(step) + 1} ${step.title}`;
        if (!seen.get(id).includes(where)) seen.get(id).push(where);
      }
    }
  }
  const order = ["spine", "app", "child", "element", "table"];
  const rows = ENTITIES.filter((e) => e.scope !== "optional")
    .sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type) || a.name.localeCompare(b.name))
    .map((e) => {
      const where = seen.get(e.id) || [];
      const cells = where.length
        ? where.map((w) => `<span class="where">${w}</span>`).join("")
        : '<span class="where missing">not shown in any flow</span>';
      return `<tr><td><a href="#entity-${e.id}" data-jump="${e.id}"><strong>${e.name}</strong></a></td><td>${TYPES[e.type].label}</td><td>${cells}</td></tr>`;
    })
    .join("");
  return `<div class="table-wrap"><table><thead><tr><th>Component</th><th>Kind</th><th>Where it shows up</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function configBlock(group) {
  const head = group.columns.map((c) => `<th>${c}</th>`).join("");
  const body = group.rows
    .map(([entityId, ...cells]) => {
      const first = entityId ? `<td>${chipRef(entityId, "")}</td>` : "";
      return `<tr>${first}${cells.map((c) => `<td>${c}</td>`).join("")}</tr>`;
    })
    .join("");
  return `
    <article class="config-group" id="${group.id}">
      <h3>${group.name}</h3>
      <p class="lede">${group.lede}</p>
      <div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>
      ${group.note ? `<div class="callout" style="margin-top:14px">${group.note}</div>` : ""}
    </article>`;
}

function moduleBlock(mod) {
  const members = ENTITIES.filter((e) => e.module === mod.id);
  const adds = members
    .map((e) => `<li><strong>${e.name}</strong> — ${TYPES[e.type].label}${e.type === "table" ? " (integration required)" : ""}</li>`)
    .join("");
  return `
    <article class="module" id="module-${mod.id}">
      <header>
        <div>
          <span class="tile-type">Optional module · wave ${mod.wave}</span>
          <h3>${mod.name}</h3>
          <p>${mod.blurb}</p>
        </div>
        <p class="module-prereq">${mod.prereq}</p>
      </header>
      <h5>Where it plugs into the flow</h5>
      <p class="module-plug">${mod.plugsIn}</p>
      <h5>What it adds</h5>
      <ul class="module-adds">${adds}</ul>
      <div class="tiles">${members.map(tile).join("")}</div>
    </article>`;
}

function openEntity(id) {
  const el = document.getElementById(`entity-${id}`);
  if (!el) return;
  const filter = document.querySelector(".filter.is-on");
  if (filter && filter.dataset.filter !== "all" && el.closest("#tiles") && el.dataset.type !== filter.dataset.filter) {
    applyFilter("all");
  }
  el.open = true;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("is-flash");
  setTimeout(() => el.classList.remove("is-flash"), 1200);
}

function applyFilter(value) {
  document.querySelectorAll(".filter").forEach((button) => {
    const on = button.dataset.filter === value;
    button.classList.toggle("is-on", on);
    button.setAttribute("aria-pressed", String(on));
  });
  document.querySelectorAll("#tiles .tile").forEach((el) => {
    el.hidden = value !== "all" && el.dataset.type !== value;
  });
}

function jumpOnClick(host) {
  host.addEventListener("click", (event) => {
    const jump = event.target.closest("[data-jump]");
    if (!jump) return;
    event.preventDefault();
    openEntity(jump.dataset.jump);
  });
}

function init() {
  const mapHost = document.getElementById("relationship-map");
  if (mapHost) renderMap(mapHost);

  const core = ENTITIES.filter((e) => e.scope !== "optional");
  const tiles = document.getElementById("tiles");
  if (tiles) {
    tiles.innerHTML = core.map(tile).join("");
    jumpOnClick(tiles);
  }

  const modules = document.getElementById("modules");
  if (modules) {
    modules.innerHTML = MODULES.map(moduleBlock).join("");
    jumpOnClick(modules);
  }

  const flows = document.getElementById("flows");
  if (flows) {
    flows.innerHTML = FLOWS.map(flowBlock).join("");
    flows.addEventListener("click", (event) => {
      const card = event.target.closest(".snake-card");
      if (card) openStep(card.dataset.flow, Number(card.dataset.step));
    });
    layoutSnakes();
    window.addEventListener("resize", layoutSnakes);
    wireModal();
  }

  const coverage = document.getElementById("coverage");
  if (coverage) {
    coverage.innerHTML = coverageTable();
    jumpOnClick(coverage);
  }

  const config = document.getElementById("client-config");
  if (config) {
    config.innerHTML = CLIENT_CONFIG.map(configBlock).join("");
    jumpOnClick(config);
  }

  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter));
  });

  const toggle = document.getElementById("toggle-all");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const visible = [...document.querySelectorAll(".tile")].filter((el) => !el.hidden);
      const expand = visible.some((el) => !el.open);
      visible.forEach((el) => { el.open = expand; });
      toggle.textContent = expand ? "Collapse all" : "Expand all";
    });
  }

  const counts = { spine: 0, app: 0, child: 0, element: 0, table: 0, modules: MODULES.length };
  core.forEach((e) => { counts[e.type] += 1; });
  Object.entries(counts).forEach(([key, n]) => {
    document.querySelectorAll(`[data-count="${key}"]`).forEach((host) => { host.textContent = String(n); });
  });

  if (location.hash.startsWith("#entity-")) {
    openEntity(location.hash.replace("#entity-", ""));
  }
}

document.addEventListener("DOMContentLoaded", init);
