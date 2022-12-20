import './App.scss';

const WelcomeMessage = () => {
  return (
    <>
      {/* Welcome Message */}
      <div className="wrapper">
        <h1>Welcome to a whole new world</h1>
        <div className="welcomeMessage">
          <p>Introducing the ultimate luxury experience: YBS Space Cruises! Our company specializes in providing once-in-a-lifetime trips to the final frontier for the world's elite. Imagine soaring above the earth, taking in the breathtaking views of the planet from above and experiencing the thrill of weightlessness. And now, you can even preview your space cruise experience from the comfort of your own home with our virtual tours.</p>
          <p>Our team of experts will ensure that every aspect of your journey is taken care of, from launch to landing. So why not make your dreams of space travel a reality and join us on a space cruise!</p>
        </div>
        <div className="instructions">
          <p>We are currently limiting virtual tours to 3 per day. Once you've clicked "Start Virtual Tour", that will count as one tour, so choose wisely!</p>
        </div>
        <div className="extraInstructions">
          <p>If you have found a destination that you're satisfied with and would like to tour in person, please go to Reserve a Date. We have ensured that all the available dates are free of major space weather events, and will be safe and enjoyable.</p>
        </div>
      </div>

    </>
  )
}

export default WelcomeMessage;