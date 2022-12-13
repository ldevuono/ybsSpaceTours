import { useEffect, useState } from 'react';
import Tour from './Tour';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.scss';


const TripContainer = (props) => {

    const tripArray = [
        "The Sword of Orion", "Crab Nebula", "Milky way", "mercury", "venus", "uranus", "pluto", "saturn", "sun"
    ]

    const tripImages = [
        "PIA08653", "PIA03606", "PIA12348", "PIA11766", "PIA00104", "PIA18182", "PIA09113", "PIA01383", "GSFC_20171208_Archive_e001434"
    ]

    const [resArray, setResArray] = useState([])
    // const [planet, setPlanet] = useState({});
    // const [nameOfPlanet, setNameOfPlanet] = useState("")

    useEffect(() => {

        const responseArray = [];
        tripImages.map((trip) => {

            axios({
                // url: "https://images-api.nasa.gov/search",
                // method: "GET",
                // dataResponse: "json",
                // params: {
                // q: props.nameOfPlanet
                url: `https://proxy-ugwolsldnq-uc.a.run.app/https://images-api.nasa.gov/asset/${trip}`,
                method: "GET",
                dataResponse: "json",
                // params: {
                //     api_key: props.nameOfPlanet
                // }
            }).then((response) => {
                // console.log(response.data.collection.items[0].href);
                console.log(response.data.collection.items[1].href);
                // setNameOfPlanet(props.nameOfTrip[0].toUpperCase() + props.nameOfTrip.slice(1));
                setResArray(resArray => [...resArray, response.data.collection.items[1].href])

                // setResArray(() => {
                //     return (
                //         resArray.push(response.data.collection.items[1].href)
                //     )
                // })
                // resArray.push(response.data);
                console.log(resArray.length)
            });

        })
    }, []);



    return (
        <div>
            <ul className="tripContainer">
                {
                    resArray.map((trip, i) => {
                        return (
                            <li className="imgButtons" key={tripArray[i]}>
                                    <h3>{tripArray[i]}</h3>
                                    <div className="imgContainer">
                                        <img src={trip} alt={`a beautiful image of ${tripArray[i]}`} />
                                    </div>
                                    <ul>
                                        <li><button>Choose a date</button></li>
                                    <Link to={`/tour/${tripArray[i]}`}>
                                        <li><button>Start virtual tour</button></li>
                                        {/* <Tour /> */}
                                    </Link>
                                    </ul>
                                
                            </li>

                        )
                    })
                }
            </ul>
        </div>
    )
}

export default TripContainer;