import { useState } from "react"

const TripCounter = (props) => {

  const [tripsLeft, setTripsLeft] = useState(3)

  return (
    <p>Tours Left <span>{tripsLeft}</span></p>
  )
}

export default TripCounter;