import React from 'react';
import { getCountries } from '../../service/getData';

export default function SearchBar({setCountries}) {

  function onInput(event){
    setTimeout(async()=>{
      const newCountries = await getCountries(event.target.value);
      setCountries(newCountries);
    }, 2000);
  }

  return (
    <input placeholder='Enter country name' type="text" onInput={(e)=>onInput(e)}/>
  )
}
