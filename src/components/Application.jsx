import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import useApplicationData from "hooks/useApplicationData";

import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interviewers={interviewers}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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
