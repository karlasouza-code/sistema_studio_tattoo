import { useEffect, useState } from 'react';

export function useIsMobile(breakpointPx = 480) {
  const getIsMobile = () => typeof window !== 'undefined' && window.innerWidth <= breakpointPx;
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    function handleResize() {
      setIsMobile(getIsMobile());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpointPx]);

  return isMobile;
}

export default useIsMobile;


