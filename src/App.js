import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, Link } from 'react-router-dom';
import Trip from './Trip';
import Tour from './Tour';
import './App.css';



function App() {

  const tripsArray = [
    "mercury", "venus", "uranus", "mars", "jupiter", "saturn"
  ]

  const resArray = []

 



  return (
    <div className="App">
      <h1>Welcome to our super cool project!!</h1>
      {
      tripsArray.map((trip) => {
        
        return(
          <Trip nameOfPlanet={trip}/>
        )
      }) 
      }
      <Routes>
        <Route path="/"/>
        <Route path="/trip/:tripID" element={<Trip />}></Route>
      </Routes>
    </div>
  );
}

export default App;
