'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const handlePageShow = () => {
      const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      resetScroll();
      window.requestAnimationFrame(resetScroll);
      window.setTimeout(resetScroll, 50);
      window.setTimeout(resetScroll, 200);
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  useLayoutEffect(() => {
    const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    resetScroll();
    const frame = window.requestAnimationFrame(resetScroll);
    const shortDelay = window.setTimeout(resetScroll, 50);
    const restorationDelay = window.setTimeout(resetScroll, 200);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(shortDelay);
      window.clearTimeout(restorationDelay);
    };
  }, [pathname]);

  return null;
}
