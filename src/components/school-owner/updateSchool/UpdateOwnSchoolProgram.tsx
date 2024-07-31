"use client";

import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 700,
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const niveauxEnseignement: any = {
  "Enseignement Préscolaire": ["Garderie", "Maternelle"],
  "Enseignement Primaire": ["CI", "CP", "CE1", "CE2", "CM1", "CM2"],
  "Enseignement Secondaire Général": [
    "6ème",
    "5ème",
    "4ème",
    "3ème",
    "Seconde",
    "Première",
    "Terminale",
  ],
  "Enseignement Secondaire Technique et Professionnel": [
    "BEP",
    "CAP",
    "Baccalauréat Technique",
    "Baccalauréat Professionnel",
  ],
  "Enseignement Supérieur": ["BTS", "DUT", "Licence", "Master", "Doctorat"],
  "Formation Professionnelle et Technique": [
    "Divers programmes selon les métiers",
  ],
  "Formation Non-Formelle": [
    "Alphabétisation des Adultes",
    "Formation des Jeunes et des Adultes",
  ],
};

interface AupdateOwnSchoolProgramProps {
  program: any;
}

const UpdateOwnSchoolProgram: React.FC<AupdateOwnSchoolProgramProps> = ({
  program,
}) => {
  const [open, setOpen] = useState(false);
  const [formLevel, setFormLevel] = useState<number>(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormLevel(0);
  };

  const [arrete, setArrete] = useState<string>(program.authorisationDecree);
  const [name, setName] = useState<string>(program.name);
  const [niveau, setNiveau] = useState<string>(program.programLevel.niveau);
  const [sousNiveau, setSousNiveau] = useState<string>(
    program.programLevel.sousNiveau
  );
  const [domaine, setDomaine] = useState<string>(program.domaine);
  const [langueAutre, setLangueAutre] = useState<boolean>(false);
  const [langue, setLangue] = useState<string>("");
  const [modalite, setModalite] = useState<string>(
    (program.programDetails && program.programDetails.modality) ? program.programDetails.modality : ""
  );
  const [duration, setDuration] = useState<number>(
    (program.programDetails && program.programDetails.duration) ? program.programDetails.duration : ""
  );
  const [description, setDescription] = useState<string>(
    (program.programDetails && program.programDetails.description) ? program.programDetails.description : ""
  );
  const [cout, setCout] = useState<number>((program.programDetails && program.programDetails.cout) ? program.programDetails.cout : 0);
  const [certificat, setCertificat] = useState<string>(
    (program.programDetails && program.programDetails.certificat) ? program.programDetails.certificat : ""
  );
  const [inputPrerequis, setInputPrerequis] = useState<string[]>(
    (program.programDetails && program.programDetails.prerequis) ? program.programDetails.prerequis : []
  );
  const [inputCours, setInputCours] = useState<string[]>(
    (program.programDetails && program.programDetails.cours) ? program.programDetails.cours : []
  );
  const [inputDebouche, setInputDebouche] = useState<string[]>(
    (program.programDetails && program.programDetails.jobTraining) ? program.programDetails.jobTraining : []
  );
  const [domaineList, setDomaineList] = useState<any>();
  const [domaineListAutre, setDomaineListAutre] = useState<boolean>(false);
  const [newDomaine, setNewDomaine] = useState<string>("");

  useEffect(() => {
    const getAllDomaines = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/domaine/all-domaine`);

      if (response.ok) {
        const result = await response.json();
        setDomaineList(result);
      }
    };

    if (
      program.programDetails &&
      program.programDetails.langue &&
      program.programDetails.langue !== "" &&
      program.programDetails.langue.includes(["Français", "Anglais", "Arabe"])
    ) {
      setLangueAutre(false);
      setLangue(program.programDetails.langue);
    }

    getAllDomaines();
  }, [program.detailsProgram]);

  const addInputPrerequis = () => {
    setInputPrerequis([...inputPrerequis, ""]);
  };

  const addInputCours = () => {
    setInputCours([...inputCours, ""]);
  };

  const addInputDebouche = () => {
    setInputDebouche([...inputDebouche, ""]);
  };

  const handleInputPrerequisChange = (index: number, value: string) => {
    const newInputs = [...inputPrerequis];
    newInputs[index] = value;
    setInputPrerequis(newInputs);
  };

  const handleInputCoursChange = (index: number, value: string) => {
    const newInputs = [...inputCours];
    newInputs[index] = value;
    setInputCours(newInputs);
  };

  const handleInputDeboucheChange = (index: number, value: string) => {
    const newInputs = [...inputDebouche];
    newInputs[index] = value;
    setInputDebouche(newInputs);
  };

  const handleNiveauChange = (event: any) => {
    setNiveau(event.target.value);
    setSousNiveau(""); //
  };

  const handleSousNiveauChange = (event: any) => {
    setSousNiveau(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formation = {
      programLevel: {
        niveau,
        sousNiveau,
      },
      authorisationDecree: arrete,
      name,
      domaine,
      programDetails: {
        duration,
        description,
        jobTraining: inputDebouche,
        prerequis: inputPrerequis,
        cout,
        langue,
        cours: inputCours,
        certificat,
        modality: modalite,
      },
    };

    console.log(formation);

    if (domaineListAutre && newDomaine != "") {
      const createDomaine = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/domaine/create-domaine`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newDomaine,
          }),
        }
      );

      if (createDomaine.ok) {
        const result = await createDomaine.json();
        const domaineId = result._id;
        formation["domaine"] = domaineId;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/programs/update-program/${program._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formation),
          }
        );

        if (!response.ok) {
          alert(
            "L'ajout d'une nouvelle formation a échoué !\nUn événement inattendu s'est produit.\nVeuillez réessayer, s'il vous plaît."
          );
        }

        if (response.ok) {
          handleClose();
          alert("Nouvelle formation enrégistrer avec succès !");
        }
      }
    } else {
      const domainId = domaineList.filter((x: any) => x.name === domaine)[0]
        ._id;
      formation["domaine"] = domainId;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/programs/update-program/${program._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formation),
        }
      );

      if (!response.ok) {
        alert(
          "L'ajout d'une nouvelle formation a échoué !\nUn événement inattendu s'est produit.\nVeuillez réessayer, s'il vous plaît."
        );
      }

      if (response.ok) {
        handleClose();
        alert("Nouvelle formation enrégistrer avec succès !");
      }
    }
  };

  const validateStepOne = () => {
    return arrete && name && niveau && sousNiveau && domaine;
  };

  const infoGeneralProgram = (
    <>
      <Box sx={{ width: 1 }} style={{ marginTop: "10px" }}>
        <TextField
          fullWidth
          label="Arrêté d'autorisation"
          id="arrete"
          value={arrete}
          onChange={(e) => setArrete(e.target.value)}
          required
        />
      </Box>
      <Box sx={{ width: 1 }} style={{ marginTop: "10px" }}>
        <TextField
          fullWidth
          label="Nom de la formation"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Box>

      <FormControl fullWidth style={{ marginTop: "10px" }}>
        <InputLabel id="niveau-label">Niveau d'Enseignement</InputLabel>
        <Select
          labelId="niveau-label"
          id="niveau"
          value={niveau}
          onChange={handleNiveauChange}
          label="Niveau d'Enseignement"
          required
        >
          {Object.keys(niveauxEnseignement).map((niveauKey) => (
            <MenuItem key={niveauKey} value={niveauKey}>
              {niveauKey}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth style={{ marginTop: "10px" }}>
        <InputLabel id="sous-niveau-label">Cycle</InputLabel>
        <Select
          labelId="sous-niveau-label"
          id="sousNiveau"
          value={sousNiveau}
          onChange={handleSousNiveauChange}
          label="Cycle"
          required
          disabled={!niveau}
        >
          {niveau &&
            niveauxEnseignement[niveau].map((sousNiveauOption: string) => (
              <MenuItem key={sousNiveauOption} value={sousNiveauOption}>
                {sousNiveauOption}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl fullWidth style={{ marginTop: "10px" }}>
        <InputLabel id="demo-simple-select-autowidth-label">Domaine</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="domain"
          value={domaineListAutre ? "Autre" : domaine}
          onChange={(e) => setDomaine(e.target.value)}
          required
          label="Domaine"
        >
          {domaineList &&
            domaineList.map((i: any, index: number) => {
              return (
                <MenuItem
                  onClick={() => {
                    setDomaineListAutre(false);
                    setNewDomaine("");
                  }}
                  key={`domaineList${index}`}
                  value={i.name}
                >
                  {i.name}
                </MenuItem>
              );
            })}
          <MenuItem onClick={() => setDomaineListAutre(true)} value={"Autre"}>
            Autre
          </MenuItem>
        </Select>
      </FormControl>

      {domaineListAutre && (
        <Box sx={{ width: 1 }} style={{ marginTop: "10px" }}>
          <TextField
            fullWidth
            label="Nouveau domaine"
            value={newDomaine}
            onChange={(e) => setNewDomaine(e.target.value)}
            required
          />
        </Box>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            if (validateStepOne()) {
              setFormLevel(formLevel + 1);
            } else {
              alert("Veuillez remplir tous les champs obligatoires (*)");
            }
          }}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 mt-5 rounded-full"
        >
          Suivant
        </button>
      </div>
    </>
  );

  const detailsProgram = (
    <>
      <Box sx={{ width: 1 }} style={{ marginTop: "10px" }}>
        <TextField
          fullWidth
          label="Durée (nombre d'années)"
          id="duration"
          type="number"
          onChange={(e) => setDuration(Number(e.target.value))}
          value={duration}
        />
      </Box>

      <Box sx={{ width: 1 }} style={{ marginTop: "10px" }}>
        <TextField
          fullWidth
          label="Coût de la formation"
          id="Coût de la formation"
          type="number"
          onChange={(e) => setCout(Number(e.target.value))}
          value={cout}
        />
      </Box>

      <FormControl fullWidth style={{ marginTop: "10px" }}>
        <InputLabel id="demo-simple-select-autowidth-label">Langue</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          value={langueAutre ? "Autre" : langue}
          onChange={(e) => setLangue(e.target.value)}
          required
          label="Langue"
        >
          <MenuItem onClick={() => setLangueAutre(false)} value={"Français"}>
            Français
          </MenuItem>
          <MenuItem onClick={() => setLangueAutre(false)} value={"Anglais"}>
            Anglais
          </MenuItem>
          <MenuItem onClick={() => setLangueAutre(false)} value={"Arabe"}>
            Arabe
          </MenuItem>
          <MenuItem onClick={() => setLangueAutre(true)} value={"Autre"}>
            Autre
          </MenuItem>
        </Select>
      </FormControl>

      {langueAutre && (
        <Box sx={{ width: 1 }} style={{ marginTop: "10px" }}>
          <TextField
            fullWidth
            label="Précisez la langue"
            value={langue}
            type="text"
            onChange={(e) => setLangue(e.target.value)}
          />
        </Box>
      )}

      <Box sx={{ width: 1 }} style={{ marginTop: "10px" }}>
        <TextField
          fullWidth
          label="Certificat / Diplôme"
          value={certificat}
          onChange={(e) => setCertificat(e.target.value)}
          id="Certificat / Diplôme"
          type="text"
        />
      </Box>

      <FormControl fullWidth style={{ marginTop: "10px" }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Modalité de Formation
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          value={modalite}
          onChange={(e) => setModalite(e.target.value)}
          required
          label="Modalité de Formation"
        >
          <MenuItem value={"Présentiel"}>Présentiel</MenuItem>
          <MenuItem value={"En ligne"}>En ligne</MenuItem>
          <MenuItem value={"Hybride"}>Hybride</MenuItem>
        </Select>
      </FormControl>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setFormLevel(formLevel - 1)}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-5 mt-5 rounded-full"
        >
          Précedent
        </button>
        <button
          type="button"
          onClick={() => setFormLevel(formLevel + 1)}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 mt-5 rounded-full"
        >
          Suivant
        </button>
      </div>
    </>
  );

  const descriptionProgram = (
    <>
      <p className="text-gray-600 text-sm">
        Afin de mieux comprendre les spécificités et les objectifs de la
        formation que vous êtes en train de renseigner, nous vous invitons à
        rédiger une description complète.
      </p>
      <Box sx={{ width: 1 }} style={{ marginTop: "10px" }}>
        <TextField
          id="outlined-multiline-flexible"
          label="Description de la formation"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          multiline
          rows={3}
          fullWidth
        />
      </Box>

      <div className="flex justify-between">
        <button
          onClick={() => {
            if (validateStepOne()) {
              setFormLevel(formLevel - 1);
            }
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-5 mt-5 rounded-full"
        >
          Précedent
        </button>
        <button
          onClick={() => {
            if (validateStepOne()) {
              setFormLevel(formLevel + 1);
            }
          }}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 mt-5 rounded-full"
        >
          Suivant
        </button>
      </div>
    </>
  );

  const prerequis = (
    <>
      <p className="text-gray-600 text-sm">
        Pour aider les futurs apprenants à se préparer et à comprendre les
        exigences nécessaires avant de commencer cette formation, veuillez
        lister tous les prérequis.
      </p>

      {inputPrerequis.map((i: any, index: number) => {
        return (
          <div key={`listeDebouche${index}`}>
            <Box sx={{ width: 1 }} style={{ marginTop: "10px" }}>
              <TextField
                fullWidth
                label={`Prérequis ${index + 1}`}
                id={`Prérequis-${index}`}
                value={i}
                onChange={(e) =>
                  handleInputPrerequisChange(index, e.target.value)
                }
              />
            </Box>
          </div>
        );
      })}

      <div className="flex justify-center my-5">
        <button
          type="button"
          onClick={addInputPrerequis}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 mt-2 rounded-full"
        >
          <AddIcon /> Un prérequis
        </button>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => {
            if (validateStepOne()) {
              setFormLevel(formLevel - 1);
            }
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-5 mt-5 rounded-full"
        >
          Précedent
        </button>
        <button
          onClick={() => {
            if (validateStepOne()) {
              setFormLevel(formLevel + 1);
            }
          }}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 mt-5 rounded-full"
        >
          Suivant
        </button>
      </div>
    </>
  );

  const coursProgram = (
    <>
      <p className="text-gray-600 text-sm">
        Pour offrir une vue d'ensemble complète du programme de formation,
        veuillez lister tous les cours qui seront dispensés.
      </p>
      {inputCours.map((input, index) => (
        <Box key={index} sx={{ width: 1 }} style={{ marginTop: "10px" }}>
          <TextField
            fullWidth
            label={`Cours ${index + 1}`}
            id={`cours-${index}`}
            value={input}
            onChange={(e) => handleInputCoursChange(index, e.target.value)}
          />
        </Box>
      ))}
      <div className="flex justify-center my-5">
        <button
          type="button"
          onClick={addInputCours}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 mt-2 rounded-full"
        >
          <AddIcon /> Un cours
        </button>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setFormLevel(formLevel - 1)}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-5 mt-5 rounded-full"
        >
          Précedent
        </button>
        <button
          onClick={() => {
            if (validateStepOne()) {
              setFormLevel(formLevel + 1);
            }
          }}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 mt-5 rounded-full"
        >
          Suivant
        </button>
      </div>
    </>
  );

  const jobTrainingProgram = (
    <>
      <p className="text-gray-600 text-sm">
        Pour aider les futurs apprenants à comprendre les ouvertures et
        perspectives professionnelles offertes par cette formation, veuillez
        lister tous les débouchés possibles.
      </p>
      {inputDebouche.map((input, index) => (
        <Box key={index} sx={{ width: 1 }} style={{ marginTop: "10px" }}>
          <TextField
            fullWidth
            label={`Ouveture ${index + 1}`}
            id={`ouveture-${index}`}
            value={input}
            onChange={(e) => handleInputDeboucheChange(index, e.target.value)}
          />
        </Box>
      ))}
      <div className="flex justify-center my-5">
        <button
          type="button"
          onClick={addInputDebouche}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 mt-2 rounded-full"
        >
          <AddIcon /> Une ouverture
        </button>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setFormLevel(formLevel - 1)}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-5 mt-5 rounded-full"
        >
          Précedent
        </button>
        <button
          type="submit"
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 mt-5 rounded-full"
        >
          Enregistrer
        </button>
      </div>
    </>
  );

  return (
    <div>
      <div className="flex justify-center md:justify-end">
        <button
          onClick={handleOpen}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full flex items-center"
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
          </svg>{" "}
          Mettre à jour
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ fontSize: "2rem", marginBottom: "1rem" }}
            >
              Ajouter une Formation
            </Typography>
            {formLevel === 0 && infoGeneralProgram}
            {formLevel === 1 && detailsProgram}
            {formLevel === 2 && descriptionProgram}
            {formLevel === 3 && prerequis}
            {formLevel === 4 && coursProgram}
            {formLevel === 5 && jobTrainingProgram}
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateOwnSchoolProgram;
