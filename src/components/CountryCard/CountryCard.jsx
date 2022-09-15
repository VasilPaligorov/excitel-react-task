import React from 'react';
import CountryModal from '../CountryModal/CountryModal';
import './CountryCard.css';
import { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function CountryCard({ country }) {
  const [countryModalIsOpen, setCountryModalOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [progress, setProgress] = useState(0);

  function openModal() {
    setTimeoutId(setTimeout(() => setCountryModalOpen(true), 2000));
    setIntervalId(setInterval(interval, 500));
  }

  function interval() {
    if (progress <= 100) {
      const newProgress = progress + 25;
      setProgress(newProgress);
      console.log(progress);
    } else { clearInterval(intervalId); }
  }

  function closeModal() {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
    setProgress(0);
  }

  return (
    <>
      <div className='card'
        onMouseDown={() => openModal()}
        onMouseUp={() => closeModal()}
        onMouseOut={() => closeModal()}
        onMouseLeave={() => closeModal()}>
        <img src={country.flag} />
        <p>{country.name}</p>
        <ProgressBar animated className='progressBar' now={progress} />
      </div>
      <CountryModal country={country}
        countryModalIsOpen={countryModalIsOpen}
        setCountryModalOpen={setCountryModalOpen} />
    </>
  )
}
