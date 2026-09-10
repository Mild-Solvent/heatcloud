'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/** Re-mounts on every route so the short entrance plays on each page. */
export function PageEnter({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <div key={pathname} className="page-enter">{children}</div>;
}
