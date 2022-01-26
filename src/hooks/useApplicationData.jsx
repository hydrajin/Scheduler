import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  //! UPDATE SPOTS  -------------------------------------------------------

  const updateSpots = function (state, appointments, id) {
    // return days array
    return [];
  };

  //! AXIOS/AJAX REQUEST  -------------------------------------------------------
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  //! BOOK INTERVIEW  -------------------------------------------------------
  const bookInterview = async (id, interview) => {
    console.log("id", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // Within bookInterview, make a PUT request to the /api/appointments/:id endpoint
    // to update the database with the interview data.
    const response = await axios.put(
      `http://localhost:8001/api/appointments/${id}`,
      { interview }
    );
    console.log("bookInterview", response);
    // setState({...state, appointments})
    setState((prev) => ({ ...prev, appointments }));
  };
  // If you want to delete the record in the db ->  http://localhost:8001/api/debug/reset (In browser) or do a curl command
  //! CANCEL INTERVIEW -------------------------------------------------------
  /* If we break this down into steps similar to our previous activity, 
      we should start by creating the main cancelInterview function in Application.js, 
      that will use the appointment id to find the right appointment slot and set it's interview data to null */
  const cancelInterview = async (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
      // After we delete an Interview, we will need to have its value set to null (TypeError if not set)
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // Within bookInterview, make a PUT request to the /api/appointments/:id endpoint
    // to update the database with the interview data.
    const response = await axios.delete(
      `http://localhost:8001/api/appointments/${id}`
    );
    console.log("cancelInterview", response);
    // setState({...state, appointments}))
    setState((prev) => ({ ...prev, appointments }));
  };
  return { state, setDay, bookInterview, cancelInterview };
}
