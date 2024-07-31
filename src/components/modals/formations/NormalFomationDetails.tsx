"use client";

import React, { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import UpdateOwnSchoolProgram from "@/components/school-owner/updateSchool/UpdateOwnSchoolProgram";

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
  border: "10px solid white",
};

interface NormalFomationDetailsProps {
  program: any;
  category: any;
  isOwner: boolean
}

const NormalFomationDetails: React.FC<NormalFomationDetailsProps> = ({
  program,
  category,
  isOwner
}) => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const handleOpen = (id: string) => setOpenModal(id);
  const handleClose = () => setOpenModal(null);

  return (
    <>
      <h3 className="font-bold bg-[#ea8c48a7] px-5 py-3 my-4 border-b-4">
        {category}
      </h3>
      {program.map((element: any) => {
        const listCours =
          element.programDetails &&
          element.programDetails.cours &&
          element.programDetails.cours.length > 0 &&
          element.programDetails.cours.map((i: string, index: number) => {
            return (
              <li
                key={`programDetails.cours${index}`}
                className="list-disc ml-10"
              >
                {i}
              </li>
            );
          });

        const listPrerequis =
          element.programDetails &&
          element.programDetails.prerequis &&
          element.programDetails.prerequis.length > 0 &&
          element.programDetails.prerequis.map((i: string, index: number) => {
            return (
              <li
                key={`programDetails.prerequis${index}`}
                className="list-disc ml-10"
              >
                {i}
              </li>
            );
          });

        const listJobTraining =
          element.programDetails &&
          element.programDetails.jobTraining &&
          element.programDetails.jobTraining.length > 0 &&
          element.programDetails.jobTraining.map((i: string, index: number) => {
            return (
              <li
                key={`programDetails.jobTraining${index}`}
                className="list-disc ml-10"
              >
                {i}
              </li>
            );
          });

        return (
          <div key={element._id}>
            <div
              onClick={() => handleOpen(element._id)}
              className="p-2 my-4 bg-gray-200 ml-auto rounded-lg shadow-md cursor-pointer flex items-center justify-between"
              style={{ width: "98%" }}
            >
              <h4>{element.name}</h4> <KeyboardArrowRightIcon />
            </div>
            <Modal
              open={openModal === element._id}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{
                "& .MuiBackdrop-root": {
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
                  backdropFilter: "blur(5px)", // Apply a blur effect
                },
              }}
            >
              <Box sx={style}>
                <div className="grid grid-cols-12">
                  <h3 className="text-center font-bold mb-3 text-2xl col-span-11">
                    Fiche de la formation
                  </h3>
                  <CloseIcon onClick={handleClose} className="cursor-pointer" />
                </div>
                <div>
                  <hr />
                </div>
                {isOwner && (
                  <div className="flex justify-end mt-5">
                    <UpdateOwnSchoolProgram program={element} />
                  </div>
                )}
                <div className="my-2 text-lg">
                  <h4>
                    <strong>Nom :</strong> {element.name}
                  </h4>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Arrêté d'autorisation :</strong>{" "}
                    {element.authorisationDecree}
                  </p>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Domaine :</strong> {element.domaine}
                  </p>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Niveau :</strong> {element.programLevel.niveau}
                  </p>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Cycle :</strong> {element.programLevel.sousNiveau}
                  </p>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Durée :</strong>{" "}
                    {element.programDetails && element.programDetails.duration
                      ? element.programDetails.duration + " années"
                      : "N/A"}{" "}
                  </p>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Langue :</strong>{" "}
                    {element.programDetails && element.programDetails.langue
                      ? element.programDetails.langue
                      : "N/A"}
                  </p>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Description : </strong>{" "}
                    {(!element.programDetails ||
                      element.programDetails.description) &&
                      "N/A"}
                  </p>
                  {element.programDetails &&
                    element.programDetails.description && (
                      <p className="pl-5 text-justify">
                        {element.programDetails.description}
                      </p>
                    )}
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Coût :</strong>{" "}
                    {element.programDetails && element.programDetails.cout
                      ? element.programDetails.cout
                      : "0"}{" "}
                    CFA
                  </p>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Modalité :</strong>{" "}
                    {element.programDetails && element.programDetails.modality
                      ? element.programDetails.modality
                      : "N/A"}
                  </p>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Certificat / Diplôme :</strong>{" "}
                    {element.programDetails && element.programDetails.certificat
                      ? element.programDetails.certificat
                      : "N/A"}
                  </p>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Cours :</strong>{" "}
                    {(!element.programDetails ||
                      !element.programDetails.cours ||
                      element.programDetails.cours.length === 0) &&
                      "N/A"}
                  </p>
                  <ul>{listCours}</ul>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Prérequis :</strong> {(!element.programDetails ||
                      !element.programDetails.prerequis ||
                      element.programDetails.prerequis.length === 0) &&
                      "N/A"}
                  </p>
                  <ul>{listPrerequis}</ul>
                </div>
                <div className="mt-2 text-lg">
                  <p>
                    <strong>Débouchés :</strong> {(!element.programDetails ||
                      !element.programDetails.jobTraining ||
                      element.programDetails.jobTraining.length === 0) &&
                      "N/A"}
                  </p>
                  <ul>{listJobTraining}</ul>
                </div>
              </Box>
            </Modal>
          </div>
        );
      })}
    </>
  );
};

export default NormalFomationDetails;
