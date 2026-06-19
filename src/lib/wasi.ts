import 'server-only';

import { premiumProjects, type Project } from '../data/projects';

type WasiImage = {
  url?: string;
  url_big?: string;
  url_original?: string;
};

type WasiProperty = {
  id_property?: string | number;
  title?: string;
  city_label?: string;
  region_label?: string;
  zone_label?: string;
  location_label?: string;
  property_type_label?: string;
  property_condition_label?: string;
  sale_price?: string | number;
  sale_price_label?: string;
  rent_price?: string | number;
  rent_price_label?: string;
  observations?: string;
  bedrooms?: string | number;
  bathrooms?: string | number;
  area?: string | number;
  built_area?: string | number;
  private_area?: string | number;
  unit_area_label?: string;
  main_image?: WasiImage;
  owner?: string;
};

type WasiSearchResponse = {
  total?: number | string;
  status?: string;
  message?: string;
  [key: string]: WasiProperty | number | string | undefined;
};

export type WasiSearchParams = {
  take?: number;
  skip?: number;
  forSale?: boolean;
  forRent?: boolean;
  orderBy?: 'id_property' | 'created_at' | 'sale_price' | 'rent_price' | 'max_price' | 'min_price';
  order?: 'asc' | 'desc';
  short?: boolean;
};

export type WasiListingProject = Project & {
  area: string;
  beds: number;
  baths: number;
  size: string;
};

const WASI_BASE_URL = process.env.WASI_BASE_URL ?? 'https://api.wasi.co/v1';
const PROPERTY_DETAIL_URL =
  process.env.NEXT_PUBLIC_WASI_PROPERTY_URL ??
  'https://snehalpanchal.inmo.co/main-inmueble-info-[id].htm';

function getCredentials() {
  const idCompany = process.env.WASI_ID_COMPANY;
  const token = process.env.WASI_TOKEN;

  if (!idCompany || !token) {
    throw new Error('Missing WASI_ID_COMPANY or WASI_TOKEN');
  }

  return { idCompany, token };
}

function asNumber(value: string | number | undefined) {
  if (typeof value === 'number') return value;
  if (!value) return 0;

  const parsed = Number(String(value).replace(/[^0-9.]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function decodeHtmlEntities(value: string) {
  const namedEntities: Record<string, string> = {
    aacute: '\u00e1',
    eacute: '\u00e9',
    iacute: '\u00ed',
    oacute: '\u00f3',
    uacute: '\u00fa',
    Aacute: '\u00c1',
    Eacute: '\u00c9',
    Iacute: '\u00cd',
    Oacute: '\u00d3',
    Uacute: '\u00da',
    ntilde: '\u00f1',
    Ntilde: '\u00d1',
    uuml: '\u00fc',
    Uuml: '\u00dc',
    sup2: '\u00b2',
    quot: '"',
    amp: '&',
    nbsp: ' ',
    iexcl: '\u00a1',
    iquest: '\u00bf',
  };

  const decodeOnce = (text: string) => text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]+);/g, (match, entity: string) => {
    if (entity.startsWith('#x')) {
      return String.fromCodePoint(parseInt(entity.slice(2), 16));
    }

    if (entity.startsWith('#')) {
      return String.fromCodePoint(parseInt(entity.slice(1), 10));
    }

    return namedEntities[entity] ?? match;
  });

  let decoded = value;
  for (let index = 0; index < 3; index += 1) {
    const next = decodeOnce(decoded);
    if (next === decoded) break;
    decoded = next;
  }

  return decoded;
}

function cleanText(value: string | undefined, fallback = '') {
  if (!value) return fallback;
  return decodeHtmlEntities(value)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || fallback;
}

function getLocation(property: WasiProperty) {
  return [
    property.zone_label,
    property.location_label,
    property.city_label,
    property.region_label,
  ]
    .filter(Boolean)
    .map((value) => cleanText(String(value)))
    .join(', ');
}

function getPrice(property: WasiProperty) {
  return (
    cleanText(property.sale_price_label) ||
    cleanText(property.rent_price_label) ||
    (property.sale_price ? `$${property.sale_price}` : '') ||
    (property.rent_price ? `$${property.rent_price}` : '') ||
    'Price on request'
  );
}

export function mapWasiPropertyToProject(property: WasiProperty, index = 0): WasiListingProject {
  const fallback = premiumProjects[index % premiumProjects.length];
  const id = asNumber(property.id_property) || fallback.id;
  const location = getLocation(property) || fallback.location;
  const area = property.private_area || property.built_area || property.area;
  const areaLabel = cleanText(property.unit_area_label, 'm2');
  const size = area ? `${area} ${areaLabel}` : 'Upon request';
  const beds = asNumber(property.bedrooms);
  const baths = asNumber(property.bathrooms);
  const bedsLabel = beds ? `${beds} bed` : '';
  const bathsLabel = baths ? `${baths} bath` : '';
  const details = [bedsLabel, bathsLabel, area ? size : ''].filter(Boolean).join(' / ');

  return {
    id,
    title: cleanText(property.title, fallback.title),
    location,
    tagline: cleanText(
      property.property_type_label || property.property_condition_label,
      details || fallback.tagline,
    ),
    price: getPrice(property),
    rawPrice: asNumber(property.sale_price) || asNumber(property.rent_price) || fallback.rawPrice,
    developer: property.owner === 'allied' ? 'Wasi Allied Listing' : 'Wasi Listing',
    description: cleanText(property.observations, fallback.description),
    image:
      property.main_image?.url_big ||
      property.main_image?.url ||
      property.main_image?.url_original ||
      fallback.image,
    cta1: 'Schedule Viewing',
    cta2: 'Open Listing',
    detailUrl: PROPERTY_DETAIL_URL.replace('[id]', String(id)),
    area: cleanText(property.zone_label || property.city_label || property.region_label, location),
    beds,
    baths,
    size,
  };
}

export async function getWasiProjects(params: WasiSearchParams = {}) {
  const { idCompany, token } = getCredentials();
  const body = new URLSearchParams({
    id_company: idCompany,
    wasi_token: token,
    take: String(params.take ?? 8),
    skip: String(params.skip ?? 0),
    order_by: params.orderBy ?? 'created_at',
    order: params.order ?? 'desc',
    short: String(params.short ?? false),
  });

  if (params.forSale ?? true) body.set('for_sale', 'true');
  if (params.forRent) body.set('for_rent', 'true');

  const response = await fetch(`${WASI_BASE_URL}/property/search`, {
    method: 'POST',
    body,
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Wasi request failed with ${response.status}`);
  }

  const data = (await response.json()) as WasiSearchResponse;

  if (data.status !== 'success') {
    throw new Error(data.message || 'Wasi API returned an error');
  }

  return Object.keys(data)
    .filter((key) => /^\d+$/.test(key))
    .map((key, index) => mapWasiPropertyToProject(data[key] as WasiProperty, index));
}

export async function getFeaturedProjects() {
  try {
    const projects = await getWasiProjects({ take: 4, forSale: true, short: false });
    return projects.length > 0 ? projects : premiumProjects.slice(0, 4);
  } catch (error) {
    console.error(error);
    return premiumProjects.slice(0, 4);
  }
}
