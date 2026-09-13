import { notFound } from 'next/navigation';
import InvestorLanding from '@/components/InvestorLanding';
import { isLocale } from '@/lib/i18n';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <InvestorLanding locale={locale} />;
}
