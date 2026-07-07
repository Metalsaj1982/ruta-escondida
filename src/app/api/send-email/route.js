import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, code, motorcycle, parish, passengers } = body;

    const smtpHost = process.env.SMTP_HOST || 'mail.rutaescondida.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const smtpFrom = process.env.SMTP_FROM || `"Ruta Escondida" <hola@rutaescondida.com>`;

    // If SMTP credentials are not set, log and return simulation success
    if (!smtpUser || !smtpPassword) {
      console.warn("SMTP credentials (SMTP_USER, SMTP_PASSWORD) are not set. Logging email content in simulation:");
      console.log(`To: ${email}\nSubject: Ticket Moto Encuentro\nBody:\nName: ${name}\nCode: ${code}`);
      return NextResponse.json({ 
        success: true, 
        message: "Email logged in simulation mode (SMTP credentials missing)",
        simulated: true 
      });
    }

    // Configure Nodemailer transporter using cPanel / Domain credentials
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // True for 465, false for other ports (like 587)
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
      tls: {
        // Do not fail on invalid certificates (common for local / internal routing hosts)
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: smtpFrom,
      to: email,
      subject: `🎟️ Tu Pase de Sorteo: 1er Moto Encuentro 2026`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; background-color: #1b1b1f; color: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 25px;">
            <h1 style="color: #f59e0b; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 1px;">1er Moto Encuentro 2026</h1>
            <p style="color: #ffffff; opacity: 0.6; margin: 5px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Extraordinary Rural Experiences</p>
          </div>
          
          <p style="font-size: 15px; line-height: 1.6; color: rgba(255,255,255,0.9);">Hola <strong>${name}</strong>,</p>
          <p style="font-size: 15px; line-height: 1.6; color: rgba(255,255,255,0.9);">¡Tu pre-registro para el <strong>1er Moto Encuentro - Edición Alchipichí</strong> ha sido exitoso!</p>
          
          <div style="background-color: #35363a; padding: 25px; border-radius: 12px; text-align: center; margin: 30px 0; border: 1px solid rgba(245,158,11,0.25);">
            <span style="font-size: 11px; text-transform: uppercase; color: #f59e0b; letter-spacing: 2px; display: block; margin-bottom: 8px; font-weight: bold;">Tu Código Oficial de Sorteo</span>
            <strong style="font-size: 32px; letter-spacing: 3px; color: #ffffff; font-family: monospace;">${code}</strong>
          </div>
          
          <h3 style="color: #f59e0b; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px; margin-top: 30px;">Detalles del Registro:</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.6);">🏍️ Motocicleta:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: right; font-weight: bold; color: #ffffff;">${motorcycle}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.6);">📍 Parroquia de Origen:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: right; font-weight: bold; color: #ffffff;">${parish}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.6);">👥 Acompañantes:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: right; font-weight: bold; color: #ffffff;">${passengers === '1' ? 'Solo Piloto (1)' : 'Piloto + Copiloto (2)'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.6);">📅 Fecha:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: right; font-weight: bold; color: #ffffff;">Sábado 29 de Agosto, 2026</td>
            </tr>
          </table>
          
          <p style="font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.6; margin-top: 25px;">
            Presenta este correo digital en la mesa de control de Finca Alchipichí al ingresar para retirar tu ticket físico y participar en la rifa de auspiciantes oficiales.
          </p>
          
          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 35px; text-align: center; font-size: 12px; color: rgba(255,255,255,0.4);">
            Ruta Escondida · Corredor Norcentral · Ecuador Rural
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Nodemailer transport error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
