// lib/emailUtils.js
import nodemailer from 'nodemailer';

// Initialize transporter once
const initializeTransporter = () => {
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
        console.error("Missing EMAIL_USER or EMAIL_PASS environment variables.");
        return null;
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465, 
            secure: true, // Use SSL
            auth: {
                user: emailUser,
                pass: emailPass,
            },
            tls: { rejectUnauthorized: false },
        });
        return transporter;
    } catch (error) {
        console.error("Failed to initialize email transporter:", error);
        return null;
    }
};

const transporter = initializeTransporter();

/**
 * Sends a notification email to the admin with the contact form details.
 * @param {object} data - Form data (fullName, email, phone, preferredTime, preferredMethod, subject, message).
 */
export async function sendAdminEmail(data) {
    if (!transporter) {
        throw new Error("Email service is unavailable. Check server configuration.");
    }
    
    if (!process.env.ADMIN_EMAIL) {
        console.error("Missing ADMIN_EMAIL environment variable.");
        throw new Error("Admin email recipient is not configured.");
    }

    const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; background-color: #f9f9f9;">
            <h2 style="color: #8b3a3a; border-bottom: 2px solid #ff8c42; padding-bottom: 10px;">New Contact Form Submission</h2>
            
            <div style="margin: 20px 0;">
                <p><strong style="color: #333;">Name:</strong> ${data.fullName}</p>
                <p><strong style="color: #333;">Email:</strong> ${data.email}</p>
                <p><strong style="color: #333;">Phone:</strong> ${data.phone}</p>
                <p><strong style="color: #333;">Subject:</strong> ${data.subject}</p>
                <p><strong style="color: #333;">Preferred Time to Contact:</strong> ${data.preferredTime}</p>
                <p><strong style="color: #333;">Preferred Contact Method:</strong> ${data.preferredMethod}</p>
            </div>

            <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
            
            <p style="font-weight: bold; color: #333;">Message:</p>
            <div style="background: #fff; padding: 15px; border-left: 4px solid #ff8c42; border-radius: 5px; white-space: pre-wrap;">
                ${data.message}
            </div>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: `"Chef Emike Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `CONTACT: ${data.subject} [from ${data.fullName}]`,
            html: emailHtml,
        });
        console.log(`Admin email sent successfully for subject: ${data.subject}`);
    } catch (error) {
        console.error("Error sending admin email:", error);
        throw new Error(`Email sending failed: ${error.message}`);
    }
}