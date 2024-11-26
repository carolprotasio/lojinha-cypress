/// <reference types="cypress" />

describe('/GET - product functionality ', function () {

    beforeEach(function () {
        cy.fixture('api_data').then(function (data) {
            this.data = data
        })
    })
    it('CT-001 should get all products from user', function () {
        const user = this.data.api_user
        const product = this.data.api_product
        const product2 = this.data.api_product2

        cy.apiLogin(user.user, user.password)
            .then(response => {
                expect(response.status).to.equal(200)

                const token = response.body.data.token
                cy.apiPostProduct(
                    token,
                    product.produtoNome,
                    product.produtoValor,
                    product.produtoCores)

                cy.apiPostProduct(
                    token,
                    product2.produtoNome,
                    product2.produtoValor,
                    product2.produtoCores)
                    .then(response => {
                        expect(response.status).to.eql(201)

                        cy.apiGetAllProducts(token)
                            .then(response => {
                                expect(response.status).to.eql(200)
                                expect(response.body.message).to.eql("Listagem de produtos realizada com sucesso")

                                cy.apiDeleteData(token)
                                    .then(response => {
                                        expect(response.status).to.eql(204)

                                    })
                            })
                    })
            })

    });
    it('CT-002 should get product by id', function () {
        const user = this.data.api_user
        const product = this.data.api_product
        const product3 = this.data.api_product3

        cy.apiLogin(user.user, user.password)
            .then(response => {
                expect(response.status).to.equal(200)

                const token = response.body.data.token
                cy.apiPostProduct(
                    token,
                    product.produtoNome,
                    product.produtoValor,
                    product.produtoCores)

                cy.apiPostProduct(
                    token,
                    product3.produtoNome,
                    product3.produtoValor,
                    product3.produtoCores)
                    .then(response => {
                        expect(response.status).to.eql(201)
                        const productId = response.body.data.produtoId

                        cy.apiGetProductsById(token, productId)
                            .then(response => {
                                expect(response.status).to.eql(200)
                                expect(response.body.message).to.eql("Detalhando dados do produto")

                                cy.apiDeleteData(token)
                            })
                    })
            })
    })
})
