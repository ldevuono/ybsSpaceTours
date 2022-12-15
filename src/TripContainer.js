import { useEffect, useState } from 'react';
import TripBox from './TripBox';
import WelcomeMessage from './WelcomeMessage';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.scss';



const TripContainer = (props) => {

    const [buttonClass, setButtonClass] = useState(props.buttonClass)
    const [dateResp, setDateResp] = useState({})

    const tripArray = [
        {
            destName: "The Sword of Orion",
            imgCode: "PIA08653"
        },
        {
            destName: "Crab Nebula", 
            imgCode: "PIA03606"
        },
        {
            destName: "Milky way", 
            imgCode: "PIA12348"
        },
        {
            destName: "mercury", 
            imgCode: "PIA11766"
        },
        {
            destName: "venus", 
            imgCode: "PIA00104"
        },
        {
            destName: "uranus", 
            imgCode: "PIA18182"
        },
        {
            destName: "pluto", 
            imgCode: "PIA09113"
        },
        {
            destName: "saturn", 
            imgCode: "PIA01383"
        },
        {
            destName: "sun",
            imgCode: "GSFC_20171208_Archive_e001434"
        },
    ]

    useEffect(() => {

		// const responseArray = [];
		const todayDate = new Date();
		console.log(todayDate)
		axios({
		  url: "https://api.nasa.gov/neo/rest/v1/feed?",
		  method: "GET",
		  dataResponse: "json",
		  params: {
			api_key: "0vfR0cK5U5L4Afnbrb20dF1VAFDSQIm1KDZnbJ5g",
			start_date: `${todayDate.getFullYear()}-${todayDate.getMonth() + 1 }-${todayDate.getDay()}`
		  }
		}).then((response) => {
		  // console.log(response.data.collection.items[0].links[0].href);
		  setDateResp(response.data.near_earth_objects)
		});
	
	  }, []);



    return (
        <>
        <WelcomeMessage />
            <div className='wrapper'>
                <ul className="tripContainer">
                    {
                        tripArray.map((trip) => {
                            return (
                                <TripBox 
                                tripInfo = {trip}  
                                handleClick= { props.handleClick }
                                buttonClass= { props.buttonClass }
                                dateResp= {dateResp}
                                />
                                )
                            })
                        }
                </ul>
            </div>
        </>
    )
}

export default TripContainer;