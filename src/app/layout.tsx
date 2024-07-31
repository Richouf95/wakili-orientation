import "./globals.css";
import "./ckStyle.css"
import Image from "next/image";
import logoWakili from "/public/logoWakili.png";
import { useEffect } from "react";
import useFilterData from "@/hooks/useFilterData";
import ContactUs from "@/components/modals/contactUs/ContactUs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import Link from "next/link";
import AuthContextProvider from "@/contexts/AuthContext";
import Menu from "@/components/menu/Menu";

export const metadata = {
  title: "Orientation | Wakili Services",
  description: "Trouvez des informations complètes et à jour sur les établissements d'enseignement au Niger, y compris les écoles, collèges, lycées et universités. Facilitez votre recherche d'établissements éducatifs avec Wakili Services",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Orientation | Wakili Services" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wakili-orientation.vercel.app/" />
        <meta property="og:description" content="Trouvez l'établissement qui vous convient" />
        <meta property="og:image" content="https://github.com/Richouf95/wakili-orientation/blob/main/public/logoWakiliWithBg.jpg?raw=true" />
        <meta property="og:site_name" content="Orientation | Wakili Services" />
        <meta property="og:author" content="Wouri Chouf" />
        <meta property="og:locale" content="fr_FR" />
        <script src="https://cdn.ckbox.io/ckbox/latest/ckbox.js" defer></script>
      </head>
      <AuthContextProvider>
        <body className="flex flex-col min-h-screen">
          <header className="fixed top-0 left-0 right-0 w-full bg-white z-10" style={{ boxShadow: "0px 5px 20px -5px", borderRadius: "0px 0px 20px 20px" }}>
            <div className="container mx-auto flex justify-between items-center px-4 py-2">
              <div className="flex-shrink-0">
                <Link href={"/"}>
                  <Image src={logoWakili} alt="Logo Wakili" className="w-20 sm:w-24 md:w-32" />
                </Link>
              </div>
              <div>
                <Menu />
              </div>
            </div>
          </header>
          <main className="flex-grow mt-28">
            <div className="container mx-auto">{children}</div>
            <Analytics />
            <SpeedInsights />
          </main>
          <footer className="w-full bg-white py-4 flex justify-center items-center font-bold" style={{ boxShadow: "5px 0px 20px -5px", borderRadius: "20px 20px 0px 0px" }}>
            Wakili Services | {currentYear}
          </footer>
        </body>        
      </AuthContextProvider>
    </html>
  );
}
