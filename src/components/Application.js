import React, { useState, useEffect } from "react";
// import useState Hook
import "components/Application.scss";
import DayList from "components/DayList"
//import the DayList component into Application.js
import Appointment from "components/Appointment";
import axios from "axios";

// add mock data for appointments
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];

export default function Application(props) {
  const [day, setDay] = useState([]);
  // Set default state to []
  useEffect(() => {
    const daysData = `http://localhost:8001/api/days`;
    axios.get(daysData).then(response => {
      console.log(response);
  });
}, []);

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
            days={day}
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
        {appointments.map((appointment) => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

