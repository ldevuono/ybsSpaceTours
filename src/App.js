import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, Link } from 'react-router-dom';
import TripContainer from './TripContainer';
import Tour from './Tour';
import './App.css';



function App() {


  return (
    <div className="App">
      <h1>Welcome to our super cool project!!</h1>
      <Routes>
        <Route path="/" element={<TripContainer />} />
        <Route path="/TripContainer/:tripID" element={<Tour />} />
      </Routes>
    </div>
  );
}

export default App;
