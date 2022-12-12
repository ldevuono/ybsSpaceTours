import { useEffect, useState } from 'react';
import Tour from './Tour';
import { Link } from 'react-router-dom';
import axios from 'axios';


const TripContainer = (props) => {

    const tripArray = [
        "Orion", "Crab Nebula", "Milky way", "mercury", "venus", "uranus", "pluto", "saturn", "sun"
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
            <ul>
                {
                    resArray.map((trip, i) => {
                        return (
                            <li key={tripArray[i]}>
                                <Link to={`/tour/${tripArray[i]}`}>
                                    <h2>TripContainer</h2>
                                    <h3>{tripArray[i]}</h3>
                                    <img src={trip} alt={`a beautiful image of ${tripArray[i]}`} />
                                    <ul>
                                        <li><button>Choose a date</button></li>
                                        <li><button>Start virtual tour</button></li>
                                        {/* <Tour /> */}
                                    </ul>
                                </Link>
                            </li>

                        )
                    })
                }
            </ul>
        </div>
    )
}

export default TripContainer;