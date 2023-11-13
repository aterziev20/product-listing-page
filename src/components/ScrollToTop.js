// ScrollToTop.js
import { useEffect } from "react";

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
