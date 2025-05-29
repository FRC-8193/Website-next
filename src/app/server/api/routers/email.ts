import { createTRPCRouter, publicProcedure } from "@/app/server/api/trpc";
import { z } from "zod";
import { Resend } from "resend";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";

const resend = new Resend(env.RESEND_API_KEY);

export const emailRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        hcaptchaToken: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const url = "https://hcaptcha.com/siteverify";
      const result = await fetch(url, {
        body: new URLSearchParams({
          secret: env.HCAPTCHA_SECRET_KEY,
          response: input.hcaptchaToken,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const outcome = (await result.json()) as { success: boolean };

      if (outcome.success === false) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid hCaptcha token",
        });
      }

      return "robotics@newlothrop.k12.mi.us";
    }),
  sendContactEmail: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        subject: z.string(),
        message: z.string(),
        hcaptchaToken: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const url = "https://hcaptcha.com/siteverify";
      const result = await fetch(url, {
        body: new URLSearchParams({
          secret: env.HCAPTCHA_SECRET_KEY,
          response: input.hcaptchaToken,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const outcome = (await result.json()) as { success: boolean };

      if (outcome.success === false) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid hCaptcha token",
        });
      }

      await resend.emails.send({
        from: "contact@nlrobotics.org",
        to: "robotics@newlothrop.k12.mi.us",
        subject: input.subject,
        text: input.message,
        replyTo: input.email,
      });
    }),
});
