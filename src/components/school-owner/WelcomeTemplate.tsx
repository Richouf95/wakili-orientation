"use client";

import React, { useEffect } from "react";
import CreateNewSchool from "@/components/CreateNewSchool";
import { useRouter } from "next/navigation";

interface OwneSchoolCreatedProps {
  setSchoolCreated: (value: boolean) => void
}

const WelcomeTemplate: React.FC<OwneSchoolCreatedProps> = ({ setSchoolCreated }) => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("schoolOwner")) {
      router.push("/");
    }
  }, []);

  return (
    <div className="p-3">
      <h2 className="text-3xl text-center font-bold text-orange-400 p-2 md:w-4/5 m-auto">
        Bienvenue dans votre espace personnel !
      </h2>
      <p className="text-xl my-5 md:w-3/5 px-5 m-auto text-center">
        Nous sommes ravis de vous accueillir !
      </p>
      <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
        <p className="text-lg">Dans cet espace, vous pouvez :</p>
        <ul className="text-lg list-disc">
          <li className="m-5">
            <span className="font-bold">
              Créer et gérer votre établissement :{" "}
            </span>
            Ajoutez les informations essentielles sur votre école pour la rendre
            visible à tous.
          </li>
          <li className="m-5">
            <span className="font-bold">Mettre à jour les informations : </span>
            Modifiez les détails de votre établissement à tout moment pour les
            garder à jour.
          </li>
          <li className="m-5">
            <span className="font-bold">
              Accéder à des outils de gestion :{" "}
            </span>
            Profitez des fonctionnalités supplémentaires pour améliorer la
            gestion de votre établissement.
          </li>
        </ul>
      </div>
      <p className="text-lg my-3 text-center">
        Nous vous invitons à commencer par créer votre établissement.
      </p>
      <CreateNewSchool setSchoolCreated={setSchoolCreated} />
    </div>
  );
}

export default WelcomeTemplate;
