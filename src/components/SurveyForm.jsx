"use client";
import { useState, useEffect, useRef } from "react";

// ─── Placeholder sets for each rotating input ───────────────────────────────
const FEATURE_PLACEHOLDERS = [
  "e.g. I want it to work with my school timetable...",
  "e.g. Send me reminders before my exams...",
  "e.g. Let me compete with students from other schools...",
  "e.g. Show me how a concept is used in a real job...",
  "e.g. Let me ask questions anonymously to my teacher...",
  "e.g. Work in my local language, not just English...",
  "e.g. Show me African scientists who used this concept...",
  "e.g. Give me a daily 5-minute challenge to stay sharp...",
];

const DREAM_BUILD_PLACEHOLDERS = [
  "e.g. A simple electric circuit with a switch that lights up an LED — to understand current flow...",
  "e.g. A volcano model using baking soda and vinegar to show chemical reactions...",
  "e.g. A bridge made of popsicle sticks to test which shape holds the most weight...",
  "e.g. A basic periscope from cardboard and mirrors — to explore light reflection...",
  "e.g. A wind-powered fan made from recycled plastic bottles and a DC motor...",
  "e.g. A solar-powered phone charger built from a small solar panel and spare parts...",
  "e.g. A simple water purification filter using sand, charcoal, and gravel layers...",
  "e.g. A weather station that reads temperature and humidity using a sensor...",
  "e.g. A plant growth tracker — comparing different soil types with daily measurements...",
  "e.g. A basic app that helps classmates track their homework schedule...",
  "e.g. An automatic plant watering system triggered by a soil moisture sensor...",
  "e.g. A water pump powered by a small wind turbine for the dry season...",
  "e.g. A robot arm that picks and sorts objects by colour using sensors...",
  "e.g. A low-cost air quality monitor using an Arduino and gas sensor...",
  "e.g. A coded algorithm that predicts crop yield based on rainfall data...",
];

const DAILY_APP_PLACEHOLDERS = [
  "e.g. TikTok — I use it every single day...",
  "e.g. WhatsApp for chatting with friends...",
  "e.g. YouTube to watch music and football...",
  "e.g. PUBG Mobile or Free Fire...",
];

const APP_LIKE_PLACEHOLDERS = [
  "e.g. It's fast and never crashes...",
  "e.g. The short videos keep me entertained...",
  "e.g. I can talk to my friends anytime...",
  "e.g. The games are addictive and fun...",
];

const APP_IMPROVE_PLACEHOLDERS = [
  "e.g. It uses too much data and my bundles finish fast...",
  "e.g. There are too many ads that interrupt me...",
  "e.g. It is confusing and hard to find things...",
  "e.g. It drains my phone battery too quickly...",
];

const DREAM_CAREER_PLACEHOLDERS = [
  "e.g. A biomedical engineer who builds prosthetic limbs...",
  "e.g. A software founder who creates apps for Africa...",
  "e.g. A doctor specialising in tropical diseases...",
  "e.g. An aerospace engineer — I want to build satellites...",
];

const VIBE_CHECK_PLACEHOLDERS = [
  "e.g. It feels like extra school — too much text and no fun...",
  "e.g. It's like a game because I earn points when I finish...",
  "e.g. Boring — it is just the same as reading a textbook...",
  "e.g. Fun when there are videos, but dull when it's just quizzes...",
];

const UG_DISCONNECT_PLACEHOLDERS = [
  "e.g. I knew all the electricity formulas but froze when wiring a real circuit in the lab...",
  "e.g. I could derive the equations but had no idea how to operate the lab equipment...",
  "e.g. I aced biology theory but was completely lost during my first dissection practical...",
  "e.g. I knew the programming syntax but couldn't build an actual working project...",
];

// ─── Rotating placeholder component ─────────────────────────────────────────
const RotatingPlaceholderInput = ({ value, onChange, placeholders, interval = 4000, multiline = false, rows = 3, className = "" }) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setPlaceholderIndex((i) => (i + 1) % placeholders.length);
        setVisible(true);
      }, 350);
    }, interval);
    return () => clearInterval(timer);
  }, [placeholders, interval]);

  const sharedProps = {
    value,
    onChange,
    placeholder: "",
    className: `${multiline ? "s-textarea" : "s-input"} rotating-input ${className}`,
  };

  return (
    <div className="rotating-input-wrap">
      {multiline
        ? <textarea {...sharedProps} rows={rows} />
        : <input {...sharedProps} />}
      {!value && (
        <span className={`rotating-placeholder ${multiline ? "rp-multiline" : ""} ${visible ? "rp-visible" : "rp-hidden"}`}>
          {placeholders[placeholderIndex]}
        </span>
      )}
    </div>
  );
};

// ─── Persona definitions ─────────────────────────────────────────────────────
const PERSONAS = [
  { value: "high_school", icon: "🎓", title: "High School Student",
    desc: "Currently studying STEM at secondary school (Senior 1–6)", time: "~11 min · 22 questions" },
  { value: "undergrad",   icon: "🏛️", title: "Undergraduate / Graduate",
    desc: "Completed high school and now in university or working professionally", time: "~8 min · 11 questions" },
  { value: "parent",      icon: "👨‍👩‍👧", title: "Parent / Guardian",
    desc: "Supporting a child who studies or will study STEM subjects", time: "~6 min · 9 questions" },
  { value: "admin",       icon: "🏫", title: "School Admin / Teacher",
    desc: "Working in a school that teaches STEM — administrator or educator", time: "~8 min · 13 questions" },
];

// ─── Persona intro copy ──────────────────────────────────────────────────────
const PERSONA_COPY = {
  high_school: "You are part of the first generation of African students who will build the continent's future, not just read about it. This survey helps us design a learning experience that actually prepares you to become that engineer, doctor, or founder you've been thinking about. Your honest answers and time shape what gets built next.",
  undergrad:   "You've already crossed the gap between classroom theory and real-world practice and you felt it. Your lived experience is one of the most valuable perspectives we can collect. Help us fix that experience for the next generation of African innovators coming up behind you, which can be your sibling, mentee, or someone in your community.",
  parent:      "The decisions you make today about your child's education will determine whether they lead or follow in Africa's next chapter. This survey takes 6 minutes and helps us understand what parents like you actually need, so we build tools that give your child a genuine competitive edge.",
  admin:       "Teachers and administrators are the gateway. No innovation reaches students without your support. This survey helps us understand what is realistic in your school environment, so we build something that works with your realities, not against them.",
};

const SECTIONS_BY_PERSONA = {
  high_school: [
    { id: 1, label: "Demographics",   title: "Who Are You?",           subtitle: "Help us map your digital world" },
    { id: 2, label: "STEM Vibes",     title: "The Abstraction Gap",    subtitle: "Tell us how STEM really feels" },
    { id: 3, label: "Digital Habits", title: "Your Digital Life",      subtitle: "Apps, habits & learning tools" },
    { id: 4, label: "Innovator",      title: "The Social Innovator",   subtitle: "Are you a Solution Builder?" },
  ],
  undergrad: [
    { id: 1, label: "Background",  title: "Your STEM Journey",      subtitle: "Demographics & tech history" },
    { id: 2, label: "The Leap",    title: "The Retrospective Gap",  subtitle: "Looking back at high school STEM" },
    { id: 3, label: "Transition",  title: "21st-Century Readiness", subtitle: "Theory vs. real-world practice" },
  ],
  parent: [
    { id: 1, label: "Aspirations", title: "Knowledge & Aspirations", subtitle: "What you know and hope for your child" },
    { id: 2, label: "Engagement",  title: "Current Engagement",      subtitle: "How you support learning outside school" },
    { id: 3, label: "Investment",  title: "Economic Validation",     subtitle: "What you're willing to invest" },
  ],
  admin: [
    { id: 1, label: "Reality Check", title: "The Reality Check",      subtitle: "Understanding the current gap" },
    { id: 2, label: "Audit",         title: "Engagement Inventory",   subtitle: "What's currently in place" },
    { id: 3, label: "Bridge",        title: "The Benefit Bridge",     subtitle: "Exploring what becomes possible" },
    { id: 4, label: "Pilot & Fit",   title: "Pilot & Sustainability", subtitle: "Implementation and financial fit" },
  ],
};

// ─── Validation rules per persona + section ─────────────────────────────────
const RULES_BY_PERSONA = {
  high_school: {
    0: [
      { field: "grade",           message: "Please select your grade level.",            check: (f) => !!f.grade },
      { field: "gender",          message: "Please select your gender.",                 check: (f) => !!f.gender },
      { field: "schoolType",      message: "Please select your school type.",            check: (f) => !!f.schoolType },
      { field: "schoolCity",      message: "Please enter your school's city.",           check: (f) => f.schoolCity.trim().length > 0 },
      { field: "schoolCountry",   message: "Please enter your school's country.",        check: (f) => f.schoolCountry.trim().length > 0 },
      { field: "schoolResources", message: "Please select at least one option.",         check: (f) => f.schoolResources.length > 0 },
      { field: "personalTech",    message: "Please select at least one option.",         check: (f) => f.personalTech.length > 0 },
    ],
    1: [
      { field: "relevanceScale",     message: "Please rate this statement (1–5).",      check: (f) => f.relevanceScale > 0 },
      { field: "funBuilderScale",    message: "Please rate this question (1–5).",        check: (f) => f.funBuilderScale > 0 },
      { field: "funBuildIdea",       message: "Please describe your dream build.",       check: (f) => f.funBuildIdea.trim().length > 0 },
      { field: "hasPracticalLabs",   message: "Please answer this question.",            check: (f) => !!f.hasPracticalLabs },
      { field: "wantLabsScale",      message: "Please rate this (1–5).",                check: (f) => f.wantLabsScale > 0 },
      { field: "excursionImportance",message: "Please rate this (1–5).",                check: (f) => f.excursionImportance > 0 },
    ],
    2: [
      { field: "dailyApp",          message: "Please enter the app you use daily.",      check: (f) => f.dailyApp.trim().length > 0 },
      { field: "appLike",           message: "Please tell us what you love about it.",   check: (f) => f.appLike.trim().length > 0 },
      { field: "appHate",           message: "Please tell us what needs improvement.",   check: (f) => f.appHate.trim().length > 0 },
      { field: "learningApps",      message: "Please select at least one option.",       check: (f) => f.learningApps.length > 0 },
      { field: "featurePriorities", message: "Please select at least one feature.",      check: (f) => f.featurePriorities.length > 0 },
      { field: "learningStylePref", message: "Please select at least one option.",       check: (f) => f.learningStylePref.length > 0 },
    ],
    3: [
      { field: "inventorRepresentation", message: "Please answer this question.",        check: (f) => !!f.inventorRepresentation },
      { field: "stemGoal",               message: "Please select your STEM goal.",       check: (f) => !!f.stemGoal },
      { field: "stemWhyChoice",          message: "Please tell us why you chose STEM.",  check: (f) => !!f.stemWhyChoice },
      { field: "dreamCareer",            message: "Please share your dream career.",     check: (f) => f.dreamCareer.trim().length > 0 },
      { field: "phygitalCombined",       message: "Please share your opinion.",          check: (f) => !!f.phygitalCombined },
    ],
  },
  undergrad: {
    0: [
      { field: "ugMajor",           message: "Please enter your major or degree.",        check: (f) => f.ugMajor.trim().length > 0 },
      { field: "ugHighSchoolOrigin",message: "Please enter your high school city and country.", check: (f) => f.ugHighSchoolOrigin.trim().length > 0 },
      { field: "ugPastPlatforms",   message: "Please select at least one option.",        check: (f) => f.ugPastPlatforms.length > 0 },
    ],
    1: [
      { field: "ugTheoryGapScale", message: "Please rate this statement (1–5).",          check: (f) => f.ugTheoryGapScale > 0 },
      { field: "ugTeacherStyle",   message: "Please select your teacher's style.",        check: (f) => !!f.ugTeacherStyle },
      { field: "ugMissingTools",   message: "Please select at least one tool.",           check: (f) => f.ugMissingTools.length > 0 },
    ],
    2: [
      { field: "ugDisconnectDesc",     message: "Please describe the disconnect.",        check: (f) => f.ugDisconnectDesc.trim().length > 0 },
      { field: "ug21CenturyReadiness", message: "Please answer this question.",           check: (f) => !!f.ug21CenturyReadiness },
    ],
  },
  parent: {
    0: [
      { field: "parentFieldAwareness",     message: "Please rate your confidence (1–5).", check: (f) => f.parentFieldAwareness > 0 },
      { field: "parentValueImportance",    message: "Please answer this question.",       check: (f) => !!f.parentValueImportance },
      { field: "parentCurriculumAwareness",message: "Please answer this question.",       check: (f) => !!f.parentCurriculumAwareness },
    ],
    1: [
      { field: "parentExternalResources", message: "Please select at least one option.",  check: (f) => f.parentExternalResources.length > 0 },
      { field: "parentSuccessMetric",     message: "Please select how you measure success.", check: (f) => f.parentSuccessMetric.length > 0 },
    ],
    2: [
      { field: "parentMaxInvestment", message: "Please select an investment range.",       check: (f) => !!f.parentMaxInvestment },
      { field: "parentPaymentModel",  message: "Please select a payment model.",           check: (f) => !!f.parentPaymentModel },
    ],
  },
  admin: {
    0: [
      { field: "adminPerfMastery",        message: "Please share how your school verifies mastery.", check: (f) => f.adminPerfMastery.trim().length > 0 },
      { field: "adminWhyGapFreq",         message: "Please answer this question.",                   check: (f) => !!f.adminWhyGapFreq },
      { field: "adminProfLeap",           message: "Please describe the feedback you receive.",      check: (f) => f.adminProfLeap.trim().length > 0 },
      { field: "adminCurriculumAbstract", message: "Please share which parts are most difficult.",   check: (f) => f.adminCurriculumAbstract.trim().length > 0 },
    ],
    1: [
      { field: "adminPracticalPct",    message: "Please select a percentage range.",                 check: (f) => !!f.adminPracticalPct },
      { field: "adminCurrentTools",    message: "Please select at least one option.",                check: (f) => f.adminCurrentTools.length > 0 },
      { field: "adminIndustryExposure",message: "Please answer this question.",                      check: (f) => !!f.adminIndustryExposure },
      { field: "adminLabFrequency",    message: "Please select a frequency.",                        check: (f) => !!f.adminLabFrequency },
    ],
    2: [
      { field: "adminContextualLearning", message: "Please answer this question.",                   check: (f) => !!f.adminContextualLearning },
      { field: "adminPhygitalSandbox",    message: "Please answer this question.",                   check: (f) => !!f.adminPhygitalSandbox },
      { field: "adminTeacherEmpowerment", message: "Please answer this question.",                   check: (f) => !!f.adminTeacherEmpowerment },
    ],
    3: [
      { field: "adminHubFit",             message: "Please select a preference.",                    check: (f) => !!f.adminHubFit },
      { field: "adminSustainabilityModel",message: "Please select a model.",                         check: (f) => !!f.adminSustainabilityModel },
    ],
  },
};

