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
    fields: [
      ["Title","Text (record title)","Short name for the proposed change","Yes"],
      ["Change target","Dropdown","Hierarchy · Product register · Scoring model · Gate model · Authority threshold · Routing rule","Yes"],
      ["Affected applications","Multi-select","Which process areas the change touches","Yes"],
      ["Proposed change","Long text","—","Yes"],
      ["Rationale","Long text","Why the current rule is wrong","Yes"],
      ["Requested by","User","Defaults to the creator","Yes"],
      ["Governance approver","User","Authority for this change target","At review"],
      ["Impact assessment","Long text","In-flight records affected by the change","At review"],
      ["Effective from","Date","When the new version starts applying","At approval"],
      ["Published version","Text","Resulting model version identifier","At publication"],
      ["Supersedes version","Text","Previous published version","At publication"],
      ["Supporting files","Attachment","—","No"],
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
    fields: [
      ["Title","Text (record title)","Short problem name","Yes"],
      ["Demand type","Dropdown (dynamic)","Demand & Investment Type","On submit"],
      ["Requester","User","Defaults to the creator","Yes"],
      ["Sponsor","User","Business accountable person","On submit"],
      ["Business unit","Text or table lookup","From the organization dataset when available","On submit"],
      ["Cost centre","Text","Finance reference","No"],
      ["Affected product","Dropdown (dynamic)","Product & Platform Register","On submit"],
      ["Objectives","Multi-select (dynamic)","Strategic Objective","No"],
      ["Problem statement","Long text","—","Yes"],
      ["Desired outcome","Long text","—","On submit"],
      ["Required timing","Date","—","No"],
      ["Work type","Dropdown","Run · Change · Mandatory","On submit"],
      ["Supporting files","Attachment","—","No"],
      ["Triage owner","User (assignee)","Set by the routing automation","No"],
      ["Initial cost estimate","Decimal","Order of magnitude only","No"],
      ["Initial effort / duration","Number","Person-days and weeks","No"],
      ["Disposition","Dropdown","Backlog · Accepted as investment · Merged · Deferred · Rejected · Redirected","On disposal"],
      ["Disposition reason","Dropdown (dynamic)","Triage Reason Code","On disposal"],
      ["Disposition notes","Long text","—","No"],
      ["Portfolio ID","Text","Minted when accepted as an investment","No"],
      ["Related demand","Relation (self)","Merge and duplicate linkage","No"],
      ["Investment decision","Relation","Prioritization record created on acceptance","No"],
    ],
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
    fields: [
      ["Portfolio ID","Text (record title)","Minted on acceptance; persists through to Value","Yes"],
      ["Source demand","Relation","Demand Request","Yes"],
      ["Investment type","Dropdown (dynamic)","Demand & Investment Type","Yes"],
      ["Funding construct","Dropdown","Persistent product funding · Discrete initiative","Yes"],
      ["Product / platform","Dropdown (dynamic)","Product & Platform Register","Yes"],
      ["Objectives","Multi-select (dynamic)","Strategic Objective","No"],
      ["Options considered","Long text","Must include do-nothing and reuse-platform","Before scoring"],
      ["Architecture & security implications","Long text","—","Before scoring"],
      ["Exception required","Boolean + long text","Deviation from the target state","No"],
      ["TCO total","Calculated","Rolled up from Cost Line records","Derived"],
      ["Benefit owner","User","Accountable for the promised outcome","Before scoring"],
      ["Outcome statements","Long text","Become Outcome Records in Value","Before scoring"],
      ["Scoring model version","Dropdown (dynamic)","Scoring Model & Weighting","At scoring"],
      ["Criterion scores (6)","Number","Value · fit · reuse · run cost · risk · debt","At scoring"],
      ["Composite score","Calculated","Weighted from the published model version","Derived"],
      ["Authority level","Text","Matched from the delegation threshold","Derived"],
      ["Capacity verdict","Text","Returned from the Capacity plan","Derived"],
      ["Decision","Dropdown","Approve · Conditionally approve · Reject · Defer","At board"],
      ["Decision rationale / date / attendees","Long text · Date · Long text","Audit trail","At board"],
      ["Approved funding","Decimal","Locked with the baseline","At baseline"],
      ["Baseline locked / locked at","Boolean · Date-time","Baseline is mandatory before delivery","At baseline"],
      ["Initiative","Relation","Execution record created at baseline lock","No"],
    ],
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
      "Demand Request appears again as a data object in this area; here it stays a relation back to Demand Intake rather than a second copy of the record.",
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
    fields: [
      ["Name","Text (record title)","Plan label","Yes"],
      ["Planning period","Text","Quarter or fiscal year","Yes"],
      ["Scope","Relation","Hierarchy node, product or team the plan covers","Yes"],
      ["Funding envelope","Decimal","Committed versus planned","Yes"],
      ["Supply position","Calculated","Rolled up from Capacity Supply Line records","Derived"],
      ["Demand position","Calculated","From candidate and approved investments","Derived"],
      ["Net position","Calculated","Supply minus demand","Derived"],
      ["Over-committed","Calculated","Beyond available capacity","Derived"],
      ["Binding constraint","Text","Which limit makes the plan undeliverable","Derived"],
      ["Run / change / mandatory split","Calculated","Actual allocation against target","Derived"],
      ["Scarce specialist conflicts","Calculated","Contested constrained roles","Derived"],
      ["Recommended trade-off","Long text","What to defer, split or re-sequence","At review"],
      ["Plan status","Dropdown","Draft · Under review · Endorsed · Locked","Yes"],
      ["Endorsed by / locked at","User · Date-time","Who accepted the trade-off","On endorsement"],
    ],
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
    fields: [
      ["Portfolio ID","Text (record title)","Carried from the investment decision","Yes"],
      ["Investment decision","Relation","Prioritization record","Yes"],
      ["Delivery owner","User","Accountable delivery lead","Yes"],
      ["Delivery team","Relation (dynamic)","Team & Squad","Yes"],
      ["Gate model version","Dropdown (dynamic)","Stage Gate Model","Yes"],
      ["Approved funding / baseline dates","Decimal · Date","Copied at baseline lock, read-only afterwards","Derived"],
      ["Health (RAG)","Dropdown","Green · Amber · Red","Each cadence period"],
      ["Status narrative","Long text","—","Each cadence period"],
      ["Recovery action","Long text","Required when Amber or Red","Conditional"],
      ["Cadence days / last status / overdue","Number · Date-time · Calculated","Drives the exception view","Derived"],
      ["Actual cost to date","Calculated","From the finance table, matched on Portfolio ID","Derived"],
      ["Forecast at completion","Decimal","Current expectation","Each cadence period"],
      ["Cost / schedule variance","Calculated","Against the locked baseline","Derived"],
      ["Gate position","Calculated","Next control point and evidence status","Derived"],
      ["Open risks / issues","Calculated","Counted from supporting records","Derived"],
      ["Change requests raised","Calculated","Counted from supporting records","Derived"],
      ["Delivered capability","Long text","What went live","At close"],
      ["Closure summary","Long text","Required to close","At close"],
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
    fields: [
      ["Portfolio ID","Text","Carried from the funded investment","Yes"],
      ["Initiative","Relation","Execution record that delivered it","No"],
      ["Outcome type","Dropdown (dynamic)","Outcome Type","Yes"],
      ["Benefit owner","User","Accountable for realization","Yes"],
      ["Measure","Text","What is counted","Yes"],
      ["Measurement method","Text","How it is counted","Yes"],
      ["Data source","Text","Named system of record","Yes"],
      ["Baseline value / date","Decimal · Date","Captured before approval","Yes"],
      ["Target profile","Child records","Value per measurement period","Yes"],
      ["Actuals","Child records or table","Per measurement period","Derived"],
      ["Adoption measure","Decimal","Take-up of the delivered capability","Yes"],
      ["Realization to date","Calculated","Actual against target","Derived"],
      ["Claim status","Dropdown","Projected · Claimed · Validated · Not realized","Yes"],
      ["Validated by / at","User · Date-time","Finance or assurance","Before Realized"],
      ["Forecast accuracy","Calculated","Business-case estimate versus actual","Derived"],
      ["Post-implementation review","Long text","Lessons fed back into the model","At review"],
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
      "Savings Record is called out as its own data object. Is it a supporting record under Value, or does it live in sourcing and get read from there?",
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
    fields: [
      ["Receiving initiative","Relation","Who needs the commitment","Yes"],
      ["Providing party","Relation","Shared function, team or vendor engagement","Yes"],
      ["Description","Long text","What is needed","Yes"],
      ["Need-by date","Date","Validated against the published lead time","Yes"],
      ["Criticality","Dropdown (dynamic)","Criticality reference","Yes"],
      ["Lead time met","Calculated","Against the published standard","Derived"],
      ["Status","Dropdown","Requested · Accepted · At risk · Breached · Met","Yes"],
      ["Accepted by / at","User · Date-time","Provider acceptance","On acceptance"],
      ["Commitment date","Date","What the provider committed to","On acceptance"],
      ["Downstream impact","Long text","Affected milestones and gates","No"],
      ["Escalation path","Relation","From the shared function record","Derived"],
      ["Breach reason / recovery plan","Long text","Required once breached","Conditional"],
    ],
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
      "Initiative appears again as a data object in this area; here it stays a relation back to Execution rather than a second copy of the record.",
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
    fields: [
      ["Vendor reference","Table lookup","Vendor system of record","Yes"],
      ["Contract reference","Table lookup","Contract system of record","Yes"],
      ["Engagement type","Dropdown","Systems integration · Managed service · Staff augmentation · Subscription","Yes"],
      ["Commercial construct","Dropdown","Fixed price · Time and materials · Outcome-based","Yes"],
      ["Internal owner","User","Accountable vendor manager","Yes"],
      ["Supported initiatives / products","Relation","What this engagement delivers into","Yes"],
      ["Contract value / term","Decimal · Date","Read from the contract record","Derived"],
      ["Committed / invoiced / forecast spend","Decimal","Against plan","Derived"],
      ["Performance score","Calculated","From scorecard records per review period","Derived"],
      ["Risk rating","Table lookup","Third-party risk system","Derived"],
      ["Concentration flag","Calculated","Against the concentration definition","Derived"],
      ["Renewal / notice date","Date","Drives the optimization review","Yes"],
      ["Optimization opportunity","Long text","Overlap, consolidation or exit","No"],
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
      "Initiative appears again as a data object in this area; here it stays a relation back to Execution rather than a second copy of the record.",
      "Does the sourcing/TPRM solution exist and expose every required dataset?",
    ],
  },
];

const FLOWS = [
  {
    id: "investment",
    tag: "A",
    name: "New capability becomes measured value",
    lede: "The full path, end to end. All eight applications participate, though Dependency and Vendor Management join only when the investment needs them.",
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
    title: "Is each process area its own application?",
    why: "This design gives each of the eight areas one deployed app and one primary record, so accountability and reporting follow the area. Some upstream records are named again inside downstream areas, which could instead mean a single shared app spanning several areas.",
    decision: "Confirm one app per process area, each with one primary record.",
  },
  {
    title: "Which supporting items need their own records?",
    why: "A Composite Score is probably a calculated field, and Status History is probably native record behavior, but a Cost Line or Milestone clearly repeats and needs its own row. The classification alone does not settle which is which.",
    decision: "Walk the 75 supporting items app by app: own entity, field or native behavior, generated artifact, or record read from another system.",
  },
  {
    title: "Which end-to-end process document governs the stages?",
    why: "Stage names, transitions, actors and exception paths here are proposed from the requirements and acceptance criteria. A documented process may name them differently or add paths not visible in the requirements.",
    decision: "Reconcile every proposed stage and handoff against the authoritative process document before implementation.",
  },
  {
    title: "Where do shared records live when two areas both use them?",
    why: "Value references Outcome Record and Savings Record; Prioritization references Demand Request; Dependency and Vendor Management both reference Initiative. Each is owned in one place and read elsewhere, so ownership has to be explicit.",
    decision: "Confirm the owning application for each shared record, especially Savings Record.",
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
        <div><span>Record schema</span><button class="link-button" type="button" data-schema="${app.id}">View ${app.fields.length} fields →</button></div>
      </div>
      <p class="permalink"><a class="anchor" href="#app-${app.id}" data-permalink>Link to this application</a></p>

      <h4>Proposed lifecycle</h4>
      <div class="stage-strip">${app.stages.map((stage) => `<span>${escapeHtml(stage)}</span>`).join("")}</div>

      <div class="grid two spec-grid">
        <div><h4>What this app owns</h4>${list(app.capabilities, "checklist")}</div>
        <div><h4>What the client must configure</h4>${list(app.client, "checklist")}</div>
      </div>

      <h4>Supporting task records (${app.tasks.length})</h4>
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

function isDynamicPicklist(type) {
  return /\(dynamic\)/i.test(type);
}

function schemaTypeCell(type, note) {
  if (!isDynamicPicklist(type)) return `<td>${escapeHtml(type)}</td>`;
  return `<td>${escapeHtml(type)}<span class="field-source">from ${escapeHtml(note)}</span></td>`;
}

function schemaNoteCell(type, note) {
  if (isDynamicPicklist(type)) return `<td>—</td>`;
  return `<td>${escapeHtml(note)}</td>`;
}

function schemaTable(app) {
  return `<div class="table-wrap"><table class="schema-table">
    <thead><tr><th>Field</th><th>Type</th><th>Notes</th><th>Required</th></tr></thead>
    <tbody>${app.fields.map(([name, type, note, required]) => `<tr>
      <td><strong>${escapeHtml(name)}</strong></td>
      ${schemaTypeCell(type, note)}
      ${schemaNoteCell(type, note)}
      <td><span class="req req-${required.toLowerCase().replace(/[^a-z]+/g, "-")}">${escapeHtml(required)}</span></td>
    </tr>`).join("")}</tbody>
  </table></div>`;
}

function openSchema(id) {
  const app = byId.get(id);
  const modal = document.getElementById("schema-modal");
  if (!app || !modal) return;
  modal.querySelector(".modal-eyebrow").textContent = `Application ${app.n} · ${app.name}`;
  modal.querySelector(".modal-title").textContent = `${app.record} — proposed record schema`;
  modal.querySelector(".modal-body").innerHTML = `
    <p class="modal-what">${app.fields.length} fields. Lifecycle: ${app.stages.map(escapeHtml).join(" → ")}. Required column shows when a value must exist — either always, at a particular point in the lifecycle, or derived by the platform. Dynamic dropdowns name the Element or table they read from under the type.</p>
    ${schemaTable(app)}
    <p class="small">Repeating detail (${app.tasks.length} supporting records) is not listed here — those are separate entities, not fields on this record.</p>
    <p class="permalink"><a class="anchor" href="#schema-${app.id}" data-permalink>Link straight to this schema</a></p>`;
  if (!modal.open) {
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
  }
}

function closeSchema() {
  const modal = document.getElementById("schema-modal");
  if (!modal) return;
  if (typeof modal.close === "function") modal.close();
  else modal.removeAttribute("open");
}

function wireSchemaModal() {
  const modal = document.getElementById("schema-modal");
  if (!modal) return;
  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest(".modal-close")) closeSchema();
  });
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
    const schema = event.target.closest("[data-schema]");
    if (schema) {
      event.preventDefault();
      openSchema(schema.dataset.schema);
      return;
    }
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
  wireSchemaModal();

  if (location.hash.startsWith("#schema-")) {
    const id = location.hash.replace("#schema-", "");
    openApp(id);
    openSchema(id);
  } else if (location.hash.startsWith("#app-")) {
    openApp(location.hash.replace("#app-", ""));
  }
}

document.addEventListener("DOMContentLoaded", init);
