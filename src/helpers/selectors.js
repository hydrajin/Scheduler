/* We don't always have control over the format of data returned by an API. 
Sometimes we must transform the data before we use it with components. 
When we make a request to /api/appointments we retrieve an object with all of the appointments,
but to show the schedule for a particular day, we need to provide it an 
array of appointments for that day. */

/* Selectors
We are going to create a function called getAppointmentsForDay that will receive two 
arguments state and day. The function will return an array of appointments for the given day.

There is often a need to compute new data from existing state in an application. 
To do this we can use a selector, a function that accepts state as an argument and returns 
data that is derived from that state.

EXAMPLE
function selectUserByName(state, name) {
  const filteredNames = state.users.filter(user => user.name === name);
  return filteredNames;
} */

export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(dayArr => dayArr.name === day); 
  // console.log(filteredDays); // -> [ { id: 1, name: 'Monday', appointments: [ 1, 2, 3 ] } ]
  // console.log(filteredDays[0]); // -> { id: 1, name: 'Monday', appointments: [ 1, 2, 3 ] }
  // console.log(filteredDays[0].appointments) // -> [ 1, 2, 3 ] <- (appointments)

  if (filteredDays.length === 0) {
    // ✓ getAppointmentsForDay returns an array 
    // ✓ getAppointmentsForDay returns an empty array when the days data is empty
    // ✓ getAppointmentsForDay returns an empty array when the day is not found
    return [];
  }
  //console.log(filteredDays[0].appointments)
  const appointmentsArr = filteredDays[0].appointments;
  const numOfAppointments = []
  appointmentsArr.forEach(element => numOfAppointments.push(state.appointments[element]))
  console.log(numOfAppointments);
  return numOfAppointments;
}
/* [
      { id: 1, time: '12pm', interview: null },
      { id: 2, time: '1pm', interview: null },
      {
        id: 3,
        time: '2pm',
        interview: { student: 'Archie Cohen', interviewer: 2 }
      }
    ]
*/