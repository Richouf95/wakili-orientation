import { useState, useMemo } from 'react';

const useFilterData = (initialData) => {
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  useMemo(() => {

    Object.keys(filter).forEach(item => {
      if (item === "nomEtablissement") {
        const nameTag = filter['nomEtablissement'].toLowerCase();
        const data = filteredData ? filteredData : initialData;
        const newFilteredData = data.filter(school => school.name.toLowerCase().includes(nameTag))
        setFilteredData(newFilteredData);
      }
    })

    // const nameTag = filter.nomEtablissement.toLowerCase();
    // const localisationTag = filter.localisation.toLowerCase();
    // const typeEtablissementTag = filter.typeEtablissement.toLowerCase();
    // const niveauEtudeTag = filter.servicesParaScolaire.toLowerCase();

    // const lowercasedFilter = filter.toLowerCase();
    // const newFilteredData = initialData.filter(item => 
    //   item.name.toLowerCase().includes(lowercasedFilter) ||
    //   item.localisation.toLowerCase().includes(lowercasedFilter) ||
    //   item.typeEtablissement.toLowerCase().includes(lowercasedFilter) ||
    //   item.niveauEtude.toLowerCase().includes(lowercasedFilter)
    // );
    // setFilteredData(newFilteredData);
  }, [filter, initialData]);

  return { filter, handleFilterChange, filteredData };
};

export default useFilterData;
