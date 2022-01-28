import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

/* Four tasks:
1. Replace hard-coded values with props
2. Add an event handler to the li
3. Conditionally add classes
4. Conditionally render the interviewer's name */

export default function InterviewerListItem(props) {
  const { name, avatar, selected } = props;
  // destructure elements
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });
  // conditionally add classes when selected
  return (
    <li onClick={props.setInterviewer} className={interviewerClass}>
      {/* add an event handler to li */}
      <img 
        className="interviewers__item-image"
        src={avatar} 
        alt={name} 
      />
      {selected && name}
      {/* when interviewer is selected, show the name */}
    </li>
  );
}
