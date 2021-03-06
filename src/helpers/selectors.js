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

  if (filteredDays.length === 0) {
    // ✓ getAppointmentsForDay returns an array 
    // ✓ getAppointmentsForDay returns an empty array when the days data is empty
    // ✓ getAppointmentsForDay returns an empty array when the day is not found
    return [];
  }

  const appointmentsArr = filteredDays[0].appointments;
  const numOfAppointments = []
  appointmentsArr.forEach(element => numOfAppointments.push(state.appointments[element]))

  return numOfAppointments;
}

//! The function should return a new object containing the interview data when we pass it an object 
// that contains the interviewer. Otherwise, the function should return null. The object it returns should look like this:

// getInterview selector function

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }
    return { student: interview.student, interviewer: state.interviewers[interview.interviewer] }
}

/*  In your selectors.  Two pointers:
1, use find not filter to find the dayObj
2. getInterviewersForDay is EXACTLY like  getAppointmentsforDay  with like 1 word changed.   
Seriously, its the like same code.
If yours looks different, you should probably go back and edit it. */

export function getInterviewersForDay(state, day) {

  if (state.days.length === 0) {
    return [];
  }
  
  const dayObj = state.days.find(weekday  => weekday.name === day);

  if (!dayObj) {
    return [];
  }
  
  const appObj = dayObj.interviewers
  const mappedDays = appObj.map((id) => state.interviewers[id])

  return mappedDays;
}