//the purpose of this component is to display destinations, and initialize routing 

import { useEffect, useState } from 'react';
import TripBox from './TripBox';
import WelcomeMessage from './WelcomeMessage';
import axios from 'axios';
import './App.scss';



const TripContainer = (props) => {

    //const [dateResp, setDateResp] = useState({})

    //array to hold initial destination information
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
            destName: "Mercury",
            imgCode: "PIA11766"
        },
        {
            destName: "Venus",
            imgCode: "PIA00104"
        },
        {
            destName: "Uranus",
            imgCode: "PIA18182"
        },
        {
            destName: "Pluto",
            imgCode: "PIA09113"
        },
        {
            destName: "Saturn",
            imgCode: "PIA01383"
        },
        {
            destName: "Sun",
            imgCode: "GSFC_20171208_Archive_e001434"
        },
    ]

    // useEffect(() => {

    //     //retreiving and formatting dates for drop down date selector menu
    //     const todayDate = new Date();
    //     const dateFormatted = `${todayDate.getFullYear()}-${("0" + (todayDate.getMonth() + 1)).slice(-2)}-${("0" + todayDate.getDate()).slice(-2)}`
    //     //API call to get safe date information
    //     axios({
    //         url: "https://api.nasa.gov/neo/rest/v1/feed?",
    //         method: "GET",
    //         dataResponse: "json",
    //         params: {
    //             api_key: "0vfR0cK5U5L4Afnbrb20dF1VAFDSQIm1KDZnbJ5g",
    //             start_date: dateFormatted
    //         }
    //     }).then((response) => {
    //         const hazardousObjects = response.data.near_earth_objects;

    //         //determining safety of certain dates with measurements of potentially hazardous objects
    //         let tempArray = () => {
    //             for (const object in hazardousObjects) {
    //                 let loopArray = []
    //                 hazardousObjects[object].forEach((d) => {
    //                     if (d.estimated_diameter.kilometers.estimated_diameter_max >= 1.5) {
    //                         loopArray.push(object);
    //                     }
    //                 })
    //             }
    //         }
    //         tempArray = [...new Set(tempArray)];

    //         //setting dates into state
    //         setDateResp(tempArray)
    //     });

    // }, []);


    return (
        <>
            <WelcomeMessage />
            <div className='wrapper'>
                <ul className="tripContainer">
                    {
                        tripArray.map((trip) => {
                            return (
                                <TripBox
                                    key={trip.imgCode}
                                    tripInfo={trip}
                                    handleClick={props.handleClick}
                                    buttonClass={props.buttonClass}
                                    //dateresp={dateResp}
                                    tripCounter={props.tripCounter}
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