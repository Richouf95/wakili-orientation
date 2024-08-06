"use client";

import SimpleMap from "@/components/school/SimpleMap";
import React, { useEffect, useState } from "react";
import Tabs from "@/components/school/Tabs";
import PresentationSchool from "@/components/school/PresentationSchool";
import ProgramsSchool from "@/components/school/ProgramsSchool";
import BtnSearch from "@/components/ResultTable/BtnSearch";
import DefaultLogo from "/public/images/schoolDefaultLogo.png";
import Image from "next/image";
import useAuthContext from "@/hooks/useAuthContext";
import Spinner from "@/components/Spinner";
import SpinnerOneBlocRectangle from "@/components/SpinnerOneBlocRectangle";
import { useRouter } from "next/navigation";

async function fetchSchoolData(schoolId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/school/${schoolId}`
  );
  if (!response.ok) throw new Error("Failed to fetch school");
  return response.json();
}

async function fetchSchoolOwnerData(ownerAccount: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/schoolOwner/${ownerAccount}`
  );
  if (!response.ok) throw new Error("Failed to fetch school owner");
  return response.json();
}

export default function School({ params }: { params: { schoolId: string } }) {
  const [thisSchool, setThisSchool] = useState<any>(null);
  const [thisSchoolOwner, setThisSchoolOwner] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const { schoolId } = params;
  const { schoolOwner } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    const getSchoolData = async () => {
      try {
        setLoading(true);

        const schoolData = await fetchSchoolData(schoolId);
        setThisSchool(schoolData);

        const userRole = schoolOwner?.role;
        const thisOwnerId = schoolData.ownerAcount;

        if (userRole === "supAdmin" && thisOwnerId) {
          const ownerData = await fetchSchoolOwnerData(thisOwnerId);
          setThisSchoolOwner(ownerData);
        }
      } catch (error) {
        console.error(error);
        setThisSchool(null);
        setThisSchoolOwner(null);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    getSchoolData();
  }, [schoolId, schoolOwner]);

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        router.push("/search"); // Redirige vers la page d'accueil après 5 secondes
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isError, router]);

  const renderOwnerInfo = () => {
    if (schoolOwner && schoolOwner.role === "supAdmin" && thisSchoolOwner) {
      return (
        <div className="flex justify-center items-center">
          <div className="bg-green-200 px-10 py-5 my-5 rounded-xl">
            <p className="my-2">
              Nom : <span className="font-bold">{thisSchoolOwner.name}</span>
            </p>
            <p className="my-2">
              Téléphone :{" "}
              <span className="font-bold">{thisSchoolOwner.telephone}</span>
            </p>
            <p className="my-2">
              Email : <span className="font-bold">{thisSchoolOwner.email}</span>
            </p>
            <p className="my-2">
              Rôle : <span className="font-bold">{thisSchoolOwner.role}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderSchoolInfo = () => {
    if (loading) return <Spinner />;

    if (!thisSchool) return null;

    const {
      schoolLogo,
      openingDecree,
      name,
      localisation,
      typeEtablissement,
      niveauEtude,
      coordonnee,
      servicesParaScolaire,
    } = thisSchool;

    return (
      <div className="w-full">
        <div className="flex justify-center items-center">
          <Image
            src={schoolLogo ? schoolLogo.url : DefaultLogo}
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
            <span className="font-bold break-words">{openingDecree}</span>
          </li>
          <li className="my-2 w-auto">
            Nom : <span className="font-bold break-words">{name}</span>
          </li>
          <li className="my-2 w-auto">
            Région :{" "}
            <span className="font-bold break-words">{localisation}</span>
          </li>
          <li className="my-2 w-auto">
            Type :{" "}
            <span className="font-bold break-words">{typeEtablissement}</span>
          </li>
          <li className="my-2 w-auto">
            Niveau :{" "}
            <span className="font-bold break-words">{niveauEtude}</span>
          </li>
          <li className="my-2 w-auto">
            Coordonnées :
            <ul className="ml-3 md:ml-10">
              <li className="my-2 break-words">
                Téléphone :{" "}
                <span className="font-bold">
                  {coordonnee?.telephone || "N/A"}
                </span>
              </li>
              <li className="my-2 break-words">
                Email :{" "}
                <span className="font-bold">{coordonnee?.email || "N/A"}</span>
              </li>
              <li className="my-2 break-words">
                Site web :
                <span className="font-bold">
                  {coordonnee?.web ? (
                    <a
                      href={coordonnee.web}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {coordonnee.web}
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
            {!servicesParaScolaire || servicesParaScolaire.length === 0 ? (
              <span className="m-2 p-1 font-bold">N/A</span>
            ) : (
              <> <br />
                {servicesParaScolaire.map((service: any, index: number) => (
                  <span
                    key={`schoolServiceAnnex${index}`}
                    className="bg-gray-200 rounded m-2 p-1 inline-block"
                  >
                    {service}
                  </span>
                ))}
              </>
            )}
          </li>
        </ul>
      </div>
    );
  };

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

  const ficheEts = (
    <div>
      <h1 className="text-center text-3xl font-bold mb-5 mt-2">
        Fiche de l'établissement
      </h1>
      {renderOwnerInfo()}
      <BtnSearch />
      <div className="grid grid-cols-12 gap-2 bg-gray-100 p-6 rounded-lg shadow-lg mb-8 mx-auto w-full lg:w-11/12">
        <div className="flex flex-wrap items-center col-span-12 lg:col-span-6 shadow-lg rounded-lg p-5">
          {renderSchoolInfo()}
        </div>
        <div className="col-span-12 lg:col-span-6 shadow-lg rounded-lg p-2">
          {loading ? (
            <SpinnerOneBlocRectangle />
          ) : (
            thisSchool && (
              <div className="w-full h-full flex items-center">
                <SimpleMap schoolLocation={thisSchool.localisation || "N/A"} />
              </div>
            )
          )}
        </div>
      </div>
      <div className="bg-gray-200 p-1 rounded-lg shadow-lg mb-8 mx-auto">
        <div className="p-1">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isError ? (
        <div className="p-4 mx-1 mb-5 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <h2 className="font-bold text-lg mb-5">Informations Indisponibles</h2>
          <p>
            Désolé, la récupération des données pour cet établissement n'a pas
            pu être effectuée.
          </p>
          <p className="my-5">
            Nous vous remercions de votre patience et de votre compréhension.
          </p>
          <p>
            Vous serez redirigé vers la page d'accueil dans quelques secondes.
          </p>
        </div>
      ) : (
        ficheEts
      )}
    </>
  );
}
