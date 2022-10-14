const URL_CARRINHO = '/carrinhos'

export default class CarrinhosServerest {

    static buscarCarrinhos() {
        return cy.request({
            method: 'GET',
            url: URL_CARRINHO,
            failOnStatusCode: false,
        })
    }

    static buscarCarrinhoPorId(id) {
        return cy.request({
            method: 'GET',
            url: URL_CARRINHO + `/${id}`,
            failOnStatusCode: false
        })

    }

    static cadastrarCarrinho(id, quantidade) {
        return cy.request({
            method: 'POST',
            url: URL_CARRINHO,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearer')
            },
            body: {
                "produtos": [
                    {
                        "idProduto": id,
                        "quantidade": quantidade
                    }
                ]
            }
        })
    }

    static excluirCarrinhoConcluirCompra() {
        return cy.request({
            method: 'DELETE',
            url: URL_CARRINHO + '/concluir-compra',
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    static excluirCarrinhoCancelarCompra() {
        return cy.request({
            method: 'DELETE',
            url: URL_CARRINHO + '/cancelar-compra',
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

}
