/// <reference types="cypress" />

import CarrinhosServerest from '../../services/carrinhos.service'
import LoginServerest from '../../services/login.service'
import ProdutosServerest from '../../services/produtos.service'
import UsuariosServerest from '../../services/usuarios.service'
import ValidaServerest from '../../services/validaServerest.service'

describe('Casos de teste sobre a rota /carrinhos da API Serverest', () => {

    context('Deve cadastrar e excluir carrinho com sucesso', () => {

        before('Cadastrar usuario e realizar login', () => {
            UsuariosServerest.cadastrarUsuarioAdministrador().then(res => {
                cy.writeFile('./cypress/fixtures/usuarioAdmId.json', res.body)
                cy.fixture('usuarioAdmId.json').then(res => {
                    let id = res._id
                    UsuariosServerest.buscarUsuarioPorId(id).then(res => {
                        cy.writeFile('./cypress/fixtures/usuarioAdmLogin.json', res.body)
                        cy.fixture('usuarioAdmLogin.json').then(res => {
                            let usuario = {
                                email: res.email,
                                password: res.password
                            }
                            LoginServerest.login(usuario).then(res => {
                                LoginServerest.salvarBearer(res)
                            })
                        })
                    })
                })
            })
        })

        context('Deve cadastrar carrinho e concluir uma compra com sucesso', () => {

            it('Deve cadastrar um novo carrinho com sucesso', () => {
                ProdutosServerest.cadastrarProduto().then((res) => {
                    cy.writeFile('./cypress/fixtures/produtoId.json', res.body)
                })
                cy.fixture('produtoId.json').then(res => {
                    let id = res._id
                    CarrinhosServerest.cadastrarCarrinho(id, 1).then((res) => {
                        cy.validarSchema(res, 'post-carrinhos', 201).then(res => expect(res).to.be.eq('Contrato v??lido'))
                        ValidaServerest.validarCadastroDeCarrinho(res)
                    })
                })
            })

            it('Deve excluir carrinho com sucesso e concluir a compra', () => {
                CarrinhosServerest.excluirCarrinhoConcluirCompra().then((res) => {
                    cy.validarSchema(res, 'delete-carrinhos-concluir', 200).then(res => expect(res).to.be.eq('Contrato v??lido'))
                    ValidaServerest.validarExclusaoDeCarrinhoConcluirCompra(res)
                })
            })

        })

        context('Deve cadastrar carrinho e cancelar uma compra com sucesso', () => {

            it('Deve cadastrar um novo carrinho com sucesso', () => {
                cy.fixture('produtoId.json').then(res => {
                    let id = res._id
                    CarrinhosServerest.cadastrarCarrinho(id, 1).then((res) => {
                        cy.validarSchema(res, 'post-carrinhos', 201).then(res => expect(res).to.be.eq('Contrato v??lido'))
                        ValidaServerest.validarCadastroDeCarrinho(res)
                    })
                })
            })

            it('Deve excluir carrinho com sucesso e cancelar a compra', () => {
                CarrinhosServerest.excluirCarrinhoCancelarCompra().then((res) => {
                    cy.validarSchema(res, 'delete-carrinhos-concluir', 200).then(res => expect(res).to.be.eq('Contrato v??lido'))
                    ValidaServerest.validarExclusaoDeCarrinhoCancelarCompra(res)
                })
            })

        })

    })

    context('N??o deve cadastrar carrinho duplicado e n??o deve excluir carrinho inexistente', () => {

        it('N??o deve cadastrar novo carrinho caso o usuario j?? tenha um carrinho cadastrado', () => {
            cy.fixture('produtoId.json').then(res => {
                let id = res._id
                CarrinhosServerest.cadastrarCarrinho(id, 1).then((res) => {

                })
                CarrinhosServerest.cadastrarCarrinho(id, 1).then((res) => {
                    cy.validarSchema(res, 'post-carrinhos', 400).then(res => expect(res).to.be.eq('Contrato v??lido'))
                    ValidaServerest.validarCadastroDeCarrinhoDuplicado(res)
                })
            })
        })

        it('N??o deve excluir carrinho caso n??o tenha carrinho cadastrado', () => {
            CarrinhosServerest.excluirCarrinhoConcluirCompra().then((res) => {

            })
            CarrinhosServerest.excluirCarrinhoConcluirCompra().then((res) => {
                cy.validarSchema(res, 'delete-carrinhos-concluir', 200).then(res => expect(res).to.be.eq('Contrato v??lido'))
                ValidaServerest.validarExclusaoDeCarrinhoConcluirCompraSemCarrinho(res)
            })
        })

        it('Deve excluir produto', () => {
            cy.fixture('produtoId').then(res => {
                let id = res._id
                ProdutosServerest.excluirProduto(id).then(res => {
                    cy.validarSchema(res, 'delete-produtos', 200).then(res => expect(res).to.be.eq('Contrato v??lido'))
                    ValidaServerest.validarExclusaoDeProduto(res)
                })
            })
        })

        it('Deve excluir usu??rio', () => {
            cy.fixture('usuarioAdmId').then(res => {
                let id = res._id
                UsuariosServerest.excluirUsuario(id).then(res => {
                    cy.validarSchema(res, 'delete-usuarios', 200).then(res => expect(res).to.be.eq('Contrato v??lido'))
                    ValidaServerest.validarExclusaoDeUsuario(res)
                })
            })
        })

    })

    context('N??o deve cadastrar ou excluir carrinho sem autentica????o de usuario', () => {

        it('N??o deve cadastrar carrinho sem autentica????o de usuario', () => {
            cy.fixture('produtoId.json').then(res => {
                let id = res._id
                CarrinhosServerest.cadastrarCarrinho(id, 1).then((res) => {
                    cy.validarSchema(res, 'post-carrinhos', 401).then(res => expect(res).to.be.eq('Contrato v??lido'))
                    ValidaServerest.validarCadastroDeCarrinhoSemAutenticacao(res)
                })
            })
        })

        it('N??o deve excluir carrinho sem autentica????o de usuario', () => {
            CarrinhosServerest.excluirCarrinhoConcluirCompra().then((res) => {
                cy.validarSchema(res, 'delete-carrinhos-concluir', 401).then(res => expect(res).to.be.eq('Contrato v??lido'))
                ValidaServerest.validarExclusaoDeCarrinhoConcluirCompraSemAutenticacao(res)
            })
        })

    })

})
