import { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Link from "next/link";
// import useFilterData from '@/hooks/useFilterData';

const itemsPerPage = 10;

const ResultTable = ({ data }: any) => {
  // const { filter, handleFilterChange, filteredData } = useFilterData(data);

  const [filteredData, setFilteredData] = useState<any>([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setFilteredData(data);
    }
  }, [data]);

  const [currentPage, setCurrentPage] = useState(0);
  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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

  const tableData = paginatedData.map((item: any, index: any) => {
    let { niveauEtude, typeEtablissement, _id, servicesParaScolaire } = item;

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
                  <li key={`ecoleNiveauIndec${index}`} className="bg-gray-200 rounded my-1 p-1">
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
            {(servicesParaScolaire && servicesParaScolaire.length > 0) ?
              servicesParaScolaire.map((i: string, index: number) => {
                return (
                  <li key={`ecoleNiveauIndec${index}`} className="bg-gray-200 rounded my-1 p-1">
                    {i.charAt(0).toUpperCase() + i.slice(1)}
                  </li>
                );
              }) : (<span>N/A</span>)}
          </ul>
        </td>
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
            <th scope="col" className="py-3 px-6 text-center">
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
            <th scope="col" className="py-3 px-6 text-center">
              Détails
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredData.length > 0 ? (
            tableData
          ) : (
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td
                colSpan={5}
                className="px-6 py-4 max-w-xs break-words overflow-hidden text-ellipsis text-center text-xl"
              >
                Aucun établissement ne correspond à vos critères de recherche.
              </td>
            </tr>
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
          Page {currentPage + 1} sur {totalPages}
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
