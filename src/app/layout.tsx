"use client";

import "./globals.css";
import Image from "next/image";
import logoWakili from "/public/logoWakili.png";
import { useEffect } from "react";
import useFilterData from "@/hooks/useFilterData";
import ContactUs from "@/components/contactUs/ContactUs";

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

  useEffect(() => {}, [filteredData]);
  console.log(process.env.NEXT_PUBLIC_EMAILJS_USER_ID)

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
            <ContactUs />
          </div>
        </header>
        <main className="flex-grow mt-28">
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

        {/* <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        ></script>

        <script type="text/javascript">
          emailjs.init('NEu9qt_3u6R_y0u7u')
        </script> */}
      </body>
    </html>
  );
}
