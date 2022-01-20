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

  console.log(day);
  // changes once we click on a certain day

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
            value={day}
            // update the names of props (from day to value) to mimic standard HTML select list
            onChange={setDay}
            //  update the names of props (setDay to onChange) to mimic standard HTML select list
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

