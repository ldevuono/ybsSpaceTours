import { useEffect, useState } from 'react';
import Tour from './Tour';
import {Link} from 'react-router-dom';
import axios from 'axios';


const Trip = (props) =>{
    const [planet, setPlanet] = useState({});

     useEffect(() => {
        axios({
            url: "https://images-api.nasa.gov/search",
            method: "GET",
            dataResponse: "json",
            params: {
            q: props.nameOfPlanet
            }
        }).then((response) => {
            console.log(response.data.collection.items[0].href);
            setPlanet(response.data.collection.href);
           
            // resArray.push(response.data);
        });
          console.log(planet);
    }, []);



    return(
        <div>
            <h1>Trip</h1>
            <ul>
                <img src={planet} alt="" />
                <li><button>Choose a date</button></li>
                <li><button>Start virtual tour</button></li>
                <Tour />
            </ul>
        </div>
    )
}

export default Trip;