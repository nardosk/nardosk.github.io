export interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  ALLOWED_ORIGINS?: string;
}

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const DEFAULT_FROM = "Portfolio <onboarding@resend.dev>";
const DEFAULT_TO = "contact@nardos.et";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

function corsHeaders(origin: string | null, allowed: Set<string>): HeadersInit {
  const allowOrigin =
    origin && (allowed.has("*") || allowed.has(origin)) ? origin : "";
  return {
    "Access-Control-Allow-Origin": allowOrigin || "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(
  body: unknown,
  init: ResponseInit,
  cors: HeadersInit,
): Response {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...cors,
      ...(init.headers ?? {}),
    },
  });
}

function validate(input: unknown): ContactPayload | string {
  if (!input || typeof input !== "object") return "Invalid payload";
  const { name, email, message } = input as Record<string, unknown>;
  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return "Invalid payload";
  }
  const n = name.trim();
  const e = email.trim();
  const m = message.trim();
  if (n.length < 1 || n.length > 100) return "Name is required";
  if (e.length > 255 || !EMAIL_RE.test(e)) return "Invalid email";
  if (m.length < 10 || m.length > 2000) return "Message must be 10–2000 characters";
  return { name: n, email: e, message: m };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const allowed = new Set(
      (env.ALLOWED_ORIGINS ?? "").split(",").map((s) => s.trim()).filter(Boolean),
    );
    const cors = corsHeaders(origin, allowed);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, { status: 405 }, cors);
    }

    if (!env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return json(
        { success: false, error: "Email service is not configured." },
        { status: 500 },
        cors,
      );
    }

    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return json({ success: false, error: "Invalid JSON" }, { status: 400 }, cors);
    }

    const result = validate(payload);
    if (typeof result === "string") {
      return json({ success: false, error: result }, { status: 400 }, cors);
    }

    const { name, email, message } = result;
    const to = env.CONTACT_TO_EMAIL ?? DEFAULT_TO;
    const from = env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM;

    const html = `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto;padding:24px;color:#111">
        <h2 style="margin:0 0 16px;font-size:20px">New portfolio message</h2>
        <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 8px"><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p style="margin:16px 0 8px"><strong>Message:</strong></p>
        <p style="white-space:pre-wrap;background:#f4f4f5;padding:16px;border-radius:8px;margin:0">${escapeHtml(message)}</p>
      </div>
    `;

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: `New message from ${name}`,
          html,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error("Resend error", res.status, body);
        return json(
          { success: false, error: "Failed to send message. Please try again." },
          { status: 502 },
          cors,
        );
      }

      return json({ success: true }, { status: 200 }, cors);
    } catch (err) {
      console.error("Resend request failed", err);
      return json(
        { success: false, error: "Network error. Please try again." },
        { status: 502 },
        cors,
      );
    }
  },
};
