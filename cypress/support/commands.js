// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getDataID', (dataTestSelector) => {
    return cy.get(`[data-automation-id="${dataTestSelector}"]`)
})

Cypress.Commands.add('fill', () => {
    cy.fixture('form.json').its('data_test').then((data) => {
        cy.getDataID('textInput').eq(0).type(data.name)
        cy.getDataID('textInput').eq(1).type(data.phone)
        cy.get('input[value="Affordable"]').click()
        cy.get('[aria-label="5 Star"]').click()
        cy.getDataID('dateContainer').click()
        cy.get('[aria-label="18, February, 2024"]').click()
      })
})

Cypress.Commands.add('Q3toQ5', () => {
    cy.get('input[value="Affordable"]').click()
    cy.get('[aria-label="5 Star"]').click()
    cy.getDataID('dateContainer').click()
    cy.get('[aria-label="18, February, 2024"]').click()
    cy.getDataID('submitButton').click()
})

Cypress.Commands.add('clearform', () => {
    cy.get('button[aria-label="More options"]').click()
    cy.get('[id="ImmersiveReaderMenu"]').within(() => {
      cy.get('[aria-posinset="1"]').should('have.text', 'Enable Immersive Reader')
      cy.get('[aria-posinset="2"]').should('have.text', 'Clear Form').click()
    })
    cy.contains('Clearing form will permanently erase any information you have entered. Are you sure you want to proceed?')
    cy.get('button[aria-label="Clear Form"]').should('have.text', "Clear Form").click()
    cy.getDataID('textInput').should('be.empty')
    cy.get('[type="radio"]').should('have.attr', 'aria-checked', 'false')
    cy.get('[class="-nJ-111"]').should('have.attr', 'aria-checked', 'false')
})