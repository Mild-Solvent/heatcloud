import type { Locale } from '@/lib/i18n';
import { en, type Dict } from './en';
import { sk } from './sk';

const dicts: Record<Locale, Dict> = { en, sk };

export const getDict = (locale: Locale): Dict => dicts[locale];
export type { Dict };
