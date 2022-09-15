import './App.css';
import CountryGrid from './components/CountryGrid/CountryGrid';
import SearchBar from './components/SearchBar/SearchBar';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function App() {
  const [countries, setCountries] = useState([]);

  return (
    <div className="App">
      <SearchBar setCountries={setCountries} />
      <CountryGrid countries={countries} setCountries={setCountries} />
    </div>
  );
}
