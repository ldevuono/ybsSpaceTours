import { useEffect, useState } from 'react';
import Tour from './Tour';
import {Link} from 'react-router-dom';
import axios from 'axios';


const TripContainer = (props) =>{
    const [planet, setPlanet] = useState({});
    const [nameOfPlanet, setNameOfPlanet] = useState("")


    console.log(props.nameOfTrip)
     useEffect(() => {
        axios({
            // url: "https://images-api.nasa.gov/search",
            // method: "GET",
            // dataResponse: "json",
            // params: {
            // q: props.nameOfPlanet
            url: `https://proxy-ugwolsldnq-uc.a.run.app/https://images-api.nasa.gov/asset/${props.nameOfTrip}`,
            method: "GET",
            dataResponse: "json",
            // params: {
            //     api_key: props.nameOfPlanet
            // }
        }).then((response) => {
            // console.log(response.data.collection.items[0].href);
            console.log(response.data.collection.items[1].href);
            // setNameOfPlanet(props.nameOfTrip[0].toUpperCase() + props.nameOfTrip.slice(1));
            setPlanet(response.data.collection.items[1].href);

           
            // resArray.push(response.data);
        });
        //   console.log(planet);
    }, []);



    return(
        <div>
            <h1>TripContainer</h1>
            <ul>
                <h1>{nameOfPlanet}</h1>
                <img src={planet} alt="" />
                <li><button>Choose a date</button></li>
                <li><button>Start virtual tour</button></li>
                <Tour />
            </ul>
        </div>
    )
}

export default TripContainer;