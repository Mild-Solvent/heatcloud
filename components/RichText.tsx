import { Fragment, type ReactNode } from 'react';
import { Link } from '@/lib/locale';

/**
 * Renders the tiny markup used by dictionary strings:
 *   [label](href)  **bold**  *italic*
 * Site-relative hrefs go through the locale-aware Link; everything else is a
 * plain anchor. No HTML is interpreted — the strings are ours, but this keeps
 * the dictionary readable as text.
 */
const TOKEN = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;

export function RichText({ text, linkClass = 'link' }: { text: string; linkClass?: string }) {
  const parts = text.split(TOKEN);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          if (href.startsWith('/')) {
            return <Link key={i} href={href} className={linkClass}>{label}</Link>;
          }
          const external = href.startsWith('http');
          return (
            <a key={i} href={href} className={linkClass} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              {label}
            </a>
          );
        }
        if (part.startsWith('**')) return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
        if (part.startsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

export type Rich = ReactNode;
