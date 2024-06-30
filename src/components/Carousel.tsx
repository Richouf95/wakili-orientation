"use client";

import React from "react";
import { useCarousel } from "@/context/CarouselContext";
import Image from "next/image";
import etablissement from "/public/images/ched-etablissements.png";
import orientation from "/public/images/illustration-du-concept-orientation-professionnelle.png";
import analyse from "/public/images/analyse.png";

function Carousel({ items }: any) {
  const { currentIndex, prevSlide, nextSlide } = useCarousel();

  const slideEtablissement = (
    <div>
      <h2 className="text-3xl mb-5 font-extrabold text-center text-orange-400">
        Recherche d'établissements éducatifs
      </h2>
      <div className="flex justify-center gap-5 items-center">
        <div>
          <Image src={etablissement} alt="" className="w-96 h-72" />
        </div>
        <div
          style={{ maxWidth: "300px" }}
          className="text-white text-lg font-bold"
        >
          <p>
            Explorez et comparez les écoles, collèges, lycées et universités à
            travers le Niger.
          </p>
          <br />
          <p>
            Accédez facilement à des informations détaillées et mises à jour sur
            les établissements d'enseignement.
          </p>
        </div>
      </div>
    </div>
  );

  const slideOrientation = (
    <div>
      <h2 className="text-3xl mb-5 font-bold text-center text-orange-400">
        Orientation
      </h2>
      <div className="flex justify-center gap-5 items-center">
        <div>
          <Image src={orientation} alt="" className="w-96 h-72" />
        </div>
        <div
          style={{ maxWidth: "300px" }}
          className="text-white text-lg font-bold"
        >
          <p>
            Recevez des conseils personnalisés pour choisir l'établissement qui
            correspond le mieux à vos besoins académiques.
          </p>
          <br />
          <p>
            Obtenez des recommandations basées sur vos préférences et objectifs
            éducatifs.
          </p>
        </div>
      </div>
    </div>
  );

  const slideAnalyse = (
    <div>
      <h2 className="text-3xl mb-5 font-bold text-center text-orange-400">
        Ressources et support
      </h2>
      <div className="flex justify-center gap-5 items-center">
        <div>
          <Image src={analyse} alt="" className="w-96 h-72" />
        </div>
        <div
          style={{ maxWidth: "300px" }}
          className="text-white text-lg font-bold"
        >
          <p>
            Accédez à une multitude de ressources éducatives pour faciliter
            votre parcours scolaire.
          </p>
          <br />
          <p>
            Profitez de notre support pour répondre à toutes vos questions sur
            les établissements d'enseignement.
          </p>
        </div>
      </div>
    </div>
  );

  console.log(currentIndex);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex justify-end mb-5">
        <button className="bg-[#444747] text-white font-bold py-2 px-5 rounded-full">
          Sauter
        </button>
      </div>
      <div className="flex transition-transform duration-500">
        {currentIndex === 0
          ? slideEtablissement
          : currentIndex === 1
          ? slideOrientation
          : currentIndex === 2
          ? slideAnalyse
          : ""}
      </div>
      <div className="flex justify-around gap-5 mt-4">
        {currentIndex !== 0 && (
          <button
            onClick={() => prevSlide(3)}
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full"
          >
            Précédent
          </button>
        )}
        {currentIndex !== 2 && (
          <button
            onClick={() => nextSlide(3)}
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full"
          >
            Suivant
          </button>
        )}
        {currentIndex === 2 && (
          <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full">
            Commencer
          </button>
        )}
      </div>
    </div>
  );
}

export default Carousel;
