"use client";

import React, {useState, useEffect} from "react";
import LargeScreenContactUs from "./LargeScreenContactUs";
import MobilContactUs from "./MobilContactUs";


export default function ContactUs() {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);



  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {
        isSmallScreen ? <MobilContactUs /> : <LargeScreenContactUs />
      }
    </div>
  );
}
