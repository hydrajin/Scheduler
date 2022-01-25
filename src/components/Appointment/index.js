import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

/* const appointments = [
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
]; */

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

    function save(name, interviewer) {
      console.log(name, interviewer);
      const interview = {
        student: name,
        interviewer
      };
      props.bookInterview(props.id, interview)
      transition(SHOW)
    }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* {props.interview ? <Show {...props.interview} /> : <Empty/>} */}
      {/* ...spread should show student {props.interview.student} & interviewer {props.interview.interviewer} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        />
      )}
      {/* {mode === CREATE && <Form onCancel={() => back(EMPTY)} />} */}
      {mode === CREATE && <Form onCancel={() => back(EMPTY)} onSave={save}  interviewers={props.interviewers} />}
    </article>
  );
}