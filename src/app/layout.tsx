"use client"

import "./globals.css";
import Image from "next/image";
import logoWakili from "/public/logoWakili.png";
import { useEffect } from "react";
import useFilterData from '@/hooks/useFilterData';

const metadata = {
  title: "Orientation | Wakili Services",
  description:
    "Trouvez des informations complètes et à jour sur les établissements d'enseignement au Niger, y compris les écoles, collèges, lycées et universités. Facilitez votre recherche d'établissements éducatifs avec Wakili Services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { filter, handleFilterChange, filteredData } = useFilterData();

  useEffect(() => {

  }, [filteredData])

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="flex flex-col min-h-screen">
        <header
          className="fixed top-0 left-0 right-0 w-full bg-white z-10"
          style={{
            boxShadow: "0px 5px 20px -5px",
            borderRadius: "0px 0px 20px 20px",
          }}
        >
          <div className="container mx-auto flex justify-between items-center px-4 py-2">
            <div className="flex-shrink-0">
              <Image src={logoWakili} alt="Logo Wakili" width={150} />
            </div>
            <ul className="flex gap-5 flex-wrap">
              <li>
                <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full">
                  Hehe
                </button>
              </li>
              <li>
                <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full">
                  Hehe
                </button>
              </li>
            </ul>
          </div>
        </header>
        <main className="flex-grow pt-20">
          <div className="container mx-auto">{children}</div>
        </main>
        <footer
          className="w-full bg-white py-4 flex justify-center items-center font-bold"
          style={{
            boxShadow: "5px 0px 20px -5px",
            borderRadius: "20px 20px 0px 0px",
          }}
        >
          Wakili Services | {currentYear}
        </footer>
      </body>
    </html>
  );
}
