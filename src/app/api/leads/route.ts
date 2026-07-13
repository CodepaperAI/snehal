import { NextResponse } from 'next/server';

type LeadPayload = {
  source?: string;
  name?: string;
  email?: string;
  phone?: string;
  property?: string;
  action?: string;
  message?: string;
  tourDate?: string;
  tourType?: string;
};

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 500) : '';
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;
    const lead = {
      source: clean(body.source) || 'website',
      name: clean(body.name),
      email: clean(body.email),
      phone: clean(body.phone),
      property: clean(body.property),
      action: clean(body.action),
      message: clean(body.message),
      tourDate: clean(body.tourDate),
      tourType: clean(body.tourType),
      createdAt: new Date().toISOString(),
    };

    if (!lead.name || !lead.email || !lead.phone) {
      return NextResponse.json(
        { status: 'error', message: 'Name, email, and phone are required.' },
        { status: 400 },
      );
    }

    const webhookUrl = process.env.LEAD_WEBHOOK_URL;

    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        cache: 'no-store',
      });

      if (!webhookResponse.ok) {
        throw new Error(`Lead webhook failed with ${webhookResponse.status}`);
      }
    }

    console.info('Lead captured', {
      source: lead.source,
      property: lead.property,
      action: lead.action,
      createdAt: lead.createdAt,
    });

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 'error', message: 'Unable to submit lead right now.' },
      { status: 500 },
    );
  }
}
