/* ITPG component explorer.
   One dataset drives both the relationship map and the entity tiles. */

const TYPES = {
  spine: { label: "Spine app", cls: "t-spine" },
  child: { label: "Child app", cls: "t-child" },
  optional: { label: "Optional module", cls: "t-optional" },
  element: { label: "Element", cls: "t-element" },
  table: { label: "Table port", cls: "t-table" },
};

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

  { id: "capacity-plan", name: "Capacity Plan", short: "Capacity Plan", type: "optional", handle: "CAP", ns: "capacity-plan", wave: "4",
    blurb: "One record per team and planning period. Tests funding, general capacity, and scarce specialists together.",
    stages: ["Draft", "Constraint check", "Agreed", "Locked", "Archived"],
    statuses: { open: ["Draft", "Constraint check", "Agreed"], closed: ["Locked", "Superseded"] },
    fields: [["Team","Relation","Team & Squad element","Yes"],["Planning period","Text","Quarter or year","Yes"],["Supply rows","Child records","Role, skill, available FTE","Yes"],["Demand rows","Child records","From Portfolio Items, classified run/change/mandatory","Derived"],["Funding envelope rows","Child records","Year, amount, committed versus planned","Yes"],["Net position","Calculated","Supply minus demand","Derived"],["Over-committed","Calculated","Beyond available capacity","Derived"],["Binding constraint","Text","Which limit makes it undeliverable","Derived"]],
    rels: [["portfolio-item", "Demand generated from investment role and period needs"],["team-squad", "Capacity supply owner"],["role-skill", "Scarce specialist pools"],["workforce", "Employee and contractor roster"]] },

  { id: "outcome-record", name: "Outcome Record", short: "Outcome", type: "optional", handle: "OUT", ns: "outcome-record", wave: "5",
    blurb: "One named benefit with a baseline, target, and data source. Stays open after delivery closes.",
    stages: ["Defined", "Measuring", "Validating", "Closed"],
    statuses: { open: ["Defined", "Measuring", "Validating"], closed: ["Realized", "Partial", "Not realized", "Written off"] },
    fields: [["Portfolio Item","Relation","Parent item","Yes"],["Outcome type","Dropdown (dynamic)","Outcome Type element","Yes"],["Owner","User","Benefit owner","Yes"],["Measure","Text","What is counted","Yes"],["Measurement method","Text","How it is counted","Yes"],["Data source","Text","Named system","Yes"],["Baseline value / date","Decimal · Date","Captured before approval","Yes"],["Target profile","Child records","Value per period","Yes"],["Actuals","Child records or table","Per measurement period","Derived"],["Adoption measure","Decimal","Take-up of delivered capability","Yes"],["Validated by","User","Finance or assurance","Before Realized"]],
    rels: [["portfolio-item", "Created from the approved case outcome statements"],["outcome-type", "Business and technology outcome classes"],["telemetry", "Actuals and adoption from source systems"],["vendor-engagement", "Value attributed to vendor delivery"]] },

  { id: "dependency", name: "Dependency", short: "Dependency", type: "optional", handle: "DEP", ns: "dependency", wave: "6",
    blurb: "A two-sided commitment. Nothing is committed until the providing party accepts it.",
    stages: ["Proposed", "Accepted", "In progress", "At risk", "Closed"],
    statuses: { open: ["Proposed", "Accepted", "In progress", "At risk"], closed: ["Delivered", "Breached", "Cancelled", "Waived"] },
    fields: [["Receiving Portfolio Item","Relation","Who needs it","Yes"],["Providing party","Relation","Shared Function, team, or vendor engagement","Yes"],["Description","Long text","—","Yes"],["Need-by date","Date","Validated against lead time","Yes"],["Criticality","Dropdown","From criticality reference","Yes"],["Accepted by / at","User · Date-time","Provider acceptance","On accept"],["Lead time met","Calculated","Against published standard","Derived"],["Downstream impact","Long text","Affected milestones and gates","No"],["Escalation path","Relation","From Shared Function","Derived"]],
    rels: [["portfolio-item", "Inbound commitment; open ones block closure"],["shared-function", "Published owner, lead time, and escalation"],["milestone", "Breach moves dependent dates"],["vendor-engagement", "Vendor-provided dependencies resolve to an engagement"]] },

  { id: "vendor-engagement", name: "Vendor Engagement", short: "Vendor", type: "optional", handle: "VEN", ns: "vendor-engagement", wave: "7",
    blurb: "Engagement performance on top of the vendor system of record. No local vendor master is created.",
    stages: ["Scoping", "Active", "Review", "Closing"],
    statuses: { open: ["Scoping", "Active", "Review"], closed: ["Completed", "Terminated"] },
    fields: [["Vendor reference","Table lookup","Vendor system of record","Yes"],["Contract reference","Table lookup","Vendor system of record","Yes"],["Engagement type","Dropdown","Systems integration · Managed service · Staff augmentation · Subscription","Yes"],["Internal owner","User","Accountable owner","Yes"],["Supported items","Relation","Portfolio Items and products","Yes"],["Commercial construct","Dropdown","Fixed price · Time and materials · Outcome-based","Yes"],["Committed / invoiced / forecast spend","Decimal","Against plan","Derived"],["Deliverables","Child records","Acceptance criteria and outcome","Yes"],["Performance score","Child records","Per review period","Yes"]],
    rels: [["portfolio-item", "Vendor work supporting funded items"],["vendor-sor", "Vendor, contract, risk, and SLA data consumed, not copied"],["finance-actuals", "Invoiced and committed spend"],["outcome-record", "Value realized through the vendor"]] },

  { id: "funding-scenario", name: "Funding Scenario", short: "Scenario", type: "optional", handle: "SCN", ns: "funding-scenario", wave: "2–4",
    blurb: "A candidate portfolio: which investments are in, which are out, and what that costs. Include/exclude only, not an optimizer.",
    fields: [["Name","Text","Scenario label","Yes"],["Planning period","Text","—","Yes"],["Scenario lines","Child records","One per candidate item","Yes"],["Total value / cost","Calculated","Rolled up from lines","Derived"],["Run / change / mandatory split","Calculated","From included items","Derived"],["Locked as baseline","Boolean","Becomes the approved portfolio","No"]],
    rels: [["scenario-line", "One line per candidate investment"],["portfolio-item", "Locking a scenario sets approved funding"],["capacity-plan", "Tested against funding and capacity limits"]] },

  { id: "scenario-line", name: "Scenario Line", short: "Scenario Line", type: "optional", handle: "SLN", ns: "scenario-line", wave: "2–4",
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

  { id: "role-skill", name: "Role & Skill", short: "Roles & Skills", type: "element", handle: "RSKIL", ns: "role-skill", wave: "0",
    blurb: "Roles and skills, flagging the scarce specialists that are usually the real constraint.",
    fields: [["Name","Text","—","Yes"],["Category","Text","Engineering, architecture, security, data","Yes"],["Scarce specialist","Boolean","Constraint pool","Yes"]],
    rels: [["capacity-plan", "Supply and demand are expressed by role and skill"]] },

  { id: "shared-function", name: "Shared Function", short: "Shared Functions", type: "element", handle: "SHF", ns: "shared-function", wave: "0",
    blurb: "Architecture, security, cloud platform, identity, data, integration, network — with published lead times.",
    fields: [["Name","Text","—","Yes"],["Owner","User","Accountable owner","Yes"],["Standard lead time (days)","Number","Published expectation","Yes"],["Capacity units","Number","Declared capacity","No"],["Escalation path","Text","By criticality","Yes"]],
    rels: [["dependency", "Validates need-by dates and routes requests"]] },

  { id: "outcome-type", name: "Outcome Type", short: "Outcome Types", type: "element", handle: "OTP", ns: "outcome-type", wave: "0",
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

  { id: "telemetry", name: "Telemetry & adoption", short: "Telemetry", type: "table", handle: "—", ns: "table port", wave: "5",
    blurb: "Product telemetry and adoption measures, so benefit claims are evidenced rather than asserted.",
    fields: [["Outcome key","Text","Mapping key","Yes"],["Period","Text","—","Yes"],["Actual value","Decimal","—","Yes"],["Source timestamp","Date-time","Freshness","Yes"]],
    rels: [["outcome-record", "Actuals and adoption without manual entry"]] },

  { id: "vendor-sor", name: "Vendor system of record", short: "Vendor SoR", type: "table", handle: "—", ns: "table port", wave: "7",
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

  { id: "cost-line", x: 120, y: 402 },
  { id: "decision-condition", x: 310, y: 402 },
  { id: "milestone", x: 500, y: 402 },
  { id: "control-gate-record", x: 690, y: 402 },
  { id: "portfolio-risk", x: 880, y: 402 },
  { id: "portfolio-change-request", x: 1080, y: 402 },

  { id: "capacity-plan", x: 200, y: 520 },
  { id: "outcome-record", x: 420, y: 520 },
  { id: "dependency", x: 640, y: 520 },
  { id: "vendor-engagement", x: 860, y: 520 },
  { id: "funding-scenario", x: 1080, y: 520 },

  { id: "work-management", x: 260, y: 632 },
  { id: "finance-actuals", x: 520, y: 632 },
  { id: "telemetry", x: 760, y: 632 },
  { id: "vendor-sor", x: 1000, y: 632 },
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

  ["portfolio-item", "capacity-plan", ""],
  ["portfolio-item", "outcome-record", ""],
  ["portfolio-item", "dependency", ""],
  ["portfolio-item", "vendor-engagement", ""],
  ["portfolio-item", "funding-scenario", ""],

  ["work-management", "demand-request", "duplicates"],
  ["work-management", "portfolio-item", "progress"],
  ["finance-actuals", "portfolio-item", "cost"],
  ["telemetry", "outcome-record", "actuals"],
  ["vendor-sor", "vendor-engagement", "vendor data"],
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
    viewBox: "0 0 1260 690",
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
    if (!entity) continue;
    const group = svgEl("a", {
      class: `map-node ${TYPES[entity.type].cls}${node.hub ? " is-hub" : ""}`,
      href: `#entity-${entity.id}`,
      "data-id": entity.id,
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
    label.textContent = entity.short;
    group.appendChild(label);
    const title = svgEl("title");
    title.textContent = `${entity.name} — ${TYPES[entity.type].label}`;
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

function openEntity(id) {
  const el = document.getElementById(`entity-${id}`);
  if (!el) return;
  const filter = document.querySelector(".filter.is-on");
  if (filter && filter.dataset.filter !== "all" && el.dataset.type !== filter.dataset.filter) {
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
  document.querySelectorAll(".tile").forEach((el) => {
    el.hidden = value !== "all" && el.dataset.type !== value;
  });
}

function init() {
  const mapHost = document.getElementById("relationship-map");
  if (mapHost) renderMap(mapHost);

  const tiles = document.getElementById("tiles");
  if (tiles) {
    tiles.innerHTML = ENTITIES.map(tile).join("");
    tiles.addEventListener("click", (event) => {
      const jump = event.target.closest("[data-jump]");
      if (!jump) return;
      event.preventDefault();
      openEntity(jump.dataset.jump);
    });
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

  const counts = { spine: 0, child: 0, optional: 0, element: 0, table: 0 };
  ENTITIES.forEach((e) => { counts[e.type] += 1; });
  Object.entries(counts).forEach(([type, n]) => {
    const host = document.querySelector(`[data-count="${type}"]`);
    if (host) host.textContent = String(n);
  });

  if (location.hash.startsWith("#entity-")) {
    openEntity(location.hash.replace("#entity-", ""));
  }
}

document.addEventListener("DOMContentLoaded", init);
