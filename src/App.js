import { useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import TripContainer from './TripContainer';

import Tour from './Tour';
import Dates from './Dates';

import './App.scss';
import logo from './assets/ybs-logo.svg';
import Footer from './Footer';



function App() {

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
        {/* img */}
        <ul>
          <li>
            <img src={logo} alt="" />
          </li>
          <li className='tripCounter'>
            <p>Virtual Tours Left <span>{tripCounter}</span></p>
          </li>
        </ul>
      </header>

      {/* desc */}

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
