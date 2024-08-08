"use client";

import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import Image from "next/image";
import LocateIcon from "/public/images/LocateIcon.png";

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

interface regionCoordonneesSchema {
  lat: number;
  lng: number;
}

interface MarkLocationProps {
  thisSchool: any;
  handleClose: () => void;
}

const MarkLocation: React.FC<MarkLocationProps> = ({
  thisSchool,
  handleClose,
}) => {
  const mapContainer = useRef(null);
  const [centerCoordinates, setCenterCoordinates] = useState({
    lng: 0,
    lat: 0,
  });

  useEffect(() => {
    if (mapContainer.current) {
      maptilersdk.config.apiKey = "pge3bZ7Av8hHr0u6eHJS";
      let regionCoordonnees: regionCoordonneesSchema = {
        lat: 0,
        lng: 0,
      };

      if (
        thisSchool &&
        thisSchool.coordonnee &&
        thisSchool.coordonnee.geoLocate
      ) {
        const geo = thisSchool.coordonnee.geoLocate;
        regionCoordonnees.lat = parseFloat(geo.lat);
        regionCoordonnees.lng = parseFloat(geo.lng);
      } else {
        Object.keys(location).forEach((x) => {
          if (x === thisSchool.localisation) {
            regionCoordonnees.lat = parseFloat(location[x].lat);
            regionCoordonnees.lng = parseFloat(location[x].lng);
          }
        });
      }

      const map = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [regionCoordonnees.lng, regionCoordonnees.lat], // position initiale
        zoom: 12.69,
      });

      const updateCenterCoordinates = () => {
        const center = map.getCenter();
        setCenterCoordinates({
          lng: center.lng,
          lat: center.lat,
        });
      };

      map.on("move", updateCenterCoordinates);
      map.on("zoom", updateCenterCoordinates);

      // Initial update of center coordinates
      updateCenterCoordinates();

      return () => {
        map.remove();
      };
    }
  }, []);

  const handleSubmit = async () => {
    const thisSchoolCoordonates = thisSchool.coordonnee
      ? thisSchool.coordonnee
      : {};
    const newCoordonates = {
      ...thisSchoolCoordonates,
      geoLocate: centerCoordinates,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/school/update-school/${thisSchool._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coordonnee: newCoordonates }),
      }
    );

    if (!response.ok) {
      alert(
        "L'ajout de la géolocalisation a échoué !\nUn événement inattendu s'est produit.\nVeuillez réessayer, s'il vous plaît."
      );
    }

    if (response.ok) {
      handleClose();
      alert("Géolocalisation mis à jour avec succès !");
    }
    handleClose();
  };

  return (
    <div>
      <div className="map-wrap border-2" style={{ position: "relative" }}>
        <div ref={mapContainer} className="map" />
        <Image
          src={LocateIcon}
          alt="LocateIcon"
          width={40}
          height={40}
          style={{
            position: "absolute",
            top: "50%", // positionner au milieu verticalement
            left: "50%", // positionner au milieu horizontalement
            transform: "translate(-50%, -100%)", // décaler de moitié de la hauteur
            zIndex: 100,
          }}
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 mt-5 rounded-full flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default MarkLocation;
