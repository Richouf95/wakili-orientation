"use client";

import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";
import ContactUs from "../modals/contactUs/ContactUs";

interface PresentationSchoolProps {
  schoolId: string;
}

const PresentationSchool: React.FC<PresentationSchoolProps> = ({
  schoolId,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [schoolPresentation, setSchoolPresentation] = useState<any>(null);

  useEffect(() => {
    const fetchSchoolPresentation = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/presentation/${schoolId}`
        );

        if (!response.ok) {
          setSchoolPresentation(null);
        } else {
          const result = await response.json();
          setSchoolPresentation(result);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolPresentation();
  }, [schoolId]);

  const maintenanceInfo = (
    <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
      <h2 className="font-bold text-lg">Informations Indisponibles</h2>
      <p>
        Nous travaillons activement à collecter des informations sur les
        établissements d'enseignement.
      </p>
      <p>
        Veuillez revenir plus tard pour obtenir les informations mises à jour.
      </p>
      <p>Nous vous remercions de votre patience et de votre compréhension.</p>
      <div className="mt-4">
        <h3 className="font-semibold">Contactez-nous</h3>
        <p>
          Si vous avez des questions ou des préoccupations, n'hésitez pas à nous
          contacter :
        </p>
        <div className="mt-4">
          <ContactUs />
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {schoolPresentation ? (
        <div
          className="ck-content lg:w-5/6 mx-auto"
          dangerouslySetInnerHTML={{ __html: schoolPresentation.content }}
        />
      ) : (
        maintenanceInfo
      )}
    </>
  );
};

export default PresentationSchool;
