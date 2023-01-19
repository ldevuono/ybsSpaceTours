//this component gathers information for the photos on the main page & routes to the individual tour and booking pages

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.scss';
import { getDatabase, ref, get } from 'firebase/database';
import app from './firebase';

const TripBox = (props) => {

  const [trip, setTrip] = useState({})
  // eslint-disable-next-line
  const [tourClass, setTourClass] = useState(props.buttonClass)
  const [tripsBooked, setTripsBooked] = useState(0);


  useEffect(() => {

    //making the call to retrieve preview photos from API
    axios({
      url: `https://images-api.nasa.gov/asset/${props.tripInfo.imgCode}`,
      method: "GET",
      dataResponse: "json"

    }).then((response) => {

      setTrip({
        dest: props.tripInfo.destName,
        imgCode: props.tripInfo.imgCode,
        imgLink: response.data.collection.items[1].href
      })
    });
  }, [props.tripInfo.destName, props.tripInfo.imgCode]);

  useEffect(() => {
    const database = getDatabase(app);
    const dbRef = ref(database);

    get(dbRef)
      .then((snapshot) => {
        // check if there's a database
        if (snapshot.exists()) {
          let counter = 0;
          // Loop through each item in the object and check if .where destionation matches with trip.dest, if it does increment counter by 1
          snapshot.forEach((item) => {
            if (item.val().where === trip.dest) {
              counter++;
            }
            setTripsBooked(counter);
          });
        }
      }).catch((error) => {
        alert("No data available. Try reloading the page, or come back tomorrow because too many people are using this super super fun app");
      });
  }, [trip.dest]);


  return (

    <li className="imgButtons" key={trip.dest}>
      <div className="titleContainer">
        <h3>{trip.dest}</h3>
      </div>
      <div className="imgContainer">
        <img src={trip.imgLink} alt={trip.dest} />
      </div>
      <ul className='buttonContainer'>
        {
          props.tripCounter > 0 ?
            <Link to={`/tour/${trip.dest}`}>
              <li>
                <button className={tourClass}
                  onClick={props.handleClick}
                >Start virtual tour</button>
              </li>
            </Link>
            :
            <Link to={'/'}>
              <li>
                <button className={tourClass}
                  onClick={props.handleClick}
                >Start virtual tour</button>
              </li>
            </Link>
        }


        <Link to={`/dates/${trip.dest}`}>
          <li><button
            dateresp={props.dateResp}
          >Reserve a date</button></li>
        </Link>
        <p className="tripsBooked">{tripsBooked} trip(s) booked</p>
      </ul>
    </li>
  )
}

export default TripBox;