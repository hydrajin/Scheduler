import { useState } from "react";
/* To pass the first test our useVisualMode Hook will need to:

take in an initial mode
set the mode state with the initial mode provided
return an object with a mode property */

export default function useVisualMode(initial) {
  //console.log(initial);
  const [mode, setMode] = useState(initial);
  //console.log(mode);
  const transition = (newMode) => {
    setMode(newMode)
  }

  return { mode, transition };
};

