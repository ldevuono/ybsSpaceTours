import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Dates(props) {
	const [dateResp, setDateResp] = useState([])
	const [dateList, setDateList] = useState([]);
	const [dates, setDates] = useState(false);
	const { tripID } = useParams();

	// const [userName, setUserName] = useState("");
	// const [userEmail, setEmail] = useState("");
	const totalDates = 6;


	useEffect(() => {
		// eslint-disable-next-line
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



		axios({
			url: "https://api.nasa.gov/neo/rest/v1/feed?",
			method: "GET",
			dataResponse: "json",
			params: {
				api_key: "0vfR0cK5U5L4Afnbrb20dF1VAFDSQIm1KDZnbJ5g",
				// api_key: "JDRuKCmCHys7mfyiaqaUomCeZqsgjnv8iQyTjl8l",
				start_date: `${todayDate.getFullYear()}-${("0" + (todayDate.getMonth() + 1)).slice(-2)}-${("0" + todayDate.getDate()).slice(-2)}`

			}
		}).then((response) => {
			const hazardousObjects = response.data.near_earth_objects;
			let tempArray = []
			for (const object in hazardousObjects) {

				hazardousObjects[object].forEach((d) => {
					if (d.estimated_diameter.kilometers.estimated_diameter_max >= .5) {
						tempArray.push(object);
					}
				})
			}
			tempArray = [...new Set(tempArray)];
			tempArray.sort(function (a, b) {
				a = a.split('-').reverse().join('');
				b = b.split('-').reverse().join('');
				return a > b ? 1 : a < b ? -1 : 0;
			});


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
				// })
			})
			allDatesObject = [...new Set(allDatesObject)];
			setDateResp(allDatesObject);
		});
		// eslint-disable-next-line
	}, [dates]);




	const submitHandler = (e) => {
		e.preventDefault();
		alert(`Thank you for your message, ${e.target.name.value}. We will be in touch shortly about your trip to ${tripID}.`)
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