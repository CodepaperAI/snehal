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

type Lead = Required<LeadPayload> & {
  createdAt: string;
};

type KonectaleUpsertResponse = {
  contact?: { id?: string };
};

const KONECTALE_API_URL = 'https://services.leadconnectorhq.com';
const KONECTALE_LOCATION_ID = 'PgCqmWFD3ICN2PbEFxGQ';

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 500) : '';
}

function leadNote(lead: Lead) {
  return [
    `Website form: ${lead.source}`,
    lead.property && `Property: ${lead.property}`,
    lead.action && `Action: ${lead.action}`,
    lead.message && `Message: ${lead.message}`,
    lead.tourDate && `Tour date: ${lead.tourDate}`,
    lead.tourType && `Tour type: ${lead.tourType}`,
    `Submitted: ${lead.createdAt}`,
  ]
    .filter(Boolean)
    .join('\n');
}

async function deliverToKonectale(lead: Lead, token: string) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Version: 'v3',
  };

  const contactResponse = await fetch(`${KONECTALE_API_URL}/contacts/upsert`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      locationId: KONECTALE_LOCATION_ID,
      source: `Global Realty Panama Website - ${lead.source}`.slice(0, 100),
    }),
    cache: 'no-store',
  });

  if (!contactResponse.ok) {
    throw new Error(`Konectale contact delivery failed with ${contactResponse.status}`);
  }

  const result = (await contactResponse.json()) as KonectaleUpsertResponse;
  const contactId = result.contact?.id;

  if (!contactId) {
    throw new Error('Konectale contact delivery returned no contact ID');
  }

  const noteResponse = await fetch(
    `${KONECTALE_API_URL}/contacts/${encodeURIComponent(contactId)}/notes`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title: 'Global Realty Panama website enquiry',
        body: leadNote(lead),
      }),
      cache: 'no-store',
    },
  );

  // The contact is already safely delivered even if this optional detail note fails.
  if (!noteResponse.ok) {
    console.warn('Konectale lead note failed', { status: noteResponse.status });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;
    const lead: Lead = {
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

    const konectaleToken = process.env.KONECTALE_PRIVATE_TOKEN;
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;

    if (konectaleToken) {
      await deliverToKonectale(lead, konectaleToken);
    } else if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        cache: 'no-store',
      });

      if (!webhookResponse.ok) {
        throw new Error(`Lead webhook failed with ${webhookResponse.status}`);
      }
    } else if (process.env.NODE_ENV === 'production') {
      throw new Error('No lead delivery destination is configured');
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
