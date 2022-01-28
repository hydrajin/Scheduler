describe("Navigation", () => {
// 1.
  it("should visit root", () => {
    cy.visit("/");
  });

// 2. Error: It is an error that explains that it did not match the expected background colour. 
  // The issue is that we did not select the correct element. When we use the cy.get("li").contains("Tuesday") query we select the h2 element that "Tuesday" is within. The query works fine with our click event, but not as well when we are checking CSS properties.
/*   it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.get("li")
    .contains("Tuesday")
    .should("have.css", "background-color", "rgb(242, 242, 242)");
  }); */

// 3. Change the query to cy.contains("li", "Tuesday") to target the list item element that contains "Tuesday".
/*   it("should navigate to Tuesday, click and select .css with correct background color", () => {
  cy.get("li").contains("Tuesday").click()
  cy.contains("li", "Tuesday").should("have.css", "background-color", "rgb(242, 242, 242)")
  }); */

// 4. Refactor the test
/* it("should navigate to Tuesday, click and select .css with correct background color", () => {
  cy.visit("/");
  cy.contains("li", "Tuesday")
    .click()
    .should("have.css", "background-color", "rgb(242, 242, 242)");
  });
 */

// 5. Refact for day-list__item--selected class 
  it('should navigate to Tuesday', () => {
    cy.visit('/');

    cy.contains('[data-testid=day]', 'Tuesday')
      .click()
      .should('have.class', 'day-list__item--selected');
  });
});
