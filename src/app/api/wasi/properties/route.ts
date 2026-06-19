import { NextResponse } from 'next/server';
import { getWasiProjects } from '../../../../lib/wasi';

export async function GET() {
  try {
    const projects = await getWasiProjects({ take: 12, forSale: true, short: false });

    return NextResponse.json({
      status: 'success',
      total: projects.length,
      projects,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to fetch Wasi properties';

    return NextResponse.json(
      {
        status: 'error',
        message,
      },
      { status: 500 },
    );
  }
}
