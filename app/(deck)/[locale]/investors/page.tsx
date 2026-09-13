import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Deck from "@/components/deck/Deck";
import { buildPitchSlides } from "@/components/deck/PitchSlides";
import { site } from "@/content/company";
import { getDict } from "@/content/i18n";
import { isLocale } from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).deck;
  return {
    title: t.metaTitle,
    description:
      locale === "sk"
        ? "HeatCloud: investičný koncept slovenského cloudu s využitím odpadového tepla. Pilot, investičný rámec, financovanie a plán prípravy."
        : "HeatCloud: a Slovak cloud investment concept with heat recovery. Pilot, investment scope, financing and development plan.",
  };
}

export default async function InvestorsPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  return (
    <Deck
      slides={buildPitchSlides(locale)}
      ui={{
        ...d.deck.ui,
        confidential:
          locale === "sk"
            ? "Investičný koncept · pracovné predpoklady"
            : "Investment concept · planning assumptions",
      }}
      brand={site.nameFull}
      locale={locale}
    />
  );
}