// ─── Default form state ─────────────────────────────────────────────────────
const initialFormData = {
  persona: "",
  // ── High School: Section 1 ──
  grade: "", gender: "", schoolType: "",
  schoolCity: "", schoolCountry: "",
  schoolResources: [], schoolResourcesOther: "", personalTech: [],
  // ── High School: Section 2 ──
  relevanceScale: 0,
  stemStruggle: ["Formulas and equations","Visualizing concepts","Memorizing for exams","Not understanding how concepts relate to real life","No access to labs or excursions"],
  stemStruggleReordered: false,
  funBuilderScale: 0, funBuildIdea: "",
  hasPracticalLabs: "", wantLabsScale: 0, excursionImportance: 0,
  // ── High School: Section 3 ──
  dailyApp: "", appLike: "", appHate: "",
  learningApps: [], learningAppsOther: "", vibeCheck: "",
  featurePriorities: [], featureSuggestion: "",
  learningStylePref: [], learningStyleOpen: "",
  // ── High School: Section 4 ──
  inventorRepresentation: "", stemGoal: "", stemWhyChoice: "",
  dreamCareer: "", dreamCareerScale: 0,
  phygitalCombined: "",
  // ── Undergrad / Graduate ──
  ugMajor: "", ugHighSchoolOrigin: "",
  ugPastPlatforms: [], ugPlatformOther: "",
  ugPlatformContext: "", ugPlatformFrequency: "", ugPlatformSentiment: "",
  ugTheoryGapScale: 0, ugTeacherStyle: "",
  ugMissingTools: [],
  ugDisconnectDesc: "", ug21CenturyReadiness: "",
  ugPayItForward: "", ugWhatToTeach: "", 
  ugContactName: "", ugContactEmail: "",
  // ── Parent ──
  parentFieldAwareness: 0, parentValueImportance: "",
  parentCurriculumAwareness: "",
  parentExternalResources: [], parentSuccessMetric: [],
  parentMaxInvestment: "", parentPaymentModel: "",
  // ── Admin / Teacher ──
  adminPerfMastery: "", adminWhyGapFreq: "",
  adminProfLeap: "", adminCurriculumAbstract: "",
  adminPracticalPct: "", adminCurrentTools: [], adminCurrentToolsOther: "",
  adminIndustryExposure: "", adminIndustryBarrier: "", adminLabFrequency: "",
  adminContextualLearning: "", adminPhygitalSandbox: "", adminTeacherEmpowerment: "",
  adminHubFit: "", adminSustainabilityModel: "",
  // ── Conclusion ──
  contactConsent: "", contactName: "", contactPhone: "",
};

// ─── Helper: get all field errors for a section ──────────────────────────────
function getSectionErrors(sectionIndex, formData, rulesMap) {
  const errors = {};
  for (const rule of (rulesMap || {})[sectionIndex] || []) {
    if (!rule.check(formData)) errors[rule.field] = rule.message;
  }
  return errors;
}

// ─── Sub-components ─────────────────────────────────────────────────────────
const CheckboxGroup = ({ options, selected, onChange, columns = 1, hasError }) => (
  <div className={`checkbox-grid cols-${columns} ${hasError ? "group-error" : ""}`}>
    {options.map((opt) => {
      const val   = typeof opt === "string" ? opt : opt.value;
      const label = typeof opt === "string" ? opt : opt.label;
      const isChecked = selected.includes(val);
      return (
        <label key={val} className={`checkbox-card ${isChecked ? "checked" : ""}`}>
          <input type="checkbox" value={val} checked={isChecked}
            onChange={() => onChange(val)} style={{ display: "none" }} />
          <span className="checkbox-icon">{isChecked ? "✓" : ""}</span>
          <span>{label}</span>
        </label>
      );
    })}
  </div>
);

const RadioGroup = ({ options, name, selected, onChange, hasError }) => (
  <div className={`radio-group ${hasError ? "group-error" : ""}`}>
    {options.map((opt) => {
      const val   = typeof opt === "string" ? opt : opt.value;
      const label = typeof opt === "string" ? opt : opt.label;
      return (
        <label key={val} className={`radio-card ${selected === val ? "checked" : ""}`}>
          <input type="radio" name={name} value={val} checked={selected === val}
            onChange={() => onChange(val)} style={{ display: "none" }} />
          <span className="radio-dot"></span>
          {label}
        </label>
      );
    })}
  </div>
);

const LinearScale = ({ value, onChange, lowLabel = "Strongly Disagree", highLabel = "Strongly Agree", hasError }) => (
  <div className={`scale-container ${hasError ? "group-error" : ""}`}>
    <div className="scale-labels">
      <span>{lowLabel}</span>
      <span>{highLabel}</span>
    </div>
    <div className="scale-buttons">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button"
          className={`scale-btn ${value === n ? "active" : ""} ${hasError ? "btn-error" : ""}`}
          onClick={() => onChange(n)}>
          {n}
        </button>
      ))}
    </div>
  </div>
);

// Drag-to-rank component
const STRUGGLE_DESCRIPTIONS = {
  "Formulas and equations":                             "Hard to remember which one to use and when",
  "Visualizing concepts":                               "Can't picture how it works in my head",
  "Memorizing for exams":                               "Too much to cram — forget it right after the test",
  "Not understanding how concepts relate to real life": "Feels abstract and disconnected from anything real",
  "No access to labs or excursions":                    "Only see it in books, never get to experience it hands-on",
};

