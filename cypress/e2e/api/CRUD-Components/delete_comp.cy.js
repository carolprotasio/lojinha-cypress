/// <reference types="cypress" />

describe('/DELETE - component functionality ', function () {

    beforeEach(function () {
        cy.fixture('api_data').then(function (data) {
            this.data = data
        })
    })
    it('CT-001 should delete one component', function () {
        const user = this.data.api_user
        const product = this.data.api_product
        const component = this.data.api_component

        cy.apiLogin(user.user, user.password)
            .then(response => {
                expect(response.status).to.equal(200)

                const token = response.body.data.token

                cy.apiPostProduct(
                    token,
                    product.produtoNome,
                    product.produtoValor,
                    product.produtoCores
                ).then(response => {
                    const productId = response.body.data.produtoId

                    cy.apiPostComponent(token, productId, component.name, component.qtd)
                    .then(response => {
                        expect(response.status).to.eql(201)

                        const componentId = response.body.data.componenteId

                        cy.apiDeleteOneComponent(token, productId ,componentId)
                        .then(response => {
                            expect(response.status).to.eql(204)
                        })
                    })

                })
                
               
                cy.apiDeleteData(token)
                    .then(response => {                        
                        expect(response.status).to.eql(204)
                       
                    })


            })

    });
});
