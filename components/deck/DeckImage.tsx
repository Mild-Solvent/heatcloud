'use client';

import { useEffect, useState } from 'react';
import { BASE } from '@/lib/base';

/**
 * A photograph slot for the deck. The files live in public/deck/ and are
 * optional: the server renders the fallback (or nothing), and the browser
 * probes for the real file and swaps it in only once it has loaded — so the
 * deck can be presented before every asset exists, and never shows a broken
 * image.
 */
export default function DeckImage({
  src, fallback, alt = '', className = '', position = '50% 50%',
}: {
  src: string; fallback?: string; alt?: string; className?: string; position?: string;
}) {
  const [shown, setShown] = useState<string | null>(fallback ?? null);

  useEffect(() => {
    let live = true;
    const probe = new Image();
    probe.onload = () => { if (live) setShown(src); };
    probe.src = `${BASE}${src}`;
    return () => { live = false; };
  }, [src]);

  if (!shown) return null;
  return (
    <img
      src={`${BASE}${shown}`}
      alt={alt}
      decoding="async"
      className={className}
      style={{ objectPosition: position }}
    />
  );
}
