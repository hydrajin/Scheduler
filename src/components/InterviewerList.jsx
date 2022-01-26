import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
/* interviewers:array - an array of objects as seen above
setInterviewer:function - a function that accepts an interviewer id. This function will simply be passed down to the InterviewerListItem
interviewer:number - a number that represents the id of the currently selected interviewer */

export default function InterviewerList(props) {
  let { interviewers } = props;
  const parsedInterviewers = interviewers.map((interviewer) => (
    // const interviewersProps = [];
    // const interviewers = interviewersProps.map((interviewer) => (
    // No need for return after .map()
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      // change interviewer to value
      setInterviewer={() => props.onChange(interviewer.id)}
      // change setInterviewer to onChange
    />
  ));
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}
