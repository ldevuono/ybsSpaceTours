//This component displays the tour images from the API on the pages

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './App.scss';


const Tour = () => {
    const { tripID } = useParams();
    const [resArray, setResArray] = useState([])


    useEffect(() => {

        //call to get images
        axios({
            url: "https://images-api.nasa.gov/search",
            method: "GET",
            dataResponse: "json",
            params: {
                q: tripID
            }
            //array for the images on the tour page
        }).then((response) => {
            setResArray(response.data.collection.items)
        });
    }, [tripID]);


    return (
        <div>
            <h1>{tripID}</h1>
            <div className='goBackButton'>
                <Link to={`/`}>
                    <button>Go back</button>
                </Link>
            </div>
            <div className="wrapper">
                <ul>{/*slicing the image array to be a maximum of 10 images*/}
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