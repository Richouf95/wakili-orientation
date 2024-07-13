"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import emailjs from "emailjs-com";
import mailIcon from "./email-svgrepo-com.svg";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

export default function ContactUs() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    const email_js_user_id = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
    if (email_js_user_id) {
      emailjs.init(email_js_user_id);
    } else {
      console.error("NEXT_PUBLIC_EMAILJS_USER_ID is not defined");
    }
  }, []);

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email_js_service_id = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const email_js_template_id = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    if (email_js_service_id && email_js_template_id) {
      emailjs
        .sendForm(
          email_js_service_id,
          email_js_template_id,
          event.target as HTMLFormElement
        )
        .then(
          (result) => {
            console.log(result.text);
            alert("Message envoyé avec succès!");
            handleClose();
          },
          (error) => {
            console.log(error.text);
            alert("Une erreur s'est produite ! \nVeuillez renvoyer le message");
          }
        );
    } else {
      console.error(
        "NEXT_PUBLIC_EMAILJS_SERVICE_ID or NEXT_PUBLIC_EMAILJS_TEMPLATE_ID is not defined"
      );
    }
  };

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
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Contactez-nous
          </Typography>
          <form id="contact_us_form" onSubmit={handleSendMessage}>
            <div className="my-5" style={{ visibility: "hidden" }}>
              <label htmlFor="from_name">from_name</label>
              <input
                type="text"
                name="from_name"
                id="from_name"
                value="Wakili service | Orientation"
              />
            </div>
            <div className="my-5">
              <label
                htmlFor="to_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              ></label>
              <input
                type="text"
                name="to_name"
                id="to_name"
                placeholder="Votre nom et prénom"
                className="bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="my-5">
              <select
                name="user_status"
                id="user_status"
                className="bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option>Sélectionnez votre statut</option>
                <option>Elève / Etudiant</option>
                <option>Ecole / institut / Université</option>
                <option>Autre</option>
              </select>
            </div>
            <div className="my-5">
              <label htmlFor="user_email"></label>
              <input
                type="email"
                name="user_email"
                id="user_email"
                placeholder="Saisissez votre email"
                className="bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="my-5">
              <label htmlFor="user_phone_number"></label>
              <input
                type="tel"
                name="user_phone_number"
                id="user_phone_number"
                placeholder="Saisissez votre numéro de téléphone"
                className="bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="my-5">
              <label htmlFor="message_objet"></label>
              <input
                type="text"
                name="message_objet"
                id="message_objet"
                placeholder="Objet du message"
                className="bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="my-5">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900"
              ></label>
              <textarea
                name="message"
                id="message"
                placeholder="Ecrivez votre message ici"
                rows={4}
                required
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-900 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <input
                type="submit"
                id="button"
                value="Envoyer"
                style={{ cursor: "pointer" }}
                className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full md:w-3/5"
              />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
