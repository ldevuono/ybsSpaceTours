// import { useEffect, useState } from 'react';
import TripBox from './TripBox';
import WelcomeMessage from './WelcomeMessage';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
import './App.scss';


const TripContainer = () => {

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