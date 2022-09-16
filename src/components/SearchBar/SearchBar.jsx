import React from 'react';
import { getCountries } from '../../service/getData';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ setCountries, setSortByCapital, sortByCapital}) {
  const [sortBy, setSortBy] = useState("Name");

  useEffect(()=>{
    sortByCapital?
      setSortBy("Capital")
      :setSortBy("Name")
  }, [sortByCapital]);

  async function onInput(event) {
    const newCountries = await getCountries(event.target.value);
    setCountries(newCountries);
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
    <div className='searchBar'>
      <div className='input'>
        <input placeholder='Enter country name' type="text" onInput={debounce((e) => onInput(e), 1000)} />
      </div>
      <DropdownButton title={"Sort by: " + sortBy}>
        <Dropdown.Item href="#"
          onClick={() => setSortByCapital(false)}>Name</Dropdown.Item>
        <Dropdown.Item href="#"
          onClick={() => setSortByCapital(true)}>Capital name</Dropdown.Item>
      </DropdownButton>
    </div>

  )
}