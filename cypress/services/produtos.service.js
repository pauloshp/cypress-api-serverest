import Factory from '../factories/factory'

const URL_PRODUTOS = '/produtos'

export default class ProdutosServerest {

    static buscarProdutos() {
        return cy.request({
            method: 'GET',
            url: URL_PRODUTOS,
            failOnStatusCode: false
        })
    }

    static buscarProdutoPorId(id) {
        return cy.request({
            method: 'GET',
            url: URL_PRODUTOS + `/${id}`,
            failOnStatusCode: false
        })
    }

    static cadastrarProduto(produto = Factory.gerarProduto()) {
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearer')
            },
            body: produto
        })
    }

    static atualizarProduto(id) {
        let produto = Factory.gerarProduto()
        return cy.request({
            method: 'PUT',
            url: URL_PRODUTOS + `/${id}`,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearer')
            },
            body: produto
        })
    }

    static excluirProduto(id) {
        return cy.request({
            method: 'DELETE',
            url: URL_PRODUTOS + `/${id}`,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

}
