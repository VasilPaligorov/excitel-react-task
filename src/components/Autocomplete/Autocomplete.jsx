import React from 'react';
import { useState } from 'react';
import { getCountries } from '../../service/getData';
import CountryModal from '../CountryModal/CountryModal';
import './Autocomplete.css';


export default function Autocomplete() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryModalIsOpen, setCountryModalOpen] = useState(false);


  async function onInput(event) {
    if (event.target.value) {
      const newCountries = await getCountries(event.target.value);
      setCountries(newCountries);
    }
  }

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
  }


  return (
    <>
      <h1 className='h1'>Excitel react task: Autocomplete</h1>
      <div className='inputContainer'>
        <input id='form' type='text' placeholder="Search country" onInput={debounce((e) => onInput(e), 1000)} />
      </div>
      <div className="optionsContainer">
        {countries.length !== 0 ?
          <div id="search-options">
            {countries.map((country, index) =>
              index <= 9
                ? <p className="search-option" key={index}
                  onClick={() => {
                    setSelectedCountry(country)
                    setCountryModalOpen(true);
                  }}
                >{country.name}</p>
                : null
            )}
          </div>
          : null}
      </div>
      {
        selectedCountry ?
          <CountryModal country={selectedCountry}
            countryModalIsOpen={countryModalIsOpen}
            setCountryModalOpen={setCountryModalOpen} />
          : null
      }
    </>

  )
}
