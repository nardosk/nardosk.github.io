import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const FROM_ADDRESS =
      process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
    const TO_ADDRESS = process.env.CONTACT_TO_EMAIL ?? "contact@nardos.et";

    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      console.error("Missing email credentials");
      return { success: false, error: "Email service is not configured." };
    }

    const escape = (s: string) =>
      s.replace(/[&<>"']/g, (c) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
      );

    const html = `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto;padding:24px;color:#111">
        <h2 style="margin:0 0 16px;font-size:20px">New portfolio message</h2>
        <p style="margin:0 0 8px"><strong>Name:</strong> ${escape(data.name)}</p>
        <p style="margin:0 0 8px"><strong>Email:</strong> ${escape(data.email)}</p>
        <p style="margin:16px 0 8px"><strong>Message:</strong></p>
        <p style="white-space:pre-wrap;background:#f4f4f5;padding:16px;border-radius:8px;margin:0">${escape(data.message)}</p>
      </div>
    `;

    try {
      const res = await fetch(`${GATEWAY_URL}/emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": RESEND_API_KEY,
        },
        body: JSON.stringify({
          from: FROM_ADDRESS,
          to: [TO_ADDRESS],
          reply_to: data.email,
          subject: `New message from ${data.name}`,
          html,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error("Resend error", res.status, body);
        return { success: false, error: "Failed to send message. Please try again." };
      }

      return { success: true };
    } catch (err) {
      console.error("Contact send failed", err);
      return { success: false, error: "Network error. Please try again." };
    }
  });