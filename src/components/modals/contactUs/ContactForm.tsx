"use client"
import React, {useEffect} from 'react'
import emailjs from "emailjs-com";

function ContactForm() {

    useEffect(() => {
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
            // handleClose();
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
    <form id="contact_us_form" onSubmit={handleSendMessage}>
      <div className="my-5" style={{ visibility: "hidden", margin: "0", padding:"0", height:"0" }}>
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
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full w-full md:w-3/5"
        />
      </div>
    </form>
  )
}

export default ContactForm