/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";


/*
  We import the component that we are testing
*/
import Appointment from "components/Appointment";


/*
  A test that renders a React Component
*/

/* it("renders without crashing", () => {
  render(<Appointment />);
});
 */

// describe() vs it() vs test()

//! describe: If we want to group a series of tests, we can wrap them all in a describe function.
//! We will want to group related tests to organize our test suite as it grows.


describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
}); 

