import { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Link from "next/link";
import useAuthContext from "@/hooks/useAuthContext";
import PublisheAction from "../supAdmin/PublisheAction";
import Spinner from "../Spinner";

const itemsPerPage = 10;

const ResultTable = ({ data }: any) => {
  const [schoolsList, setSchoolsList] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { schoolOwner } = useAuthContext();

  useEffect(() => {
    if (Array.isArray(data)) {
      setIsLoading(true)
      setTimeout(() => {
        setSchoolsList(data);
        setIsLoading(false);
      }, 2000);
    }
  }, [data]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const paginatedData =
    schoolsList !== null &&
    schoolsList.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
  const totalPages: number =
    schoolsList !== null ? Math.ceil(schoolsList.length / itemsPerPage) : 0;

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const tableData =
    schoolsList !== null &&
    paginatedData.map((item: any, index: any) => {
      let {
        niveauEtude,
        typeEtablissement,
        _id,
        servicesParaScolaire,
        publishStatus,
      } = item;

      const status = JSON.stringify(publishStatus);

      return (
        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
          <td className="px-6 py-4 max-w-xs break-words overflow-hidden text-ellipsis">
            {item.name}
          </td>
          <td className="px-6 py-4 max-w-xs break-words overflow-hidden text-ellipsis text-center">
            <ul>
              {niveauEtude &&
                niveauEtude.map((i: string, index: number) => {
                  return (
                    <li
                      key={`ecoleNiveauIndec${index}`}
                      className="bg-gray-200 rounded my-1 p-1"
                    >
                      {i.charAt(0).toUpperCase() + i.slice(1)}
                    </li>
                  );
                })}
            </ul>
          </td>
          <td className="px-6 py-4 max-w-xs break-words overflow-hidden text-ellipsis text-center">
            {item.localisation}
          </td>
          <td className="px-6 py-4 max-w-xs break-words overflow-hidden text-ellipsis text-center">
            {typeEtablissement &&
              typeEtablissement.charAt(0).toUpperCase() +
                typeEtablissement.slice(1)}
          </td>
          <td className="px-6 py-4 max-w-xs break-words overflow-hidden text-ellipsis text-center">
            <ul>
              {servicesParaScolaire && servicesParaScolaire.length > 0 ? (
                servicesParaScolaire.map((i: string, index: number) => {
                  return (
                    <li
                      key={`ecoleNiveauIndec${index}`}
                      className="bg-gray-200 rounded my-1 p-1"
                    >
                      {i.charAt(0).toUpperCase() + i.slice(1)}
                    </li>
                  );
                })
              ) : (
                <span>N/A</span>
              )}
            </ul>
          </td>
          {schoolOwner && schoolOwner.role === "supAdmin" && (
            <>
              <td
                className={`px-6 py-4 max-w-xs break-words overflow-hidden text-ellipsis font-bold text-center`}
              >
                <span
                  className={`${
                    status === "true" ? "bg-green-400" : "bg-red-400"
                  } px-6 py-2 rounded-2xl`}
                >
                  {status && status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </td>
              <td
                className={`px-6 py-4 max-w-xs break-words overflow-hidden text-ellipsis font-bold text-center`}
              >
                <PublisheAction id={_id} publishStatus={publishStatus} />
              </td>
            </>
          )}
          <td className="py-3 px-6 text-center">
            <Link href={`/school/${_id}`}>
              <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full min-w-32">
                Voir plus
              </button>
            </Link>
          </td>
        </tr>
      );
    });

  return (
    <div className="max-w-full overflow-x-auto md:max-w-none mb-7">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th scope="col" className="py-3 px-6 text-center rounded-tl-2xl">
              Nom de l'Établissement
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              Niveau
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              Localisation
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              Type d'Établissement
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              Services Annexes
            </th>
            {schoolOwner && schoolOwner.role === "supAdmin" && (
              <>
                <th scope="col" className="py-3 px-6 text-center">
                  Statut
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                  Action
                </th>
              </>
            )}
            <th scope="col" className="py-3 px-6 text-center rounded-tr-2xl">
              Détails
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {isLoading ? (
            <tr>
              <td colSpan={7} className="text-center py-4">
                <Spinner />
              </td>
            </tr>
          ) : schoolsList === null || schoolsList.length === 0 ? (
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td
                colSpan={7}
                className="px-6 py-4 max-w-xs break-words overflow-hidden text-ellipsis text-center text-xl"
              >
                Aucun établissement ne correspond à vos critères de recherche.
              </td>
            </tr>
          ) : (
            tableData
          )}
        </tbody>
      </table>
      <div className="flex justify-end items-center my-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className={`${
            currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <KeyboardArrowLeftIcon />
        </button>

        <span className="mx-4">
          Page {currentPage + 1} sur {totalPages > 0 ? totalPages : totalPages === 0 && totalPages + 1}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className={`${
            currentPage === totalPages - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <KeyboardArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default ResultTable;
