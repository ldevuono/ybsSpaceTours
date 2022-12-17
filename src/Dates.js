import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dates() {
	const [dateResp, setDateResp] = useState([])
	const [dateList, setDateList] = useState([]);
	const [dates, setDates] = useState(false);


	// Date.prototype.addDays = function (days) {
	// 	var date = new Date(this.valueOf());
	// 	date.setDate(date.getDate() + days);
	// 	return date;
	// }

	// const getDates = (startDate, stopDate) => {
	// 	var dateArray = new Array();
	// 	var currentDate = startDate;
	// 	while (currentDate <= stopDate) {
	// 		dateArray.push(new Date(currentDate));
	// 		currentDate = currentDate.addDays(1);
	// 	}
	// 	return dateArray;
	// }

	// const todayDate = new Date();
	// setDateList(getDates(todayDate, (todayDate).addDays(30)));
	// console.log(dateList);

	useEffect(() => {
		// eslint-disable-next-line
		Date.prototype.addDays = function (days) {
			var date = new Date(this.valueOf());
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
		setDateList(getDates(todayDate, (todayDate).addDays(30)));
		

		// console.log(dateList);

		// const responseArray = [];
		axios({
			url: "https://api.nasa.gov/neo/rest/v1/feed?",
			method: "GET",
			dataResponse: "json",
			params: {
				api_key: "0vfR0cK5U5L4Afnbrb20dF1VAFDSQIm1KDZnbJ5g",
				// api_key: "JDRuKCmCHys7mfyiaqaUomCeZqsgjnv8iQyTjl8l",
				start_date: `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`,
			}
		}).then((response) => {
			console.log(response);
			const hazardousObjects = response.data.near_earth_objects;
			let tempArray = []
			for (const object in hazardousObjects) {
				// object.filter( (dateObject) => {
				//console.log(hazardousObjects[object])
				//     })
					// eslint-disable-next-line
				hazardousObjects[object].forEach((d) => {
					// console.log(d.estimated_diameter.kilometers.estimated_diameter_max)
					// console.log(d);
					if (d.estimated_diameter.kilometers.estimated_diameter_max >= 1.5) {
						// setTravelDays([...travelDays, object])
						tempArray.push(object);
					}
				})
			}
			tempArray = [...new Set(tempArray)];


			let allDatesObject = []
			dateList.forEach((date) => {
				const thisDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
				tempArray.forEach((d) => {
					if (d === thisDate) {
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
			})
			allDatesObject = [...new Set(allDatesObject)];
			// console.log(tempArray);
			// console.log(response.data.collection.items[0].links[0].href);
			setDateResp(allDatesObject);
			console.log(dateResp);
		});
	// eslint-disable-next-line
	}, [dates]);



	useEffect(() => {
		console.log(dateResp)
		//console.log(dateResp["2022-12-06"][0].absolute_magnitude_h)

	}, [dateResp]);

	const submitHandler = (e) =>{
		e.preventDefault();
	}

	return (
		<div>
			<ul className='goBackButton'>
				<Link to={`/`}>
					<li><button>Go back</button></li>
				</Link>
			</ul>
			<p>Please fill out the form and select a date from the list below. We will contact you with more details.</p>
			<p>All available dates have been cleared of any dangerous space weather events by NASA.</p>
			<p>Non-selectable dates are deemed unsafe for travel.</p>
			<form className="wrapper" onSubmit={submitHandler}>
				<label htmlFor="name" className="sr-only">Name</label>
				<input type="text" name="name" id="name" placeholder="Name" />

				<label htmlFor="email" className="sr-only">Email Address</label>
				<input type="email" name="email" id="email" placeholder="Email Address" />
				<div className="getDates">
					<button onClick={() => setDates(!dates)} aria-label="Click here to see list of available dates">See available dates</button>
				</div>
				<label htmlFor="dates" className="sr-only">Choose a date</label>
				<select
					className={dates ? "" : "selectHide" }
					id="dates"
					name="dates"
					// onChange={ }
					// value={ }
					defaultValue={""}
					// required={true}
				>
					{console.log(dateResp)}
					<option  value="" disabled>Choose a date</option>
					{dateResp.map((date) => {
						return (
							<option disabled={date.isItSafe ? false : true} value={date.date}>{date.date}</option>
						)
					})}
					{/* <option value="">Pick one:</option> */}

				</select>
				<button>Submit</button>
					
			</form>
			
	




		</div>
	)
}



export default Dates