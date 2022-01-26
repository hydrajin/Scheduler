import { useState} from "react";

export default function useVisualMode(initial) {
  let[mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // take in a new mode and update the mode state with the new value
  const transition = (newMode, replace = false) => {
    // console.log(replace);
    if (replace) { 
      // if true (last test)
      setMode(newMode);
    } else {
      setMode(newMode);
      // console.log([...history, newMode]) // -> [ 'FIRST', 'SECOND', 'THIRD' ]
      setHistory([...history, newMode]);
    }
  };

  const back = () => {
    // console.log(history.length); 
    if (history.length <= 1) {
      setMode(initial);
    } else {
      const newHistory = [...history.slice(0, -1)];
      // console.log(newHistory);
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  };
  return { mode, transition, back };
}
