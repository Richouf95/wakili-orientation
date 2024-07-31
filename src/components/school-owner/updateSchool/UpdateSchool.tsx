"use client";

import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";

import LocalisationSelect from "@/components/search_filter_inputs/LocalisationSelect";
import TypeSelect from "@/components/search_filter_inputs/TypeSelect";
import ServiceSelect from "@/components/search_filter_inputs/ServiceSelect";
import NiveauMultiSelect from "@/components/NiveauMultiSelect";
import Link from "next/link";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 700,
  maxHeight: "90vh", // Limiter la hauteur à 90% de la hauteur de la fenêtre
  overflowY: "auto", // Activer le défilement vertical
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

interface schoolCoordonnee {
  email: string;
  telephone: string;
  web: string;
}

interface OwneSchoolCreatedProps {
  thisSchool: any;
  setSchoolUpdated: (value: boolean) => void;
}

const CreateNewSchool: React.FC<OwneSchoolCreatedProps> = ({
  thisSchool,
  setSchoolUpdated,
}) => {
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState<string>(thisSchool.name);
  const [openingDecree, setOpeningDecree] = useState<string>(
    thisSchool.openingDecree
  );
  const [localisation, setLocalisation] = useState<string>(
    thisSchool.localisation
  );
  const [typeEtablissement, setTypeEtablissement] = useState<string>(
    thisSchool.typeEtablissement
  );
  const [niveauEtude, setNiveauEtude] = useState<string[]>(
    thisSchool.niveauEtude
  );
  const [coordonnee, setCoordonnee] = useState<schoolCoordonnee>({
    email: thisSchool.coordonnee ? thisSchool.coordonnee.email : "",
    telephone: thisSchool.coordonnee ?  thisSchool.coordonnee.telephone :"",
    web: thisSchool.coordonnee ?  thisSchool.coordonnee.web :"",
  });
  const [servicesParaScolaire, setServicesParaScolaire] = useState<string[]>(
    thisSchool.servicesParaScolaire
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const schoolOwnerInfo = localStorage.getItem("schoolOwner");
    if (schoolOwnerInfo) {
      const schoolOwnerId = JSON.parse(schoolOwnerInfo).schoolOwnerId;

      const schoolData = {
        name,
        openingDecree,
        localisation,
        typeEtablissement,
        niveauEtude,
        coordonnee,
        servicesParaScolaire,
      };

      fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/school/update-school/${thisSchool._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schoolData),
      })
        .then((response) => response.json())
        .then((result) => {
          setSchoolUpdated(true);
          handleClose()
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="w-full flex justify-center">
      <button
        onClick={handleOpen}
        className="my-5 px-10 py-3 bg-orange-400 btn hover:bg-orange-500 text-white font-bold rounded-full flex items-center"
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
        Mettre à jour
      </button>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{ ...style }}
            className="border-y-8 border-white border-opacity-0"
          >
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              className="text-center"
            >
              Nouvel établissement
            </Typography>
            <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
              <Box sx={{ width: 1 }}>
                <TextField
                  fullWidth
                  label="Nom de l'établissement"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box sx={{ width: 1 }}>
                <TextField
                  fullWidth
                  label="Arrêté d'ouverture"
                  id="openingDecree"
                  value={openingDecree}
                  onChange={(e) => setOpeningDecree(e.target.value)}
                />
              </Box>
              <Box sx={{ width: 1 }}>
                <LocalisationSelect
                  localisation={localisation}
                  setLocalisation={setLocalisation}
                />
              </Box>
              <Box sx={{ width: 1 }}>
                <TypeSelect
                  typeEtablissement={typeEtablissement}
                  setTypeEtablissement={setTypeEtablissement}
                />
              </Box>
              <NiveauMultiSelect
                niveaux={niveauEtude}
                setNiveaux={setNiveauEtude}
              />
              <ServiceSelect
                servicesParaScolaire={servicesParaScolaire}
                setServicesParaScolaire={setServicesParaScolaire}
              />
              <Stack
                spacing={3}
                direction={{ xs: "column", md: "row" }}
                sx={{ marginBottom: 4 }}
                className="flex justify-center"
              >
                <Box sx={{ width: 1 }}>
                  <TextField
                    fullWidth
                    label="Adresse mail"
                    id="email"
                    type="email"
                    value={coordonnee.email}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const newCoordonnee = {
                        ...coordonnee,
                        email: inputValue,
                      };
                      setCoordonnee(newCoordonnee);
                    }}
                  />
                </Box>
                <Box sx={{ width: 1 }}>
                  <TextField
                    fullWidth
                    label="Numéro de téléphone"
                    id="tel"
                    type="tel"
                    value={coordonnee.telephone}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const newCoordonnee = {
                        ...coordonnee,
                        telephone: inputValue,
                      };
                      setCoordonnee(newCoordonnee);
                    }}
                  />
                </Box>
              </Stack>
              <Box sx={{ width: 1 }}>
                <TextField
                  fullWidth
                  label="Site Web"
                  id="siteWeb"
                  value={coordonnee.web}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const newCoordonnee = {
                      ...coordonnee,
                      web: inputValue,
                    };
                    setCoordonnee(newCoordonnee);
                  }}
                />
              </Box>

              <div className="flex justify-center">
                <input
                  type="submit"
                  value="Enregistrer"
                  style={{ cursor: "pointer" }}
                  className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full md:w-3/5"
                />
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default CreateNewSchool;
