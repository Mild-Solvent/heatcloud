import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Deck from '@/components/deck/Deck';
import { buildSlides } from '@/components/deck/slides';
import { site } from '@/content/company';
import { getDict } from '@/content/i18n';
import { isLocale } from '@/lib/i18n';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).deck;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function InvestorsPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  return <Deck slides={buildSlides(locale, d)} ui={d.deck.ui} brand={site.nameFull} />;
}
