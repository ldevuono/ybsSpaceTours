import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, Link } from 'react-router-dom';
import TripContainer from './TripContainer';
// import TripCounter from './TripCounter';
import Tour from './Tour';
import Dates from './Dates';

import './App.scss';
import logo from './assets/ybs-logo.svg';



function App() {

  const [tripCounter, setTripCounter] = useState(3)
  const [buttonFunction, setbuttonFunction] = useState('works')

  const handleClick = () => {
    if (tripCounter > 0) {
      setTripCounter(tripCounter - 1)
    }
    if (tripCounter === 1) {
      setbuttonFunction('doesntWork')
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
            {/* <TripCounter /> */}
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
          />}
        />
        <Route path="/tour/:tripID" element={<Tour />} />
        <Route path="/dates/:tripID" element={<Dates />} />
      </Routes>
    </div>
  );
}

export default App;
