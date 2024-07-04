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
import allSchoolData from "@/data/allData"


import School from "@/data/schoolModel";

function SearchFullList() {

  const [data, setData] = useState<any>([]);

  const [nomEtablissement, setNomEtablissement] = useState("");
  const [formation, setFormation] = useState("");
  const [niveauEtude, setNiveauEtude] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [typeEtablissement, setTypeEtablissement] = useState("");
  const [servicesParaScolaire, setServicesParaScolaire] = useState<string[]>(
    []
  );
  const [searchData, setSearchData] = useState({});

  useEffect(() => {
    setData(allSchoolData);
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTags = {
      nomEtablissement,
      formation,
      niveauEtude,
      localisation,
      typeEtablissement,
      servicesParaScolaire,
    };
    setSearchData(searchTags);
    console.log("Search Tags:", searchTags);
  };

  const s1 = new School("Example School1");
  const s2 = new School("Example School2");
  const s3 = new School("Example School3");

  // console.log(s1, s2, s3);

  return (
    <div className="mt-10 px-4">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Rechercher des Écoles</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Box sx={{ width: 1 }}>
            <TextField
              fullWidth
              label="Nom de l'établissement"
              id="nomEtablissement"
              onChange={(e) => setNomEtablissement(e.target.value)}
            />
          </Box>
          <Box sx={{ width: 1 }}>
            <FormationSelect
              formation={formation}
              setFormation={setFormation}
            />
          </Box>
          <Stack
            spacing={3}
            direction={{ xs: "column", md: "row" }}
            sx={{ marginBottom: 4, width: 1 }}
            className="flex justify-center"
          >
            <NiveauSelect
              niveauEtude={niveauEtude}
              setNiveauEtude={setNiveauEtude}
            />
            <LocalisationSelect
              localisation={localisation}
              setLocalisation={setLocalisation}
            />
          </Stack>
          <Stack
            spacing={3}
            direction={{ xs: "column", md: "row" }}
            sx={{ marginBottom: 4 }}
            className="flex justify-center"
          >
            <TypeSelect
              typeEtablissement={typeEtablissement}
              setTypeEtablissement={setTypeEtablissement}
            />
            <ServiceSelect
              servicesParaScolaire={servicesParaScolaire}
              setServicesParaScolaire={setServicesParaScolaire}
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

        <ResultTable data={data} />
    </div>
  );
}

export default SearchFullList;
