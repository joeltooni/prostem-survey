-- ProSTEM Survey — PostgreSQL Schema
-- Run this once in your database (Supabase, Neon, or any Postgres host)

CREATE TABLE IF NOT EXISTS survey_responses (
  id                        SERIAL PRIMARY KEY,
  created_at                TIMESTAMPTZ DEFAULT NOW(),

  -- ── Meta ──────────────────────────────────────────────
  persona                   VARCHAR(20),   -- high_school | undergrad | parent | admin

  -- ── High School: Section 1 (Demographics) ─────────────
  grade                     VARCHAR(10),
  gender                    VARCHAR(30),
  school_type               VARCHAR(30),
  school_city               VARCHAR(100),
  school_country            VARCHAR(100),
  school_resources          TEXT[],
  school_resources_other    TEXT,
  personal_tech             TEXT[],

  -- ── High School: Section 2 (Abstraction Gap) ──────────
  relevance_scale           SMALLINT CHECK (relevance_scale BETWEEN 1 AND 5),
  stem_struggle             TEXT[],
  fun_builder_scale         SMALLINT CHECK (fun_builder_scale BETWEEN 1 AND 5),
  fun_build_idea            TEXT,
  has_practical_labs        VARCHAR(20),
  want_labs_scale           SMALLINT CHECK (want_labs_scale BETWEEN 1 AND 5),
  excursion_importance      SMALLINT CHECK (excursion_importance BETWEEN 1 AND 5),

  -- ── High School: Section 3 (Digital Habits) ───────────
  daily_app                 TEXT,
  app_like                  TEXT,
  app_hate                  TEXT,
  learning_apps             TEXT[],
  learning_apps_other       TEXT,
  vibe_check                TEXT,
  feature_priorities        TEXT[],
  feature_suggestion        TEXT,
  learning_style_pref       TEXT[],
  learning_style_open       TEXT,

  -- ── High School: Section 4 (Social Innovator) ─────────
  inventor_representation   VARCHAR(10),
  stem_goal                 VARCHAR(20),
  stem_why_choice           VARCHAR(20),
  dream_career              TEXT,
  dream_career_scale        SMALLINT CHECK (dream_career_scale BETWEEN 1 AND 5),
  phygital_combined         VARCHAR(10),

  -- ── Undergrad ─────────────────────────────────────────
  ug_major                  TEXT,
  ug_high_school_origin     VARCHAR(150),
  ug_past_platforms         TEXT[],
  ug_platform_other         TEXT,
  ug_platform_context       VARCHAR(20),
  ug_platform_frequency     VARCHAR(20),
  ug_platform_sentiment     TEXT,
  ug_theory_gap_scale       SMALLINT CHECK (ug_theory_gap_scale BETWEEN 1 AND 5),
  ug_teacher_style          VARCHAR(20),
  ug_missing_tools          TEXT[],
  ug_disconnect_desc        TEXT,
  ug_21_century_readiness   VARCHAR(10),
  ug_contact_name           TEXT,
  ug_contact_email          TEXT,

  -- ── Parent ────────────────────────────────────────────
  parent_field_awareness    SMALLINT CHECK (parent_field_awareness BETWEEN 1 AND 5),
  parent_curriculum_awareness VARCHAR(20),
  parent_value_importance   VARCHAR(20),
  parent_external_resources TEXT[],
  parent_success_metric     TEXT[],
  parent_max_investment     VARCHAR(20),
  parent_payment_model      VARCHAR(20),

  -- ── Admin / Teacher ───────────────────────────────────
  admin_perf_mastery        TEXT,
  admin_why_gap_freq        VARCHAR(30),
  admin_prof_leap           TEXT,
  admin_curriculum_abstract TEXT,
  admin_practical_pct       VARCHAR(20),
  admin_current_tools       TEXT[],
  admin_current_tools_other TEXT,
  admin_industry_exposure   VARCHAR(20),
  admin_industry_barrier    VARCHAR(20),
  admin_lab_frequency       VARCHAR(20),
  admin_contextual_learning VARCHAR(20),
  admin_phygital_sandbox    VARCHAR(10),
  admin_teacher_empowerment VARCHAR(20),
  admin_hub_fit             VARCHAR(20),
  admin_sustainability_model VARCHAR(30),

  -- ── Conclusion ────────────────────────────────────────
  contact_consent           VARCHAR(10),
  contact_name              TEXT,
  contact_phone             TEXT
);
