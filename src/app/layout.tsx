import "./globals.css";
import Image from "next/image";
import logoWakili from "/public/logoWakili.png";
import { useEffect } from "react";
import useFilterData from "@/hooks/useFilterData";
import ContactUs from "@/components/contactUs/ContactUs";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Orientation | Wakili Services",
  description:
    "Trouvez des informations complètes et à jour sur les établissements d'enseignement au Niger, y compris les écoles, collèges, lycées et universités. Facilitez votre recherche d'établissements éducatifs avec Wakili Services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <!-- Titre du site ou de la page --> */}
        <meta property="og:title" content="Orientation | Wakili Services" />

        {/* <!-- Type de contenu (article, website, video, etc.) --> */}
        <meta property="og:type" content="website" />

        {/* <!-- URL canonique de la page --> */}
        <meta
          property="og:url"
          content="https://wakili-orientation.vercel.app/"
        />

        {/* <!-- Description de la page --> */}
        <meta
          property="og:description"
          content="Trouvez l'établissement qui vous convient"
        />

        {/* <!-- URL de l'image à afficher dans l'aperçu --> */}
        <meta
          property="og:image"
          content="https://github.com/Richouf95/wakili-orientation/blob/main/public/logoWakiliWithBg.jpg?raw=true"
        />

        {/* <!-- Nom de votre site --> */}
        <meta property="og:site_name" content="Orientation | Wakili Services" />

        {/* <!-- (Optionnel) Auteur du contenu --> */}
        <meta property="og:author" content="Wouri Chouf" />

        {/* <!-- (Optionnel) Langue du contenu --> */}
        <meta property="og:locale" content="fr_FR" />
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
          <Analytics />
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
