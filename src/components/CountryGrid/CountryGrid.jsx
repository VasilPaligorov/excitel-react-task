import React from 'react';
import { useState } from 'react';
import './CountryGrid.css';
import SearchBar from '../SearchBar/SearchBar.jsx';

import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { useEffect } from 'react';
import { getCountries } from '../../service/getData.js';
import CountryCard from '../CountryCard/CountryCard.jsx';

export default function CountryGrid() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([])
  const [pageNumber, setPageNumber] = useState(1);

  const countriesNumberPerPage = 50;

  useEffect(() => loadCountries, []);
  useEffect(() => changePage(1), countries);

  async function loadCountries() {
    const newCountries = await getCountries('');
    setCountries([... newCountries]);
    setFilteredCountries(newCountries.slice(0,countriesNumberPerPage));
  }

  function changePage(newNumber) {
    if (newNumber >= 1 && newNumber < countries.length / countriesNumberPerPage) {
      setPageNumber(newNumber);
      setFilteredCountries(countries.slice((newNumber - 1) * countriesNumberPerPage, newNumber * countriesNumberPerPage));
    }else if(newNumber >=1 && newNumber === Math.ceil(countries.length / countriesNumberPerPage)){
      setPageNumber(newNumber);
      setFilteredCountries(countries.slice((newNumber-1) * countriesNumberPerPage, countries.length))
    }
    window.scrollTo(0, 0);
  }

  return (
    <>
    <SearchBar setCountries={setCountries} />
      <div className='container'>
        {filteredCountries.map(
          (country, index) => <CountryCard key={index} country={country}/>
        )}
      </div>
      <div className='pageNumber'>
        <BsFillCaretLeftFill onClick={() => changePage(pageNumber - 1)} />
        <p className='number'>{pageNumber}</p>
        <BsFillCaretRightFill onClick={() => changePage(pageNumber + 1)} />
      </div>
    </>
  )
}
