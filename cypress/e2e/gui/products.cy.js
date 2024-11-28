/// <reference types="cypress" />

describe('CRUD - products functionality', function () {

  beforeEach(function () {
    cy.fixture('gui_data').then(function (data) {
      this.data = data
    })
  })

  it('CT-001 should create a new product', function () {
    const user = this.data.user
    const product = this.data.product1
    const text = "Produto adicionado com sucesso"

    cy.apiLogin(user.user, user.password)
      .then((response) => {
        const token = response.body.data.token
        cy.userLogin(user.user, user.password)
        cy.successLogin()
        cy.addProductButton()
        cy.postProduct(product.name, product.price, product.colour)
        cy.getToast(text)
        cy.apiDeleteData(token)
      })

  });
  it('CT-002 should edit a registered product', function () {
    const user = this.data.user
    const product = this.data.product1
    const text = "Produto adicionado com sucesso"

    cy.apiLogin(user.user, user.password)
      .then((response) => {
        const token = response.body.data.token
        cy.userLogin(user.user, user.password)
        cy.addProductButton()
        cy.postProduct(product.name, product.price, product.colour)
        cy.getToast(text)

        cy.get(':nth-child(4) > .grey').click()
        cy.get('.collection').should('contain.text', product.name)
        cy.apiDeleteData(token)
      })


  });
  it('CT-003 should create products and list them', function () {
    const user = this.data.user2
    const product = this.data.product1
    const product2 = this.data.product2
    const text = "Produto adicionado com sucesso"

    cy.apiLogin(user.user, user.password)
      .then((response) => {
        const token = response.body.data.token

        cy.userLogin(user.user, user.password)
        cy.addProductButton()
        cy.postProduct(product.name, product.price, product.colour)
        cy.bottonProductList()
        cy.addProductButton()
        cy.postProduct(product2.name, product2.price, product2.colour)
        cy.getToast(text)

        cy.get(':nth-child(4) > .grey').click()
        cy.get('.collection').should('contain.text', product.name)
        cy.apiDeleteData(token)
      })
  })
  it('CT-004 should create products and delete them', function () {
    const user = this.data.user2
    const product = this.data.product
    const product2 = this.data.product2
    const text = "Produto adicionado com sucesso"

    cy.apiLogin(user.user, user.password)
      .then((response) => {
        const token = response.body.data.token

        cy.userLogin(user.user, user.password)
        cy.addProductButton()
        cy.postProduct(product.name, product.price, product.colour)
        cy.bottonProductList()
        cy.addProductButton()
        cy.postProduct(product2.name, product2.price, product2.colour)
        cy.getToast(text)

        cy.get(':nth-child(4) > .grey').click()
        cy.get('.collection').should('contain.text', product.name)
        cy.apiDeleteData(token)
          .then(response => {
            expect(response.status).to.eql(204)

          })
      })
  })


});