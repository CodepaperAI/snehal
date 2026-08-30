'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

function restoreRequestedPosition() {
  const hash = window.location.hash.slice(1);
  const target = hash ? document.getElementById(decodeURIComponent(hash)) : null;
  if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
  else window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const handlePageShow = () => {
      restoreRequestedPosition();
      window.requestAnimationFrame(restoreRequestedPosition);
      window.setTimeout(restoreRequestedPosition, 50);
      window.setTimeout(restoreRequestedPosition, 200);
    };

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('hashchange', restoreRequestedPosition);
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('hashchange', restoreRequestedPosition);
    };
  }, []);

  useLayoutEffect(() => {
    restoreRequestedPosition();
    const frame = window.requestAnimationFrame(restoreRequestedPosition);
    const shortDelay = window.setTimeout(restoreRequestedPosition, 50);
    const restorationDelay = window.setTimeout(restoreRequestedPosition, 200);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(shortDelay);
      window.clearTimeout(restorationDelay);
    };
  }, [pathname]);

  return null;
}
