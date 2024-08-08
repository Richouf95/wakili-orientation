"use client";
import React, { useRef, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MarkLocation from "./MarkLocation";

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

interface MapModalProps {
  thisSchool: any
}

const MapModal: React.FC<MapModalProps> = ({thisSchool}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      {" "}
      <button
        onClick={handleOpen}
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
        Géolocalisation
      </button>
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
            Géolocalisez votre établissement
          </Typography>
          <MarkLocation handleClose={handleClose} thisSchool={thisSchool} />
        </Box>
      </Modal>
    </div>
  );
}

export default MapModal;
