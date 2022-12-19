import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.scss';
// import Dates from './Dates.js'

const TripBox = (props) => {
  // console.log(props.dateResp)

  const [trip, setTrip] = useState({})
  	// eslint-disable-next-line
  const [tourClass, setTourClass] = useState(props.buttonClass)
  // const [dateResp, setDateResp] = useState(props.dateResp)

  useEffect(() => {

    axios({
      // https://proxy-ugwolsldnq-uc.a.run.app/
      url: `https://images-api.nasa.gov/asset/${props.tripInfo.imgCode}`,
      method: "GET",
      dataResponse: "json"

    }).then((response) => {

      // console.log(response.data.collection.items[1].href);

      setTrip({
        dest: props.tripInfo.destName,
        imgCode: props.tripInfo.imgCode,
        imgLink: response.data.collection.items[1].href
      })
    });
	// eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   console.log(dateResp)
  // }, [dateResp])

  return (

    <li className="imgButtons" key={trip.dest}>
      <div className="titleContainer">
        <h3>{trip.dest}</h3>
      </div>
      <div className="imgContainer">
        <img src={trip.imgLink} alt={`the beautiful ${trip.dest}`} />
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
          {/* <Tour /> */}
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
      </ul>
      {/* <Dates dateResp={props.dateResp} /> */}
    </li>
  )
}

export default TripBox;