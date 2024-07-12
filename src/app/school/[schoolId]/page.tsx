"use client";

import SimpleMap from "@/components/school/SimpleMap";
import React, { useEffect, useState } from "react";
import allSchools from "@/data/allData";
import Tabs from "@/components/school/Tabs";
import PresentationSchool from "@/components/school/PresentationSchool";
import ProgramsSchool from "@/components/school/ProgramsSchool";
import BtnSearch from "@/components/ResultTable/BtnSearch";

export default function Scool({ params }: { params: { schoolId: string } }) {
  const [thisSchool, setThisSchool] = useState<any>();

  useEffect(() => {
    const schoolId = params.schoolId;
    const school = allSchools.filter((x) => x.t_id === schoolId)[0];
    setThisSchool(school);
  }, []);

  const tabs = [
    { title: "Présentation", content: <PresentationSchool /> },
    {
      title: "Formations",
      content: (
        <ProgramsSchool programs={thisSchool ? thisSchool.program : []} />
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-center text-3xl font-bold mb-5 mt-2">
        Fiche de l'établissement
      </h2>
      <BtnSearch />
      <div className="grid grid-cols-12 gap-2 bg-gray-100 p-6 rounded-lg shadow-lg mb-8 mx-auto">
        <div className="flex flex-wrap items-center col-span-12 md:col-span-6 shadow-lg rounded-lg p-5">
          {thisSchool ? (
            <ul className="w-full">
              <li className="text-2xl my-2 w-auto">
                Arrêté d'ouverture :{" "}
                <span className="font-bold break-words">
                  {thisSchool.openingDecree}
                </span>
              </li>
              <li className="text-2xl my-2 w-auto">
                Nom :{" "}
                <span className="font-bold break-words">{thisSchool.name}</span>
              </li>
              <li className="text-2xl my-2 w-auto">
                Région :{" "}
                <span className="font-bold break-words">
                  {thisSchool.localisation}
                </span>
              </li>
              <li className="text-2xl my-2 w-auto">
                Type :{" "}
                <span className="font-bold break-words">
                  {thisSchool.typeEtablissement}
                </span>
              </li>
              <li className="text-2xl my-2 w-auto">
                Niveau :{" "}
                <span className="font-bold break-words">
                  {thisSchool.niveauEtude}
                </span>
              </li>
              <li className="text-2xl my-2 w-auto">
                Coordonnées :{" "}
                <ul className="ml-10">
                  <li className="my-2 break-words">
                    Téléphone : <span className="font-bold">{"N/A"}</span>
                  </li>
                  <li className="my-2 break-words">
                    Email : <span className="font-bold">{"N/A"}</span>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>

        <div className="col-span-12 md:col-span-6 shadow-lg rounded-lg p-5">
          {thisSchool ? (
            <SimpleMap schoolLocation={thisSchool.localisation} />
          ) : (
            ""
          )}
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
