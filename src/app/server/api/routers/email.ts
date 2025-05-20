import { createTRPCRouter, publicProcedure } from "@/app/server/api/trpc";
import { z } from "zod";
import { Resend } from "resend";
import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

export const emailRouter = createTRPCRouter({
  sendContactEmail: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        subject: z.string(),
        message: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await resend.emails.send({
        from: "contact@roboticsemail.markgyoni.dev",
        to: "robotics@newlothrop.k12.mi.us",
        subject: input.subject,
        text: input.message,
        replyTo: input.email,
      });
    }),
});
