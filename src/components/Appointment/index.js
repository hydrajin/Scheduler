import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status"
import Confirm from "./Confirm";
import Error from "./Error";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );
    //! SAVE----------
   function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      // In the Appointment component update the save action to show the SAVING indicator before calling props.bookInterview.
      transition(SAVING);
      props
        .bookInterview(props.id, interview)
        // only working with .then() returning a promise
        // pesimistic updates, we show the user an indicator for progress
        .then(() => transition(SHOW))
        .catch(error => transition(ERROR_SAVE, true))
    };
    //! DESTROY----------
    function cancelInterview() {
      transition(DELETING, true);
      props
        .cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch(error => transition(ERROR_DELETE, true))
    };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === ERROR_SAVE && <Error message="Could not cancel appointment." onClose={back}/>}
      {mode === DELETING && <Status message="Deleting"/>} 
      {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={back}/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
        onCancel={back} 
        onSave={save}
        interviewers={props.interviewers}
        />
        )}
      {mode === EDIT && (
        <Form
        onCancel={back} 
        onSave={save}
        student={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        />
        )}
     {mode === CONFIRM && (
       <Confirm 
         message="Are you sure you would like to delete?" 
         onConfirm={cancelInterview}
         onCancel={back}
       />
     )}
    </article>
  );
}