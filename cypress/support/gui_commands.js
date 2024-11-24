
Cypress.Commands.add('userLogin', (user, password) => { 
    cy.visit('/')
    cy.get('#usuario').type(user, {force: true})
    cy.get('#senha').type(password, {force: true})

    cy.get('#btn-entrar').click()
})

Cypress.Commands.add('getToast', (text) => { 
    cy.get('.toast').should('contain.text', text )
})
Cypress.Commands.add('successLogin', (text) => { 
    cy.get('h3').should('have.text', "Lista de Produtos")
})
Cypress.Commands.add('emptyUser', (password) => { 
    cy.visit('/')    
    cy.get('#senha').type(password, {force: true})
    cy.get('#btn-entrar').click()
})
Cypress.Commands.add('addProductButton', () => { 
    cy.get('.waves-effect').click()
    cy.get('h4.row').should('have.text', "Adicionar produto")
})
Cypress.Commands.add('productInformation', (name, price, colour) => { 
    cy.get('#produtonome').type(name)
    cy.get('#produtovalor').type(price)
    cy.get('#produtocores').type(colour)

    cy.get('#btn-salvar').click()
})