const RankingGroup = ({ items, onChange, onReorder }) => {
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const moveItem = (from, to) => {
    if (from === to) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
    onReorder();
  };

  const handleDragStart = (i) => setDragIndex(i);
  const handleDragOver  = (e, i) => { e.preventDefault(); setDragOverIndex(i); };
  const handleDrop      = (e, i) => { e.preventDefault(); moveItem(dragIndex, i); setDragIndex(null); setDragOverIndex(null); };
  const handleDragEnd   = () => { setDragIndex(null); setDragOverIndex(null); };

  const MEDALS = ["🥇","🥈","🥉","4️⃣","5️⃣"];
  const LABELS = ["Biggest struggle","2nd biggest","3rd biggest","4th biggest","Least struggle"];

  return (
    <div className="rank-group">
      <p className="rank-instruction">Drag to reorder — put your biggest pain point at the top</p>
      {items.map((item, i) => (
        <div key={item} draggable
          onDragStart={() => handleDragStart(i)}
          onDragOver={(e) => handleDragOver(e, i)}
          onDrop={(e) => handleDrop(e, i)}
          onDragEnd={handleDragEnd}
          className={`rank-card ${dragIndex === i ? "rank-dragging" : ""} ${dragOverIndex === i && dragIndex !== i ? "rank-over" : ""}`}>
          <div className="rank-left">
            <span className="rank-medal">{MEDALS[i]}</span>
            <div className="rank-info">
              <span className="rank-pos-label">{LABELS[i]}</span>
              <span className="rank-item-text">{item}</span>
              {STRUGGLE_DESCRIPTIONS[item] && (
                <span className="rank-item-desc">{STRUGGLE_DESCRIPTIONS[item]}</span>
              )}
            </div>
          </div>
          <div className="rank-controls">
            <button type="button" className="rank-btn" disabled={i === 0}
              onClick={() => moveItem(i, i - 1)} title="Move up">↑</button>
            <button type="button" className="rank-btn" disabled={i === items.length - 1}
              onClick={() => moveItem(i, i + 1)} title="Move down">↓</button>
            <span className="rank-drag-handle" title="Drag to reorder">⠿</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Inline error message shown below a field
const FieldError = ({ message }) =>
  message ? <p className="field-error-msg"><span className="error-icon">!</span>{message}</p> : null;

// ─── Currency config by country ─────────────────────────────────────────────
const CURRENCY_TIERS = {
  RW: {
    code: "RWF", symbol: "RWF",
    tiers: [
      { value: "tier_1", label: "Under RWF 15,000 per term" },
      { value: "tier_2", label: "RWF 15,000 – 30,000 per term" },
      { value: "tier_3", label: "RWF 30,000 – 60,000 per term" },
      { value: "tier_4", label: "RWF 60,000+ per term — if results are clearly proven" },
    ],
  },
  NG: {
    code: "NGN", symbol: "₦",
    tiers: [
      { value: "tier_1", label: "Under ₦10,000 per term" },
      { value: "tier_2", label: "₦10,000 – 25,000 per term" },
      { value: "tier_3", label: "₦25,000 – 50,000 per term" },
      { value: "tier_4", label: "₦50,000+ per term — if results are clearly proven" },
    ],
  },
  CA: {
    code: "CAD", symbol: "CA$",
    tiers: [
      { value: "tier_1", label: "Under CA$15 per term" },
      { value: "tier_2", label: "CA$15 – $35 per term" },
      { value: "tier_3", label: "CA$35 – $70 per term" },
      { value: "tier_4", label: "CA$70+ per term — if results are clearly proven" },
    ],
  },
  DEFAULT: {
    code: "USD", symbol: "$",
    tiers: [
      { value: "tier_1", label: "Under $10 per term" },
      { value: "tier_2", label: "$10 – $25 per term" },
      { value: "tier_3", label: "$25 – $50 per term" },
      { value: "tier_4", label: "$50+ per term — if results are clearly proven" },
    ],
  },
};

// ─── Logo SVG Component ──────────────────────────────────────────────────────
// Place your favicon.svg file at: /public/favicon.svg
// Place your logo image at:      /public/logo.svg  (optional — currently using CSS logo)
const Logo = () => (
  <div className="logo">
    <div className="logo-icon"></div>
    <span className="logo-text">Help<span className="logo-accent">STEM</span></span>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────
export default function SurveyForm() {
  const [currentSection, setCurrentSection] = useState(-1);
  const [formData, setFormData]             = useState(initialFormData);
  const [errors, setErrors]                 = useState({});
  const [submitted, setSubmitted]           = useState(false);
  const [loading, setLoading]               = useState(false);
  const [apiError, setApiError]             = useState(null);
  const [shake, setShake]                   = useState(false);
  const [currencyConfig, setCurrencyConfig] = useState(CURRENCY_TIERS.DEFAULT);
  const firstErrorRef                       = useRef(null);
  const personaCopyRef                      = useRef(null);  // [6] smooth scroll to persona copy

  // Detect country via IP and set currency
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        const cc = (data.country_code || "").toUpperCase();
        setCurrencyConfig(CURRENCY_TIERS[cc] || CURRENCY_TIERS.DEFAULT);
      })
      .catch(() => setCurrencyConfig(CURRENCY_TIERS.DEFAULT));
  }, []);

  // Scroll to first error after validation
  useEffect(() => {
    if (Object.keys(errors).length > 0 && firstErrorRef.current) {
      firstErrorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [errors]);

  // [6] Scroll persona copy box into view when a persona is selected
  useEffect(() => {
    if (formData.persona && personaCopyRef.current) {
      setTimeout(() => {
        personaCopyRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  }, [formData.persona]);

  const toggleCheckbox = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(val)
        ? prev[field].filter((v) => v !== val)
        : [...prev[field], val],
    }));
    if (errors[field]) setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  };

  const setField = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  };

  // [3] Reliable scroll-to-top — instant snap so content renders at top
  const scrollTop = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleNext = () => {
    const sectionErrors = getSectionErrors(currentSection, formData, activeRules);
    if (Object.keys(sectionErrors).length > 0) {
      setErrors(sectionErrors);
      triggerShake();
      return;
    }
    setErrors({});
    setCurrentSection((s) => s + 1);
    scrollTop();
  };

  const handleBack = () => {
    setErrors({});
    setCurrentSection((s) => s - 1);
    scrollTop();
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = async () => {
    const sectionErrors = getSectionErrors(currentSection, formData, activeRules);
    if (Object.keys(sectionErrors).length > 0) {
      setErrors(sectionErrors);
      triggerShake();
      return;
    }
    setLoading(true);
    setApiError(null);
    try {
      const res = await fetch("/.netlify/functions/submit-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Persona-derived constants ──
  const persona        = formData.persona || "high_school";
  const activeSections = SECTIONS_BY_PERSONA[persona] || SECTIONS_BY_PERSONA.high_school;
  const activeRules    = RULES_BY_PERSONA[persona]    || RULES_BY_PERSONA.high_school;
  // [1] Tabs only show after intro (currentSection >= 0)
  const allTabs        = [...activeSections.map((s, i) => ({ id: i, label: s.label }))];

  const progressPct = currentSection < 0 ? 0
    : currentSection >= activeSections.length ? 100
    : ((currentSection + 1) / activeSections.length) * 100;
  const section     = currentSection >= 0 && currentSection < activeSections.length ? activeSections[currentSection] : null;
  const totalErrors = Object.keys(errors).length;
  const unanswered  = (activeRules[currentSection] || []).filter((r) => !r.check(formData)).length;

  // ── SHARED TAB BAR (only used on survey + conclusion screens) ──
  // [1] Not rendered on intro screen at all
  // [4] Centered via CSS
  const TabBar = ({ current }) => (
    <div className="tabs-bar">
      <div className="tabs-inner">
        {allTabs.map((tab) => {
          const isDone   = tab.id < current;
          const isActive = tab.id === current;
          const tabNum   = `0${tab.id + 1}`;
          const canClick = isDone;
          return (
            <div key={tab.id}
              className={`tab ${isActive ? "active" : ""} ${isDone ? "done" : ""} ${canClick ? "tab-clickable" : ""}`}
              onClick={() => {
                if (!canClick) return;
                setErrors({});
                setCurrentSection(tab.id);
                scrollTop();
              }}>
              <span className="tab-num">{isDone ? "✓" : tabNum}</span>
              <span>{tab.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // SUCCESS SCREEN
  // ─────────────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="survey-wrapper">
        <style>{styles}</style>
        <div className="success-outer">
          <div className="success-card">
            <div className="success-circle">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M8 20L16.5 28.5L32 12" stroke="white" strokeWidth="3.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Thank You, Pioneer!</h2>
            <p>Your response has been recorded. You're helping shape the future of STEM education across Africa.</p>
            <div className="success-pill">Response Submitted ✓</div>
            <div className="share-section" style={{marginTop: "2rem", textAlign: "center"}}>
              <p style={{fontWeight: 500, marginBottom: "0.5rem"}}>Share this with someone who cares about STEM:</p>
              <div className="share-buttons" style={{display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap"}}>
                <a href={`https://wa.me/?text=${encodeURIComponent("I just helped shape the future of STEM education in Africa — take 5 minutes and add your voice too: https://helpstem.africa/survey")}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{background:"#25D366",color:"white",borderRadius:"4px",padding:"0.5rem 1rem",textDecoration:"none",fontWeight:500}}>WhatsApp</a>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Africa's STEM education needs our voices. I just shared mine — add yours: https://helpstem.africa/survey")}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{background:"#1DA1F2",color:"white",borderRadius:"4px",padding:"0.5rem 1rem",textDecoration:"none",fontWeight:500}}>Twitter/X</a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://helpstem.africa/survey")}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{background:"#4267B2",color:"white",borderRadius:"4px",padding:"0.5rem 1rem",textDecoration:"none",fontWeight:500}}>Facebook</a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://helpstem.africa/survey")}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{background:"#0077b5",color:"white",borderRadius:"4px",padding:"0.5rem 1rem",textDecoration:"none",fontWeight:500}}>LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // [1][2][5][6][7] INTRO SCREEN
  // ─────────────────────────────────────────────────────────────────────────
  if (currentSection === -1) {
    const selectedPersona = PERSONAS.find((p) => p.value === formData.persona);

    return (
      <div className="survey-wrapper">
        <style>{styles}</style>

        {/* Top bar — no tabs on intro */}
        <div className="top-bar">
          <div className="top-bar-inner">
            <Logo />
          </div>
          <div className="progress-track"><div className="progress-fill" style={{ width: "0%" }} /></div>
        </div>

        {/* [1] NO TabBar on intro screen */}

        <div className="intro-outer survey-outer">
          <div className="intro-card survey-card">

            <div className="intro-badge">HelpSTEM Survey · 2026</div>
            <h1 className="intro-title">Help Us Fix STEM Education in Africa</h1>

            {/* [7] Mission / cause section — appears first */}
            <div className="mission-box">
              <p className="mission-label">Why This Survey Exists</p>
              <p className="mission-body">
                Across Africa, millions of students study Science, Technology, Engineering, and Mathematics every day, but too many finish school unable to apply what they learned. The gap between what is taught in class and what is actually needed in the real world is wide, and it is costing the continent its next generation of innovators.
              </p>
              <p className="mission-body" style={{ marginTop: "0.65rem" }}>
                This survey is the first step toward fixing that. We are gathering honest data from students, graduates, parents, and educators to understand exactly where the gap is and to build something that closes it. Your voice is the foundation.
              </p>
            </div>

            <div className="intro-divider" />

            {/* STEM explainer */}
            <div className="stem-explainer">
              <p className="stem-explainer-title">What is STEM?</p>
              <p className="stem-explainer-body">
                <strong>STEM</strong> stands for <strong>S</strong>cience, <strong>T</strong>echnology, <strong>E</strong>ngineering, and <strong>M</strong>athematics, the subjects behind almost every invention, solution, and system in the modern world. If you study Physics, Chemistry, Biology, Computer Science, or Mathematics, you are already in the STEM world.
              </p>
            </div>

            <div className="intro-divider" />

            {/* ── PERSONA SELECTOR ── */}
            <div className="persona-section">
              <p className="persona-heading">Who are you? <span className="req-star">*</span></p>
              <p className="persona-subheading">Please, select the option that best describes you.</p>
              <div className="persona-grid">
                {PERSONAS.map((p) => {
                  const isSelected = formData.persona === p.value;
                  return (
                    <label key={p.value} className={`persona-card ${isSelected ? "selected" : ""}`}>
                      <input type="radio" name="persona" value={p.value}
                        checked={isSelected}
                        onChange={() => setField("persona", p.value)}
                        style={{ display: "none" }} />
                      <div className="persona-card-top">
                        <span className="persona-icon">{p.icon}</span>
                        <span className={`persona-check ${isSelected ? "checked" : ""}`}>
                          {isSelected ? "✓" : ""}
                        </span>
                      </div>
                      <p className="persona-title">{p.title}</p>
                      <p className="persona-desc">{p.desc}</p>
                      <p className="persona-time">{p.time}</p>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Persona copy — animated in with back button */}
            {formData.persona && (
              <div className="persona-copy-box" ref={personaCopyRef}>
                <p className="persona-copy-text">{PERSONA_COPY[formData.persona]}</p>
              
              </div>
            )}

            <div className="intro-divider" />
            <div className="intro-meta">
              <div className="intro-meta-item"><span>🔒</span><span>Your answers are confidential and used for research only</span></div>
              <div className="intro-meta-item"><span>⏱</span><span>Takes about <strong>{selectedPersona ? selectedPersona.time.split("·")[0].trim() : "5–12 minutes"}</strong> to complete</span></div>
            </div>
            <button
              className={`btn btn-start ${!formData.persona ? "btn-start-disabled" : ""}`}
              disabled={!formData.persona}
              onClick={() => { setCurrentSection(0); scrollTop(); }}>
              {formData.persona ? `Start Survey →` : "Select who you are to begin"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // [5] CONCLUSION SCREEN — card layout matching intro
  // ─────────────────────────────────────────────────────────────────────────
  if (currentSection === activeSections.length) {
    const isHighSchool = persona === "high_school";

    return (
      <div className="survey-wrapper">
        <style>{styles}</style>
        <div className="top-bar">
          <div className="top-bar-inner">
            <Logo />
            <span className="step-badge">Almost done!</span>
          </div>
          <div className="progress-track"><div className="progress-fill" style={{ width: "95%" }} /></div>
        </div>
        <TabBar current={activeSections.length} />

        <div className="intro-outer survey-outer">
          <div className="intro-card survey-card">
            <div className="conclusion-check">✓</div>
            <h1 className="intro-title" style={{ fontSize: "1.75rem" }}>
              {isHighSchool ? "You're Done — Thank You! 🎉" : "One Last Thing"}
            </h1>
            <p className="intro-lead">
              {isHighSchool
                ? "That's all from us. Thank you for taking the time to share your honest answers — every response helps us build something that actually works for students like you. You are part of what changes STEM in Africa."
                : "Thank you for completing all sections! Your insights are incredibly valuable. We'd love to go deeper with some participants in a short one-on-one conversation. Would you be open to that?"}
            </p>
            <p className="req-legend req-legend-top"><span className="req-star">*</span> Indicates a required field</p>
            <div className="intro-divider" />

            {!isHighSchool && (
              <div className="conclusion-form">
                <p className="conclusion-q">Would you like to be contacted for a one-on-one conversation about your experience? <span className="req-star">*</span></p>
                <div className="radio-group" style={{ marginTop: "0.75rem" }}>
                  {[
                    { value: "yes",   label: "✅ Yes, I'm happy to be contacted" },
                    { value: "maybe", label: "🤔 Maybe, depends on what's involved" },
                    { value: "no",    label: "❌ No, I'd prefer to stay anonymous" },
                  ].map((opt) => (
                    <label key={opt.value} className={`radio-card ${formData.contactConsent === opt.value ? "checked" : ""}`}>
                      <input type="radio" name="contactConsent" value={opt.value}
                        checked={formData.contactConsent === opt.value}
                        onChange={() => setField("contactConsent", opt.value)}
                        style={{ display: "none" }} />
                      <span className="radio-dot"></span>
                      {opt.label}
                    </label>
                  ))}
                </div>

                {(formData.contactConsent === "yes" || formData.contactConsent === "maybe") && (
                  <div className="conclusion-contact-fields">
                    <p className="conclusion-contact-note">Leave your details and we'll reach out — completely optional.</p>
                    <input className="s-input" placeholder="Your name"
                      value={formData.contactName}
                      onChange={(e) => setField("contactName", e.target.value)} />
                    <input className="s-input" placeholder="Phone/WhatsApp number or email"
                      value={formData.contactPhone}
                      onChange={(e) => setField("contactPhone", e.target.value)} />
                  </div>
                )}
              </div>
            )}

            {apiError && <div className="api-error-msg" style={{ marginTop: "1rem" }}>{apiError}</div>}

            <div className="nav-row" style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--border)", marginTop: "1.5rem" }}>
              <button type="button" className="btn btn-back"
                onClick={() => { setCurrentSection(activeSections.length - 1); scrollTop(); }}>
                ← Back
              </button>
              <button type="button" className={`btn btn-submit ${shake ? "btn-shake" : ""}`}
                onClick={handleSubmit}
                disabled={loading || (!isHighSchool && !formData.contactConsent)}>
                {loading ? "Submitting..." : "Submit Response"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // [5] SURVEY QUESTION SCREENS — card layout matching intro
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="survey-wrapper">
      <style>{styles}</style>

      {/* Top bar */}
      <div className="top-bar">
        <div className="top-bar-inner">
          <Logo />
          <div className="top-right">
            <span className="step-badge">Step {currentSection + 1} of {activeSections.length}</span>
            {unanswered > 0 && (
              <span className="required-counter">{unanswered} required {unanswered === 1 ? "field" : "fields"} left</span>
            )}
          </div>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* [1][4] Tab bar — centered, not shown on intro */}
      <TabBar current={currentSection} />

      {/* Validation banner */}
      {totalErrors > 0 && (
        <div className="validation-banner" ref={firstErrorRef}>
          <span className="banner-icon">⚠</span>
          <span>Please answer all required fields before continuing — <strong>{totalErrors} {totalErrors === 1 ? "field" : "fields"}</strong> still need your response.</span>
        </div>
      )}

      {/* [5] Card layout wrapper matching intro */}
      <div className="intro-outer survey-outer">
        <div className="intro-card survey-card">

          {/* Section header */}
          <div className="section-head">
            <div className="section-pill">Section {section.id}</div>
            <h1 className="section-title">{section.title}</h1>
            <p className="section-sub">{section.subtitle}</p>
            {/* [10] Required legend at top, right under subtitle */}
            <p className="req-legend req-legend-top"><span className="req-star">*</span> Indicates a required field</p>
            <div className="title-rule" />
          </div>

          <div className="q-stack">

            {/* ── HIGH SCHOOL SECTION 1 ── */}
            {persona === "high_school" && currentSection === 0 && (<>

              <div className={`q-card ${errors.grade ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q1</span>
                    <span className="q-title-text">Current Grade Level</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">Select the grade or form you are currently in</span>
                </label>
                <select className={`s-select ${errors.grade ? "input-error" : ""}`}
                  value={formData.grade} onChange={(e) => setField("grade", e.target.value)}>
                  <option value="">Select your grade...</option>
                  <option value="S1_G7">Senior 1 / Grade 7 / JSS 1</option>
                  <option value="S2_G8">Senior 2 / Grade 8 / JSS 2</option>
                  <option value="S3_G9">Senior 3 / Grade 9 / JSS 3</option>
                  <option value="S4_G10">Senior 4 / Grade 10 / SS 1</option>
                  <option value="S5_G11">Senior 5 / Grade 11 / SS 2</option>
                  <option value="S6_G12">Senior 6 / Grade 12 / SS 3</option>
                </select>
                <FieldError message={errors.grade} />
              </div>

              <div className={`q-card ${errors.gender ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q2</span>
                    <span className="q-title-text">Gender</span>
                    <span className="req-star">*</span>
                  </div>
                </label>
                <RadioGroup name="gender" options={["Male","Female","Prefer not to say"]}
                  selected={formData.gender} onChange={(v) => setField("gender", v)}
                  hasError={!!errors.gender} />
                <FieldError message={errors.gender} />
              </div>

              <div className={`q-card ${errors.schoolType ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q3</span>
                    <span className="q-title-text">School Type</span>
                    <span className="req-star">*</span>
                  </div>
                </label>
                <RadioGroup name="schoolType"
                  options={["Public / Government","Government-aided","Private","International"]}
                  selected={formData.schoolType} onChange={(v) => setField("schoolType", v)}
                  hasError={!!errors.schoolType} />
                <FieldError message={errors.schoolType} />
              </div>

              <div className={`q-card ${errors.schoolCity || errors.schoolCountry ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q4</span>
                    <span className="q-title-text">Where is your school?</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">City and country where your school is located</span>
                </label>
                <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
                  <input className={`s-input ${errors.schoolCity ? "input-error" : ""}`}
                    style={{ flex: "1", minWidth: "140px" }}
                    placeholder="City / Town (e.g. Kigali, Lagos)"
                    value={formData.schoolCity}
                    onChange={(e) => setField("schoolCity", e.target.value)} />
                  <input className={`s-input ${errors.schoolCountry ? "input-error" : ""}`}
                    style={{ flex: "1", minWidth: "140px" }}
                    placeholder="Country (e.g. Rwanda, Nigeria)"
                    value={formData.schoolCountry}
                    onChange={(e) => setField("schoolCountry", e.target.value)} />
                </div>
                <FieldError message={errors.schoolCity || errors.schoolCountry} />
              </div>

              <div className={`q-card ${errors.schoolResources ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q5</span>
                    <span className="q-title-text">School-Provided Resources</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">Select all that your school provides for students to use</span>
                </label>
                <CheckboxGroup columns={2}
                  options={[
                    "School Desktop Computers","School Laptops","School Tablets / Smartphones",
                    "Reliable Electricity in classrooms",
                    "Physics Lab","Chemistry Lab","Biology Lab","Computer / ICT Lab",
                    "Library / Resource Centre","None of the above","Other",
                  ]}
                  selected={formData.schoolResources}
                  onChange={(v) => toggleCheckbox("schoolResources", v)}
                  hasError={!!errors.schoolResources} />
                {formData.schoolResources.includes("Other") && (
                  <input className="s-input" style={{ marginTop: "0.75rem" }}
                    placeholder="Please specify..."
                    value={formData.schoolResourcesOther}
                    onChange={(e) => setField("schoolResourcesOther", e.target.value)} />
                )}
                <FieldError message={errors.schoolResources} />
              </div>

              <div className={`q-card ${errors.personalTech ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q6</span>
                    <span className="q-title-text">Personal Tech Access</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">What do you personally own or consistently access outside of school?</span>
                </label>
                <CheckboxGroup columns={2}
                  options={["Smartphone","Laptop / PC","Tablet","Stable Wi-Fi / Internet","Basic Electricity at home","None of the above"]}
                  selected={formData.personalTech}
                  onChange={(v) => toggleCheckbox("personalTech", v)}
                  hasError={!!errors.personalTech} />
                <FieldError message={errors.personalTech} />
              </div>

            </>)}

            {/* ── HIGH SCHOOL SECTION 2 ── */}
            {persona === "high_school" && currentSection === 1 && (<>

              <div className={`q-card ${errors.relevanceScale ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q7</span>
                    <span className="q-title-text">The Relevance Scale</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">"STEM formulas feel like they were made for people in another country, not for my life."</span>
                </label>
                <LinearScale value={formData.relevanceScale}
                  onChange={(v) => setField("relevanceScale", v)}
                  hasError={!!errors.relevanceScale} />
                <FieldError message={errors.relevanceScale} />
              </div>

              <div className="q-card">
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q8</span>
                    <span className="q-title-text">The Struggle Ranking</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">Rank all 5 from your biggest pain point at the top to the least — drag or use the arrows</span>
                </label>
                <RankingGroup
                  items={formData.stemStruggle}
                  onChange={(v) => setField("stemStruggle", v)}
                  onReorder={() => setField("stemStruggleReordered", true)} />
              </div>

              <div className={`q-card ${errors.funBuilderScale ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q9</span>
                    <span className="q-title-text">The "Fun" Builder</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">If you could build something fun to prove a math or science concept — like a bridge model, a simple circuit, a weather tracker, or a basic coded app — would you enjoy that more than just reading from a textbook?</span>
                </label>
                <LinearScale value={formData.funBuilderScale}
                  onChange={(v) => setField("funBuilderScale", v)}
                  lowLabel="Not at all" highLabel="Absolutely yes!"
                  hasError={!!errors.funBuilderScale} />
                <FieldError message={errors.funBuilderScale} />
              </div>

              <div className={`q-card ${errors.funBuildIdea ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q10</span>
                    <span className="q-title-text">Your Dream Build</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">Describe one "fun" thing you've always wanted to build or make but didn't have the tools, parts, or guidance to try. It can be small or big — any grade level.</span>
                </label>
                <RotatingPlaceholderInput
                  multiline rows={4}
                  placeholders={DREAM_BUILD_PLACEHOLDERS}
                  className={errors.funBuildIdea ? "input-error" : ""}
                  value={formData.funBuildIdea}
                  onChange={(e) => setField("funBuildIdea", e.target.value)} />
                <FieldError message={errors.funBuildIdea} />
              </div>

              <div className={`q-card ${errors.hasPracticalLabs ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q11</span>
                    <span className="q-title-text">Labs &amp; Practical Engagement</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">Do you currently have practical or lab sessions for your STEM subjects at school, or is it mainly theory and note-taking?</span>
                </label>
                <RadioGroup name="hasPracticalLabs"
                  options={[
                    { value: "yes_regular",   label: "✅ Yes, we have regular lab / practical sessions" },
                    { value: "yes_sometimes", label: "🔄 Sometimes, but not often enough" },
                    { value: "no",            label: "❌ No, it's mostly theory, textbooks, and notes" },
                    { value: "no_resources",  label: "🏫 We have labs but rarely use them due to lack of resources" },
                  ]}
                  selected={formData.hasPracticalLabs}
                  onChange={(v) => setField("hasPracticalLabs", v)}
                  hasError={!!errors.hasPracticalLabs} />
                <FieldError message={errors.hasPracticalLabs} />
              </div>

              <div className={`q-card ${errors.wantLabsScale ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q12</span>
                    <span className="q-title-text">The Lab Desire</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">How much do you feel having more hands-on lab sessions would improve your understanding of STEM?</span>
                </label>
                <LinearScale value={formData.wantLabsScale}
                  onChange={(v) => setField("wantLabsScale", v)}
                  lowLabel="Not at all" highLabel="Absolutely yes!"
                  hasError={!!errors.wantLabsScale} />
                <FieldError message={errors.wantLabsScale} />
              </div>

              <div className={`q-card ${errors.excursionImportance ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q13</span>
                    <span className="q-title-text">The Excursion Effect</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">How important do you think school excursions or field trips to real workplaces (factories, hospitals, tech companies) are for helping you understand STEM better?</span>
                </label>
                <LinearScale value={formData.excursionImportance}
                  onChange={(v) => setField("excursionImportance", v)}
                  lowLabel="Not important at all" highLabel="Extremely important"
                  hasError={!!errors.excursionImportance} />
                <FieldError message={errors.excursionImportance} />
              </div>

            </>)}

            {/* ── HIGH SCHOOL SECTION 3 ── */}
            {persona === "high_school" && currentSection === 2 && (<>

              <div className={`q-card ${errors.dailyApp ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q14</span>
                    <span className="q-title-text">Current Daily App</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">What is one app (social, game, or tool) you use almost every day?</span>
                </label>
                <RotatingPlaceholderInput
                  placeholders={DAILY_APP_PLACEHOLDERS}
                  className={errors.dailyApp ? "input-error" : ""}
                  value={formData.dailyApp}
                  onChange={(e) => setField("dailyApp", e.target.value)} />
                <FieldError message={errors.dailyApp} />
              </div>

              <div className={`q-card ${errors.appLike ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q15</span>
                    <span className="q-title-text">What do you love about that app?</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">e.g. speed, design, features, how it keeps you entertained</span>
                </label>
                <RotatingPlaceholderInput
                  placeholders={APP_LIKE_PLACEHOLDERS}
                  className={errors.appLike ? "input-error" : ""}
                  value={formData.appLike}
                  onChange={(e) => setField("appLike", e.target.value)} />
                <FieldError message={errors.appLike} />
              </div>

              <div className={`q-card ${errors.appHate ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q16</span>
                    <span className="q-title-text">What doesn't work well or needs improvement?</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">What would you fix or improve to make it better for you?</span>
                </label>
                <RotatingPlaceholderInput
                  placeholders={APP_IMPROVE_PLACEHOLDERS}
                  className={errors.appHate ? "input-error" : ""}
                  value={formData.appHate}
                  onChange={(e) => setField("appHate", e.target.value)} />
                <FieldError message={errors.appHate} />
              </div>

              <div className={`q-card ${errors.learningApps ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q17</span>
                    <span className="q-title-text">Existing Learning Apps</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">Do you currently use any app to help you study STEM?</span>
                </label>
                <CheckboxGroup
                  options={[
                    { value: "textbooks", label: "No, only textbooks / notebooks" },
                    { value: "youtube",   label: "YouTube (educational videos)" },
                    { value: "whatsapp",  label: "WhatsApp (study groups)" },
                    { value: "khan",      label: "Khan Academy" },
                    { value: "local",     label: "Local / African Tutoring Apps (e.g. Eneza, uLesson, Passnownow)" },
                    { value: "other",     label: "Other" },
                  ]}
                  selected={formData.learningApps}
                  onChange={(v) => toggleCheckbox("learningApps", v)}
                  hasError={!!errors.learningApps} />
                {formData.learningApps.includes("other") && (
                  <input className="s-input" style={{ marginTop: "0.75rem" }}
                    placeholder="Which app?" value={formData.learningAppsOther}
                    onChange={(e) => setField("learningAppsOther", e.target.value)} />
                )}
                <FieldError message={errors.learningApps} />
              </div>

              <div className="q-card">
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q18</span>
                    <span className="q-title-text">The "Vibe" Check</span>
                    <span className="optional-tag">Optional</span>
                  </div>
                  <span className="q-hint">If you use a learning app, does it feel like "extra school work" or like "playing a game"? Why?</span>
                </label>
                <RotatingPlaceholderInput
                  multiline rows={3}
                  placeholders={VIBE_CHECK_PLACEHOLDERS}
                  value={formData.vibeCheck}
                  onChange={(e) => setField("vibeCheck", e.target.value)} />
              </div>

              <div className={`q-card ${errors.featurePriorities ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q19</span>
                    <span className="q-title-text">Feature Priority</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">Which features would make you keep a new Learning App on your phone? Select all that apply, then tell us anything else you'd love.</span>
                </label>
                <CheckboxGroup columns={2}
                  options={[
                    { value: "offline",   label: "⚡ Works offline — no data needed" },
                    { value: "rewards",   label: "🏆 Rewards and badges when I finish a topic" },
                    { value: "ranking",   label: "🏅 See my ranking alongside friends and classmates" },
                    { value: "tutor",     label: "💬 A tutor I can chat with 24/7" },
                    { value: "videos",    label: "🎥 Short video lessons I can watch anytime" },
                    { value: "community", label: "👥 A community to discuss with other students" },
                    { value: "games",     label: "🎮 Games and challenges that teach concepts" },
                    { value: "progress",  label: "📊 Progress tracking and personalised study plans" },
                  ]}
                  selected={formData.featurePriorities}
                  onChange={(v) => toggleCheckbox("featurePriorities", v)}
                  hasError={!!errors.featurePriorities} />
                <FieldError message={errors.featurePriorities} />
                <div className="suggest-box">
                  <label className="suggest-label">💡 Suggest a feature you don't see above</label>
                  <RotatingPlaceholderInput
                    placeholders={FEATURE_PLACEHOLDERS}
                    value={formData.featureSuggestion}
                    onChange={(e) => setField("featureSuggestion", e.target.value)} />
                </div>
              </div>

              <div className={`q-card ${errors.learningStylePref ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q20</span>
                    <span className="q-title-text">What would best support how you learn?</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">Select all the ways of learning that you think would work well for you, or that you'd genuinely enjoy.</span>
                </label>
                <div className="learning-style-grid">
                  {[
                    { value: "ai_chat",     icon: "🤖",  title: "AI Tutor Chat",          desc: "An AI that chats with me, answers my questions, and explains things in a way that makes sense to me personally" },
                    { value: "real_person", icon: "🧑‍🏫", title: "Real Person / Mentor",   desc: "A human teacher or mentor I can message or video call when I'm stuck" },
                    { value: "video",       icon: "🎥",  title: "Recorded Video Lessons",  desc: "Short videos I can watch, pause, and replay at my own pace" },
                    { value: "ai_video",    icon: "✨🎥", title: "AI + Video Combined",    desc: "Videos that connect to my goals and learning progress — making content feel personal to me" },
                    { value: "community",   icon: "👥",  title: "Peer Group Discussion",   desc: "Learning with and from other students — sharing ideas and asking questions together" },
                    { value: "hands_on",    icon: "🔧",  title: "Hands-On / Physical Kit", desc: "Building or experimenting with real parts that connect to what I'm studying" },
                  ].map((opt) => {
                    const isChecked = formData.learningStylePref.includes(opt.value);
                    return (
                      <label key={opt.value} className={`learning-style-card ${isChecked ? "checked" : ""} ${errors.learningStylePref ? "ls-error" : ""}`}>
                        <input type="checkbox" value={opt.value} checked={isChecked}
                          onChange={() => toggleCheckbox("learningStylePref", opt.value)}
                          style={{ display: "none" }} />
                        <div className="ls-top">
                          <span className="ls-icon">{opt.icon}</span>
                          <span className="ls-check">{isChecked ? "✓" : ""}</span>
                        </div>
                        <p className="ls-title">{opt.title}</p>
                        <p className="ls-desc">{opt.desc}</p>
                      </label>
                    );
                  })}
                </div>
                <FieldError message={errors.learningStylePref} />
                <div className="suggest-box">
                  <label className="suggest-label">💬 Anything else about how you learn best?</label>
                  <textarea className="s-textarea" rows={2}
                    placeholder="e.g. I need a real-life example first before the theory makes sense to me..."
                    value={formData.learningStyleOpen}
                    onChange={(e) => setField("learningStyleOpen", e.target.value)} />
                </div>
              </div>

            </>)}

            {/* ── HIGH SCHOOL SECTION 4 ── */}
            {persona === "high_school" && currentSection === 3 && (<>

              <div className={`q-card ${errors.inventorRepresentation ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q21</span>
                    <span className="q-title-text">Representation</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">When you think of an "Inventor" or "Scientist," do you imagine someone from your own community or country?</span>
                </label>
                <RadioGroup name="inventorRepresentation"
                  options={[
                    { value: "yes", label: "✅ Yes, I can picture someone who looks like me" },
                    { value: "no",  label: "❌ No, I usually picture someone from another country" },
                  ]}
                  selected={formData.inventorRepresentation}
                  onChange={(v) => setField("inventorRepresentation", v)}
                  hasError={!!errors.inventorRepresentation} />
                <FieldError message={errors.inventorRepresentation} />
              </div>

              <div className={`q-card ${errors.stemGoal ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q22</span>
                    <span className="q-title-text">The Goal</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">Are you studying STEM to solve a problem in Africa or globally — or just to pass your exams?</span>
                </label>
                <RadioGroup name="stemGoal"
                  options={[
                    { value: "solve", label: "🌍 I want to solve real problems — in Africa or globally" },
                    { value: "exams", label: "📝 Honestly, I just want to pass my exams" },
                    { value: "both",  label: "🎯 Both — pass exams AND eventually solve real problems" },
                  ]}
                  selected={formData.stemGoal} onChange={(v) => setField("stemGoal", v)}
                  hasError={!!errors.stemGoal} />
                <FieldError message={errors.stemGoal} />
              </div>

              <div className={`q-card ${errors.stemWhyChoice ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q23</span>
                    <span className="q-title-text">The "Why" Behind the Choice</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">Why are you currently in the STEM track instead of Arts or Humanities?</span>
                </label>
                <RadioGroup name="stemWhyChoice"
                  options={[
                    { value: "passionate", label: "🔥 I am genuinely passionate about building and discovering things" },
                    { value: "family",     label: "👨‍👩‍👧 My parents or family encouraged or pressured me to choose it" },
                    { value: "friends",    label: "👫 My friends all chose STEM and I didn't want to be left behind" },
                    { value: "job",        label: "💰 I believe it is the best path to a high-paying job" },
                  ]}
                  selected={formData.stemWhyChoice} onChange={(v) => setField("stemWhyChoice", v)}
                  hasError={!!errors.stemWhyChoice} />
                <FieldError message={errors.stemWhyChoice} />
              </div>

              <div className={`q-card ${errors.dreamCareer ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q24</span>
                    <span className="q-title-text">Dream Career Mapping</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">What do you want to be when you grow up? Be honest, you can write "I don't know yet" if you're still figuring it out. No wrong answers here.</span>
                </label>
                <RotatingPlaceholderInput
                  placeholders={DREAM_CAREER_PLACEHOLDERS}
                  className={errors.dreamCareer ? "input-error" : ""}
                  value={formData.dreamCareer}
                  onChange={(e) => setField("dreamCareer", e.target.value)} />
                <FieldError message={errors.dreamCareer} />
              </div>

              <div className="q-card">
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q24b</span>
                    <span className="q-title-text">Classroom → Career Connection</span>
                    <span className="optional-tag">Optional</span>
                  </div>
                  <span className="q-hint">How much do you feel your current classroom lessons are actually helping you become that person?</span>
                </label>
                <LinearScale value={formData.dreamCareerScale}
                  onChange={(v) => setField("dreamCareerScale", v)}
                  lowLabel="Not at all helping" highLabel="Fully preparing me" />
              </div>

              <div className={`q-card ${errors.phygitalCombined ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">Q25</span>
                    <span className="q-title-text">Learning Software + Hands-on = Real ?</span>
                    <span className="req-star">*</span>
                  </div>
                  <span className="q-hint">If your school lessons were delivered through a mix of a cool learning app AND a physical kit you could hold and build with — would that make you feel like you are actually becoming your dream person (e.g. a doctor, engineer, or tech founder)?</span>
                </label>
                <RadioGroup name="phygitalCombined"
                  options={[
                    { value: "yes",   label: "🔥 Yes, that would make it feel real and exciting" },
                    { value: "maybe", label: "🤔 Maybe, it depends on how well it connects to my goal" },
                    { value: "no",    label: "❌ No, I don't see the connection" },
                  ]}
                  selected={formData.phygitalCombined} onChange={(v) => setField("phygitalCombined", v)}
                  hasError={!!errors.phygitalCombined} />
                <FieldError message={errors.phygitalCombined} />
              </div>

              {apiError && <div className="api-error-msg">{apiError}</div>}

            </>)}

            {/* ── UNDERGRAD SECTION 1 ── */}
            {persona === "undergrad" && currentSection === 0 && (<>
              <div className={`q-card ${errors.ugMajor ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">A1</span><span className="q-title-text">Current Major / Degree</span><span className="req-star">*</span></div>
                  <span className="q-hint">What are you currently studying or what degree did you complete?</span>
                </label>
                <RotatingPlaceholderInput
                  placeholders={[
                    "e.g. BSc Electrical Engineering — University of Lagos...",
                    "e.g. MSc Computer Science — University of Rwanda...",
                    "e.g. MBChB Medicine — University of Nairobi...",
                    "e.g. BEng Mechanical Engineering — Covenant University...",
                    "e.g. BSc Agricultural Engineering — KNUST, Ghana...",
                  ]}
                  className={errors.ugMajor ? "input-error" : ""}
                  value={formData.ugMajor} onChange={(e) => setField("ugMajor", e.target.value)} />
                <FieldError message={errors.ugMajor} />
              </div>

              <div className={`q-card ${errors.ugHighSchoolOrigin ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">A2</span><span className="q-title-text">High School Origin</span><span className="req-star">*</span></div>
                  <span className="q-hint">Which city and country did you attend high school in?</span>
                </label>
                <RotatingPlaceholderInput
                  placeholders={["e.g. Kigali, Rwanda","e.g. Lagos, Nigeria","e.g. Nairobi, Kenya","e.g. Accra, Ghana","e.g. Kampala, Uganda"]}
                  className={errors.ugHighSchoolOrigin ? "input-error" : ""}
                  value={formData.ugHighSchoolOrigin} onChange={(e) => setField("ugHighSchoolOrigin", e.target.value)} />
                <FieldError message={errors.ugHighSchoolOrigin} />
              </div>

              <div className={`q-card ${errors.ugPastPlatforms ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">A3</span><span className="q-title-text">Past Learning Platforms</span><span className="req-star">*</span></div>
                  <span className="q-hint">Did you use any digital learning apps or platforms while in high school? Select all that apply.</span>
                </label>
                <CheckboxGroup
                  options={["None","YouTube","Khan Academy","uLesson","Passnownow","WhatsApp Study Groups","Other"]}
                  selected={formData.ugPastPlatforms}
                  onChange={(v) => toggleCheckbox("ugPastPlatforms", v)}
                  hasError={!!errors.ugPastPlatforms} />
                {formData.ugPastPlatforms.includes("Other") && (
                  <input className="s-input" style={{ marginTop: "0.75rem" }}
                    placeholder="Which platform or app?"
                    value={formData.ugPlatformOther}
                    onChange={(e) => setField("ugPlatformOther", e.target.value)} />
                )}
                <FieldError message={errors.ugPastPlatforms} />
              </div>

              {formData.ugPastPlatforms.length > 0 && !formData.ugPastPlatforms.includes("None") && (<>
                <div className="q-card">
                  <label className="q-label">
                    <div className="q-title-row"><span className="q-tag">A3a</span><span className="q-title-text">Usage Context</span><span className="optional-tag">Optional</span></div>
                    <span className="q-hint">Was this used primarily inside school (provided by teachers) or outside school (on your own)?</span>
                  </label>
                  <RadioGroup name="ugPlatformContext"
                    options={[
                      { value: "inside",  label: "🏫 Inside school, teachers recommended or required it" },
                      { value: "outside", label: "🏠 Outside school, I found and used it on my own" },
                      { value: "both",    label: "🔄 Both, inside and outside school" },
                    ]}
                    selected={formData.ugPlatformContext}
                    onChange={(v) => setField("ugPlatformContext", v)} />
                </div>

                <div className="q-card">
                  <label className="q-label">
                    <div className="q-title-row"><span className="q-tag">A3b</span><span className="q-title-text">Usage Frequency</span><span className="optional-tag">Optional</span></div>
                    <span className="q-hint">How often did you typically use it?</span>
                  </label>
                  <RadioGroup name="ugPlatformFrequency"
                    options={[
                      { value: "daily",   label: "📅 Daily, it was part of my routine" },
                      { value: "weekly",  label: "🗓️ A few times a week" },
                      { value: "monthly", label: "📆 Once or twice a month" },
                      { value: "exam",    label: "📝 Only around exam time" },
                    ]}
                    selected={formData.ugPlatformFrequency}
                    onChange={(v) => setField("ugPlatformFrequency", v)} />
                </div>

                <div className="q-card">
                  <label className="q-label">
                    <div className="q-title-row"><span className="q-tag">A3c</span><span className="q-title-text">Platform Sentiment</span><span className="optional-tag">Optional</span></div>
                    <span className="q-hint">Did you like it? Please explain: focus on speed, engagement, or data costs.</span>
                  </label>
                  <RotatingPlaceholderInput multiline rows={3}
                    placeholders={[
                      "e.g. I liked Khan Academy but the videos took forever to load and used all my data...",
                      "e.g. uLesson was great but the content didn't always match my curriculum exactly...",
                      "e.g. YouTube was free but I'd spend hours watching unrelated things and lose focus...",
                      "e.g. WhatsApp groups were helpful but too noisy and distracting after a while...",
                    ]}
                    value={formData.ugPlatformSentiment}
                    onChange={(e) => setField("ugPlatformSentiment", e.target.value)} />
                </div>
              </>)}
            </>)}

            {/* ── UNDERGRAD SECTION 2 ── */}
            {persona === "undergrad" && currentSection === 1 && (<>
              <div className={`q-card ${errors.ugTheoryGapScale ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">B1</span><span className="q-title-text">Theory vs. Practice</span><span className="req-star">*</span></div>
                  <span className="q-hint">"The theories taught in my high school STEM classes were disconnected from actual practice or real-world interaction."</span>
                </label>
                <LinearScale value={formData.ugTheoryGapScale}
                  onChange={(v) => setField("ugTheoryGapScale", v)}
                  lowLabel="Strongly Disagree" highLabel="Strongly Agree"
                  hasError={!!errors.ugTheoryGapScale} />
                <FieldError message={errors.ugTheoryGapScale} />
              </div>

              <div className={`q-card ${errors.ugTeacherStyle ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">B2</span><span className="q-title-text">Teacher Style</span><span className="req-star">*</span></div>
                  <span className="q-hint">Did your high school teachers rely mostly on formulas and textbooks, or did they use local, practical examples?</span>
                </label>
                <RadioGroup name="ugTeacherStyle"
                  options={[
                    { value: "formulas",  label: "📖 Mostly formulas and textbooks (very academic)" },
                    { value: "practical", label: "🌍 Local, practical examples (connected to real life)" },
                    { value: "mixed",     label: "⚖️ A mix of both approaches" },
                  ]}
                  selected={formData.ugTeacherStyle}
                  onChange={(v) => setField("ugTeacherStyle", v)}
                  hasError={!!errors.ugTeacherStyle} />
                <FieldError message={errors.ugTeacherStyle} />
              </div>

              <div className={`q-card ${errors.ugMissingTools ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">B3</span><span className="q-title-text">The Missing Tools</span><span className="req-star">*</span></div>
                  <span className="q-hint">Which of these tools or experiences did you encounter for the first time after high school but wish you had mastered earlier?</span>
                </label>
                <CheckboxGroup columns={2}
                  options={[
                    "Physics Lab (actual experiments)",
                    "Chemistry Lab (titrations, reactions)",
                    "Biology Lab (dissections, microscopy)",
                    "Python / Coding",
                    "Robotics Kits",
                    "3D Printers",
                    "CAD / Engineering Software",
                    "Electronics Prototyping",
                    "VR Simulations",
                    "Advanced Lab Equipment",
                  ]}
                  selected={formData.ugMissingTools}
                  onChange={(v) => toggleCheckbox("ugMissingTools", v)}
                  hasError={!!errors.ugMissingTools} />
                <FieldError message={errors.ugMissingTools} />
              </div>
            </>)}

            {/* ── UNDERGRAD SECTION 3 ── */}
            {persona === "undergrad" && currentSection === 2 && (<>
              <div className={`q-card ${errors.ugDisconnectDesc ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">C1</span><span className="q-title-text">The Disconnect</span><span className="req-star">*</span></div>
                  <span className="q-hint">Describe a topic where you had the "theory" down in high school but felt lost during a university lab or a real-world engagement (like an internship or project).</span>
                </label>
                <RotatingPlaceholderInput multiline rows={4}
                  placeholders={UG_DISCONNECT_PLACEHOLDERS}
                  className={errors.ugDisconnectDesc ? "input-error" : ""}
                  value={formData.ugDisconnectDesc}
                  onChange={(e) => setField("ugDisconnectDesc", e.target.value)} />
                <FieldError message={errors.ugDisconnectDesc} />
              </div>

              <div className={`q-card ${errors.ug21CenturyReadiness ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">C2</span><span className="q-title-text">21st-Century Readiness</span><span className="req-star">*</span></div>
                  <span className="q-hint">Do you believe your high school education gave you sufficient digital and practical / real-world literacy to compete globally?</span>
                </label>
                <RadioGroup name="ug21CenturyReadiness"
                  options={[
                    { value: "yes",      label: "✅ Yes, I felt well prepared" },
                    { value: "somewhat", label: "🤔 Somewhat, there were clear gaps" },
                    { value: "no",       label: "❌ No, I had to learn most practical skills on my own" },
                  ]}
                  selected={formData.ug21CenturyReadiness}
                  onChange={(v) => setField("ug21CenturyReadiness", v)}
                  hasError={!!errors.ug21CenturyReadiness} />
                <FieldError message={errors.ug21CenturyReadiness} />
              </div>

              <div className="q-card">
                <label className="q-label">
                  <div className="q-title-row">
                    <span className="q-tag">C3</span>
                    <span className="q-title-text">Paying It Forward</span>
                    <span className="optional-tag">Optional</span>
                  </div>
                  <span className="q-hint">Now that you've experienced the gap between classroom theory and real-world practice, would you be open to helping close that gap for the next generation of African STEM students coming up behind you?</span>
                </label>
                <RadioGroup name="ugPayItForward"
                  options={[
                    { value: "yes_volunteer", label: "🔥 Yes, I'd love to mentor or teach younger students, even part-time" },
                    { value: "yes_paid",      label: "💼 Yes, but only if there's a structured paid opportunity or certification attached" },
                    { value: "maybe",         label: "🤔 Maybe, it depends on the time commitment and format" },
                    { value: "no",            label: "❌ Not right now, I'm too focused on my own career" },
                  ]}
                  selected={formData.ugPayItForward}
                  onChange={(v) => setField("ugPayItForward", v)} />
              </div>

              {(formData.ugPayItForward === "yes_volunteer" || formData.ugPayItForward === "yes_paid") && (
                <div className="q-card">
                  <label className="q-label">
                    <div className="q-title-row">
                      <span className="q-tag">C3a</span>
                      <span className="q-title-text">What would you teach/mentor?</span>
                      <span className="optional-tag">Optional</span>
                    </div>
                    <span className="q-hint">What subject or skill would you most want to teach or pass on or mentor students in?</span>
                  </label>
                  <RotatingPlaceholderInput
                    placeholders={[
                      "e.g. Python and data analysis — I wish I had learned it earlier...",
                      "e.g. Electronics and circuit building — it changed how I think...",
                      "e.g. How to survive university lab practicals without panicking...",
                      "e.g. How to build a real project from scratch, not just theory...",
                    ]}
                    value={formData.ugWhatToTeach}
                    onChange={(e) => setField("ugWhatToTeach", e.target.value)} />
                </div>
              )}
            </>)}

            {/* ── PARENT SECTION 1 ── */}
            {persona === "parent" && currentSection === 0 && (<>
              <div className={`q-card ${errors.parentFieldAwareness ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">A1</span><span className="q-title-text">Field Awareness</span><span className="req-star">*</span></div>
                  <span className="q-hint">Before encouraging your child to study a specific STEM field (e.g. Engineering vs. Computer Science), how confident do you feel that you know exactly what a professional in that field does every day?</span>
                </label>
                <LinearScale value={formData.parentFieldAwareness}
                  onChange={(v) => setField("parentFieldAwareness", v)}
                  lowLabel="Not at all confident" highLabel="Very confident"
                  hasError={!!errors.parentFieldAwareness} />
                <FieldError message={errors.parentFieldAwareness} />
              </div>

              <div className={`q-card ${errors.parentCurriculumAwareness ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">A2</span><span className="q-title-text">Curriculum Awareness</span><span className="req-star">*</span></div>
                  <span className="q-hint">How aware are you of how regularly the national curriculum your child is studying is reviewed or updated and whether it prepares them for today's workplace or future careers in technology?</span>
                </label>
                <RadioGroup name="parentCurriculumAwareness"
                  options={[
                    { value: "very",       label: "✅ Very aware, I actively follow curriculum changes and school updates" },
                    { value: "somewhat",   label: "🤔 Somewhat, I know the basics but not the specifics" },
                    { value: "not_much",   label: "📋 Not much, I trust the school to handle it" },
                    { value: "not_at_all", label: "❌ Not at all, I had no idea this was something to watch" },
                  ]}
                  selected={formData.parentCurriculumAwareness}
                  onChange={(v) => setField("parentCurriculumAwareness", v)}
                  hasError={!!errors.parentCurriculumAwareness} />
                <FieldError message={errors.parentCurriculumAwareness} />
              </div>

              <div className={`q-card ${errors.parentValueImportance ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">A3</span><span className="q-title-text">Value of Global Tech Readiness</span><span className="req-star">*</span></div>
                  <span className="q-hint">How important is it to you that your child is prepared for a global tech career?</span>
                </label>
                <RadioGroup name="parentValueImportance"
                  options={[
                    { value: "critical",  label: "🔥 It is the most important thing, I think about it often" },
                    { value: "important", label: "✅ It is very important but not my only priority" },
                    { value: "somewhat",  label: "🤔 Somewhat, I mainly want them to get good grades first" },
                    { value: "not",       label: "❌ Not a current priority for our family" },
                  ]}
                  selected={formData.parentValueImportance}
                  onChange={(v) => setField("parentValueImportance", v)}
                  hasError={!!errors.parentValueImportance} />
                <FieldError message={errors.parentValueImportance} />
              </div>
            </>)}

            {/* ── PARENT SECTION 2 ── */}
            {persona === "parent" && currentSection === 1 && (<>
              <div className={`q-card ${errors.parentExternalResources ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">B1</span><span className="q-title-text">External Resources</span><span className="req-star">*</span></div>
                  <span className="q-hint">How do you currently structure your child's learning outside of school? Select all that apply.</span>
                </label>
                <CheckboxGroup columns={2}
                  options={["Private Tutors","Online Courses","Educational Toys / Kits","Summer or Holiday Camps","Extra reading / workbooks","None — school is enough"]}
                  selected={formData.parentExternalResources}
                  onChange={(v) => toggleCheckbox("parentExternalResources", v)}
                  hasError={!!errors.parentExternalResources} />
                <FieldError message={errors.parentExternalResources} />
              </div>

              <div className={`q-card ${errors.parentSuccessMetric ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">B2</span><span className="q-title-text">Success Metric</span><span className="req-star">*</span></div>
                  <span className="q-hint">How do you measure whether these outside resources are actually working? Select all that apply.</span>
                </label>
                <CheckboxGroup
                  options={[
                    { value: "grades",     label: "📊 Better school grades or report card results" },
                    { value: "building",   label: "🔧 The child building, fixing, or creating things at home" },
                    { value: "curiosity",  label: "🧠 Increased excitement, questions, and curiosity" },
                    { value: "confidence", label: "💬 More confidence when talking about STEM topics" },
                    { value: "unsure",     label: "🤷 I'm not sure how to measure it yet" },
                  ]}
                  selected={formData.parentSuccessMetric}
                  onChange={(v) => toggleCheckbox("parentSuccessMetric", v)}
                  hasError={!!errors.parentSuccessMetric} />
                <FieldError message={errors.parentSuccessMetric} />
              </div>
            </>)}

            {/* ── PARENT SECTION 3 ── */}
            {persona === "parent" && currentSection === 2 && (<>
              <div className={`q-card ${errors.parentMaxInvestment ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">C1</span><span className="q-title-text">Investment Range</span><span className="req-star">*</span></div>
                  <span className="q-hint">What is the maximum you would be willing to pay per term for a structured programme that combines digital learning tools and hands-on practical resources to ensure your child is globally competitive?</span>
                </label>
                <RadioGroup name="parentMaxInvestment"
                  options={currencyConfig.tiers}
                  selected={formData.parentMaxInvestment}
                  onChange={(v) => setField("parentMaxInvestment", v)}
                  hasError={!!errors.parentMaxInvestment} />
                <FieldError message={errors.parentMaxInvestment} />
              </div>

              <div className={`q-card ${errors.parentPaymentModel ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">C2</span><span className="q-title-text">Payment Model Preference</span><span className="req-star">*</span></div>
                  <span className="q-hint">Which payment structure would work best for your family?</span>
                </label>
                <RadioGroup name="parentPaymentModel"
                  options={[
                    { value: "one_time",    label: "💳 One-time purchase: pay once for a kit and access" },
                    { value: "per_term",    label: "📅 Per term: pay each school term, like a lab fee" },
                    { value: "monthly",     label: "🔄 Monthly subscription: small recurring payment for ongoing access" },
                    { value: "freemium",    label: "🆓 Freemium: free basic access, pay to unlock advanced content" },
                    { value: "school_pays", label: "🏫 School should cover it: include it in school fees" },
                  ]}
                  selected={formData.parentPaymentModel}
                  onChange={(v) => setField("parentPaymentModel", v)}
                  hasError={!!errors.parentPaymentModel} />
                <FieldError message={errors.parentPaymentModel} />
              </div>
              {apiError && <div className="api-error-msg">{apiError}</div>}
            </>)}

            {/* ── ADMIN SECTION 1 — Reality Check ── */}
            {persona === "admin" && currentSection === 0 && (<>
              <div className={`q-card ${errors.adminPerfMastery ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">A1</span><span className="q-title-text">Performance vs. Mastery</span><span className="req-star">*</span></div>
                  <span className="q-hint">When a student scores an "A" in a STEM subject, how does the school verify they can actually apply that logic to a real-world project — outside of the exam paper?</span>
                </label>
                <RotatingPlaceholderInput multiline rows={3}
                  placeholders={[
                    "e.g. We don't — exams are the only measure we currently have...",
                    "e.g. We run a practical at the end of term, but it's not standardised...",
                    "e.g. Some teachers set project-based assignments, but it varies by class...",
                    "e.g. We rely on class participation and teacher observation...",
                  ]}
                  className={errors.adminPerfMastery ? "input-error" : ""}
                  value={formData.adminPerfMastery}
                  onChange={(e) => setField("adminPerfMastery", e.target.value)} />
                <FieldError message={errors.adminPerfMastery} />
              </div>

              <div className={`q-card ${errors.adminWhyGapFreq ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">A2</span><span className="q-title-text">The "Why" Gap</span><span className="req-star">*</span></div>
                  <span className="q-hint">How often do teachers in your school report that students ask "Why are we learning this?" or "How is this used in real life?" — and how well does the current curriculum help you answer those questions?</span>
                </label>
                <RadioGroup name="adminWhyGapFreq"
                  options={[
                    { value: "very_often",       label: "🔥 Very often, it's a constant challenge teachers raise" },
                    { value: "sometimes",         label: "🔄 Sometimes, mainly in certain subjects like Physics or Maths" },
                    { value: "rarely",            label: "🤔 Rarely, most students seem to accept it without asking" },
                    { value: "curriculum_helps",  label: "✅ The curriculum already provides enough real-world context" },
                  ]}
                  selected={formData.adminWhyGapFreq}
                  onChange={(v) => setField("adminWhyGapFreq", v)}
                  hasError={!!errors.adminWhyGapFreq} />
                <FieldError message={errors.adminWhyGapFreq} />
              </div>

              <div className={`q-card ${errors.adminProfLeap ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">A3</span><span className="q-title-text">The Professional Leap</span><span className="req-star">*</span></div>
                  <span className="q-hint">When your students transition to university or the workforce, what feedback do you receive about their ability to handle practical, hands-on tasks versus their theoretical knowledge?</span>
                </label>
                <RotatingPlaceholderInput multiline rows={3}
                  placeholders={[
                    "e.g. Universities tell us the students know the theory but struggle in the lab...",
                    "e.g. Employers say students can pass tests but can't solve real engineering problems...",
                    "e.g. We don't formally receive feedback — we lose track of them after they leave...",
                    "e.g. Students who go abroad often say they felt behind their peers in practical skills...",
                  ]}
                  className={errors.adminProfLeap ? "input-error" : ""}
                  value={formData.adminProfLeap}
                  onChange={(e) => setField("adminProfLeap", e.target.value)} />
                <FieldError message={errors.adminProfLeap} />
              </div>

              <div className={`q-card ${errors.adminCurriculumAbstract ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">A4</span><span className="q-title-text">Curriculum Constraints</span><span className="req-star">*</span></div>
                  <span className="q-hint">In your view, which specific parts of the current national curriculum are the most difficult to "bring to life" because they feel too abstract or dated for the modern world?</span>
                </label>
                <RotatingPlaceholderInput multiline rows={3}
                  placeholders={[
                    "e.g. Electricity and circuits — students have no components to actually build with...",
                    "e.g. Organic Chemistry — the reactions mean nothing without a real lab to run them...",
                    "e.g. Computer Science theory — taught without ever touching a real programme...",
                    "e.g. Physics mechanics — formulas with zero connection to how machines actually work...",
                  ]}
                  className={errors.adminCurriculumAbstract ? "input-error" : ""}
                  value={formData.adminCurriculumAbstract}
                  onChange={(e) => setField("adminCurriculumAbstract", e.target.value)} />
                <FieldError message={errors.adminCurriculumAbstract} />
              </div>
            </>)}

            {/* ── ADMIN SECTION 2 — Engagement Inventory ── */}
            {persona === "admin" && currentSection === 1 && (<>
              <div className={`q-card ${errors.adminPracticalPct ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">B1</span><span className="q-title-text">Practical Integration</span><span className="req-star">*</span></div>
                  <span className="q-hint">What percentage of a student's weekly STEM schedule is currently dedicated to building, prototyping, or interacting with technology — versus reading from a textbook or taking notes?</span>
                </label>
                <RadioGroup name="adminPracticalPct"
                  options={[
                    { value: "0_10",   label: "📖 0–10%, almost entirely theory and note-taking" },
                    { value: "10_25",  label: "🔄 10–25%, some practicals but mostly theory" },
                    { value: "25_50",  label: "⚖️ 25–50%, a reasonable balance" },
                    { value: "50plus", label: "🔬 50%+, hands-on learning is a priority" },
                  ]}
                  selected={formData.adminPracticalPct}
                  onChange={(v) => setField("adminPracticalPct", v)}
                  hasError={!!errors.adminPracticalPct} />
                <FieldError message={errors.adminPracticalPct} />
              </div>

              <div className={`q-card ${errors.adminCurrentTools ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">B2</span><span className="q-title-text">Current Tools</span><span className="req-star">*</span></div>
                  <span className="q-hint">Beyond standard science lab chemicals, which physical or digital tools are currently integrated into your Grade 7–12 STEM lessons? Select all that apply.</span>
                </label>
                <CheckboxGroup columns={2}
                  options={[
                    "Coding / Programming (Python, Scratch)",
                    "Robotics Kits",
                    "3D Printers",
                    "CAD / Engineering Software",
                    "Electronics Prototyping (Arduino, breadboards)",
                    "Physics Lab Equipment (oscilloscopes, force meters)",
                    "Biology Lab (microscopes, dissection kits)",
                    "Computer / ICT Lab",
                    "Educational Simulations or VR",
                    "None of the above",
                    "Other",
                  ]}
                  selected={formData.adminCurrentTools}
                  onChange={(v) => toggleCheckbox("adminCurrentTools", v)}
                  hasError={!!errors.adminCurrentTools} />
                {formData.adminCurrentTools.includes("Other") && (
                  <input className="s-input" style={{ marginTop: "0.75rem" }}
                    placeholder="Please describe..."
                    value={formData.adminCurrentToolsOther}
                    onChange={(e) => setField("adminCurrentToolsOther", e.target.value)} />
                )}
                <FieldError message={errors.adminCurrentTools} />
              </div>

              <div className={`q-card ${errors.adminIndustryExposure ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">B3</span><span className="q-title-text">Industry Exposure</span><span className="req-star">*</span></div>
                  <span className="q-hint">Do you currently have any structured programmes that connect students with local professionals or industries to show them STEM in action?</span>
                </label>
                <RadioGroup name="adminIndustryExposure"
                  options={[
                    { value: "yes_structured", label: "✅ Yes, we have a formal programme (visits, talks, partnerships)" },
                    { value: "yes_informal",   label: "🔄 Informally, some teachers do it, but it's not structured" },
                    { value: "no",             label: "❌ No, we don't currently have this" },
                  ]}
                  selected={formData.adminIndustryExposure}
                  onChange={(v) => setField("adminIndustryExposure", v)}
                  hasError={!!errors.adminIndustryExposure} />
                <FieldError message={errors.adminIndustryExposure} />
                {formData.adminIndustryExposure === "no" && (
                  <div style={{ marginTop: "0.75rem" }}>
                    <label className="suggest-label">What is the primary barrier?</label>
                    <RadioGroup name="adminIndustryBarrier"
                      options={[
                        { value: "time",     label: "⏰ Time, the timetable leaves no room" },
                        { value: "cost",     label: "💰 Cost, transport and logistics are too expensive" },
                        { value: "network",  label: "🤝 Network, we don't have the industry contacts" },
                        { value: "priority", label: "📋 Priority, it's not currently seen as necessary" },
                      ]}
                      selected={formData.adminIndustryBarrier}
                      onChange={(v) => setField("adminIndustryBarrier", v)} />
                  </div>
                )}
              </div>

              <div className={`q-card ${errors.adminLabFrequency ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">B4</span><span className="q-title-text">Lab Frequency</span><span className="req-star">*</span></div>
                  <span className="q-hint">In your view, how often should students have dedicated lab or practical sessions each week to meaningfully aid their understanding of STEM?</span>
                </label>
                <RadioGroup name="adminLabFrequency"
                  options={[
                    { value: "daily",      label: "📅 Daily, every lesson should have a practical element" },
                    { value: "3_per_week", label: "🗓️ 3 times a week, enough to reinforce each topic properly" },
                    { value: "1_per_week", label: "🔬 Once a week, a dedicated lab session per subject" },
                    { value: "per_term",   label: "📆 A few times per term, after each major topic" },
                    { value: "not_sure",   label: "🤔 I'm not sure, it depends on the subject" },
                  ]}
                  selected={formData.adminLabFrequency}
                  onChange={(v) => setField("adminLabFrequency", v)}
                  hasError={!!errors.adminLabFrequency} />
                <FieldError message={errors.adminLabFrequency} />
              </div>
            </>)}

            {/* ── ADMIN SECTION 3 — The Benefit Bridge ── */}
            {persona === "admin" && currentSection === 2 && (<>
              <div className={`q-card ${errors.adminContextualLearning ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">C1</span><span className="q-title-text">Contextual Learning</span><span className="req-star">*</span></div>
                  <span className="q-hint">If there was a way to keep the full rigour of the national curriculum but replace abstract textbook examples with hyper-localised problems — like Rwandan agritech challenges or Nigerian engineering case studies — how would that change student engagement?</span>
                </label>
                <RadioGroup name="adminContextualLearning"
                  options={[
                    { value: "significant", label: "🔥 Significant, students would feel the relevance immediately" },
                    { value: "moderate",    label: "✅ Moderate, it would help, but other factors also matter" },
                    { value: "unsure",      label: "🤔 Unsure, hard to know without trying it" },
                    { value: "minimal",     label: "📋 Minimal, students care more about exam results than context" },
                  ]}
                  selected={formData.adminContextualLearning}
                  onChange={(v) => setField("adminContextualLearning", v)}
                  hasError={!!errors.adminContextualLearning} />
                <FieldError message={errors.adminContextualLearning} />
              </div>

              <div className={`q-card ${errors.adminPhygitalSandbox ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">C2</span><span className="q-title-text">The "Phygital" Advantage</span><span className="req-star">*</span></div>
                  <span className="q-hint">If students could first use a virtual digital "sandbox" to test and simulate their logic safely — before moving to a low-cost, durable physical kit — would that solve your resource and risk concerns around practicals?</span>
                </label>
                <RadioGroup name="adminPhygitalSandbox"
                  options={[
                    { value: "yes",   label: "✅ Yes, that would make practicals feasible at scale" },
                    { value: "maybe", label: "🤔 Maybe, depends on the quality of the simulation" },
                    { value: "no",    label: "❌ No, our barriers go beyond just resources" },
                  ]}
                  selected={formData.adminPhygitalSandbox}
                  onChange={(v) => setField("adminPhygitalSandbox", v)}
                  hasError={!!errors.adminPhygitalSandbox} />
                <FieldError message={errors.adminPhygitalSandbox} />
              </div>

              <div className={`q-card ${errors.adminTeacherEmpowerment ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">C3</span><span className="q-title-text">Teacher Empowerment</span><span className="req-star">*</span></div>
                  <span className="q-hint">Instead of asking teachers to invent their own practicals from scratch, what if a curriculum engine automatically provided them with project-based assessments that already satisfy national exam requirements?</span>
                </label>
                <RadioGroup name="adminTeacherEmpowerment"
                  options={[
                    { value: "game_changer", label: "🔥 That would be a game-changer, teachers need exactly that" },
                    { value: "helpful",      label: "✅ Very helpful, it would reduce teacher workload significantly" },
                    { value: "depends",      label: "🤔 It depends, teachers would still need training to use it" },
                    { value: "not_priority", label: "📋 Not a top priority, we have other blockers first" },
                  ]}
                  selected={formData.adminTeacherEmpowerment}
                  onChange={(v) => setField("adminTeacherEmpowerment", v)}
                  hasError={!!errors.adminTeacherEmpowerment} />
                <FieldError message={errors.adminTeacherEmpowerment} />
              </div>
            </>)}

            {/* ── ADMIN SECTION 4 — Pilot & Sustainability ── */}
            {persona === "admin" && currentSection === 3 && (<>
              <div className={`q-card ${errors.adminHubFit ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">D1</span><span className="q-title-text">The "Innovation Hub" Fit</span><span className="req-star">*</span></div>
                  <span className="q-hint">Based on your current timetable and school structure, would a "phygital" STEM programme fit better as a core classroom requirement integrated into existing lessons, or as an elite after-school Innovation Club?</span>
                </label>
                <RadioGroup name="adminHubFit"
                  options={[
                    { value: "core",         label: "📚 Core classroom, integrated directly into daily STEM lessons" },
                    { value: "after_school", label: "🌇 After-school Innovation Club, for motivated students" },
                    { value: "dedicated",    label: "🔬 Dedicated lab session, one fixed period per week" },
                    { value: "all",          label: "✨ All of the above, maximum integration across all formats" },
                  ]}
                  selected={formData.adminHubFit}
                  onChange={(v) => setField("adminHubFit", v)}
                  hasError={!!errors.adminHubFit} />
                <FieldError message={errors.adminHubFit} />
              </div>

              <div className={`q-card ${errors.adminSustainabilityModel ? "card-error" : ""}`}>
                <label className="q-label">
                  <div className="q-title-row"><span className="q-tag">D2</span><span className="q-title-text">Sustainability</span><span className="req-star">*</span></div>
                  <span className="q-hint">To ensure these resources are not just a "one-time" event, which model would work best for your school?</span>
                </label>
                <RadioGroup name="adminSustainabilityModel"
                  options={[
                    { value: "parent_lab_fee",   label: "👨‍🎓 Parent-funded lab fee, small recurring cost per student per term" },
                    { value: "school_license",   label: "🏫 School-wide institutional license, one annual invoice to the school" },
                    { value: "grant_subsidised", label: "🏛️ Government or grant-subsidised, we would apply for funding" },
                    { value: "mixed",            label: "⚖️ Mixed model, part school budget, part parent contribution" },
                  ]}
                  selected={formData.adminSustainabilityModel}
                  onChange={(v) => setField("adminSustainabilityModel", v)}
                  hasError={!!errors.adminSustainabilityModel} />
                <FieldError message={errors.adminSustainabilityModel} />
              </div>
              {apiError && <div className="api-error-msg">{apiError}</div>}
            </>)}

          </div>{/* end q-stack */}

          {/* Navigation */}
          <div className="nav-row">
            {currentSection > 0
              ? <button type="button" className="btn btn-back" onClick={handleBack}>← Back</button>
              : <button type="button" className="btn btn-back" onClick={() => { setErrors({}); setCurrentSection(-1); scrollTop(); }}>← Back</button>}

            {currentSection < activeSections.length - 1
              ? <button type="button" className={`btn btn-next ${shake ? "btn-shake" : ""}`} onClick={handleNext}>
                  Continue →
                </button>
              : <button type="button" className={`btn btn-next ${shake ? "btn-shake" : ""}`}
                  onClick={() => {
                    const sectionErrors = getSectionErrors(currentSection, formData, activeRules);
                    if (Object.keys(sectionErrors).length > 0) { setErrors(sectionErrors); triggerShake(); return; }
                    setErrors({});
                    setCurrentSection(activeSections.length);
                    scrollTop();
                  }}>
                  Next: Final Step →
                </button>}
          </div>

        </div>{/* end survey-card */}
      </div>{/* end survey-outer */}
    </div>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    /* ── Brand palette ── */
      --blue:          #233F92;
      --blue-d:        #1a2f6e;
      --blue-bg:       #eef0f9;
      --blue-mid:      #c5cce8;
      --orange:        #F99638;
      --orange-d:      #e07d1f;
      --orange-bg:     #fff5e9;
      --orange-mid:    #fcd9a8;
      --lightblue:     #10B6EE;
      --lightblue-d:   #0d9fd4;
      --lightblue-bg:  #e6f7fd;
      --lightblue-mid: #b3e8f9;
      --yellow:        #F9CA79;
      --green:         #76CC4D;
      /* ── Neutrals ── */
      --ink:        #1a2035;
      --muted:      #64748B;
      --border:     #E5E7EB;
      --bg:         #F4F6FB;
      --white:      #FFFFFF;
      --red:        #DC2626;
      --red-light:  #FEF2F2;
      --red-border: #FECACA;
      --red-mid:    #FCA5A5;
      --shadow-sm:  0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04);
      --shadow:     0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.05);
      --font:       'Plus Jakarta Sans', sans-serif;
      --r:          10px;
  }

  .survey-wrapper {
    min-height: 100vh;
    background: var(--bg);
    font-family: var(--font);
    color: var(--ink);
  }

  /* ── TOP BAR ── */
  .top-bar {
    background: var(--white);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: var(--shadow-sm);
  }

  .top-bar-inner {
    max-width: 860px;
    margin: 0 auto;
    padding: 0.9rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo { display: flex; align-items: center; gap: 0.6rem; }

  .logo-icon {
    width: 30px; height: 30px;
    background: var(--lightblue);
    border-radius: 8px;
    box-shadow: 3px 3px 0 var(--orange);
  }

  .logo-text { font-size: 1.1rem; font-weight: 800; color: var(--ink); letter-spacing: -0.3px; }
  .logo-accent { color: var(--lightblue); }

  .top-right { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; justify-content: flex-end; }

  .step-badge {
    font-size: 0.8rem; font-weight: 600; color: var(--muted);
    background: var(--bg); border: 1px solid var(--border);
    padding: 0.28rem 0.8rem; border-radius: 99px;
  }

  .required-counter {
    font-size: 0.75rem; font-weight: 700;
    background: #FFF7ED; color: #C2410C;
    border: 1px solid #FED7AA;
    padding: 0.25rem 0.75rem; border-radius: 99px;
    animation: pulse-subtle 2s ease-in-out infinite;
  }

  @keyframes pulse-subtle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.75; }
  }

  .progress-track { height: 3px; background: var(--border); }

.progress-fill {
  height: 100%;
  background: var(--orange);
  transition: width 0.45s ease;
}

  /* ── TABS — [4] centered ── */
  .tabs-bar {
    background: var(--white);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .tabs-inner {
    display: flex;
    justify-content: center;   /* [4] centered on desktop */
    overflow-x: auto;
    scrollbar-width: none;
    padding: 0 1rem;
    max-width: 860px;
    margin: 0 auto;
  }

  .tabs-inner::-webkit-scrollbar { display: none; }

  .tab {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.75rem 1.3rem;
    border-bottom: 2px solid transparent;
    font-size: 0.8rem; font-weight: 600; color: var(--muted);
    white-space: nowrap; transition: all 0.2s;
    flex-shrink: 0;
  }

  .tab.done { color: var(--lightblue); }
  .tab.active { color: var(--lightblue); border-bottom-color: var(--lightblue); background: var(--lightblue-bg); }
  .tab-clickable { cursor: pointer; }
  .tab-clickable:hover { background: var(--teal-bg); color: var(--teal-d); }

  .tab-num {
    width: 22px; height: 22px; border-radius: 50%;
    background: var(--border); color: var(--muted);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.68rem; font-weight: 700; flex-shrink: 0;
    transition: all 0.2s;
  }

  .tab.done .tab-num { background: var(--lightblue); color: white; }
  .tab.active .tab-num { background: var(--lightblue); color: white; }

  /* ── VALIDATION BANNER ── */
  .validation-banner {
    background: var(--red-light);
    border-top: 1px solid var(--red-border);
    border-bottom: 1px solid var(--red-border);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 2rem;
    font-size: 0.88rem;
    color: var(--red);
  }

  .banner-icon {
    width: 26px; height: 26px;
    background: var(--red); color: white;
    border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.85rem; font-weight: 800;
  }

  /* ── SHARED OUTER / CARD — used by intro, survey pages, conclusion [5] ── */
  .intro-outer {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    min-height: calc(100vh - 60px);
    padding: 2.5rem 1.5rem 4rem;
  }

  /* survey pages get a slightly wider card */
  .survey-outer { padding-top: 2rem; }

  .intro-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2.75rem 2.5rem;
    max-width: 620px;
    width: 100%;
    box-shadow: var(--shadow);
  }

  /* survey card is wider to fit checkbox grids etc. */
  .survey-card {
    max-width: 820px;
    padding: 2.5rem 2.5rem 2rem;
  }

  /* ── SECTION HEAD ── */
  .section-head { margin-bottom: 2rem; }

  .section-pill {
    display: inline-flex; align-items: center;
    background: var(--lightblue-bg); color: var(--lightblue);
    border: 1px solid var(--lightblue-mid);
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.8px; text-transform: uppercase;
    padding: 0.28rem 0.85rem; border-radius: 99px; margin-bottom: 0.75rem;
  }

  .section-title {
    font-size: 2rem; font-weight: 800; color: var(--ink);
    letter-spacing: -0.5px; line-height: 1.2; margin-bottom: 0.35rem;
  }

  .section-sub { font-size: 0.97rem; color: var(--muted); }

  /* [10] Required legend at top */
  .req-legend {
    margin-top: 0.65rem;
    font-size: 0.8rem; color: var(--muted);
    display: flex; align-items: center; gap: 0.3rem;
  }

  .req-legend-top { margin-bottom: 0; }

  .title-rule {
    margin-top: 1.25rem; height: 2px;
    background: linear-gradient(90deg, var(--lightblue) 0%, var(--teal) 45%, transparent 100%);
    border-radius: 99px;
  }

  /* ── QUESTIONS ── */
  .q-stack { display: flex; flex-direction: column; gap: 1.25rem; }

  .q-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--r);
    padding: 1.6rem 1.75rem;
    box-shadow: var(--shadow-sm);
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .q-card:focus-within {
    border-color: #93c5fd;
    box-shadow: var(--shadow), 0 0 0 3px rgba(37,99,235,0.07);
  }

  .card-error {
    border-color: var(--red-mid) !important;
    background: var(--red-light) !important;
    box-shadow: var(--shadow-sm), 0 0 0 3px rgba(220,38,38,0.06) !important;
  }

  .q-label {
    display: flex; flex-direction: column; gap: 0.3rem;
    font-size: 0.97rem; font-weight: 700; color: var(--ink);
    margin-bottom: 1.1rem; line-height: 1.4;
  }

  .q-title-row {
    display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
  }

  .q-tag {
    display: inline-flex; align-items: center;
    background: var(--lightblue-bg); color: var(--lightblue);
    font-size: 0.68rem; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;
    padding: 0.18rem 0.55rem; border-radius: 4px; white-space: nowrap; flex-shrink: 0;
  }

  .q-title-text {
    font-size: 0.97rem; font-weight: 700; color: var(--ink); line-height: 1.4;
  }

  .req-star {
    color: var(--red); font-size: 1rem; line-height: 1;
    flex-shrink: 0; margin-left: 1px;
  }

  .optional-tag {
    display: inline-flex; align-items: center;
    background: #F1F5F9; color: var(--muted);
    font-size: 0.68rem; font-weight: 600; letter-spacing: 0.5px;
    padding: 0.18rem 0.55rem; border-radius: 4px; white-space: nowrap; flex-shrink: 0;
  }

  .q-hint { font-weight: 400; font-size: 0.85rem; color: var(--muted); line-height: 1.5; }

  /* ── FIELD ERROR MESSAGE ── */
  .field-error-msg {
    display: flex; align-items: center; gap: 0.45rem;
    color: var(--red); font-size: 0.82rem; font-weight: 600;
    margin-top: 0.65rem;
  }

  .error-icon {
    width: 18px; height: 18px; border-radius: 50%;
    background: var(--red); color: white;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 0.72rem; font-weight: 800; flex-shrink: 0;
  }

  /* ── INPUTS ── */
  .s-select, .s-input {
    width: 100%; background: var(--bg);
    border: 1.5px solid var(--border); border-radius: 8px;
    color: var(--ink); font-family: var(--font); font-size: 0.93rem;
    padding: 0.72rem 1rem; outline: none; appearance: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .s-select:focus, .s-input:focus {
    border-color: var(--lightblue); box-shadow: 0 0 0 3px rgba(37,99,235,0.09);
    background: var(--white);
  }

  .input-error {
    border-color: var(--red) !important;
    background: var(--red-light) !important;
  }

  .input-error:focus {
    border-color: var(--red) !important;
    box-shadow: 0 0 0 3px rgba(220,38,38,0.1) !important;
  }

  .s-textarea {
    width: 100%; background: var(--bg);
    border: 1.5px solid var(--border); border-radius: 8px;
    color: var(--ink); font-family: var(--font); font-size: 0.93rem;
    padding: 0.72rem 1rem; outline: none; resize: vertical; line-height: 1.65;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .s-textarea:focus {
    border-color: var(--lightblue); box-shadow: 0 0 0 3px rgba(37,99,235,0.09);
    background: var(--white);
  }

  /* ── RADIO ── */
  .radio-group { display: flex; flex-direction: column; gap: 0.5rem; }

  .group-error { outline: 2px dashed var(--red-mid); outline-offset: 4px; border-radius: 8px; }

  .radio-card {
    display: flex; align-items: center; gap: 0.85rem;
    background: var(--bg); border: 1.5px solid var(--border); border-radius: 8px;
    padding: 0.8rem 1rem; cursor: pointer;
    font-size: 0.91rem; font-weight: 500; color: var(--ink);
    transition: all 0.14s; user-select: none;
  }

  .radio-card:hover { border-color: #93c5fd; background: var(--lightblue-bg); }

  .radio-card.checked {
    border-color: var(--lightblue); background: var(--lightblue-bg); color: var(--lightblue-d);
  }

  .radio-dot {
    width: 18px; height: 18px; border-radius: 50%;
    border: 2px solid var(--border); background: var(--white);
    flex-shrink: 0; transition: all 0.14s;
  }

  .radio-card.checked .radio-dot {
    border-color: var(--lightblue); background: var(--lightblue);
    box-shadow: inset 0 0 0 3px white;
  }

  /* ── CHECKBOXES ── */
  .checkbox-grid { display: grid; gap: 0.5rem; }
  .checkbox-grid.cols-1 { grid-template-columns: 1fr; }
  .checkbox-grid.cols-2 { grid-template-columns: 1fr 1fr; }

  .checkbox-card {
    display: flex; align-items: center; gap: 0.7rem;
    background: var(--bg); border: 1.5px solid var(--border); border-radius: 8px;
    padding: 0.7rem 0.9rem; cursor: pointer;
    font-size: 0.87rem; font-weight: 500; color: var(--ink);
    transition: all 0.14s; user-select: none;
  }

  .checkbox-card:hover { border-color: #5eead4; background: var(--teal-bg); }

  .checkbox-card.checked {
    border-color: var(--lightblue); background: var(--lightblue-bg); color: var(--lightblue-d);
  }
  .checkbox-card.checked .checkbox-icon { background: var(--lightblue); border-color: var(--lightblue); }

  .checkbox-icon {
    width: 18px; height: 18px;
    border: 1.5px solid var(--border); border-radius: 4px;
    background: var(--white); display: flex; align-items: center; justify-content: center;
    font-size: 0.7rem; font-weight: 800; color: white; flex-shrink: 0; transition: all 0.14s;
  }


  /* ── SCALE ── */
  .scale-container { display: flex; flex-direction: column; gap: 0.6rem; }

  .scale-labels {
    display: flex; justify-content: space-between;
    font-size: 0.77rem; font-weight: 500; color: var(--muted);
  }

  .scale-buttons { display: flex; gap: 0.6rem; }

  .scale-btn {
    flex: 1; min-height: 52px;
    background: var(--bg); border: 1.5px solid var(--border); border-radius: 8px;
    color: var(--muted); font-family: var(--font); font-size: 1.05rem; font-weight: 700;
    cursor: pointer; transition: all 0.14s;
  }

  .scale-btn:hover { border-color: var(--lightblue); color: var(--lightblue); background: var(--lightblue-bg); }

  .scale-btn.active {
    background: var(--orange); border-color: var(--orange); color: white;
    box-shadow: 0 4px 12px rgba(249,150,56,0.28); transform: translateY(-1px);
  }

  .btn-error { border-color: var(--red-mid) !important; }
  .btn-error:hover { border-color: var(--red) !important; }

  /* ── NAV ── */
  .nav-row {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 2.5rem; padding-top: 1.75rem; border-top: 1px solid var(--border);
  }

  .btn {
    font-family: var(--font); font-size: 0.91rem; font-weight: 700;
    padding: 0.78rem 1.7rem; border-radius: 8px; border: none;
    cursor: pointer; transition: all 0.17s;
  }

  .btn-back {
    background: var(--white); border: 1.5px solid var(--border); color: var(--muted);
  }

  .btn-back:hover { border-color: var(--ink); color: var(--ink); }

  .btn-next {
    background: var(--orange); color: white;
    box-shadow: 0 4px 14px rgba(249,150,56,0.30);
  }
  .btn-next:hover { background: var(--orange-d); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(249,150,56,0.38); }

.btn-submit {
  background: var(--lightblue);
  color: #FFFFFF !important;
  padding: 0.82rem 2.2rem;
  box-shadow: 0 4px 14px rgba(16,182,238,0.25);
}

.btn-submit:hover { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(16,182,238,0.32); }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }


  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-6px); }
    40%       { transform: translateX(6px); }
    60%       { transform: translateX(-4px); }
    80%       { transform: translateX(4px); }
  }

  .btn-shake { animation: shake 0.45s ease; }

  /* ── API ERROR ── */
  .api-error-msg {
    background: var(--red-light); border: 1px solid var(--red-border);
    color: var(--red); padding: 0.85rem 1rem; border-radius: 8px; font-size: 0.9rem;
  }

  /* ── SUCCESS ── */
  .success-outer {
    display: flex; align-items: center; justify-content: center;
    min-height: 90vh; padding: 2rem;
  }

  .success-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 16px; padding: 3.5rem 2.5rem;
    text-align: center; max-width: 430px; width: 100%;
    box-shadow: var(--shadow);
  }

  .success-circle {
    width: 76px; height: 76px;
    background: linear-gradient(135deg, var(--lightblue), var(--teal));
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.75rem;
    box-shadow: 0 8px 24px rgba(37,99,235,0.25);
  }

  .success-card h2 {
    font-size: 1.8rem; font-weight: 800; color: var(--ink);
    letter-spacing: -0.4px; margin-bottom: 0.75rem;
  }

  .success-card p { color: var(--muted); font-size: 0.97rem; line-height: 1.7; margin-bottom: 1.75rem; }

  .success-pill {
    display: inline-block; background: #edfbe6; border: 1px solid #c2edae; color: var(--green);
    border: 1px solid var(--teal-mid); color: var(--teal);
    padding: 0.5rem 1.4rem; border-radius: 99px;
    font-size: 0.87rem; font-weight: 700;
  }

  /* ── INTRO ELEMENTS ── */
  .intro-badge {
    display: inline-flex; align-items: center;
    background: var(--orange-bg); color: var(--orange);
    border: 1px solid var(--orange-mid); 
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.8px;
    text-transform: uppercase; padding: 0.3rem 0.9rem;
    border-radius: 99px; margin-bottom: 1.25rem;
  }

  .intro-title {
    font-size: 2rem; font-weight: 800; color: var(--ink);
    letter-spacing: -0.5px; line-height: 1.2; margin-bottom: 1rem;
  }

  .intro-lead {
    font-size: 1rem; color: var(--muted); line-height: 1.75;
  }

  .intro-divider {
    height: 1px; background: var(--border);
    margin: 1.75rem 0;
  }

  /* [7] Mission / cause box */
  .mission-box {
    background: linear-gradient(135deg, #f0f9ff 0%, #f0fdfa 100%);
    border: 1px solid var(--lightblue-mid);
    border-left: 4px solid var(--teal);
    border-radius: 10px;
    padding: 1.25rem 1.4rem;
    margin-top: 1rem;
  }

  .mission-label {
    font-size: 0.72rem; font-weight: 800; text-transform: uppercase;
    letter-spacing: 0.8px; color: var(--teal); margin-bottom: 0.6rem;
  }

  .mission-body {
    font-size: 0.92rem; color: var(--ink); line-height: 1.75;
  }

  /* STEM explainer */
  .stem-explainer {
    background: var(--lightblue-bg); border: 1px solid var(--lightblue-mid);
    border-radius: 10px; padding: 1.1rem 1.25rem;
  }

  .stem-explainer-title {
    font-size: 0.72rem; font-weight: 800; text-transform: uppercase;
    letter-spacing: 0.8px; color: var(--lightblue); margin-bottom: 0.5rem;
  }

  .stem-explainer-body {
    font-size: 0.9rem; color: var(--ink); line-height: 1.7;
  }

  .intro-meta { display: flex; flex-direction: column; gap: 0.6rem; }

  .intro-meta-item {
    display: flex; align-items: center; gap: 0.65rem;
    font-size: 0.88rem; color: var(--muted);
  }

.btn-start {
  margin-top: 2rem; width: 100%;
  background: var(--lightblue);
  color: #FFFFFF !important;
  font-family: var(--font); font-size: 1rem; font-weight: 700;
  padding: 1rem; border-radius: 10px; border: none; cursor: pointer;
  box-shadow: 0 4px 18px rgba(16,182,238,0.28); letter-spacing: 0.2px;
  transition: all 0.18s;
}

.btn-start:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(16,182,238,0.35); }

.btn-start-disabled, .btn-start:disabled {
  background: #e5e7eb; color: #9ca3af !important;
  box-shadow: none; cursor: not-allowed;
}

  /* ── PERSONA SELECTOR ── */
  .persona-section { margin-top: 0.25rem; }

  .persona-heading {
    font-size: 1.05rem; font-weight: 800; color: var(--ink); margin-bottom: 0.3rem;
  }

  .persona-subheading {
    font-size: 0.85rem; color: var(--muted); margin-bottom: 1rem; line-height: 1.5;
  }

  .persona-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;
  }

  .persona-card {
    display: flex; flex-direction: column; gap: 0.3rem;
    background: var(--white); border: 2px solid var(--border);
    border-radius: 12px; padding: 1.1rem;
    cursor: pointer; user-select: none;
    transition: all 0.16s;
  }

  .persona-card:hover { border-color: #93c5fd; background: var(--lightblue-bg); }

  .persona-card.selected {
    border-color: var(--lightblue);
    background: var(--lightblue-bg);
    box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
  }

  .persona-card-top {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 0.35rem;
  }

  .persona-icon { font-size: 1.75rem; line-height: 1; }

  .persona-check {
    width: 22px; height: 22px; border-radius: 50%;
    border: 2px solid var(--border); background: var(--white);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.72rem; font-weight: 900; color: white;
    flex-shrink: 0; transition: all 0.14s;
  }

  .persona-check.checked { background: var(--lightblue); border-color: var(--lightblue); }

  .persona-title {
    font-size: 0.92rem; font-weight: 800; color: var(--ink); line-height: 1.3;
  }

  .persona-desc {
    font-size: 0.78rem; color: var(--muted); line-height: 1.5; flex: 1;
  }

  .persona-time {
    font-size: 0.72rem; font-weight: 700; color: var(--lightblue);
    background: var(--lightblue-mid); padding: 0.18rem 0.5rem; border-radius: 99px;
    align-self: flex-start; margin-top: 0.35rem;
  }

  /* [6] Persona copy box — animated in */
  .persona-copy-box {
    margin-top: 1.25rem;
    padding: 1.1rem 1.25rem;
    background: linear-gradient(135deg, var(--lightblue-bg) 0%, var(--teal-bg) 100%);
    border: 1px solid var(--lightblue-mid);
    border-left: 4px solid var(--lightblue);
    border-radius: 10px;
    animation: fadeSlideIn 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(10px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .persona-copy-text {
    font-size: 0.95rem; color: var(--ink); line-height: 1.75; font-weight: 500;
  }

  .persona-back-btn {
    display: inline-flex; align-items: center; gap: 0.3rem;
    margin-top: 0.85rem;
    background: none; border: 1px solid var(--lightblue-mid);
    color: var(--lightblue); font-family: var(--font);
    font-size: 0.8rem; font-weight: 600;
    padding: 0.32rem 0.85rem; border-radius: 99px;
    cursor: pointer; transition: all 0.15s;
  }

  .persona-back-btn:hover {
    background: var(--white); border-color: var(--lightblue);
  }

  /* ── CONCLUSION ── */
  .conclusion-check {
    width: 56px; height: 56px; border-radius: 50%;
    background: linear-gradient(135deg, var(--lightblue), var(--teal));
    color: white; font-size: 1.5rem; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.25rem;
    box-shadow: 0 6px 20px rgba(37,99,235,0.25);
  }

  .conclusion-q {
    font-size: 1rem; font-weight: 700; color: var(--ink); line-height: 1.4;
  }

  .conclusion-form { display: flex; flex-direction: column; gap: 0; }

  .conclusion-contact-fields {
    display: flex; flex-direction: column; gap: 0.65rem;
    margin-top: 1.25rem; padding: 1.25rem;
    background: var(--lightblue-bg); border: 1px solid var(--lightblue-mid);
    border-radius: 10px;
  }

  .conclusion-contact-note {
    font-size: 0.83rem; color: var(--lightblue); font-weight: 500; margin-bottom: 0.25rem;
  }

  /* ── SUGGEST BOX ── */
  .suggest-box {
    margin-top: 1rem; padding-top: 1rem;
    border-top: 1px dashed var(--border);
  }

  .suggest-label {
    display: block; font-size: 0.85rem; font-weight: 600;
    color: var(--muted); margin-bottom: 0.5rem;
  }

  /* ── ROTATING PLACEHOLDER ── */
  .rotating-input-wrap { position: relative; }
  .rotating-input { position: relative; z-index: 1; background: transparent; }

  .rotating-placeholder {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    font-size: 0.93rem;
    color: #9ca3af;
    pointer-events: none;
    z-index: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 2rem);
    transition: opacity 0.35s ease, transform 0.35s ease;
  }

  .rp-visible { opacity: 1; transform: translateY(-50%) translateX(0); }
  .rp-hidden  { opacity: 0; transform: translateY(-50%) translateX(6px); }

  .rp-multiline { top: 0.75rem; transform: none; }
  .rp-multiline.rp-visible { transform: translateX(0); }
  .rp-multiline.rp-hidden  { transform: translateX(6px); }

  /* ── LEARNING STYLE CARDS ── */
  .learning-style-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.65rem;
    margin-bottom: 0.25rem;
  }

  .learning-style-card {
    display: flex; flex-direction: column; gap: 0.3rem;
    background: var(--bg); border: 1.5px solid var(--border);
    border-radius: 10px; padding: 1rem;
    cursor: pointer; user-select: none;
    transition: all 0.15s;
  }

  .learning-style-card:hover { border-color: #93c5fd; background: var(--lightblue-bg); }
  .learning-style-card.checked { border-color: var(--lightblue); background: var(--lightblue-bg); }
  .learning-style-card.ls-error { border-color: var(--red-mid) !important; }

  .ls-top {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 0.25rem;
  }

  .ls-icon { font-size: 1.5rem; line-height: 1; }

  .ls-check {
    width: 20px; height: 20px; border-radius: 4px;
    border: 1.5px solid var(--border); background: var(--white);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.7rem; font-weight: 800; color: white;
    flex-shrink: 0; transition: all 0.14s;
  }

  .learning-style-card.checked .ls-check { background: var(--lightblue); border-color: var(--lightblue); }

  .ls-title { font-size: 0.88rem; font-weight: 700; color: var(--ink); line-height: 1.3; }
  .ls-desc  { font-size: 0.78rem; color: var(--muted); line-height: 1.5; }

  /* ── RANKING ── */
  .rank-group { display: flex; flex-direction: column; gap: 0.5rem; }

  .rank-instruction {
    font-size: 0.8rem; color: var(--muted); font-style: italic;
    margin-bottom: 0.25rem;
  }

  .rank-card {
    display: flex; align-items: center; justify-content: space-between;
    background: var(--bg); border: 1.5px solid var(--border);
    border-radius: 10px; padding: 0.85rem 1rem;
    cursor: grab; user-select: none;
    transition: all 0.15s; gap: 0.75rem;
  }

  .rank-card:hover { border-color: #93c5fd; background: var(--lightblue-bg); box-shadow: var(--shadow-sm); }
  .rank-card:active { cursor: grabbing; }

  .rank-dragging { opacity: 0.45; border-style: dashed; border-color: var(--lightblue) !important; }

  .rank-over {
    border-color: var(--lightblue) !important;
    background: var(--lightblue-bg) !important;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.12) !important;
    transform: scale(1.01);
  }

  .rank-left { display: flex; align-items: center; gap: 0.85rem; flex: 1; min-width: 0; }
  .rank-medal { font-size: 1.5rem; flex-shrink: 0; line-height: 1; }
  .rank-info { display: flex; flex-direction: column; gap: 0.1rem; min-width: 0; }

  .rank-pos-label {
    font-size: 0.68rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.8px; color: var(--muted);
  }

  .rank-item-text { font-size: 0.95rem; font-weight: 600; color: var(--ink); }

  .rank-item-desc { font-size: 0.78rem; color: var(--muted); line-height: 1.4; }

  .rank-controls { display: flex; align-items: center; gap: 0.35rem; flex-shrink: 0; }

  .rank-btn {
    width: 30px; height: 30px; border-radius: 6px;
    background: var(--white); border: 1.5px solid var(--border);
    color: var(--muted); font-size: 0.85rem; font-weight: 700;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 0.13s; padding: 0;
  }

  .rank-btn:hover:not(:disabled) { border-color: var(--lightblue); color: var(--lightblue); background: var(--lightblue-bg); }
  .rank-btn:disabled { opacity: 0.25; cursor: not-allowed; }

  .rank-drag-handle {
    font-size: 1.2rem; color: var(--border); cursor: grab;
    padding: 0 0.15rem; line-height: 1; margin-left: 0.15rem;
    transition: color 0.13s;
  }

  .rank-card:hover .rank-drag-handle { color: var(--muted); }

  /* ── RESPONSIVE ── */
  @media (max-width: 640px) {
    .top-bar-inner { padding-left: 1rem; padding-right: 1rem; }
    .intro-outer, .survey-outer { padding: 1.25rem 1rem 3rem; }
    .intro-card, .survey-card { padding: 1.5rem 1.25rem; border-radius: 12px; }
    .section-title { font-size: 1.6rem; }
    .q-card { padding: 1.2rem; }
    .checkbox-grid.cols-2 { grid-template-columns: 1fr; }
    .learning-style-grid { grid-template-columns: 1fr; }
    .persona-grid { grid-template-columns: 1fr; }
    .scale-btn { min-height: 44px; font-size: 0.95rem; }
    .validation-banner { padding: 0.75rem 1rem; }
    .tabs-inner { justify-content: flex-start; }  /* on mobile, left-align and scroll */
  }
`;
