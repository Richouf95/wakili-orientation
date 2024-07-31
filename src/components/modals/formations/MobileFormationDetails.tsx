import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import UpdateOwnSchoolProgram from "@/components/school-owner/updateSchool/UpdateOwnSchoolProgram";
import useAuthContext from "@/hooks/useAuthContext";

interface BottomDrawerProps {
  program: any;
  category: any;
  isOwner: boolean
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({ program, category, isOwner }) => {
  const [openDrawer, setOpenDrawer] = React.useState<string | null>(null);
  const { schoolOwner } = useAuthContext();

  const toggleDrawer =
    (id: string | null) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpenDrawer(id);
    };

  return (
    <>
      <h3 className="font-bold bg-[#ea8c48a7] px-5 py-3 my-4 border-b-4">
        {category}
      </h3>

      {program.map((element: any) => {
        const listCours =
          element.programDetails &&
          element.programDetails.cours &&
          element.programDetails.cours.length > 0 &&
          element.programDetails.cours.map((i: string, index: number) => {
            return (
              <li
                key={`programDetails.cours${index}`}
                className="list-disc ml-10"
              >
                {i}
              </li>
            );
          });

        const listPrerequis =
          element.programDetails &&
          element.programDetails.prerequis &&
          element.programDetails.prerequis.length > 0 &&
          element.programDetails.prerequis.map((i: string, index: number) => {
            return (
              <li
                key={`programDetails.prerequis${index}`}
                className="list-disc ml-10"
              >
                {i}
              </li>
            );
          });

        const listJobTraining =
          element.programDetails &&
          element.programDetails.jobTraining &&
          element.programDetails.jobTraining.length > 0 &&
          element.programDetails.jobTraining.map((i: string, index: number) => {
            return (
              <li
                key={`programDetails.jobTraining${index}`}
                className="list-disc ml-10"
              >
                {i}
              </li>
            );
          });

        return (
          <div key={element._id}>
            <div
              onClick={toggleDrawer(element._id)}
              className="p-2 my-4 bg-gray-200 ml-auto rounded-lg shadow-md cursor-pointer flex items-center justify-between"
              style={{ width: "98%" }}
            >
              <h4>{element.name}</h4> <KeyboardArrowRightIcon />
            </div>
            <Drawer
              anchor="bottom"
              open={openDrawer === element._id}
              onClose={toggleDrawer(null)}
              sx={{
                width: "auto",
                backgroundColor: "rgba(0, 0, 0, .5)",
                "& > *": {
                  backgroundColor: "none",
                  borderRadius: "20px 20px 0 0",
                },
              }}
            >
              <Box
                sx={{
                  width: "auto",
                  maxHeight: "80vh",
                  overflowY: "auto",
                  border: "10px solid white",
                }}
                // onClick={toggleDrawer(null)}
                // onKeyDown={toggleDrawer(null)}
                className="px-5 py-5"
              >
                <div className="grid grid-cols-12">
                  <h3 className="text-center font-bold mb-3 text-2xl col-span-11">
                    Fiche de la formation
                  </h3>
                  <CloseIcon
                    onClick={toggleDrawer(null)}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <hr />
                </div>
                {isOwner && (
                  <div className="flex justify-end mt-5">
                    <UpdateOwnSchoolProgram program={element} />
                  </div>
                )}
                <div className="my-2 text-lg">
                  <h4>
                    <strong>Nom :</strong> {element.name}
                  </h4>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Arrêté d'autorisation :</strong>{" "}
                    {element.authorisationDecree}
                  </p>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Domaine :</strong> {element.domaine}
                  </p>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Niveau :</strong> {element.programLevel.niveau}
                  </p>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Cycle :</strong> {element.programLevel.sousNiveau}
                  </p>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Durée :</strong>{" "}{element.programDetails && element.programDetails.duration
                      ? element.programDetails.duration + " années"
                      : "N/A"}{" "}
                  </p>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Langue :</strong>{" "}
                    {element.programDetails && element.programDetails.langue
                      ? element.programDetails.langue
                      : "N/A"}
                  </p>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Description : </strong>{" "}
                    {(!element.programDetails ||
                      element.programDetails.description) &&
                      "N/A"}
                  </p>
                  {element.programDetails &&
                    element.programDetails.description && (
                      <p className="pl-5 text-justify">
                        {element.programDetails.description}
                      </p>
                    )}
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Coût :</strong>{" "}
                    {element.programDetails && element.programDetails.cout
                      ? element.programDetails.cout
                      : "0"}{" "}
                    CFA
                  </p>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Modalité :</strong>{" "}
                    {element.programDetails && element.programDetails.modality
                      ? element.programDetails.modality
                      : "N/A"}
                  </p>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Certificat / Diplôme :</strong>{" "}
                    {element.programDetails && element.programDetails.certificat
                      ? element.programDetails.certificat
                      : "N/A"}
                  </p>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Cours :</strong>{" "}
                    {(!element.programDetails ||
                      !element.programDetails.cours ||
                      element.programDetails.cours.length === 0) &&
                      "N/A"}
                  </p>
                  <ul>{listCours}</ul>
                </div>
                <div className="my-2 text-lg">
                  <p>
                    <strong>Prérequis :</strong> {(!element.programDetails ||
                      !element.programDetails.prerequis ||
                      element.programDetails.prerequis.length === 0) &&
                      "N/A"}
                  </p>
                  <ul>{listPrerequis}</ul>
                </div>
                <div className="mt-2 text-lg">
                  <p>
                    <strong>Débouchés :</strong> {(!element.programDetails ||
                      !element.programDetails.jobTraining ||
                      element.programDetails.jobTraining.length === 0) &&
                      "N/A"}
                  </p>
                  <ul>{listJobTraining}</ul>
                </div>
              </Box>
            </Drawer>
          </div>
        );
      })}
    </>
  );
};

export default BottomDrawer;
