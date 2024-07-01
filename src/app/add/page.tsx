"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddProgram from "@/components/addSchool/AddProgram";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import LocalisationSelect from "@/components/search_filter_inputs/LocalisationSelect";
import TypeSelect from "@/components/search_filter_inputs/TypeSelect";
import NiveauSelect from "@/components/search_filter_inputs/NiveauSelect";

import ServiceSelect from "@/components/search_filter_inputs/ServiceSelect";

function AddSchool() {
  const [name, setName] = useState("");
  const [openingDecree, setOpeningDecree] = useState("");

  const [ifBTS, setIfBTS] = useState(false);
  const [ifBTSNomClassique, setIfBTSNomClassique] = useState(false);
  const [arreteBTS, setArreteBTS] = useState("");
  const [nameBTS, setNameBTS] = useState("");

  const [servicesParaScolaire, setServicesParaScolaire] = useState<string[]>(
    []
  );
  const [localisation, setLocalisation] = useState("");
  const [typeEtablissement, setTypeEtablissement] = useState("");
  const [niveauEtude, setNiveauEtude] = useState("");

  console.log(nameBTS);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const btsNameDefining = !ifBTSNomClassique ? nameBTS : "BTS Etat";
    const data = {
      name,
      openingDecree,
      localisation,
      typeEtablissement,
      niveauEtude,
      servicesParaScolaire,
      program: {
        bts: ifBTS ? {
          arreteBTS,
          nameBTS: btsNameDefining
        } : null,
        LicenceMaster: []
      }
    }
    alert(data)
    console.log(data);
  };

  const services = [
    "Cantine",
    "Transport",
    "Infirmerie",
    "Bibliothèque",
    "Technologies",
  ];

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8 mt-10 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Ajouter une Ecole
          </h2>
          <Box sx={{ width: 1, mb: 2 }}>
            <TextField
              fullWidth
              label="Nom de l'établissement"
              id="nomEtablissement"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ width: 1, mb: 2 }}>
            <TextField
              fullWidth
              label="Arrêtés d’ouverture"
              id="nomEtablissement"
              onChange={(e) => setOpeningDecree(e.target.value)}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <LocalisationSelect
              localisation={localisation}
              setLocalisation={setLocalisation}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TypeSelect
              typeEtablissement={typeEtablissement}
              setTypeEtablissement={setTypeEtablissement}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <NiveauSelect
              niveauEtude={niveauEtude}
              setNiveauEtude={setNiveauEtude}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <ServiceSelect
              servicesParaScolaire={servicesParaScolaire}
              setServicesParaScolaire={setServicesParaScolaire}
            />
          </Box>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8 mt-10 max-w-4xl mx-auto">
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">BTS ?</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => setIfBTS(JSON.parse(e.target.value))}
            >
              <FormControlLabel value={true} control={<Radio />} label="Oui" />
              <FormControlLabel value={false} control={<Radio />} label="Non" />
            </RadioGroup>
          </FormControl>
          {ifBTS && (
            <>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Nom classique ?
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) =>
                    setIfBTSNomClassique(JSON.parse(e.target.value))
                  }
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Oui"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Non"
                  />
                </RadioGroup>
              </FormControl>
              <Box sx={{ width: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Arrêté BTS"
                  id="nomEtablissement"
                  onChange={(e) => setArreteBTS(e.target.value)}
                />
              </Box>
            </>
          )}
          {!ifBTSNomClassique && ifBTS && (
            <Box sx={{ width: 1, mb: 2 }}>
              <TextField
                fullWidth
                label="Nom du brévet"
                id="nomEtablissement"
                onChange={(e) => setNameBTS(e.target.value)}
              />
            </Box>
          )}
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8 mt-10 max-w-4xl mx-auto">
          <AddProgram />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full md:w-3/5"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSchool;
