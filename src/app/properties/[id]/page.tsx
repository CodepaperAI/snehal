import type { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import PropertyDetailView from '../../../components/sections/PropertyDetailView';
import Footer from '../../../components/sections/Footer';
import { getWasiProjectById } from '../../../lib/wasi';

type PageProps = { params: Promise<{ id: string }> };
const getProperty = cache(getWasiProjectById);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await getProperty(Number(id));
  if (!property) return { title: 'Property not found' };
  return { title: property.title, description: `${property.price} property in ${property.location}. View details and request a private consultation.` };
}

export default async function PropertyPage({ params }: PageProps) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) notFound();
  const property = await getProperty(numericId);
  if (!property) notFound();
  return <><PropertyDetailView property={property} /><Footer /></>;
}
