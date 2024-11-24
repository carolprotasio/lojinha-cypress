/// <reference types="cypress" />

describe('CRUD - products crud functionality', function () {
    
    beforeEach(function() {
        cy.fixture('data').then(function (data) {
          this.data = data
        })
      })

    it('CT-001 should add a new product', function() {
        const user = this.data.user
        const product = this.data.product1
        const text = "Produto adicionado com sucesso"

        cy.userLogin(user.user, user.password)
        cy.successLogin()
        cy.addProductButton()
        cy.productInformation(product.name, product.price, product.colour)  
        cy.getToast(text)
    });
    it('CT-002 should edit a registered product', function() {
        const user = this.data.user
        const product = this.data.product1
        const text = "Produto adicionado com sucesso"

        cy.userLogin(user.user, user.password)        
        cy.addProductButton()
        cy.productInformation(product.name, product.price, product.colour)  
        cy.getToast(text)

        cy.get(':nth-child(4) > .grey').click()

        cy.get('.collection').should('contain.text', product.name)


    });


});