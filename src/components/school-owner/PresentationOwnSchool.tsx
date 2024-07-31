"use client";

import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";
import ContactUs from "../modals/contactUs/ContactUs";
import dynamic from "next/dynamic";
import SaveIcon from "@mui/icons-material/Save";
const Editor = dynamic(() => import("@/components/editor/Editor"), {
  ssr: false,
});
import AlertEditor from "@/components/AlertEditor";

interface PresentationSchoolProps {
  schoolId: string;
}

const PresentationOwnSchool: React.FC<PresentationSchoolProps> = ({
  schoolId,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [schoolPresentation, setSchoolPresentation] = useState<any>(null);
  const [editorData, setEditorData] = useState("");
  const [update, setUpdate] = useState<number>(0);

  useEffect(() => {
    const fetchSchoolPresentation = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/presentation/${schoolId}`
        );

        if (!response.ok) {
          setSchoolPresentation(null);
        }

        if (response.ok) {
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
  }, [update]);

  const handleUpdateClick = () => {
    setEditorData(schoolPresentation.content);
    setSchoolPresentation(null);
  };

  const handleSavePresentation = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/presentation/${schoolId}`
    );

    if (!response.ok) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/presentation/add-school-presentation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: editorData,
            school: schoolId,
          }),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          setSchoolPresentation(result);
          setUpdate(update + 1);
        })
        .catch((err) => console.error(err));
    }

    if (response.ok) {
      const currentPresentation = await response.json();
      await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/presentation/${currentPresentation._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: editorData,
          }),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          setSchoolPresentation(result);
          setUpdate(update + 1);
        })
        .catch((err) => console.error(err));
    }
  };

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
        <div>
          <div className="flex justify-center md:justify-end">
            <button
              onClick={handleUpdateClick}
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full flex items-center"
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
          </div>
          <div
            className="ck-content  lg:w-5/6 mx-auto"
            dangerouslySetInnerHTML={{ __html: schoolPresentation.content }}
          />
        </div>
      ) : (
        <div>
          {!schoolPresentation && !editorData && <AlertEditor />}
          <div className="flex justify-center md:justify-end">
            <button
              onClick={handleSavePresentation}
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full flex items-center mb-3"
            >
              <SaveIcon />
              Enregistrer
            </button>
          </div>
          <Editor editorData={editorData} setEditorData={setEditorData} />
        </div>
      )}
    </>
  );
};

export default PresentationOwnSchool;
