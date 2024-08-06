import React from "react";

interface PublisheActionProps {
  id: string;
  publishStatus: boolean;
}

const PublisheAction: React.FC<PublisheActionProps> = ({
  id,
  publishStatus,
}) => {
  const handleBloqueSchool = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/school/update-school/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ publishStatus: false }),
        }
      );

      if (response.ok) {
        alert("École bloquée avec succès")
      } else {
        alert("Echec du bloquage de l'école. Veuillez réessayer !")
      }

    } catch (error) {
      console.error("Error lors de la publication de l'école : ", error);
    }
  };

  const handlePublisheSchool = async () => {
    try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/school/update-school/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ publishStatus: true }),
          }
        );
  
        if (response.ok) {
          alert("École plubiée avec succès")
        } else {
          alert("Echec de la publication de l'école. Veuillez réessayer !")
        }
  
      } catch (error) {
        console.error("Error lors de la publication de l'école : ", error);
      }
  };

  return (
    <>
      {publishStatus ? (
        <button
          onClick={handleBloqueSchool}
          className="bg-red-400 py-2 px-5 text-center rounded-full min-w-32"
        >
          Bloquer
        </button>
      ) : (
        <button
          onClick={handlePublisheSchool}
          className="bg-green-400 py-2 px-5 text-center rounded-full min-w-32"
        >
          Publier
        </button>
      )}
    </>
  );
};

export default PublisheAction;
