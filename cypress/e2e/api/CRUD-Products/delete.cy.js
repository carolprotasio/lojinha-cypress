/// <reference types="cypress" />

describe('/DELETE - product functionality ', function () {

    beforeEach(function () {
        cy.fixture('api_data').then(function (data) {
            this.data = data
        })
    })
    it('CT-001 should delete all products from the user', function () {
        const user = this.data.api_user

        cy.apiLogin(user.user, user.password)
            .then(response => {
                expect(response.status).to.equal(200)

                const token = response.body.data.token

                cy.apiDeleteData(token)
                    .then(response => {
                        expect(response.status).to.eql(204)

                    })
            })

    });
});
