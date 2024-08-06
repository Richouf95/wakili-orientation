"use client";

import React, { useEffect, useState } from "react";
import MobileFormationDetails from "@/components/modals/formations/MobileFormationDetails";
import NormalFomationDetails from "@/components/modals/formations/NormalFomationDetails";
import ContactUs from "@/components/modals/contactUs/ContactUs";
import Spinner from "@/components/Spinner";
import useAuthContext from "@/hooks/useAuthContext";

interface ListProgramProps {
  schoolId: string;
}

const ListProgram: React.FC<ListProgramProps> = ({ schoolId }) => {
  const [isLoading, setLoading] = useState(true);
  const [schoolPrograms, setSchoolPrograms] = useState<any>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [listDomaines, setListDomaines] = useState<any>();

  const { schoolOwner } = useAuthContext();

  useEffect(() => {
    const getAllProgram = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/programs/school/${schoolId}`
      );

      if (response.ok) {
        const result = await response.json();
        setSchoolPrograms(result);
      } else {
        setSchoolPrograms(null);
      }
    };

    const getFormationDomain = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/domaine/all-domaine`
      );

      if (response.ok) {
        const result = await response.json();
        setListDomaines(result);
      }
    };

    const thisProgramScool = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/school/${schoolId}`
      );

      if (response.ok) {
        const result = await response.json();
        if (
          result.ownerAcount === schoolOwner?.schoolOwnerId &&
          schoolOwner?.role !== "supAdmin"
        ) {
          setIsOwner(true);
        }
      }
    };

    const fetchData = async () => {
      try {
        await Promise.all([
          getAllProgram(),
          getFormationDomain(),
          thisProgramScool(),
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [schoolId, schoolOwner]);

  const categorizePrograms = (programs: any[]) => {
    programs.map((i) => {
      const hisDomain = listDomaines.filter((x: any) => x._id === i.domaine);
      if (hisDomain.length > 0) {
        const domaineName = hisDomain[0].name;
        i.domaine = domaineName;
      }
    });
    return programs.reduce((acc: any, program: any) => {
      const category = program.programLevel.sousNiveau;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(program);
      return acc;
    }, {});
  };

  const categorizedPrograms =
    schoolPrograms && listDomaines ? categorizePrograms(schoolPrograms) : {};

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

  const inviteToAddPrograms = (
    <div className="p-4 my-5 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
      <h2 className="font-bold text-lg">Ajoutez vos Formations</h2>
      <p>
        Nous vous encourageons à ajouter des informations détaillées sur les
        formations proposées par votre établissement.
      </p>
      <p>
        Cela permettra aux élèves et à leurs parents de mieux comprendre les
        options disponibles et de prendre des décisions éclairées.
      </p>
      <div className="mt-4">
        <h3 className="font-semibold">Comment Ajouter vos Formations</h3>
        <p>
          Si vous avez besoin d'aide pour ajouter vos formations, n'hésitez pas
          à nous contacter :
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
      {schoolPrograms && schoolPrograms.length > 0 ? (
        <div className="w-full lg:w-5/6 mx-auto">
          <h2 className="text-center my-5 font-bold text-xl">
            Liste des Formations
          </h2>
          {Object.keys(categorizedPrograms).map((category) => (
            <div key={category}>
              {isSmallScreen ? (
                <MobileFormationDetails
                  program={categorizedPrograms[category]}
                  category={category}
                  isOwner={isOwner}
                />
              ) : (
                <NormalFomationDetails
                  program={categorizedPrograms[category]}
                  category={category}
                  isOwner={isOwner}
                />
              )}
            </div>
          ))}
        </div>
      ) : isOwner ? (
        inviteToAddPrograms
      ) : (
        maintenanceInfo
      )}
    </>
  );
};

export default ListProgram;
