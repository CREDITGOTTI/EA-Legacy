import { createHmac, timingSafeEqual } from "crypto";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const cleanText = (max: number) => z.string().trim().min(1).max(max);
const optionalText = (max: number) => z.string().trim().max(max).optional().transform((value) => value || null);

const accessSchema = z.object({
  firstName: cleanText(80),
  lastName: cleanText(80),
  phone: z.string().trim().min(8).max(30),
  consentContact: z.literal(true),
  ageConfirmed: z.literal(true),
  website: z.string().max(0),
  startedAt: z.number().int().positive(),
  attribution: z.object({
    utmSource: optionalText(120),
    utmMedium: optionalText(120),
    utmCampaign: optionalText(160),
    referrer: optionalText(500),
    landingPage: optionalText(500),
  }),
  userAgent: z.string().max(500).optional(),
});

const attributesSchema = z.record(z.string(), z.number().int().min(0).max(99)).refine(
  (attributes) => Object.keys(attributes).length === 10 && Object.values(attributes).reduce((sum, value) => sum + value, 0) <= 500,
  "Development points are invalid.",
);

const profileSchema = z.object({
  accessToken: z.string().min(20).max(500),
  legacyName: cleanText(100),
  sport: cleanText(80),
  careerStage: z.enum(["Youth Athlete", "College Athlete", "Professional Athlete", "Former Athlete"]),
  positionRole: optionalText(100),
  purposeStatement: cleanText(500),
  legacyAudience: cleanText(300),
  primaryInvestmentPath: z.enum(["Stocks and Market Investing", "Real Estate Ownership", "Buying, Building, and Selling Existing Businesses"]),
  industries: z.array(cleanText(120)).min(1).max(12),
  innovationIndustry: cleanText(120),
  worldNeed: optionalText(500),
  problemToSolve: optionalText(500),
  attributes: attributesSchema,
  topAttributes: z.array(cleanText(100)).length(3),
  recommendedNextStep: cleanText(500),
  explicitSaveConsent: z.literal(true),
  website: z.string().max(0),
});

function normalizePhone(value: string) {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");
  const normalized = trimmed.startsWith("+") ? `+${digits}` : digits.length === 10 ? `+1${digits}` : `+${digits}`;
  if (!/^\+[1-9][0-9]{7,14}$/.test(normalized)) throw new Error("Enter a valid mobile number, including country code when outside the United States.");
  return normalized;
}

function signAccessId(id: string) {
  const secret = process.env['EA_LEGACY_ACCESS_LINK_SECRET'];
  if (!secret) throw new Error("Access is temporarily unavailable. Please try again shortly.");
  return `${id}.${createHmac("sha256", secret).update(id).digest("hex")}`;
}

function verifyAccessToken(token: string) {
  const splitAt = token.lastIndexOf(".");
  if (splitAt < 1) return null;
  const id = token.slice(0, splitAt);
  const supplied = token.slice(splitAt + 1);
  const secret = process.env['EA_LEGACY_ACCESS_LINK_SECRET'];
  if (!secret || !z.string().uuid().safeParse(id).success || !/^[a-f0-9]{64}$/.test(supplied)) return null;
  const expected = createHmac("sha256", secret).update(id).digest("hex");
  const left = Buffer.from(supplied);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right) ? id : null;
}

export const submitVisitorAccess = createServerFn({ method: "POST" })
  .inputValidator((input) => accessSchema.parse(input))
  .handler(async ({ data }) => {
    if (Date.now() - data.startedAt < 1200 || Date.now() - data.startedAt > 86_400_000) throw new Error("Please review the form and try again.");
    const phone = normalizePhone(data.phone);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: record, error } = await supabaseAdmin.from("visitor_access").insert({
      first_name: data.firstName,
      last_name: data.lastName,
      phone_e164: phone,
      consent_contact: data.consentContact,
      age_or_guardian_confirmed: data.ageConfirmed,
      utm_source: data.attribution.utmSource,
      utm_medium: data.attribution.utmMedium,
      utm_campaign: data.attribution.utmCampaign,
      referrer: data.attribution.referrer,
      landing_page: data.attribution.landingPage,
      user_agent: data.userAgent?.slice(0, 500) || null,
      source: "locker_entry",
    }).select("id").single();
    if (error || !record) throw new Error("We could not unlock the room. Please check your details and try again.");
    return { accessToken: signAccessId(record.id) };
  });

export const saveLegacyProfile = createServerFn({ method: "POST" })
  .inputValidator((input) => profileSchema.parse(input))
  .handler(async ({ data }) => {
    const visitorAccessId = verifyAccessToken(data.accessToken);
    if (!visitorAccessId) throw new Error("Your local access has expired. Clear access data and enter the room again.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("legacy_profiles").insert({
      visitor_access_id: visitorAccessId,
      legacy_name: data.legacyName,
      sport: data.sport,
      career_stage: data.careerStage,
      position_role: data.positionRole,
      purpose_statement: data.purposeStatement,
      legacy_audience: data.legacyAudience,
      primary_investment_path: data.primaryInvestmentPath,
      industries: data.industries,
      innovation_industry: data.innovationIndustry,
      world_need: data.worldNeed,
      problem_to_solve: data.problemToSolve,
      attributes: data.attributes,
      top_attributes: data.topAttributes,
      recommended_next_step: data.recommendedNextStep,
      explicit_save_consent: data.explicitSaveConsent,
    });
    if (error) throw new Error("Your profile could not be saved. Nothing was recorded. Please try again.");
    return { saved: true };
  });