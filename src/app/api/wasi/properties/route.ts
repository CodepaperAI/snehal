import { NextResponse } from 'next/server';
import { getWasiProjects } from '../../../../lib/wasi';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type WasiListingType = 'sale' | 'rent' | 'project';

function getListingType(value: string | null): WasiListingType {
  if (value === 'rent' || value === 'project') return value;
  return 'sale';
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = getListingType(searchParams.get('type'));
    const take = Math.min(Math.max(Number(searchParams.get('take')) || 12, 1), 50);

    const projects = type === 'project'
      ? Array.from(
          new Map(
            (await Promise.all([
              getWasiProjects({ take, forSale: true, propertyConditionId: 3, short: false, priceMode: 'sale' }),
              getWasiProjects({ take, forSale: true, propertyConditionId: 4, short: false, priceMode: 'sale' }),
            ]))
              .flat()
              .map((project) => [project.id, project]),
          ).values(),
        ).slice(0, take)
      : await getWasiProjects({
          take,
          forSale: type === 'sale',
          forRent: type === 'rent',
          short: false,
          priceMode: type === 'rent' ? 'rent' : 'sale',
        });

    return NextResponse.json(
      {
        status: 'success',
        type,
        total: projects.length,
        projects,
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to fetch Wasi properties';

    return NextResponse.json(
      {
        status: 'error',
        message,
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      },
    );
  }
}
