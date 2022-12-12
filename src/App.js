import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, Link } from 'react-router-dom';
import TripContainer from './TripContainer';
import Tour from './Tour';
import './App.css';



function App() {

  const tripArray = [
    "Orion", "Crab Nebula", "Milky way", "mercury", "venus", "uranus", "pluto","saturn","sun"
  ]

  const tripImages = [
    "PIA08653", "PIA03606", "PIA12348", "PIA11766", "PIA00104", "PIA18182", "PIA09113","PIA01383","GSFC_20171208_Archive_e001434"
  ]

  const resArray = []

 



  return (
    <div className="App">
      <h1>Welcome to our super cool project!!</h1>
      {
      tripImages.map((trip) => {
        
        return(
          <TripContainer nameOfTrip={trip}/>
        )
      }) 
      }
      <Routes>
        <Route path="/"/>
        <Route path="/TripContainer/:tripID" element={<TripContainer />}></Route>
      </Routes>
    </div>
  );
}

export default App;
