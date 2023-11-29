import React, { useState } from 'react';
import './styles/Search.css'
const Search = ({ searchResults, setSearchResults,onSearch,dataObject,setDataObject,searchTerm, setSearchTerm }) => {
  const [query, setQuery] = useState('');
console.log(dataObject)
  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  }

  
  
   console.log(searchResults)
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filtrar los resultados que coincidan con el término de búsqueda
    const filteredResults = dataObject.filter((item) => {
      // Convierte todos los valores a cadenas para realizar una búsqueda sin distinción entre mayúsculas y minúsculas
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(term.toLowerCase())
      );
    });
console.log(filteredResults)
    setSearchResults(filteredResults);
  };

  return (
    <div className="group">
  <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
  <input placeholder="Buscar . . ."  value={searchTerm} type="search" className="inputSearch" onChange={handleSearch}/>
</div>
  );
}

export default Search;
