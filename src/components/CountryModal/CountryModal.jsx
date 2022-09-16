import React from 'react';
import { BsXLg } from 'react-icons/bs';
import Modal from 'react-modal';
import './CountryModal.css'

export default function CountryModal({ country, countryModalIsOpen, setCountryModalOpen }) {
  return (
    <Modal isOpen={countryModalIsOpen}
      onRequestClose={() => setCountryModalOpen(false)}
      shouldCloseOnOverlayClick={false}>
      <div className='header'>
        <h1>{country.name}</h1>
        <BsXLg onClick={() => setCountryModalOpen(false)} />
      </div>
      <div className='content'>
        <img src={country.flag} alt='country flag' />
        <p>Code: {country.code}</p>
        <p>Capital: {country.capitalName ? country.capitalName : "-"}</p>
        <p>Latitude: {country.latLng[0] ? country.latLng[0] : "-"}</p>
        <p>Longitude: {country.latLng[1] ? country.latLng[1] : "-"}</p>
      </div>
    </Modal>
  )
}
