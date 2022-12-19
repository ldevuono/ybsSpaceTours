import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './App.scss';


const Tour = () => {
    const { tripID } = useParams();
    const [resArray, setResArray] = useState([])


    useEffect(() => {

        axios({
            url: "https://images-api.nasa.gov/search",
            method: "GET",
            dataResponse: "json",
            params: {
                q: tripID
            }
        }).then((response) => {
            setResArray(response.data.collection.items)
        });
    }, [tripID]);


    return (
        <div>
            <h1>{tripID}</h1>
            <ul className='goBackButton'>
                <Link to={`/`}>
                    <li><button>Go back</button></li>
                </Link>
            </ul>
            <div className="wrapper">
                <ul>
                    {resArray.slice(0, 10).map((trip) => {
                        return (
                            <li className='tourImage' key={trip.links[0].href}><img src={trip.links[0].href} alt={`the beautiful ${trip.dest}`} /></li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Tour;