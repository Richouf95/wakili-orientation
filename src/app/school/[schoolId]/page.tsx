"use client";

import SimpleMap from "@/components/school/SimpleMap";
import React, { useEffect, useState } from "react";
import Tabs from "@/components/school/Tabs";
import PresentationSchool from "@/components/school/PresentationSchool";
import ProgramsSchool from "@/components/school/ProgramsSchool";
import BtnSearch from "@/components/ResultTable/BtnSearch";
import DefaultLogo from "/public/images/schoolDefaultLogo.png";
import Image from "next/image";

export default function Scool({ params }: { params: { schoolId: string } }) {
  const [thisSchool, setThisSchool] = useState<any>(null);
  const schoolId = params.schoolId;

  useEffect(() => {
    const getThisSchool = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/school/${schoolId}`
      );

      if (!response.ok) {
        setThisSchool(null);
      }

      if (response.ok) {
        const result = await response.json();
        setThisSchool(result);
      }
    };

    getThisSchool();
  }, [schoolId]);

  const tabs = [
    {
      title: "Présentation",
      content: <PresentationSchool schoolId={schoolId} />,
    },
    {
      title: "Formations",
      content: <ProgramsSchool schoolId={schoolId} />,
    },
  ];
  
  console.log(thisSchool)

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mb-5 mt-2">
        Fiche de l'établissement
      </h1>
      <BtnSearch />
      <div className="grid grid-cols-12 gap-2 bg-gray-100 p-6 rounded-lg shadow-lg mb-8 mx-auto w-full lg:w-11/12">
        <div className="flex flex-wrap items-center col-span-12 lg:col-span-6 shadow-lg rounded-lg p-5">
          {thisSchool ? (
            <div className="w-full">
              <div className="flex justify-center items-center">
                <Image
                  src={
                    thisSchool.schoolLogo
                      ? thisSchool.schoolLogo.url
                      : DefaultLogo
                  }
                  alt="Logo de l'école"
                  width={200}
                  height={200}
                  layout="intrinsic"
                  className="border-8 rounded-lg border-gray-600"
                />
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
                        {thisSchool.coordonnee && thisSchool.coordonnee.telephone
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
                        {thisSchool.coordonnee && thisSchool.coordonnee.web ? (
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
                  Services Annexes : {(!thisSchool.servicesParaScolaire || thisSchool.servicesParaScolaire.length === 0) && <span className="m-2 p-1 font-bold">N/A</span>} <br />
                  {thisSchool.servicesParaScolaire && thisSchool.servicesParaScolaire.length > 0 && thisSchool.servicesParaScolaire.map(
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
          ) : (
            ""
          )}
        </div>

        <div className="col-span-12 lg:col-span-6 shadow-lg rounded-lg p-2">
          {thisSchool && (thisSchool.localisation ? (
            <div className="w-full h-full flex items-center">
              <SimpleMap schoolLocation={thisSchool.localisation} />
            </div>
          ) : (
            <div className="w-full h-full flex items-center">
              <SimpleMap schoolLocation={"N/A"} />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-200 p-1 rounded-lg shadow-lg mb-8 mx-auto">
        <div className="p-1">
          <Tabs tabs={tabs} />
        </div>{" "}
      </div>
    </div>
  );
}
