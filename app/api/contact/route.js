// app/api/contact/route.js
import { sendAdminEmail } from '@/lib/emailUtils';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();

    // Validate required fields
    const { fullName, email, phone, preferredTime, preferredMethod, subject, message } = data;
    
    if (!fullName || !email || !phone || !preferredTime || !preferredMethod || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Send email to admin
    await sendAdminEmail(data);

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Error:', error.message);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}