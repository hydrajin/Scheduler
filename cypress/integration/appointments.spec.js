describe("Appointments", () => {
  beforeEach(() => {
// Add the Cypress function to the beginning of the test function and rerun the tests. -> cy.request("GET", "http://localhost:8001/api/debug/reset");
    cy.request("GET", "/api/debug/reset");

// 1. Within the test function for the first test, visit the root of the web server, and confirm that the DOM contains the text "Monday".
    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {
  
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

// 6. Add the commands that verify that we show the student and interviewer names within and element that has the ".appointment__card--show" class.
    cy.contains(".appointment__card--show", "Lydia Miller-Jones"); 
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
    .first().click({ force: true });

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});