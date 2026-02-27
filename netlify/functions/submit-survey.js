// netlify/functions/submit-survey.js
// Deploy on Netlify — this runs as a serverless function at /.netlify/functions/submit-survey
// Requires env vars: DATABASE_URL (PostgreSQL connection string)

import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const safeN = (v) => Number(v) || null;
  const safeArr = (v) => (Array.isArray(v) && v.length ? `{${v.map((s) => `"${s.replace(/"/g, '\\"')}`).join(",")}}` : null);

  const {
    // Meta
    persona,
    // ── High School ──
    grade, gender, schoolType, schoolCity, schoolCountry,
    schoolResources, schoolResourcesOther, personalTech,
    relevanceScale, stemStruggle, funBuilderScale, funBuildIdea,
    hasPracticalLabs, wantLabsScale, excursionImportance,
    dailyApp, appLike, appHate,
    learningApps, learningAppsOther, vibeCheck,
    featurePriorities, featureSuggestion,
    learningStylePref, learningStyleOpen,
    inventorRepresentation, stemGoal, stemWhyChoice,
    dreamCareer, dreamCareerScale, phygitalCombined,
    // ── Undergrad ──
    ugMajor, ugHighSchoolOrigin,
    ugPastPlatforms, ugPlatformOther, ugPlatformContext, ugPlatformFrequency, ugPlatformSentiment,
    ugTheoryGapScale, ugTeacherStyle, ugMissingTools,
    ugDisconnectDesc, ug21CenturyReadiness,
    ugContactName, ugContactEmail,
    // ── Parent ──
    parentFieldAwareness, parentCurriculumAwareness, parentValueImportance,
    parentExternalResources, parentSuccessMetric,
    parentMaxInvestment, parentPaymentModel,
    // ── Admin ──
    adminPerfMastery, adminWhyGapFreq, adminProfLeap, adminCurriculumAbstract,
    adminPracticalPct, adminCurrentTools, adminCurrentToolsOther,
    adminIndustryExposure, adminIndustryBarrier, adminLabFrequency,
    adminContextualLearning, adminPhygitalSandbox, adminTeacherEmpowerment,
    adminHubFit, adminSustainabilityModel,
    // ── Conclusion ──
    contactConsent, contactName, contactPhone,
  } = body;

  try {
    await pool.query(`
      INSERT INTO survey_responses (
        persona,
        grade, gender, school_type, school_city, school_country,
        school_resources, school_resources_other, personal_tech,
        relevance_scale, stem_struggle, fun_builder_scale, fun_build_idea,
        has_practical_labs, want_labs_scale, excursion_importance,
        daily_app, app_like, app_hate,
        learning_apps, learning_apps_other, vibe_check,
        feature_priorities, feature_suggestion,
        learning_style_pref, learning_style_open,
        inventor_representation, stem_goal, stem_why_choice,
        dream_career, dream_career_scale, phygital_combined,
        ug_major, ug_high_school_origin,
        ug_past_platforms, ug_platform_other, ug_platform_context, ug_platform_frequency, ug_platform_sentiment,
        ug_theory_gap_scale, ug_teacher_style, ug_missing_tools,
        ug_disconnect_desc, ug_21_century_readiness,
        ug_contact_name, ug_contact_email,
        parent_field_awareness, parent_curriculum_awareness, parent_value_importance,
        parent_external_resources, parent_success_metric,
        parent_max_investment, parent_payment_model,
        admin_perf_mastery, admin_why_gap_freq, admin_prof_leap, admin_curriculum_abstract,
        admin_practical_pct, admin_current_tools, admin_current_tools_other,
        admin_industry_exposure, admin_industry_barrier, admin_lab_frequency,
        admin_contextual_learning, admin_phygital_sandbox, admin_teacher_empowerment,
        admin_hub_fit, admin_sustainability_model,
        contact_consent, contact_name, contact_phone
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
        $11,$12,$13,$14,$15,$16,$17,$18,$19,$20,
        $21,$22,$23,$24,$25,$26,$27,$28,$29,$30,
        $31,$32,$33,$34,$35,$36,$37,$38,$39,$40,
        $41,$42,$43,$44,$45,$46,$47,$48,$49,$50,
        $51,$52,$53,$54,$55,$56,$57,$58,$59,$60,
        $61,$62,$63,$64,$65,$66,$67,$68,$69,$70
      )
    `, [
      persona || null,
      grade || null, gender || null, schoolType || null, schoolCity || null, schoolCountry || null,
      safeArr(schoolResources), schoolResourcesOther || null, safeArr(personalTech),
      safeN(relevanceScale), safeArr(stemStruggle), safeN(funBuilderScale), funBuildIdea || null,
      hasPracticalLabs || null, safeN(wantLabsScale), safeN(excursionImportance),
      dailyApp || null, appLike || null, appHate || null,
      safeArr(learningApps), learningAppsOther || null, vibeCheck || null,
      safeArr(featurePriorities), featureSuggestion || null,
      safeArr(learningStylePref), learningStyleOpen || null,
      inventorRepresentation || null, stemGoal || null, stemWhyChoice || null,
      dreamCareer || null, safeN(dreamCareerScale), phygitalCombined || null,
      ugMajor || null, ugHighSchoolOrigin || null,
      safeArr(ugPastPlatforms), ugPlatformOther || null, ugPlatformContext || null, ugPlatformFrequency || null, ugPlatformSentiment || null,
      safeN(ugTheoryGapScale), ugTeacherStyle || null, safeArr(ugMissingTools),
      ugDisconnectDesc || null, ug21CenturyReadiness || null,
      ugContactName || null, ugContactEmail || null,
      safeN(parentFieldAwareness), parentCurriculumAwareness || null, parentValueImportance || null,
      safeArr(parentExternalResources), safeArr(parentSuccessMetric),
      parentMaxInvestment || null, parentPaymentModel || null,
      adminPerfMastery || null, adminWhyGapFreq || null, adminProfLeap || null, adminCurriculumAbstract || null,
      adminPracticalPct || null, safeArr(adminCurrentTools), adminCurrentToolsOther || null,
      adminIndustryExposure || null, adminIndustryBarrier || null, adminLabFrequency || null,
      adminContextualLearning || null, adminPhygitalSandbox || null, adminTeacherEmpowerment || null,
      adminHubFit || null, adminSustainabilityModel || null,
      contactConsent || null, contactName || null, contactPhone || null,
    ]);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("DB error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Database error. Please try again." }),
    };
  }
};
