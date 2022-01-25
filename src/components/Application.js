import React, { useState, useEffect } from "react";
// import useState Hook
import "components/Application.scss";
import DayList from "components/DayList"
//import the DayList component into Application.js
import Appointment from "components/Appointment";
import axios from "axios";
// import getAppointmentsForDays helpers function
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";


export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  // let dailyAppointments = [];

/* const setDays = (days) => {
   setState(prev => ({ ...prev, days }));
  } */
  // remove function 
  
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then((all) => {
      
      console.log("DAY:", all[0]); // first
      console.log("APPOINTMENTS:", all[1]); // second
      console.log("INTERVIEWERS:", all[2]); // third
 

    const [days, appointments, interviewers] = all;
    setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }))
    // console.log(first, second, third);
    // console.log(all);
    })
  },[]);

  const bookInterview = (id, interview) => {
    console.log("id", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // Within bookInterview, make a PUT request to the /api/appointments/:id endpoint
    // to update the database with the interview data.
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(response => console.log(response),  
      setState({...state, appointments}))
      .catch((err) => console.log(err));
    }
    // If you want to delete the record in the db ->  http://localhost:8001/api/debug/reset (In browser) or do a curl command

  // console.log(day);
  // changes once we click on a certain day
  // console.log("state.day", state.day);
  console.log("state.interviewers", state.interviewers);

  const dailyAppointments = getAppointmentsForDay(state, state.day) 

   const schedule = dailyAppointments.map(
     (appointment) => {
       const interview = getInterview(state, appointment.interview) 
       const interviewers = getInterviewersForDay(state, state.day)
      return (
          <Appointment 
            key={appointment.id}
            {...appointment}
            interviewers={interviewers}
            bookInterview={bookInterview}
            time={appointment.time}
            interview={interview}
          />
        );
     });

  // console.log(dailyAppointments);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/Logo.png"
          alt="Interview onCancel={() => back(EMPTY)}cheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            // update the names of props (from day to value) to mimic standard HTML select list
            onChange={setDay}
            // update the names of props (setDay to onChange) to mimic standard HTML select list
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/Lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        {/* mapped schedule array from dailyAppointments outside of return */}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

