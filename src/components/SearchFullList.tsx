"use client";

import { useState, useEffect } from "react";
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
import allSchoolData from "@/data/allData";
import { groupedFormations } from "@/data/listeFromation";
import AlertInfo from "@/components/AlertInfo";

interface FilterState {
  nomEtablissement: string;
  formation: string;
  niveauEtude: string;
  localisation: string;
  typeEtablissement: string;
  servicesParaScolaire: string[];
}

interface GroupedFormationsType {
  [key: string]: string[];
}

function SearchFullList() {
  const [data, setData] = useState<any>(allSchoolData);
  const [filterData, setFilterData] = useState<any>(allSchoolData);
  const [filterState, setFilterState] = useState<FilterState>({
    nomEtablissement: "",
    formation: "",
    niveauEtude: "",
    localisation: "",
    typeEtablissement: "",
    servicesParaScolaire: [],
  });
  const [searchEvent, setSearcheEvent] = useState(false);

  useEffect(() => {}, [filterState]);

  const applyFilters = () => {
    let filteredData = [...data];

    filteredData = applyNameFilter(filteredData);
    filteredData = applyNiveauEtudeFilter(filteredData);
    filteredData = applyLocalisationFilter(filteredData);
    filteredData = applyTypeEtablissementFilter(filteredData);
    filteredData = applyServicesParaScolaireFilter(filteredData);
    filteredData = applyFormationFilter(filteredData);

    setFilterData(filteredData);
  };

  const applyNameFilter = (filteredData: any[]) => {
    const { nomEtablissement } = filterState;
    if (nomEtablissement.trim() === "") return filteredData;
    const nameTag = nomEtablissement.toLowerCase();
    return filteredData.filter((school: any) =>
      school.name.toLowerCase().includes(nameTag)
    );
  };

  const applyNiveauEtudeFilter = (filteredData: any[]) => {
    const { niveauEtude } = filterState;
    if (niveauEtude.trim() === "") return filteredData;
    const niveauEtudeTag = niveauEtude.toLowerCase();
    return filteredData.filter((school: any) =>
      school.niveauEtude.toLowerCase().includes(niveauEtudeTag)
    );
  };

  const applyLocalisationFilter = (filteredData: any[]) => {
    const { localisation } = filterState;
    if (localisation.trim() === "") return filteredData;
    const localisationTag = localisation.toLowerCase();
    return filteredData.filter((school: any) =>
      school.localisation.toLowerCase().includes(localisationTag)
    );
  };

  const applyTypeEtablissementFilter = (filteredData: any[]) => {
    const { typeEtablissement } = filterState;
    if (typeEtablissement.trim() === "") return filteredData;
    const typeEtablissementTag = typeEtablissement.toLowerCase();
    return filteredData.filter((school: any) =>
      school.typeEtablissement.toLowerCase().includes(typeEtablissementTag)
    );
  };

  const applyServicesParaScolaireFilter = (filteredData: any[]) => {
    const { servicesParaScolaire } = filterState;
    if (servicesParaScolaire.length === 0) return filteredData;
    return filteredData.filter((school: any) =>
      servicesParaScolaire.every((service: string) =>
        school.servicesParaScolaire.includes(service)
      )
    );
  };

  const applyFormationFilter = (filteredData: any[]) => {
    const { formation } = filterState;
    if (formation.trim() === "") return filteredData;

    const fomationsList: GroupedFormationsType = groupedFormations;

    const selectedFormations: string[] = fomationsList[formation] || [];

    return filteredData.filter((school: any) =>
      school.program.LicenceMaster.some((element: any) =>
        element.formations.some((formation: string) =>
          selectedFormations.includes(formation)
        )
      )
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    applyFilters();
    setSearcheEvent(true)
  };

  const handleFilterChange = (newFilterState: Partial<FilterState>) => {
    setFilterState((prevFilterState) => ({
      ...prevFilterState,
      ...newFilterState,
    }));
  };

  return (
    <div className="px-4">
      <div className="fixed bottom-0">
        <AlertInfo searchEvent={searchEvent} />
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Rechercher des Écoles
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              setFormation={(value: string) =>
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
              setNiveauEtude={(value: string) =>
                handleFilterChange({ niveauEtude: value })
              }
            />
            <LocalisationSelect
              localisation={filterState.localisation}
              setLocalisation={(value: string) =>
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
              setTypeEtablissement={(value: string) =>
                handleFilterChange({ typeEtablissement: value })
              }
            />
            <ServiceSelect
              servicesParaScolaire={filterState.servicesParaScolaire}
              setServicesParaScolaire={(value: string[]) =>
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
      </div>

      <ResultTable data={filterData} />
    </div>
  );
}

export default SearchFullList;
