
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
Cypress.Commands.add('bottonProductList', () => { 
    cy.get(':nth-child(4) > .grey').click()
    
})
Cypress.Commands.add('deleteComponent', () => { 
    cy.get('.secondary-content > .material-icons').click()
})
Cypress.Commands.add('postProduct', (name, price, colour) => { 
    cy.get('#produtonome').type(name)
    cy.get('#produtovalor').type(price)
    cy.get('#produtocores').type(colour)

    cy.get('#btn-salvar').click()
})
Cypress.Commands.add('postComponent', (name, qtd) => { 
    cy.get(':nth-child(2) > .waves-effect').click()
    cy.get('#componentenomeadicionar').type(name)
    cy.get('#componentequantidadeadicionar').type(qtd)
    cy.get('#novocomponente > div > div:nth-child(5) > a:nth-child(1)').click()
})
Cypress.Commands.add('cancelComponent', (name, qtd) => { 
    cy.get(':nth-child(2) > .waves-effect').click()
    cy.get('#componentenomeadicionar').type(name)
    cy.get('#componentequantidadeadicionar').type(qtd)
    cy.get('div:nth-child(5) > a.modal-close.waves-effect.waves-light.btn.grey').click()
})
Cypress.Commands.add('confirmComponentCancel', () => { 
    cy.get('#listaComponentes').find('li').should('have.length', 0)
   
})
Cypress.Commands.add('logout', () => { 
    cy.get('#nav-mobile > :nth-child(2) > a').click()   
   
})


