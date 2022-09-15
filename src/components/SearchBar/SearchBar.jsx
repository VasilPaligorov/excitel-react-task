import React from 'react';
import { getCountries } from '../../service/getData';

export default function SearchBar({ setCountries }) {

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
      debounceTimer= setTimeout(() => func.apply(context, args), delay);
    }
  }

  return (
    <input placeholder='Enter country name' type="text" onInput={debounce((e) => onInput(e), 1000)} />
  )
}