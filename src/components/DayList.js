import React from "react";
import DayListItem from "./DayListItem";



export default function DayList(props) {
  const { days } = props;
  const parsedDays = days.map((day) =>
  // Each object in the days array contains all the information to populate one <DayListItem> component.
  // So, we can iterate over the days array and use its data to create a new array of <DayListItem> components which can be rendered in the <ul> of our <DayList>.
  // To achieve this, it is recommended to use the .map method. 
    <DayListItem
    key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === props.value}
    setDay={props.onChange}
    // update the names of props (props.day to props.value & props.setDay to props.onChange)
    />
  );
  return (
    <ul>
      {parsedDays}
    </ul>
  );
}