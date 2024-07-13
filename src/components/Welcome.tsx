import Image from "next/image";
import Link from "next/link";
import landingImage from "/public/images/Group171.png";

function Welcome() {
  return (
    <div className="constaine md:w-3/4 m-auto">
      <div>
        <h2 className="text-3xl text-center font-bold text-orange-400 p-2 md:w-4/5 m-auto">
          Découvrez et comparez les écoles du Niger en un seul endroit !
        </h2>
        <div className="flex justify-center">
          <Image
            src={landingImage}
            alt="LandingImage"
            width={500}
            height={400}
          />
        </div>
        <p className="text-lg my-5 md:w-3/5 px-5 m-auto text-center">
          Nous sommes là pour vous aider à trouver l'école qui correspond au
          mieux à vos attentes et aspirations académiques.
        </p>
      </div>
      <div className="flex justify-center">
        <Link href="/search">
          <button className="my-5 px-10 py-3 bg-orange-400 btn hover:bg-orange-500 text-white font-bold rounded-full">
            Consulter la liste
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
