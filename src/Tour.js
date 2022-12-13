import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './App.scss';


const Tour = () => {
    const { tripID } = useParams();
    const [resArray, setResArray] = useState([])


    useEffect(() => {

        const responseArray = [];

        axios({
            url: "https://images-api.nasa.gov/search",
            method: "GET",
            dataResponse: "json",
            params: {
                q: tripID 
            }
        }).then((response) => {
            console.log(response.data.collection.items[0].links[0].href);
            setResArray(response.data.collection.items)
            // console.log(resArray)
        });

    }, []);



    return (
        <div>
            <h1>Tour</h1>
            <ul>
            <Link to={`/`}>
                <li><button>Go back</button></li>
            </Link>
            </ul>
            <ul>
                {resArray.map((trip) => {
                    //console.log(trip)
                    return (
                        <li><img src={trip.links[0].href} /></li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Tour;