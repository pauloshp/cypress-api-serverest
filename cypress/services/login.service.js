const URL_LOGIN = '/login'

export default class LoginServerest {

    static login(usuario) {
        return cy.request({
            method: 'POST',
            url: URL_LOGIN,
            failOnStatusCode: false,
            body: usuario
        })
    }

    static salvarBearer(resposta) {
        Cypress.env('bearer', resposta.body.authorization.slice(7))
    }

}
