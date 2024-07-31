"use client";

import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ContactForm from "./ContactForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 600,
  maxHeight: "90vh", // Limiter la hauteur à 90% de la hauteur de la fenêtre
  overflowY: "auto", // Activer le défilement vertical
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

function LargeScreenContactUs() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="flex justify-center items-center bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full"
      >
        <svg
          viewBox="-2.4 -2.4 28.80 28.80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)"
          stroke="#bb2525"
          width={30}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#CCCCCC"
            strokeWidth="0.192"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            ></rect>{" "}
          </g>
        </svg>
        Nous contacter
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="border-y-8 border-white border-opacity-0">
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Contactez-nous
          </Typography>
          <ContactForm />
        </Box>
      </Modal>
    </div>
  );
}

export default LargeScreenContactUs;
