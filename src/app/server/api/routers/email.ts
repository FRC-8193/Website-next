import { createTRPCRouter, publicProcedure } from "@/app/server/api/trpc";
import { z } from "zod";
import { Resend } from "resend";
import { env } from "@/env";
import { validateTurnstileToken } from "next-turnstile";
import { TRPCError } from "@trpc/server";

const resend = new Resend(env.RESEND_API_KEY);

export const emailRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        turnstileToken: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const result = await validateTurnstileToken({
        token: input.turnstileToken,
        secretKey: env.TURNSTILE_SECRET_KEY,
      });

      if (result.success === false) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid Turnstile token",
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
        turnstileToken: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await validateTurnstileToken({
        token: input.turnstileToken,
        secretKey: env.TURNSTILE_SECRET_KEY,
      });

      if (result.success === false) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid Turnstile token",
        });
      }

      await resend.emails.send({
        from: "contact@roboticsemail.markgyoni.dev",
        to: "robotics@newlothrop.k12.mi.us",
        subject: input.subject,
        text: input.message,
        replyTo: input.email,
      });
    }),
});
