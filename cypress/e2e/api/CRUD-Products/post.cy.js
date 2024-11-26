/// <reference types="cypress" />

describe('/POST - create new product ', function () {

    beforeEach(function () {
        cy.fixture('api_data').then(function (data) {
            this.data = data
        })
    })
    it('CT-001 should create new product', function () {
        const user = this.data.api_user
        const product = this.data.api_product

        cy.apiLogin(user.user, user.password)
            .then(response => {
                expect(response.status).to.equal(200)

                const token = response.body.data.token               

                cy.apiPostProduct(
                    token,
                    product.produtoNome,
                    product.produtoValor,
                    product.produtoCores)
                    .then(response => {                        
                        expect(response.status).to.eql(201)
                        expect(response.body.message).to.eql("Produto adicionado com sucesso")

                        cy.apiDeleteData(token).then(response => {
                            expect(response.status).to.eql(204)
                        })
                    })
            })
    })
});
