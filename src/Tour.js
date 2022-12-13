import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Tour = () => {
    const { tripID } = useParams();
    const [resArray, setResArray] = useState({})


    useEffect(() => {

        const responseArray = [];

        axios({
            url: "https://images-api.nasa.gov/search",
            method: "GET",
            dataResponse: "json",
            params: {
                q: "saturn"
            }
        }).then((response) => {
            console.log(response.data);
            setResArray(response.data)
            // console.log(resArray)
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