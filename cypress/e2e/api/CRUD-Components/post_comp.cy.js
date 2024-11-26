/// <reference types="cypress" />
import faker from 'faker'

describe('/POST - component functionality ', function () {

    beforeEach(function () {
        cy.fixture('api_data').then(function (data) {
            this.data = data
        })
    })
    it('CT-001 should create new component', function () {
        const user = this.data.api_user
        const product = this.data.api_product3
        const component = this.data.api_component

        cy.apiLogin(user.user, user.password)
            .then(response => {
                expect(response.status).to.equal(200)

                const token = response.body.data.token
                cy.log(token)

                cy.apiPostProduct(
                    token,
                    product.produtoNome,
                    product.produtoValor,
                    product.produtoCores)
                    .then(response => {
                        expect(response.status).to.eql(201)
                        expect(response.body.message).to.eql("Produto adicionado com sucesso")

                        const productId = response.body.data.produtoId

                        cy.apiPostComponent(token, productId, component.name, component.qtd)
                            .then(response => {
                                expect(response.status).to.eql(201)
                                expect(response.body.message).to.eql("Componente de produto adicionado com sucesso")

                                cy.apiDeleteData(token)
                            })
                    })
            })

    });
});
