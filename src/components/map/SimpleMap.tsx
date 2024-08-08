import React, { useEffect, useState, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";

const location: any = {
  Agadez: { lat: "16.97139", lng: "7.99242" },
  Diffa: { lat: "13.31400", lng: "12.61306" },
  Dosso: { lat: "13.04938", lng: "3.19447" },
  Maradi: { lat: "13.50014", lng: "7.10301" },
  Tahoua: { lat: "14.88987", lng: "5.26215" },
  Tillaberi: { lat: "14.20844", lng: "1.45441" },
  Niamey: { lat: "13.52378", lng: "2.11135" },
  Zinder: { lat: "13.80700", lng: "8.98920" },
};

const niger = { lat: 17.85958, lng: 8.67502 };

interface SimpleMapProps {
  thisSchool: any;
}

const SimpleMap: React.FC<SimpleMapProps> = ({ thisSchool }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [mapCoordonnee, setMapCoordonnee] = useState<{
    lat: number;
    lng: number;
  }>();

  useEffect(() => {
    if (mapContainer.current) {
      maptilersdk.config.apiKey = "pge3bZ7Av8hHr0u6eHJS";

      // Détermine les coordonnées à utiliser
      let regionCoordonnees = {
        lat: 0,
        lng: 0,
      };
      let haveLocation = true;

      if (thisSchool?.coordonnee?.geoLocate) {
        const geo = thisSchool.coordonnee.geoLocate;
        regionCoordonnees = {
          lat: parseFloat(geo.lat),
          lng: parseFloat(geo.lng),
        };
      } else if (
        thisSchool?.localisation &&
        location[thisSchool.localisation]
      ) {
        regionCoordonnees = {
          lat: parseFloat(location[thisSchool.localisation].lat),
          lng: parseFloat(location[thisSchool.localisation].lng),
        };
      } else {
        regionCoordonnees = { ...niger };
        haveLocation = false;
      }

      // Crée la carte
      const map = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [regionCoordonnees.lng, regionCoordonnees.lat],
        zoom: haveLocation ? 12.69 : 4,
      });

      // Ajoute un marqueur sur la carte
      new maptilersdk.Marker({
        color: "#F77215"
      })
        .setLngLat([regionCoordonnees.lng, regionCoordonnees.lat])
        .addTo(map);

      setMapCoordonnee(regionCoordonnees);

      return () => {
        map.remove();
      };
    }
  }, [thisSchool]);

  return (
    <div className="map-wrap border-2 rounded-xl">
      <div ref={mapContainer} className="w-auto h-auto map rounded-xl" />
    </div>
  );
};

export default SimpleMap;
