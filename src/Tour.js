import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Tour = () => {
    const { tripID } = useParams();
    const [resArray, setResArray] = useState([])


    useEffect(() => {

        const responseArray = [];

        axios({
            url: "https://images-api.nasa.gov/search",
            // method: "GET",
            // dataResponse: "json",
            // params: {
            q: "saturn",
            method: "GET",
            dataResponse: "json",
        }).then((response) => {
            console.log(response.data.collection.items[1].href);
            setResArray(resArray => [...resArray, response.data.collection.items[1].href])
            console.log(resArray)
        });

    }, []);



    return (
        <div>
            <h1>Tour</h1>
            <ul>

                <li><button>Go back</button></li>
            </ul>
        </div>
    )
}

export default Tour;