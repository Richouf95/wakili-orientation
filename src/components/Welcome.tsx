import Image from "next/image";
import logoWidthBackGround from "/public/logoWakiliWithBg.jpg";
import Link from "next/link";

function Welcome() {
  return (
    <div className="bg-[#505958] p-10 rounded-3xl">
      <h1 className="text-3xl font-bold text-white">
        Bienvenue sur Orientation | Wakili service
      </h1>
      <div className="flex justify-center py-10">
        <Image
          src={logoWidthBackGround}
          alt="logo Wikili Service"
          className="rounded-2xl"
        />
      </div>
      <div className="flex justify-center">
        <Link
          href="/introduction"
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full"
        >
          Démarrer
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
