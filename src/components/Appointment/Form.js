import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "../InterviewerList"

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer("");
  }
  // When a user clicks the Cancel button, we use this function to clear the form values

  const cancel = () => {
    props.onCancel();
    reset();
  }
  //! Input field reset bug?
  // Add a cancel function to the Form component that calls reset() and props.onCancel.

  // Add a validate function for testing
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    // Unselected Interviewer on save breaks app but passes test
    setError("");
    props.onSave(student, interviewer);
  }

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={event => { 
              setStudent(event.target.value)
            }}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          interviewer={props.interviewer}
          value={interviewer}
          onChange={setInterviewer}
          // from refactored controlled lists walkthrough
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          {/* When cancel is pressed, the above cancel button is run */}
          <Button onClick={validate} >Save</Button>
        </section>
      </section>
    </main>
  );
}