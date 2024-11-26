/// <reference types="cypress" />
import faker from 'faker'

describe('API - create new user functionality', function () {
    const name = faker.name.findName()
    const login = faker.internet.userName()
    const pass = faker.internet.password()
  
    beforeEach(function () {
      cy.fixture('api_data').then(function (data) {
        this.data = data
      })
    })
    it('CT-001 create new user', function () {
  
      cy.apiCreateUser(name, login, pass)
        .then(response => {
          expect(response.status).to.equal(201)
          expect(response.body.message).to.eq("Usuário adicionado com sucesso")
        })
  
    });
    it('CT-002 should not created a user if its alredy exist', function () {
  
      cy.apiCreateUser(name, login, pass)
        .then(response => {
          expect(response.status).to.equal(409)          
        })  
    })
    it('CT-003 create new user & login', function () {
      const name = faker.name.findName()
      const login = faker.internet.userName()
      const pass = faker.internet.password()
  
      cy.apiCreateUser(name, login, pass)
        .then(response => {
          cy.wait(100)
          expect(response.status).to.equal(201)
  
          Cypress.env('userLogin', login)
          Cypress.env('userPassword', pass)
  
          cy.apiLogin(login, pass).then(response => [
            expect(response.status).to.equal(200),
            expect(response.body.message).to.eq("Sucesso ao realizar o login")
          ])
        })
  
    })  
  
  
  })