"use client";

import { useState, useEffect, useMemo } from "react";
import ServiceSelect from "@/components/search_filter_inputs/ServiceSelect";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import NiveauSelect from "@/components/search_filter_inputs/NiveauSelect";
import LocalisationSelect from "@/components/search_filter_inputs/LocalisationSelect";
import TypeSelect from "@/components/search_filter_inputs/TypeSelect";
import FormationSelect from "@/components/search_filter_inputs/FomationSelect";
import ResultTable from "@/components/ResultTable/ResultTable";
import AlertInfo from "@/components/AlertInfo";
import ReinitIcon from "/public/images/icon_reinit.png";
import Image from "next/image";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PuslishedSelect from "./supAdmin/PuslisedSelect";
import useAuthContext from "@/hooks/useAuthContext";

interface FilterState {
  nomEtablissement: string;
  formation: string;
  niveauEtude: string;
  localisation: string;
  typeEtablissement: string;
  servicesParaScolaire: string[];
  publishedStatus: boolean;
}

interface GroupedFormationsType {
  [key: string]: string[];
}

function useFilteredData(data: any[], filterState: any) {
  const [filteredData, setFilteredData] = useState<any[]>(data);

  useEffect(() => {
    const applyFilters = async () => {
      let filteredData = [...data];

      const applyPublishedStatusFilter = () => {
        const { publishedStatus } = filterState;
        if (typeof publishedStatus !== "boolean") return;
        filteredData = filteredData.filter(
          (school) => school.publishStatus === publishedStatus
        );
      };

      const applyNameFilter = () => {
        const { nomEtablissement } = filterState;
        if (nomEtablissement.trim() === "") return;
        const nameTag = nomEtablissement.toLowerCase();
        filteredData = filteredData.filter((school) =>
          school.name.toLowerCase().includes(nameTag)
        );
      };

      const applyNiveauEtudeFilter = () => {
        const { niveauEtude } = filterState;
        if (niveauEtude.trim() === "") return;
        const niveauEtudeTag = niveauEtude.toLowerCase();
        filteredData = filteredData.filter((school) =>
          school.niveauEtude.some((schoolNiveau: string) =>
            schoolNiveau.toLowerCase().includes(niveauEtudeTag)
          )
        );
      };

      const applyLocalisationFilter = () => {
        const { localisation } = filterState;
        if (localisation.trim() === "") return;
        const localisationTag = localisation.toLowerCase();
        filteredData = filteredData.filter((school) =>
          school.localisation.toLowerCase().includes(localisationTag)
        );
      };

      const applyTypeEtablissementFilter = () => {
        const { typeEtablissement } = filterState;
        if (typeEtablissement.trim() === "") return;
        const typeEtablissementTag = typeEtablissement.toLowerCase();
        filteredData = filteredData.filter((school) =>
          school.typeEtablissement.toLowerCase().includes(typeEtablissementTag)
        );
      };

      const applyServicesParaScolaireFilter = () => {
        const { servicesParaScolaire } = filterState;
        if (servicesParaScolaire.length === 0) return;
        filteredData = filteredData.filter((school) =>
          servicesParaScolaire.every((service: any) =>
            school.servicesParaScolaire.includes(service)
          )
        );
      };

      const applyFormationFilter = async () => {
        const { formation } = filterState;
        if (!formation || !formation._id) return;

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/programs/domaine/${formation._id}`
          );

          if (!response.ok) {
            console.error("Error fetching formation data");
            filteredData = [];
            return;
          }

          const result = await response.json();
          const schoolIds = result.map((program: any) => program.school);
          filteredData = filteredData.filter((school) =>
            schoolIds.includes(school._id)
          );
        } catch (error) {
          console.error("Error fetching formation data", error);
        }
      };

      applyNameFilter();
      applyNiveauEtudeFilter();
      applyLocalisationFilter();
      applyTypeEtablissementFilter();
      applyServicesParaScolaireFilter();
      await applyFormationFilter();
      applyPublishedStatusFilter();

      setFilteredData(filteredData);
    };

    applyFilters();
  }, [data, filterState]);

  return filteredData;
}

function SearchFullList() {
  const [data, setData] = useState<any[]>([]);
  const [filterState, setFilterState] = useState<FilterState>({
    nomEtablissement: "",
    formation: "",
    niveauEtude: "",
    localisation: "",
    typeEtablissement: "",
    servicesParaScolaire: [],
    publishedStatus: true,
  });
  const [searchEvent, setSearcheEvent] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { schoolOwner } = useAuthContext();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/school/all-schools`)
      .then((response) => response.json())
      .then((result) => {
        const published = result.filter((x: any) => x.publishStatus === true);
        if (schoolOwner && schoolOwner.role === "supAdmin") {
          const shuffledData = shuffleArray(result);
          setData(shuffledData);
        } else {
          const shuffledData = shuffleArray(published);
          setData(shuffledData);
        }
      })
      .catch((error) => console.error(error));
  }, [filterState.publishedStatus]);

  // Fonction pour mélanger un tableau (Fisher-Yates Shuffle)
  const shuffleArray = (array: any[]): any[] => {
    let currentIndex = array.length,
      randomIndex;

    // Tant qu'il reste des éléments à mélanger...
    while (currentIndex !== 0) {
      // Choisir un élément restant...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Et échanger avec l'élément courant
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const filteredData = useFilteredData(data, filterState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearcheEvent(true);
  };

  const handleFilterChange = (newFilterState: Partial<FilterState>) => {
    setFilterState((prevFilterState) => ({
      ...prevFilterState,
      ...newFilterState,
    }));
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="px-4">
      <div className="fixed bottom-0">
        <AlertInfo searchEvent={searchEvent} />
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-12">
          <FilterAltIcon onClick={toggleFormVisibility} className="text-3xl" />
          <h2
            onClick={toggleFormVisibility}
            className="col-span-10 text-2xl font-bold text-center cursor-pointer"
          >
            Rechercher des Écoles <br />{" "}
            {!isFormVisible && (
              <span className="text-sm font-normal leading-none">
                Utilisez le filtre pour trouver une école
              </span>
            )}
          </h2>
          <Image
            src={ReinitIcon}
            alt="reinit"
            className="w-10 cursor-pointer"
            onClick={() =>
              setFilterState({
                nomEtablissement: "",
                formation: "",
                niveauEtude: "",
                localisation: "",
                typeEtablissement: "",
                servicesParaScolaire: [],
                publishedStatus: false,
              })
            }
          />
        </div>
        {isFormVisible && (
          <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
            {schoolOwner && schoolOwner.role === "supAdmin" && (
              <PuslishedSelect
                publishedStatus={filterState.publishedStatus}
                setPublishedStatus={(value) =>
                  handleFilterChange({ publishedStatus: value })
                }
              />
            )}
            <Box sx={{ width: 1 }}>
              <TextField
                fullWidth
                label="Nom de l'établissement"
                id="nomEtablissement"
                value={filterState.nomEtablissement}
                onChange={(e) =>
                  handleFilterChange({ nomEtablissement: e.target.value })
                }
              />
            </Box>
            <Box sx={{ width: 1 }}>
              <FormationSelect
                formation={filterState.formation}
                setFormation={(value) =>
                  handleFilterChange({ formation: value })
                }
              />
            </Box>
            <Stack
              spacing={3}
              direction={{ xs: "column", md: "row" }}
              sx={{ marginBottom: 4, width: 1 }}
              className="flex justify-center"
            >
              <NiveauSelect
                niveauEtude={filterState.niveauEtude}
                setNiveauEtude={(value) =>
                  handleFilterChange({ niveauEtude: value })
                }
              />
              <LocalisationSelect
                localisation={filterState.localisation}
                setLocalisation={(value) =>
                  handleFilterChange({ localisation: value })
                }
              />
            </Stack>
            <Stack
              spacing={3}
              direction={{ xs: "column", md: "row" }}
              sx={{ marginBottom: 4 }}
              className="flex justify-center"
            >
              <TypeSelect
                typeEtablissement={filterState.typeEtablissement}
                setTypeEtablissement={(value) =>
                  handleFilterChange({ typeEtablissement: value })
                }
              />
              <ServiceSelect
                servicesParaScolaire={filterState.servicesParaScolaire}
                setServicesParaScolaire={(value) =>
                  handleFilterChange({ servicesParaScolaire: value })
                }
              />
            </Stack>

            <div className="text-center">
              <button
                type="submit"
                className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full md:w-3/5"
              >
                Rechercher
              </button>
            </div>
          </form>
        )}
      </div>

      <ResultTable data={filteredData} />
    </div>
  );
}

export default SearchFullList;
