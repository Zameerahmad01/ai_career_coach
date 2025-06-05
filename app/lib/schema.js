import { boolean, z } from "zod";

export const onboardingSchema = z.object({
  industry: z.string({
    required_error: "Industry is required",
  }),
  subIndustry: z.string({
    required_error: "please select a specialization",
  }),
  bio: z.string().max(500).optional(),
  experience: z
    .string({
      required_error: "please enter your years of experience",
    })
    .transform((val) => parseInt(val))
    .pipe(
      z
        .number()
        .min(0, "Experience must be at least 0")
        .max(50, "Experience must be less than 50")
    ),
  skills: z
    .string({
      required_error: "please enter your skills",
    })
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((skill) => skill.trim())
            .filter(boolean)
        : []
    ),
});
