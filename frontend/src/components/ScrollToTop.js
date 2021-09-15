import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
function ScrollToTop({ children, scrollTo = window.scrollTo }) {
  const prevLocation = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (prevLocation.current && location !== prevLocation.current) {
      scrollTo(0, 0);
    }
    return () => (prevLocation.current = location);
  }, [location, scrollTo]);
  return children;
}

export default ScrollToTop;
