

import { useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import TripContainer from './components/TripContainer';

import Tour from './components/Tour';
import Dates from './components/Dates';

import './App.scss';
import logo from './assets/ybs-logo.svg';
import Footer from './components/Footer';



function App() {

  //creating states to hold counter data & to make tour buttons unclickable after 3 tours
  const [tripCounter, setTripCounter] = useState(3)
  const [buttonFunction, setbuttonFunction] = useState('works')

  const handleClick = () => {
    if (tripCounter > 0) {
      setTripCounter(tripCounter - 1)
    }
    if (tripCounter === 1) {
      setbuttonFunction('doesntWork')

    } else if (tripCounter === 0) {
      alert("Come back tomorrow!")
    }

  }




  return (
    <div className="App">
      <div className="backgroundImg" />
      <header>
        <ul>
          <li>
            <img src={logo} alt="" />
          </li>
          <li className='tripCounter'>
            <p>Virtual Tours Left <span>{tripCounter}</span></p>
          </li>
        </ul>
      </header>


      <Routes>
        <Route path="/" element={
          <TripContainer
            handleClick={handleClick}
            buttonClass={buttonFunction}
            tripCounter={tripCounter}
          />}
        />
        <Route path="/tour/:tripID" element={<Tour />} />
        <Route path="/dates/:tripID" element={<Dates />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
