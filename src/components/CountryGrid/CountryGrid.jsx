import React from 'react';
import { useState } from 'react';
import './CountryGrid.css';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { useEffect } from 'react';
import { getCountries } from '../../service/getData.js';
import CountryCard from '../CountryCard/CountryCard.jsx';

export default function CountryGrid({ countries, setCountries }) {
  const [filteredCountries, setFilteredCountries] = useState(countries)
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => loadCountries, [])

  async function loadCountries() {
    const newCountries = await getCountries('');
    setCountries(newCountries);
    setFilteredCountries(newCountries.slice(0,52));
  }

  function changePage(newNumber) {
    if (newNumber >= 1 && newNumber < countries.length / 52) {
      setPageNumber(newNumber);
      setFilteredCountries(countries.slice((newNumber - 1) * 52, newNumber * 52));
    }else if(newNumber >=1 && newNumber === Math.ceil(countries.length / 52)){
      setPageNumber(newNumber);
      setFilteredCountries(countries.slice((newNumber-1) * 52, countries.length))
    }
  }

  return (
    <>
      <div className='container'>
        {filteredCountries.map(
          (country, index) => <CountryCard key={index} country={country}/>
        )}
      </div>
      <div className='pageNumber'>
        <BsFillCaretLeftFill onClick={() => changePage(pageNumber - 1)} />
        {pageNumber}
        <BsFillCaretRightFill onClick={() => changePage(pageNumber + 1)} />
      </div>
    </>
  )
}
