/// <reference types="cypress" />

describe('/GET - component functionality ', function () {

    beforeEach(function () {
        cy.fixture('api_data').then(function (data) {
            this.data = data
        })
    })
    it('CT-001 should get all components of a product', function () {
        const user = this.data.api_user
        const product2 = this.data.api_product2
        const component = this.data.api_component

        cy.apiLogin(user.user, user.password)
            .then(response => {
                expect(response.status).to.equal(200)
                const token = response.body.data.token
                cy.apiPostProduct(
                    token,
                    product2.produtoNome,
                    product2.produtoValor,
                    product2.produtoCores
                )
                    .then(response => {
                        expect(response.status).to.eql(201)
                        const productId = response.body.data.produtoId

                        cy.apiPostComponent(token, productId, component.name, component.qtd)
                            .then(response => {
                                expect(response.status).to.eql(201)

                                cy.apiGetAllComponentOneProduct(token, productId)
                                    .then(response => {
                                        expect(response.status).to.eql(200)
                                        expect(response.body.message).to.eql("Listagem de componentes de produto realizada com sucesso")

                                        cy.apiDeleteData(token)
                                            .then(response => {
                                                expect(response.status).to.eql(204)

                                            })
                                    })
                            })
                    }) 
            })
    });
    it.only('CT-00 CT-002 should get one component by id from a product', function () {
        const user = this.data.api_user
        const product2 = this.data.api_product2
        const component = this.data.api_component

        cy.apiLogin(user.user, user.password)
            .then(response => {
                expect(response.status).to.equal(200)
                const token = response.body.data.token
                cy.apiPostProduct(
                    token,
                    product2.produtoNome,
                    product2.produtoValor,
                    product2.produtoCores
                )
                    .then(response => {
                        expect(response.status).to.eql(201)
                        const productId = response.body.data.produtoId

                        cy.apiPostComponent(token, productId, component.name, component.qtd)
                            .then(response => {
                                expect(response.status).to.eql(201)
                                const componentId = response.body.data.componenteId

                                cy.apiGetOneComponentProduct(token, productId, componentId)
                                    .then(response => {
                                        expect(response.status).to.eql(200)
                                        expect(response.body.message).to.eql("Detalhando dados do componente de produto")

                                       cy.apiDeleteData(token)
                                            .then(response => {
                                                expect(response.status).to.eql(204)
                                            })
                                      
                                    })
                            })
                    }) 
            })
    });
    
});
