/// <reference types="cypress" />

describe('/PUT - PUT functionality ', function () {

    beforeEach(function () {
        cy.fixture('api_data').then(function (data) {
            this.data = data
        })
    })
    it('CT-001 should be able to change data of a product', function () {
        const user = this.data.api_user
        const product = this.data.api_product
        const changedProduct = this.data.api_changed_product

        cy.apiLogin(user.user, user.password)
            .then(response => {
                expect(response.status).to.equal(200)

                const token = response.body.data.token
                cy.log(token)

                cy.apiPostProduct(
                    token,
                    product.produtoNome,
                    product.produtoValor,
                    product.produtoCores
                )
                    .then(response => {
                        expect(response.status).to.eql(201)
                        const productId = response.body.data.produtoId

                        cy.apiPutProduct(
                            token,
                            productId,
                            changedProduct.produtoNome,
                            changedProduct.produtoValor,
                            changedProduct.produtoCores,)
                    })
                    .then(response => {
                        expect(response.status).to.eql(200)
                        expect(response.body.message).to.eql("Produto alterado com sucesso")
                    })
                cy.apiDeleteData(token)

            })

    });
});
