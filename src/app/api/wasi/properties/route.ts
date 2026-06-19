import { NextResponse } from 'next/server';
import { getWasiProjects } from '../../../../lib/wasi';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') === 'rent' ? 'rent' : 'sale';
    const take = Math.min(Math.max(Number(searchParams.get('take')) || 12, 1), 50);

    const projects = await getWasiProjects({
      take,
      forSale: type === 'sale',
      forRent: type === 'rent',
      short: false,
    });

    return NextResponse.json({
      status: 'success',
      type,
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
