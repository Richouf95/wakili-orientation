import React from "react";
import Link from "next/link";

function SearchPage() {
  return (
    <div className="constaine w-3/4 mt-5">
      <div>
        <h2 className="text-3xl text-center font-bold text-orange-400 w-4/5 m-auto">
          Bienvenue sur notre site dédié à la découverte et à la mise en valeur
          de toutes les écoles nationales du Niger.
        </h2>
        <p className="text-lg my-5 w-3/5 m-auto text-justify">
          Que vous cherchiez une école primaire, un collège, un lycée, une
          université ou un centre de formation, notre plateforme vous offre une
          vue d'ensemble complète des établissements éducatifs du pays, qu'ils
          soient publics ou privés.
        </p>
        <p className="text-lg my-5 w-3/5 m-auto text-justify">
          Explorez les critères géographiques, pédagogiques et les services
          offerts aux élèves pour trouver l'institution qui correspond le mieux
          à vos besoins et aspirations.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-stretch mt-8 space-y-4 md:space-y-0 md:space-x-4">
        {/* <!-- Card 1: Liste Complète des Écoles --> */}
        <div className="max-w-sm w-full md:w-1/2 lg:w-1/3 h-80 rounded-xl overflow-hidden shadow-lg bg-[#4f5857] p-6 flex flex-col">
          <div className="px-6 py-4 flex-grow">
            <div className="font-bold text-xl mb-5 text-white text-center">
              Consultez la Liste Complète des Écoles
            </div>
            <p className="text-white text-base">
              Découvrez toutes les écoles nationales du Niger en un seul
              endroit. Explorez la liste complète des établissements éducatifs
              disponibles dans notre base de données.
            </p>
          </div>
          <div className="flex justify-center">
            <Link
              href="/search/full-liste"
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full"
            >
              Voir la Liste Complète
            </Link>
          </div>
        </div>

        {/* <!-- Card 2: Recherche Filtrée --> */}
        <div className="max-w-sm w-full md:w-1/2 lg:w-1/3 h-80 rounded-xl overflow-hidden shadow-lg bg-[#4f5857] p-6 flex flex-col">
          <div className="px-6 py-4 flex-grow">
            <div className="font-bold text-xl mb-5 text-white text-center">
              Recherchez Selon Vos Critères
            </div>
            <p className="text-white text-base">
              Utilisez notre outil de recherche avancée pour trouver les écoles
              qui répondent à vos critères géographiques, pédagogiques et de
              services offerts aux élèves.
            </p>
          </div>
          <div className="flex justify-center">
            <a
              href="/search/advanced-list"
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full"
            >
              Faire une Recherche Filtrée
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
