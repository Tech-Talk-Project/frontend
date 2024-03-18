import { useState, useEffect } from "react";

export default function useBreakpoint() {
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsSmallMobile(screenWidth < 640);
      setIsMobile(screenWidth >= 640 && screenWidth < 768);
      setIsTablet(screenWidth >= 768 && screenWidth < 1024);
      setIsDesktop(screenWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isSmallMobile, isMobile, isTablet, isDesktop };
}
