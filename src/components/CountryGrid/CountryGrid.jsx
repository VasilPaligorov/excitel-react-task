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
  const [sortByCapital, setSortByCapital] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);

  const countriesNumberPerPage = 50;

  useEffect(() => loadCountries, []);
  useEffect(() => changePage(1), [countries]);
  useEffect(() => changeSort(), [sortByCapital]);

  async function loadCountries() {
    const newCountries = await getCountries('');
    setCountries([...newCountries]);
  }

  function changeSort() {
    let sortBy;
    sortByCapital ?
      sortBy = 'capitalName' :
      sortBy = 'name';

    setCountries(countries.sort((a, b) => a[sortBy].localeCompare(b[sortBy])));
    changePage(1);
  }

  function changePage(newNumber) {
    const lastPage = Math.ceil(countries.length / countriesNumberPerPage);

    if (newNumber >= 1 && newNumber < countries.length / countriesNumberPerPage) {
      setPageNumber(newNumber);
      const newCountries = countries.slice((newNumber - 1) * countriesNumberPerPage, newNumber * countriesNumberPerPage);
      setFilteredCountries(newCountries);
    } else if (newNumber >= 1 && newNumber === lastPage) {
      setPageNumber(newNumber);
      const newCountries = countries.slice((newNumber - 1) * countriesNumberPerPage, countries.length);
      setFilteredCountries(newCountries);
    }

    window.scrollTo(0, 0);

    if (newNumber === 1) {
      setIsFirst(true);
      if (newNumber === lastPage)
        setIsLast(true);
    }
    else if (newNumber === lastPage)
      setIsLast(true);
    else {
      setIsFirst(false);
      setIsLast(false);
    }
  }

  return (
    <>
      <h1 className='h1'>Excitel react task</h1>
      <SearchBar setCountries={setCountries} setSortByCapital={setSortByCapital} sortByCapital={sortByCapital} />
      <div className='container'>
        {filteredCountries.map(
          (country, index) => <CountryCard key={index} country={country} sortByCapital={sortByCapital} />
        )}
      </div>
      <div className='pageNumber'>
        {!isFirst ? <BsFillCaretLeftFill id="previous" onClick={() => changePage(pageNumber - 1)} /> : null}
        <p className='number'>{pageNumber}</p>
        {!isLast ? <BsFillCaretRightFill onClick={() => changePage(pageNumber + 1)} /> : null}
      </div>
    </>
  )
}
