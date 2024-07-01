import { useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const data = [
  { name: "École A", type: "Primaire", location: "Niamey", establishment: "Public", services: ["Finance", "Banque", "Développement"], extra: "Cantine, Transport" },
  { name: "École B", type: "Secondaire", location: "Zinder", establishment: "Privé", services: ["Informatique", "Commerce"], extra: "Transport" },
  // Ajoutez autant de lignes de données que nécessaire
  // ...
];

const itemsPerPage = 5;

const ResultTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const paginatedData = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

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
    <div className="max-w-full overflow-x-auto md:max-w-none">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">Nom de l'École</th>
            <th className="py-3 px-6 text-left">Type</th>
            <th className="py-3 px-6 text-left">Localisation</th>
            <th className="py-3 px-6 text-left">Type d'Établissement</th>
            <th className="py-3 px-6 text-left">Formations</th>
            <th className="py-3 px-6 text-left">Autres</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {paginatedData.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{item.name}</td>
              <td className="py-3 px-6 text-left">{item.type}</td>
              <td className="py-3 px-6 text-left">{item.location}</td>
              <td className="py-3 px-6 text-left">{item.establishment}</td>
              <td className="py-3 px-6 text-left break-words whitespace-normal">
                <ul>
                  {item.services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="break-words whitespace-normal">{service}</li>
                  ))}
                </ul>
              </td>
              <td className="py-3 px-6 text-left">{item.extra}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end items-center my-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className={`${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <KeyboardArrowLeftIcon />
        </button>
        
        <span className="mx-4">Page {currentPage + 1} sur {totalPages}</span>
        
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className={`${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <KeyboardArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default ResultTable;
