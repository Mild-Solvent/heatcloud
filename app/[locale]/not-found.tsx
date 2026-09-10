'use client';

import { Button, Container, SectionHead } from '@/components/ui';
import { getDict } from '@/content/i18n';
import { useLocale } from '@/lib/locale';

// notFound() inside a locale route — an unknown product or document slug.
export default function LocaleNotFound() {
  const locale = useLocale();
  const t = getDict(locale).notFound;
  return (
    <Container className="py-24 sm:py-32">
      <div className="mx-auto max-w-xl text-center">
        <SectionHead eyebrow="404" title={t.title} lede={t.lede} center tone="ink" />
        <div className="mt-9 flex flex-wrap justify-center gap-x-7 gap-y-3">
          <Button href="/">{t.home}</Button>
          <Button href="/products/" variant="ghost" arrow>{t.products}</Button>
        </div>
      </div>
    </Container>
  );
}
