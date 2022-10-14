/// <reference types="cypress" />

import UsuariosServerest from '../../services/usuarios.service'
import ValidaServerest from '../../services/validaServerest.service'

describe('Casos de teste sobre a rota /usuarios da API Serverest', () => {

    it('Deve cadastrar um novo usuario', () => {
        UsuariosServerest.cadastrarUsuario().then(res => {
            cy.writeFile('./cypress/fixtures/usuarioId.json', res.body)
            cy.validarSchema(res, 'post-usuarios', 201).then(res => expect(res).to.be.eq('Contrato válido'))
            ValidaServerest.validarCadastroDeUsuario(res)
        })
    })

    it('Não deve cadastrar um novo usuario com email já cadastrado', () => {
        cy.fixture('usuarioId.json').then(res => {
            let id = res._id
            UsuariosServerest.buscarUsuarioPorId(id).then(res => {
                cy.writeFile('./cypress/fixtures/usuarioLogin.json', res.body)
                cy.fixture('usuarioLogin.json').then(res => {
                    cy.log(JSON.stringify(res))
                    let usuario = {
                        nome: res.nome,
                        email: res.email,
                        password: res.password,
                        administrador: res.administrador
                    }
                    UsuariosServerest.cadastrarUsuario(usuario).then(res => {
                        cy.validarSchema(res, 'post-usuarios', 400).then(res => expect(res).to.be.eq('Contrato válido'))
                        ValidaServerest.validarCadastroDeUsuarioEmailInvalido(res)
                    })
                })
            })
        })
    })

    it('Deve excluir usuario', () => {
        cy.fixture('usuarioId.json').then(res => {
            let id = res._id
            UsuariosServerest.excluirUsuario(id).then(res => {
                cy.validarSchema(res, 'delete-usuarios', 200).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarExclusaoDeUsuario(res)
            })
        })
    })

})
