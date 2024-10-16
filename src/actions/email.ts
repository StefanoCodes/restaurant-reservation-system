"use server";
import React from "react";
import { Resend } from "resend";
import Email from "@/emails/email-template-pending-confirmation";
export const sendEmailPendingConfirmation = async (
  email: string,
  subject: string,
  reservationId: string
) => {
  const resend = new Resend(process.env.RESEND_API_KEY as string);
  await resend.emails.send({
    from: "Reservation <onboarding@resend.dev>",
    to: email,
    subject: subject,
    react: React.createElement(Email, {
      reservationId: reservationId,
    }),
  });
};
