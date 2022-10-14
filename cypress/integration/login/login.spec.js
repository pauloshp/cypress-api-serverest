/// <reference types="cypress" />

import LoginServerest from '../../services/login.service'
import UsuariosServerest from '../../services/usuarios.service'
import ValidaServerest from '../../services/validaServerest.service'

describe('Casos de teste sobre a rota /login da API Serverest', () => {

    it('Deve realizar login com sucesso', () => {
        UsuariosServerest.cadastrarUsuario().then(res => {
            cy.writeFile('./cypress/fixtures/usuarioId.json', res.body)
            cy.fixture('usuarioId.json').then(res => {
                let id = res._id
                UsuariosServerest.buscarUsuarioPorId(id).then(res => {
                    cy.writeFile('./cypress/fixtures/usuarioLogin.json', res.body)
                    cy.fixture('usuarioLogin.json').then(res => {
                        let usuario = {
                            email: res.email,
                            password: res.password
                        }
                        LoginServerest.login(usuario).then(res => {
                            cy.validarSchema(res, 'post-login', 200).then(res => expect(res).to.be.eq('Contrato válido'))
                            ValidaServerest.validarLogin(res)
                            LoginServerest.salvarBearer(res)
                        })
                    })
                })
            })
        })
    })

    it('Não deve realizar login com email ou senha inválidos', () => {
        cy.fixture('login.json').then(res => {
            let usuario = res.emailInvalido
            LoginServerest.login(usuario).then(res => {
                cy.validarSchema(res, 'post-login', 400).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarLoginDadosInvalidos(res)
            })
        })
    })

    it('Não deve realizar login com campos vazios', () => {
        cy.fixture('login.json').then(res => {
            let usuario = res.vazio
            LoginServerest.login(usuario).then(res => {
                cy.validarSchema(res, 'post-login', 400).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarLoginCamposVazios(res)
            })
        })
    })

    it('Não deve realizar login com valores de tipos inválidos', () => {
        cy.fixture('login.json').then(res => {
            let usuario = res.tiposInvalidos
            LoginServerest.login(usuario).then(res => {
                cy.validarSchema(res, 'post-login', 400).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarLoginTiposInvalidos(res)
            })
        })
    })

    it('Deve excluir usuário', () => {
        cy.fixture('usuarioId').then(res => {
            let id = res._id
            UsuariosServerest.excluirUsuario(id).then(res => {
                cy.validarSchema(res, 'delete-usuarios', 200).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarExclusaoDeUsuario(res)
            })
        })
    })

})
