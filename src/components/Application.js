import React, { useState } from "react";
// import useState Hook
import "components/Application.scss";
import DayList from "components/DayList"
//import the DayList component into Application.js

// add mock data from stories/index.js to Application.js
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  // Set default state to "Monday"
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/Logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            // The <DayList> component should receive the value represented by the state
            setDay={setDay}
            // The <DayList> component should also receive the function that can update the state
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/Lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}

