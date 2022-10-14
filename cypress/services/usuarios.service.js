import Factory from '../factories/factory'

const URL_USUARIOS = '/usuarios'

export default class UsariosServerest {

    static buscarUsuarios() {
        return cy.request({
            method: 'GET',
            url: URL_USUARIOS,
            failOnStatusCode: false
        })
    }

    static buscarUsuarioPorId(id) {
        return cy.request({
            method: 'GET',
            url: URL_USUARIOS + `/${id}`,
            failOnStatusCode: false
        })
    }

    static cadastrarUsuarioAdministrador() {
        let usuario = Factory.gerarUsuarioAdministrador()
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            failOnStatusCode: false,
            body: usuario
        })
    }

    static cadastrarUsuario(usuario = Factory.gerarUsuario()) {
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            failOnStatusCode: false,
            body: usuario
        })
    }

    static cadastrarUsuarioEmailInvalido() {
        let usuario = Factory.gerarUsuario()
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            failOnStatusCode: false,
            body: usuario
        })
    }

    static atualizarUsuario(id) {
        let usuario = Factory.gerarUsuario()
        return cy.request({
            method: 'PUT',
            url: URL_USUARIOS + `/${id}`,
            failOnStatusCode: false,
            body: usuario
        })
    }

    static excluirUsuario(id) {
        return cy.request({
            method: 'DELETE',
            url: URL_USUARIOS + `/${id}`,
            failOnStatusCode: false
        })
    }

}
