"use client";

import SimpleMap from "@/components/map/SimpleMap";
import React, { useEffect, useState } from "react";
import Tabs from "@/components/school/Tabs";
import PresentationSchool from "@/components/school-owner/PresentationOwnSchool";
import ProgramsSchool from "@/components/school-owner/ProgramsOwnSchool";
import BtnSearch from "@/components/ResultTable/BtnSearch";
import DefaultLogo from "/public/images/schoolDefaultLogo.png";
import Image from "next/image";
import UpdateSchool from "./updateSchool/UpdateSchool";
import MapModal from "../map/MapModal";

interface Coordinate {
  telephone: string | null;
  email: string | null;
  web: string | null;
}

interface School {
  _id: string;
  schoolLogo: { url: string } | null;
  openingDecree: string;
  name: string;
  localisation: string;
  typeEtablissement: string;
  niveauEtude: string;
  coordonnee: Coordinate;
  servicesParaScolaire: string[];
}

interface OwneSchoolSpaceProps {
  thisSchool: School;
}

const addLogoInputStyle: any = {
  width: "0.1px",
  height: "0.1px",
  opacity: "0",
  overflow: "hidden",
  position: "absolute",
  zIndex: "-1",
  background: "red",
};

const OwneSchoolSpace: React.FC<OwneSchoolSpaceProps> = ({ thisSchool }) => {
  const tabs = [
    {
      title: "Présentation",
      content: <PresentationSchool schoolId={thisSchool._id} />,
    },
    {
      title: "Formations",
      content: <ProgramsSchool schoolId={thisSchool._id} />,
    },
  ];

  const [schoolLogo, setSchoolLogo] = useState<string | null>(null);
  const [newLogo, setNewLogo] = useState<any>(null);
  const [schoolUpdated, setSchoolUpdated] = useState<boolean>(false);

  useEffect(() => {
    if (schoolUpdated) window.location.reload();
  }, [schoolUpdated]);

  const updateLogo = async () => {
    if (!schoolLogo) return; // Ne pas faire d'appel si schoolLogo est null
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/school/update-school/${thisSchool._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ schoolLogo }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setSchoolLogo(null);
        setNewLogo(result.schoolLogo.url); // Incrémenter reload pour déclencher des effets
      } else {
        console.error("Failed to update logo:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating logo:", error);
    }
  };

  useEffect(() => {
    if (schoolLogo) {
      updateLogo();
    }
  }, [schoolLogo]); // Met à jour uniquement lorsque schoolLogo change

  const handleSchoolLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSchoolLogo(reader.result as string);
      };
    }
  };

  return (
    <>
      {thisSchool && (
        <div>
          <h1 className="text-center text-3xl font-bold mb-5 mt-2">
            Fiche de l'établissement
          </h1>
          <BtnSearch />
          <div className="grid grid-cols-12 gap-2 bg-gray-100 p-6 rounded-lg shadow-lg mb-8 mx-auto w-full lg:w-11/12">
            <div className="flex flex-wrap items-center col-span-12 lg:col-span-6 shadow-lg rounded-lg p-5">
              <div className="w-full">
                <div className="flex justify-center items-center">
                  <input
                    type="file"
                    name="schoolLogo"
                    id="schoolLogo"
                    style={addLogoInputStyle}
                    onChange={handleSchoolLogo}
                    aria-label="Upload School Logo"
                  />
                  <label
                    htmlFor="schoolLogo"
                    className="cursor-pointer text-center"
                  >
                    <span>Changer le logo de votre établissement</span>
                    <Image
                      src={
                        newLogo !== null
                          ? newLogo
                          : thisSchool.schoolLogo
                          ? thisSchool.schoolLogo.url
                          : DefaultLogo
                      }
                      alt="Logo de l'école"
                      width={200}
                      height={200}
                      layout="intrinsic"
                      className="border-8 rounded-lg border-gray-600 m-auto"
                    />
                  </label>
                </div>
                <ul className="w-full">
                  <li className="my-2 w-auto">
                    Arrêté d'ouverture :{" "}
                    <span className="font-bold break-words">
                      {thisSchool.openingDecree}
                    </span>
                  </li>
                  <li className="my-2 w-auto">
                    Nom :{" "}
                    <span className="font-bold break-words">
                      {thisSchool.name}
                    </span>
                  </li>
                  <li className="my-2 w-auto">
                    Région :{" "}
                    <span className="font-bold break-words">
                      {thisSchool.localisation}
                    </span>
                  </li>
                  <li className="my-2 w-auto">
                    Type :{" "}
                    <span className="font-bold break-words">
                      {thisSchool.typeEtablissement}
                    </span>
                  </li>
                  <li className="my-2 w-auto">
                    Niveau :{" "}
                    <span className="font-bold break-words">
                      {thisSchool.niveauEtude}
                    </span>
                  </li>
                  <li className="my-2 w-auto">
                    Coordonnées :{" "}
                    <ul className="ml-3 md:ml-10">
                      <li className="my-2 break-words">
                        Téléphone :{" "}
                        <span className="font-bold">
                          {thisSchool.coordonnee &&
                          thisSchool.coordonnee.telephone
                            ? thisSchool.coordonnee.telephone
                            : "N/A"}
                        </span>
                      </li>
                      <li className="my-2 break-words">
                        Email :{" "}
                        <span className="font-bold">
                          {thisSchool.coordonnee && thisSchool.coordonnee.email
                            ? thisSchool.coordonnee.email
                            : "N/A"}
                        </span>
                      </li>
                      <li className="my-2 break-words">
                        Site web :{" "}
                        <span className="font-bold">
                          {thisSchool.coordonnee &&
                          thisSchool.coordonnee.web ? (
                            <a
                              href={thisSchool.coordonnee.web}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {thisSchool.coordonnee.web}
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </span>
                      </li>
                    </ul>
                  </li>
                  <li className="my-2 w-auto">
                    Services Annexes :{" "}
                    {(!thisSchool.servicesParaScolaire ||
                      thisSchool.servicesParaScolaire.length === 0) && (
                      <span className="m-2 p-1 font-bold">N/A</span>
                    )}{" "}
                    <br />
                    {thisSchool.servicesParaScolaire &&
                      thisSchool.servicesParaScolaire.length > 0 &&
                      thisSchool.servicesParaScolaire.map(
                        (i: string, index: number) => {
                          return (
                            <span
                              key={`schoolServiceAnnex${index}`}
                              className="bg-gray-200 rounded m-2 p-1 inline-block"
                            >
                              {i}
                            </span>
                          );
                        }
                      )}
                  </li>
                </ul>
              </div>
              <div className="w-full flex justify-center">
                <UpdateSchool
                  thisSchool={thisSchool}
                  setSchoolUpdated={setSchoolUpdated}
                />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 shadow-lg rounded-lg p-2">
              {thisSchool && (
                <div className="w-full max-h-11/12 md:h-full flex-col items-center">
                  <SimpleMap thisSchool={thisSchool} />
                  <div className="w-full my-2 flex justify-center">
                    <MapModal thisSchool={thisSchool} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-200 p-1 rounded-lg shadow-lg mb-8 lg:mx-5">
            <div className="p-1">
              <Tabs tabs={tabs} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OwneSchoolSpace;
