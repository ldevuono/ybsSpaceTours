import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import './App.css';



function App() {

  const tripsArray = [
    "mercury", "venus", "uranus", "mars", "jupiter", "saturn"
  ]

  const resArray = []

  useEffect(() => {
    tripsArray.forEach((trip) => {
      axios({
        url: "https://images-api.nasa.gov/search",
        method: "GET",
        dataResponse: "json",
        params: {
          q: trip
        }
      }).then((response) => {
        // console.log(response.data);
        resArray.push(response.data);
      });
    })
    console.log(resArray)
  }, []);



  return (
    <div className="App">
      <h1>Welcome to our super cool project!!</h1>
    </div>
  );
}

export default App;
