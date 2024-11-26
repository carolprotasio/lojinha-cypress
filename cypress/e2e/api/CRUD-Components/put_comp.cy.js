/// <reference types="cypress" />

describe('/PUT - component functionality ', function () {

    beforeEach(function () {
        cy.fixture('api_data').then(function (data) {
            this.data = data
        })
    })
    it('CT-001 should be able to change data of a component', function () {
        const user = this.data.api_user
        const product = this.data.api_product
        const component = this.data.api_component
        const changedComponent = this.data.api_changed_component

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
                        const productId = response.body.data.produtoId

                        cy.apiPostComponent(token, productId, component.name, component.qtd)
                            .then(response => {
                                expect(response.status).to.eql(201)

                                const componentId = response.body.data.componenteId

                                cy.apiPutComponent(token, productId, componentId, changedComponent.name, changedComponent.qtd)
                                    .then(response => {
                                        expect(response.status).to.eql(200)
                                        expect(response.body.message).to.eql("Componente de produto alterado com sucesso")

                                        cy.apiDeleteData(token)
                                    })
                            })
                    })
            })

    });
});
