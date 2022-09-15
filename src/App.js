import './App.css';
import CountryGrid from './components/CountryGrid/CountryGrid';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function App() {
  return (
    <div className="App">
      <CountryGrid />
    </div>
  );
}
