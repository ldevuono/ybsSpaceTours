import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, Link } from 'react-router-dom';
import TripContainer from './TripContainer';
import TripCounter from './TripCounter';
import Tour from './Tour';
import './App.scss';
import logo from './assets/ybs-logo.svg';



function App() {


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
            <TripCounter />
          </li>
        </ul>
      </header>

      {/* desc */}

      <Routes>
        <Route path="/" element={<TripContainer />} />
        <Route path="/tour/:tripID" element={<Tour />} />
      </Routes>
    </div>
  );
}

export default App;
