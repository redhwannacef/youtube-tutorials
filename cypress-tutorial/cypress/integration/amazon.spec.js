/// <reference types="cypress" />

it("adds item to basket", () => {
  cy.visit("https://www.amazon.co.uk/");

  cy.get("input[name=field-keywords]").type("Super Mario 3D World");
  cy.get("#nav-search-submit-button").click();

  cy.contains("Super Mario 3D World + Bowser Fury").click();

  cy.get("#add-to-cart-button").click();

  cy.get("#hlb-subcart")
    .should("contain.text", "1 item")
    .and("contain.text", "£44.98");
});
