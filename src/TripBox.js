import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.scss';

const TripBox = (props) => {

  const [trip, setTrip] = useState({})
  // eslint-disable-next-line
  const [tourClass, setTourClass] = useState(props.buttonClass)

  useEffect(() => {

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
    </li>
  )
}

export default TripBox;