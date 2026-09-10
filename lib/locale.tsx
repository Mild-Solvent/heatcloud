'use client';

import NextLink from 'next/link';
import { createContext, useContext, type ComponentProps } from 'react';
import { defaultLocale, localizeHref, type Locale } from './i18n';

const LocaleContext = createContext<Locale>(defaultLocale);

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);

type LinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & { href: string };

/**
 * next/link with the current locale prefixed onto site-relative hrefs, so
 * pages keep writing `href="/pricing/"` and get `/sk/pricing/` or `/en/pricing/`.
 */
export function Link({ href, ...rest }: LinkProps) {
  const locale = useLocale();
  return <NextLink href={localizeHref(locale, href)} {...rest} />;
}
