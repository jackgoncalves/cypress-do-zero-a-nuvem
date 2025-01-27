Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'john',
    lastName: 'dohn',
    email: 'jojo@gmail.com',
    text: 'mais test'
}) => {
   
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text) 
    // cy.get('[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
})