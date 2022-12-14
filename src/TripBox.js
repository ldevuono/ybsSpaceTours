import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.scss';

const TripBox = (props) => {

  const [trip, setTrip] = useState({})
  const [tourClass, setTourClass] = useState(props.buttonClass)

  useEffect(() => {

          axios({

              url: `https://proxy-ugwolsldnq-uc.a.run.app/https://images-api.nasa.gov/asset/${props.tripInfo.imgCode}`,
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

  }, []);



  return (

    <li className="imgButtons" key={trip.dest}>
        <h3>{trip.dest}</h3>
        <div className="imgContainer">
            <img src={trip.imgLink} alt={`a beautiful image of ${trip.dest}`} />
        </div>
        <ul className='buttonContainer'>
            <li><button>Choose a date</button></li>
            <Link to={`/tour/${trip.dest}`}>
                <li>
                  <button className={tourClass}
                  onClick={props.handleClick}
                  >Start virtual tour</button>
                </li>
                {/* <Tour /> */}
            </Link>
        </ul>

    </li>
  )
}

export default TripBox;