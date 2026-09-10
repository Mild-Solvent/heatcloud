'use client';

import { useState } from 'react';
import { BASE } from '@/lib/base';

/**
 * A photograph slot for the deck. The files live in public/deck/; while one
 * is missing the slot shows a quiet gradient and a label instead of a broken
 * image, so the deck can be presented before every asset exists.
 */
export default function DeckImage({
  src, alt = '', className = '', position = '50% 50%', label,
}: {
  src: string; alt?: string; className?: string; position?: string; label: string;
}) {
  const [missing, setMissing] = useState(false);
  if (missing) {
    return (
      <div className={`deck-img-missing ${className}`} aria-hidden="true">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] opacity-60">{label} · {src.replace(/^.*\//, '')}</span>
      </div>
    );
  }
  return (
    <img
      src={`${BASE}${src}`}
      alt={alt}
      decoding="async"
      className={className}
      style={{ objectPosition: position }}
      onError={() => setMissing(true)}
    />
  );
}
