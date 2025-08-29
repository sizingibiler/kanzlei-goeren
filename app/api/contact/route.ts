import {NextRequest, NextResponse} from 'next/server';
import type {Transporter} from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {name, email, phone, subject, message} = body || {};
    if (!name || !email || !subject || !message) {
      return NextResponse.json({error: 'Missing required fields'}, {status: 400});
    }

    const payload = {
      name: String(name),
      email: String(email),
      phone: phone ? String(phone) : '',
      subject: String(subject),
      message: String(message)
    };

    // Try to send email if SMTP env is configured; otherwise, just log
    const {SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, TO_EMAIL} = process.env as Record<string, string | undefined>;

    if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && TO_EMAIL) {
      const nodemailer = await import('nodemailer');
      const transporter: Transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: SMTP_SECURE === 'true' || SMTP_SECURE === '1',
        auth: {user: SMTP_USER, pass: SMTP_PASS}
      });

      await transporter.sendMail({
        from: `Website Kontakt <${SMTP_USER}>`,
        to: TO_EMAIL,
        replyTo: payload.email,
        subject: `Kontakt: ${payload.subject}`,
        text: `Name: ${payload.name}\nEmail: ${payload.email}\nTelefon: ${payload.phone}\n\n${payload.message}`
      });
    } else {
      console.log('CONTACT_FORM', payload);
    }

    return NextResponse.json({ok: true});
  } catch (err: any) {
    return NextResponse.json({error: err?.message || 'Internal error'}, {status: 500});
  }
}
