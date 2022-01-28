describe("Appointments", () => {
  
// 1. Within the test function for the first test, visit the root of the web server, and confirm that the DOM contains the text "Monday".
  it("should book an interview", () => {
    cy.visit("/");
    cy.contains("Monday");

// 2. Add the command to the test that clicks the add button for the empty appointment. Remember that cy.get() allows arguments that match the jQuery API.
    cy.get("[alt=Add]")
    .first()
    .click();  
 
// 3. Add the command to type the name "Lydia Miller-Jones" into the student input field.
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

// 4. Add the command to select the interviewer with the name "Sylvia Palmer".
    cy.get("[alt='Sylvia Palmer']").click(); 

// 5. Add the command to click the save button.
    cy.contains("Save").click();
    
  });
});