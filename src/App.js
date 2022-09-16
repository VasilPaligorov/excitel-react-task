import './App.css';
import CountryGrid from './components/CountryGrid/CountryGrid';
import Modal from 'react-modal';
import Autocomplete from './components/Autocomplete/Autocomplete';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

Modal.setAppElement('#root');

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Navigate replace to="/" />} />
          <Route path='/autocomplete' element={<Autocomplete />} />
          <Route path='/' element={<CountryGrid />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
