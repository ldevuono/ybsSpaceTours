import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, Link, useParams } from 'react-router-dom';

function Dates(props) {
	const [dateResp, setDateResp] = useState([])
	const [dateList, setDateList] = useState([]);

	const { tripID } = useParams();

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

		Date.prototype.addDays = function (days) {
			var date = new Date(this.valueOf());
			date.setDate(date.getDate() + days);
			return date;
		}

		const getDates = (startDate, stopDate) => {
			var dateArray = new Array();
			var currentDate = startDate;
			while (currentDate <= stopDate) {
				dateArray.push(new Date(currentDate));
				currentDate = currentDate.addDays(1);
			}
			return dateArray;
		}

		const todayDate = new Date();
		setDateList(getDates(todayDate, (todayDate).addDays(30)));
		console.log(dateList);

		// const responseArray = [];
		axios({
			url: "https://api.nasa.gov/neo/rest/v1/feed?",
			method: "GET",
			dataResponse: "json",
			params: {
				api_key: "0vfR0cK5U5L4Afnbrb20dF1VAFDSQIm1KDZnbJ5g",
				start_date: `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDay()}`
			}
		}).then((response) => {

			const hazardousObjects = response.data.near_earth_objects;
			let tempArray = []
			for (const object in hazardousObjects) {
				// object.filter( (dateObject) => {
				//console.log(hazardousObjects[object])
				//     })
				hazardousObjects[object].forEach((d) => {
					// console.log(d.estimated_diameter.kilometers.estimated_diameter_max)
					// console.log(d);
					if (d.estimated_diameter.kilometers.estimated_diameter_max >= 1.5) {
						// setTravelDays([...travelDays, object])
						tempArray.push(object);
					}
				})
			}
			tempArray = [... new Set(tempArray)];

			// console.log(tempArray);
			// console.log(response.data.collection.items[0].links[0].href);
			setDateResp(tempArray)
		});

	}, []);


	useEffect(() => {
		console.log(dateResp)
		//console.log(dateResp["2022-12-06"][0].absolute_magnitude_h)

	}, [dateResp]);

	return (
		<div>
			<ul className='goBackButton'>
				<Link to={`/`}>
					<li><button>Go back</button></li>
				</Link>
			</ul>
			<form>
				<label htmlFor="name" className="sr-only">Name</label>
				<input type="text" name="name" id="name" placeholder="Name" />

				<label htmlFor="email" className="sr-only">Email Address</label>
				<input type="email" name="email" id="email" placeholder="Email Address" />

				<label htmlFor="dates">Choose a date</label>
				<select
					id="dates"
					name="dates"
					// onChange={ }
					// value={ }
					defaultValue={""}
					required={true}
				>
					{console.log(dateResp)}
					{dateResp.map((date) => {
						return (
							<option value={date}>{date}</option>

						)
					})}
					{/* <option value="">Pick one:</option> */}

				</select>
			</form>




		</div>
	)
}



export default Dates