import "./globals.css";
import Image from "next/image";
import logoWakili from "/public/logoWakili.png";

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
      <body className="flex flex-col min-h-screen">
        <header
          style={{
            boxShadow: "0px 5px 20px -5px",
            borderRadius: "0px 0px 20px 20px",
          }}
          className="fixed top-0 left-0 right-0 w-full bg-white z-10"
        >
          <div className="container mx-auto flex justify-around items-center">
            <div>
              <Image src={logoWakili} alt="Logo Wakili" width={150} />
            </div>
            <ul className="flex gap-5">
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
        <main className="flex-grow flex items-center justify-center pt-20 pb-20">
          {children}
        </main>
        <footer
          style={{
            boxShadow: "5px 0px 20px -5px",
            borderRadius: "20px 20px 0px 0px",
          }}
          className="fixed bottom-0 left-0 right-0 w-full bg-white py-4 flex justify-center items-center font-bold"
        >
          Wakili Services | {currentYear}
        </footer>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.4.1/flowbite.min.js"></script>
      </body>
    </html>
  );
}
