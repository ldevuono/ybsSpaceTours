//this component determines which dates are safe for travel, allows user's to book their in person tours, and saves their info to Firebase

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import app from '../firebase';
import { getDatabase, ref, push } from 'firebase/database';



function Dates() {
	const [dateResp, setDateResp] = useState([])
	const [dateList, setDateList] = useState([]);
	const [dates, setDates] = useState(false);
	const { tripID } = useParams();


	const totalDates = 6;

	useEffect(() => {


		//getting the current date
		//eslint-disable-next-line
		Date.prototype.addDays = function (days) {
			let date = new Date(this.valueOf());
			date.setDate(date.getDate() + days);
			return date;
		}


		const getDates = (startDate, stopDate) => {
			// eslint-disable-next-line
			let dateArray = new Array();
			let currentDate = startDate;
			while (currentDate <= stopDate) {
				dateArray.push(new Date(currentDate));
				currentDate = currentDate.addDays(1);
			}
			return dateArray;
		}

		const todayDate = new Date();
		setDateList(getDates(todayDate, (todayDate).addDays(totalDates)));

		//retreiving info about space weather events from the API
		axios({
			url: "https://api.nasa.gov/neo/rest/v1/feed?",
			method: "GET",
			dataResponse: "json",
			params: {
				api_key: "0vfR0cK5U5L4Afnbrb20dF1VAFDSQIm1KDZnbJ5g",
				// api_key: "JDRuKCmCHys7mfyiaqaUomCeZqsgjnv8iQyTjl8l",
				start_date: `${todayDate.getFullYear()}-${("0" + (todayDate.getMonth() + 1)).slice(-2)}-${("0" + todayDate.getDate()).slice(-2)}`

			}
			//gets the diameter of near earth objects to determine safety for the traveller
		}).then((response) => {
			const hazardousObjects = response.data.near_earth_objects;
			let tempArray = []
			for (const object in hazardousObjects) {
				// eslint-disable-next-line
				hazardousObjects[object].forEach((d) => {
					if (d.estimated_diameter.kilometers.estimated_diameter_max >= .5) {
						tempArray.push(object);
					}
				})
			}

			//filtering out the duplicate dates from the API, reformatting the dates to be in ascending order
			tempArray = [...new Set(tempArray)];
			tempArray.sort(function (a, b) {
				a = a.split('-').reverse().join('');
				b = b.split('-').reverse().join('');
				return a > b ? 1 : a < b ? -1 : 0;
			});

			//creating new object that determines whether or not the date is safe for travelling
			let allDatesObject = []
			dateList.forEach((date, i) => {
				const thisDate = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

				if (thisDate === tempArray[i]) {
					allDatesObject.push({
						date: thisDate,
						isItSafe: false
					})
				} else {
					allDatesObject.push({
						date: thisDate,
						isItSafe: true
					})
				}
			})
			allDatesObject = [...new Set(allDatesObject)];
			setDateResp(allDatesObject);
		});
		// eslint-disable-next-line
	}, [dates]);

	//form subbmission actions
	//alert displayed to confirm that the user's info has been retrieved
	const submitHandler = (e) => {
		//alert to confirm submission

		e.preventDefault();
		alert(`Thank you for your message, ${e.target.name.value}. We will be in touch shortly about your trip to ${tripID}.`)

		//storing submitted data in Firebase

		const database = getDatabase(app);
		const dbRef = ref(database);

		let information = {
			yeeting: e.target.name.value,
			contact: e.target.email.value,
			when: e.target.dates.value,
			where: tripID
		}

		push(dbRef, information);
	}

	return (
		<div>
			<ul className='goBackButton'>
				<Link to={`/`}>
					<li><button>Go back</button></li>
				</Link>
			</ul>
			<div className="wrapper datesWrapper">
				<p>Please fill out the form and select a date from the list below. We will contact you with more details.</p>
				<p>All available dates have been cleared of any dangerous space weather events by NASA.</p>
				<p className='extraMarginTop'>Non-selectable dates are deemed unsafe for travel.</p>
				<form onSubmit={submitHandler}>
					<label htmlFor="name" className="sr-only">Name</label>
					<input type="text" name="name" id="name" placeholder="Name" required />

					<label htmlFor="email" className="sr-only">Email Address</label>
					<input type="email" name="email" id="email" placeholder="Email Address" required />
					<div className="getDates">
						<button type="button" onClick={() => setDates(true)} aria-label="Click here to see list of available dates">See available dates </button>
					</div>
					<label htmlFor="dates" className="sr-only">Choose a date</label>
					<select
						className={dates ? "" : "selectHide"}
						id="dates"
						name="dates"
						defaultValue={""}
						required={true}
					>
						<option value="" disabled>Choose a date</option>
						{dateResp.map((date) => {
							return (
								<option
									key={`dropdownDate${date.date}`}
									disabled={date.isItSafe ? false : true}
									value={date.date}
								>
									{date.date}
								</option>
							)
						})}

					</select>
					<button type="submit">Submit</button>

				</form>

			</div>
			{/* end of tupac */}

		</div>
	)
}



export default Dates