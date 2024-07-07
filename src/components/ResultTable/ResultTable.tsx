import { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FormationTableRow from "./FormationTableRow";
// import useFilterData from '@/hooks/useFilterData';

const itemsPerPage = 10;

const ResultTable = ({ data }: any) => {

  // const { filter, handleFilterChange, filteredData } = useFilterData(data);

  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    setFilteredData(data)
  }, [data])



  const [currentPage, setCurrentPage] = useState(0);
  const paginatedData = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
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

  return (
    <div className="max-w-full overflow-x-auto md:max-w-none mb-7">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">Nom de l'École</th>
            <th className="py-3 px-6 text-left">Niveau</th>
            <th className="py-3 px-6 text-left">Localisation</th>
            <th className="py-3 px-6 text-left">Type d'Établissement</th>
            <th className="py-3 px-6 text-left">Formations</th>
            <th className="py-3 px-6 text-left">Autres</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {paginatedData.map((item: any, index: any) => {
            return (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="px-6 py-4 max-w-xs break-words overflow-hidden text-ellipsis">
                  {item.name}
                </td>
                <td className="px-6 py-4 max-w-xs break-words overflow-hidden text-ellipsis">{item.niveauEtude}</td>
                <td className="px-6 py-4 max-w-xs break-words overflow-hidden text-ellipsis">{item.localisation}</td>
                <td className="px-6 py-4 max-w-xs break-words overflow-hidden text-ellipsis">
                  {item.typeEtablissement}
                </td>
                <td className="px-6 py-4 max-w-xs break-words overflow-hidden text-ellipsis">
                  <FormationTableRow program={item.program} />
                </td>
                <td className="py-3 px-6 text-left">{item.extra ? item.extra : "N/A"}</td>
              </tr>
            );
          })}
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
