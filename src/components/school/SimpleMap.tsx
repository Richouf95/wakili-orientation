import React, { useEffect, useState } from "react";

const location: any = {
  Agadez: {
    lat: "16.97139",
    lng: "7.99242",
  },
  Diffa: {
    lat: "13.31400",
    lng: "12.61306",
  },
  Dosso: {
    lat: "13.04938",
    lng: "3.19447",
  },
  Maradi: {
    lat: "13.50014",
    lng: "7.10301",
  },
  Tahoua: {
    lat: "14.88987",
    lng: "5.26215",
  },
  Tillaberi: {
    lat: "14.20844",
    lng: "1.45441",
  },
  Niamey: {
    lat: "13.52378",
    lng: "2.11135",
  },
  Zinder: {
    lat: "13.80700",
    lng: "8.98920",
  },
};

interface SimpleMapProps {
  schoolLocation: any;
}

const SimpleMap: React.FC<SimpleMapProps> = ({ schoolLocation }) => {
  const [mapCoordonnee, setMapCoordonnee] = useState<any>();

  useEffect(() => {
    Object.keys(location).forEach((x) => {
      if (x === schoolLocation) {
        setMapCoordonnee(location[x]);
      }
    });
  }, [schoolLocation]);

  const coorrdonnee = mapCoordonnee != undefined
    ? `https://api.maptiler.com/maps/basic-v2/?key=pge3bZ7Av8hHr0u6eHJS#15.5/${mapCoordonnee.lat}/${mapCoordonnee.lng}`
    : "https://api.maptiler.com/maps/basic-v2/?key=pge3bZ7Av8hHr0u6eHJS#4.5/17.85958/8.67502";

    console.log(coorrdonnee)

  return (
      <iframe
        className="w-full min-h-96 lg:h-4/5 rounded-lg"
        src={coorrdonnee}
      ></iframe>
  );
};

export default SimpleMap;
