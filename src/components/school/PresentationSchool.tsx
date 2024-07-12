"use client"

import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner'
import ContactUs from '../contactUs/ContactUs';

function PresentationSchool() {

  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 7000);
  }, [])

  const maintenanceInfo = (
    <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
      <h2 className="font-bold text-lg">Informations Indisponibles</h2>
      <p>Nous travaillons activement à collecter les informations sur les établissements d'enseignement.</p>
      <p>Veuillez revenir plus tard pour obtenir les informations mises à jour.</p>
      <p>Nous vous remercions de votre patience et de votre compréhension.</p>
      <div className="mt-4">
        <h3 className="font-semibold">Contactez-nous</h3>
        <p>Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter :</p>
        <div className="mt-4">
          <ContactUs />
        </div>
      </div>
    </div>
  );
  

  return (
    <div>
      {isLoading ? <Spinner /> : maintenanceInfo}
    </div>
  )
}

export default PresentationSchool