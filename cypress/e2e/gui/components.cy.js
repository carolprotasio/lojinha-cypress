/// <reference types="cypress" />

describe('components functionality', function () {

  beforeEach(function () {
    cy.fixture('gui_data').then(function (data) {
      this.data = data
    })
  })
  it('CT-001 should create a new component', function () {
    const user = this.data.user2
    const product = this.data.product
    const component = this.data.component
    const text = "Componente de produto adicionado com sucesso"

    cy.apiLogin(user.user, user.password)
      .then(response => {
        const token = response.body.data.token
        cy.userLogin(user.user, user.password)
        cy.addProductButton()
        cy.postProduct(product.name, product.price, product.colour)
        cy.postComponent(component.name, component.qtd)
        cy.getToast(text)
        cy.apiDeleteData(token)
      })

  })
  it('CT-002 should create and delete component', function () {
    const user = this.data.user2
    const product = this.data.product
    const component = this.data.component
    const text = "Componente de produto removido com sucesso"

    cy.apiLogin(user.user, user.password)
      .then(response => {
        const token = response.body.data.token
        cy.userLogin(user.user, user.password)
        cy.addProductButton()
        cy.postProduct(product.name, product.price, product.colour)
        cy.postComponent(component.name, component.qtd)
        cy.deleteComponent()
        cy.wait(1000)
        cy.getToast(text)
        cy.apiDeleteData(token)
      })

  })
  it('CT-003 should not create component when qtd is less than 1 ', function () {
    const user = this.data.user2
    const product = this.data.product
    const component = this.data.component_less
    const text = "A quantidade mínima para o componente não deve ser inferior a 1"

    cy.apiLogin(user.user, user.password)
      .then(response => {
        const token = response.body.data.token
        cy.userLogin(user.user, user.password)
        cy.addProductButton()
        cy.postProduct(product.name, product.price, product.colour)
        cy.postComponent(component.name, component.qtd)
        cy.wait(1000)
        cy.getToast(text)
        cy.apiDeleteData(token)
      })

  })
  it('CT-004 should cancel operation of component creation', function () {
    const user = this.data.user2
    const product = this.data.product
    const component = this.data.component_less
    const text = "A quantidade mínima para o componente não deve ser inferior a 1"

    cy.apiLogin(user.user, user.password)
      .then(response => {
        const token = response.body.data.token
        cy.userLogin(user.user, user.password)
        cy.addProductButton()
        cy.postProduct(product.name, product.price, product.colour)
        cy.cancelComponent(component.name, component.qtd)
        cy.wait(1000)
        cy.confirmComponentCancel()        
       cy.apiDeleteData(token)
      })

  })
})