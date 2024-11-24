/// <reference types="cypress" />

describe('Login Functionality', () => {
  
  beforeEach(function() {
    cy.fixture('data').then(function (data) {
      this.data = data
    })
  })
  it('CT-001 should login with a register user', function () {
    const user = this.data.user  
    cy.userLogin(user.user, user.password)
    cy.successLogin()

  })
  it('CT-002 should not login with a wrong email', function () {
    const user = this.data.notUser  
    const text = "Falha ao fazer o login"

    cy.userLogin(user.user, user.password)
    cy.getToast(text)
        

  })
  it('CT-003 should not login with a wrong password', function () {
    const user = this.data.notPass  
    const text = "Falha ao fazer o login"

    cy.userLogin(user.user, user.password)
    cy.getToast(text)  

  })
  it('CT-004 should not login with a empty fields', function () {      
    const text = "Falha ao fazer o login"

    cy.visit("/")
    cy.get('#btn-entrar').click()
    cy.wait(1000)
    cy.getToast(text)  

  })
  it('CT-005 should not login with a empty user name field', function () {     
    const user = this.data.emptyUser
    const text = "Falha ao fazer o login"
    cy.emptyUser(user.password)   
    cy.getToast(text)

  })
  it('CT-006 should not login with a empty password field', function () {     
    const user = this.data.emptyPass
    const text = "Falha ao fazer o login"
    cy.emptyUser(user.user)   
    cy.getToast(text) 

  })



})