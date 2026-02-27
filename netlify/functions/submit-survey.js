// app/api/submit-survey/route.js  (Next.js App Router)
// OR
// pages/api/submit-survey.js       (Next.js Pages Router)
//
// ─── SETUP ──────────────────────────────────────────────────
// 1. npm install @neondatabase/serverless
// 2. Add DATABASE_URL to Netlify environment variables
// 3. Add DATABASE_URL to your local .env.local file
// ────────────────────────────────────────────────────────────

import { neon } from "@neondatabase/serverless";

// ─── App Router version (Next.js 13+) ───────────────────────
export async function POST(request) {
  try {
    const body = await request.json();
    const result = await saveSurveyResponse(body);
    return Response.json({ success: true, id: result.id }, { status: 201 });
  } catch (error) {
    console.error("Survey submission error:", error);
    return Response.json(
      { success: false, error: "Failed to save response" },
      { status: 500 }
    );
  }
}

// ─── Shared logic ────────────────────────────────────────────
async function saveSurveyResponse(data) {
  const sql = neon(process.env.DATABASE_URL);

  const {
    // Persona
    persona,
    // ── High School: Section 1 ──
    grade, gender, schoolType, schoolResources, personalTech,
    // ── High School: Section 2 ──
    relevanceScale, stemStruggle, stemStruggleReordered,
    funBuilderScale, funBuildIdea, hasPracticalLabs, wantLabsScale,
    // ── High School: Section 3 ──
    dailyApp, appLike, appHate,
    learningApps, learningAppsOther, vibeCheck,
    featurePriorities, featureSuggestion,
    learningStylePref, learningStyleOpen,
    // ── High School: Section 4 ──
    inventorRepresentation, stemGoal, stemWhyChoice,
    dreamCareer, dreamCareerScale, communityBuild,
    dreamPersonConnection, phygitalVision,
    // ── Undergrad ──
    ugMajor, ugHighSchoolOrigin,
    ugPastPlatforms, ugPlatformContext, ugPlatformSentiment,
    ugTheoryGapScale, ugTeacherStyle, ugMissingTools,
    ugDisconnectDesc, ug21CenturyReadiness,
    // ── Parent ──
    parentFieldAwareness, parentValueImportance,
    parentExternalResources, parentSuccessMetric,
    parentMaxInvestment, parentPaymentModel,
    // ── Admin ──
    adminDeployment, adminInfrastructure,
    adminWTPModel, adminValueProp,
    adminReadinessScale, adminBiggestHurdle,
    // ── Conclusion ──
    contactConsent, contactName, contactPhone,
  } = data;

  // Safe numeric conversions
  const safeN = (v) => Number(v) || null;

  const [row] = await sql`
    INSERT INTO survey_responses (
      persona,
      grade, gender, school_type, school_resources, personal_tech,
      relevance_scale, stem_struggle, stem_struggle_reordered,
      fun_builder_scale, fun_build_idea,
      has_practical_labs, want_labs_scale,
      daily_app, app_like, app_improve,
      learning_apps, learning_apps_other, vibe_check,
      feature_priorities, feature_suggestion,
      learning_style_pref, learning_style_open,
      inventor_representation, stem_goal, stem_why_choice,
      dream_career, dream_career_scale, community_build,
      dream_person_connection, phygital_vision,
      ug_major, ug_high_school_origin,
      ug_past_platforms, ug_platform_context, ug_platform_sentiment,
      ug_theory_gap_scale, ug_teacher_style, ug_missing_tools,
      ug_disconnect_desc, ug_21_century_readiness,
      parent_field_awareness, parent_value_importance,
      parent_external_resources, parent_success_metric,
      parent_max_investment, parent_payment_model,
      admin_deployment, admin_infrastructure,
      admin_wtp_model, admin_value_prop,
      admin_readiness_scale, admin_biggest_hurdle,
      contact_consent, contact_name, contact_phone
    )
    VALUES (
      ${persona || null},
      ${grade || null}, ${gender || null}, ${schoolType || null},
      ${schoolResources?.length ? schoolResources : null},
      ${personalTech?.length ? personalTech : null},
      ${safeN(relevanceScale)},
      ${stemStruggle?.length ? stemStruggle : null},
      ${stemStruggleReordered === true},
      ${safeN(funBuilderScale)}, ${funBuildIdea || null},
      ${hasPracticalLabs || null}, ${safeN(wantLabsScale)},
      ${dailyApp || null}, ${appLike || null}, ${appHate || null},
      ${learningApps?.length ? learningApps : null},
      ${learningAppsOther || null}, ${vibeCheck || null},
      ${featurePriorities?.length ? featurePriorities : null},
      ${featureSuggestion || null},
      ${learningStylePref?.length ? learningStylePref : null},
      ${learningStyleOpen || null},
      ${inventorRepresentation || null}, ${stemGoal || null},
      ${stemWhyChoice || null},
      ${dreamCareer || null}, ${safeN(dreamCareerScale)},
      ${communityBuild || null},
      ${dreamPersonConnection || null}, ${phygitalVision || null},
      ${ugMajor || null}, ${ugHighSchoolOrigin || null},
      ${ugPastPlatforms?.length ? ugPastPlatforms : null},
      ${ugPlatformContext || null}, ${ugPlatformSentiment || null},
      ${safeN(ugTheoryGapScale)}, ${ugTeacherStyle || null},
      ${ugMissingTools?.length ? ugMissingTools : null},
      ${ugDisconnectDesc || null}, ${ug21CenturyReadiness || null},
      ${safeN(parentFieldAwareness)}, ${parentValueImportance || null},
      ${parentExternalResources?.length ? parentExternalResources : null},
      ${parentSuccessMetric?.length ? parentSuccessMetric : null},
      ${parentMaxInvestment || null}, ${parentPaymentModel || null},
      ${adminDeployment || null}, ${adminInfrastructure || null},
      ${adminWTPModel || null}, ${adminValueProp || null},
      ${safeN(adminReadinessScale)}, ${adminBiggestHurdle || null},
      ${contactConsent || null}, ${contactName || null}, ${contactPhone || null}
    )
    RETURNING id
  `;

  return row;
}