/// <reference types="cypress" />

import ProdutosServerest from '../../services/produtos.service'
import LoginServerest from '../../services/login.service'
import UsuariosServerest from '../../services/usuarios.service'
import ValidaServerest from '../../services/validaServerest.service'

describe('Casos de teste sobre a rota /produtos da API Serverest', () => {

    context('Deve realizar o CRUD da rota produtos com sucesso', () => {

        before('Cadastrar usuario administrador e realizar login', () => {
            UsuariosServerest.cadastrarUsuarioAdministrador().then(res => {
                cy.writeFile('./cypress/fixtures/usuarioAdmId.json', res.body)
                cy.fixture('usuarioAdmId.json').then(res => {
                    let id = res._id
                    UsuariosServerest.buscarUsuarioPorId(id).then(res => {
                        cy.writeFile('./cypress/fixtures/usuarioLogin.json', res.body)
                        cy.fixture('usuarioLogin.json').then(res => {
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

        it('Deve listar produtos cadastrados', () => {
            ProdutosServerest.buscarProdutos().then((res) => {
                cy.validarSchema(res, 'get-produtos', 200).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarBuscaDeProdutos(res)
            })
        })

        it('Deve cadastrar um novo produto com sucesso', () => {
            ProdutosServerest.cadastrarProduto().then((res) => {
                cy.writeFile('./cypress/fixtures/produtoId.json', res.body)
                cy.validarSchema(res, 'post-produtos', 201).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarCadastroDeProduto(res)
            })
        })

        it('Deve buscar produto por id com sucesso', () => {
            cy.fixture('produtoId.json').then(res => {
                let id = res._id
                ProdutosServerest.buscarProdutoPorId(id).then((res) => {
                    cy.writeFile('./cypress/fixtures/produtoId.json', res.body)
                    cy.validarSchema(res, 'get-produtos-by-id', 200).then(res => expect(res).to.be.eq('Contrato válido'))
                    ValidaServerest.validarBuscaDeProdutoPorId(res)
                })
            })
        })

        it('Deve atualizar produto com sucesso', () => {
            cy.fixture('produtoId.json').then(res => {
                let id = res._id
                ProdutosServerest.atualizarProduto(id).then((res) => {
                    cy.validarSchema(res, 'put-produtos', 200).then(res => expect(res).to.be.eq('Contrato válido'))
                    ValidaServerest.validarAtualizacaoDeProduto(res)
                })
            })
        })

        it('Deve excluir produto com sucesso', () => {
            cy.fixture('produtoId.json').then(res => {
                let id = res._id
                ProdutosServerest.excluirProduto(id).then((res) => {
                    cy.validarSchema(res, 'delete-produtos', 200).then(res => expect(res).to.be.eq('Contrato válido'))
                    ValidaServerest.validarExclusaoDeProduto(res)
                })
            })
        })

        it('Deve excluir usuário', () => {
            cy.fixture('usuarioAdmId').then(res => {
                let id = res._id
                UsuariosServerest.excluirUsuario(id).then(res => {
                    cy.validarSchema(res, 'delete-usuarios', 200).then(res => expect(res).to.be.eq('Contrato válido'))
                    ValidaServerest.validarExclusaoDeUsuario(res)
                })
            })
        })

    })

    context('Usuario sem administrador não deve cadastra, atualizar ou deletar um produto', () => {

        before('Login usuário sem direitos de administrador', () => {
            UsuariosServerest.cadastrarUsuario().then(res => {
                cy.writeFile('./cypress/fixtures/usuarioId.json', res.body)
                cy.fixture('usuarioId.json').then(res => {
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

        it('Usuario sem administrador não deve cadastrar produto', () => {
            ProdutosServerest.cadastrarProduto().then((res) => {
                cy.validarSchema(res, 'post-produtos', 403).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarCadastroDeProdutoSemAdmin(res)
            })
        })

        it('Usuario sem administrador não deve atualizar produto', () => {
            cy.fixture('produtoId.json').then(res => {
                let id = res._id
                ProdutosServerest.atualizarProduto(id).then((res) => {
                    cy.validarSchema(res, 'put-produtos', 403).then(res => expect(res).to.be.eq('Contrato válido'))
                    ValidaServerest.validarAtualizacaoDeProdutoSemAdm(res)
                })
            })
        })

        it('Usuario sem administrador não deve deletar produto', () => {
            cy.fixture('produtoId.json').then(res => {
                let id = res._id
                ProdutosServerest.excluirProduto(id).then((res) => {
                    cy.validarSchema(res, 'delete-produtos', 403).then(res => expect(res).to.be.eq('Contrato válido'))
                    ValidaServerest.validarExclusaoDeProdutoSemAdm(res)
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

    context('Não deve cadastra, atualizar ou deletar um produto sem autenticação', () => {
        
        it('Não deve cadastrar produto sem autenticação', () => {
            ProdutosServerest.cadastrarProduto().then((res) => {
                cy.validarSchema(res, 'post-produtos', 401).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarCadastroDeProdutoSemAutenticacao(res)
            })
        })

        it('Não deve atualizar produto sem autenticação', () => {
            cy.fixture('produtoId.json').then(res => {
                let id = res._id
                ProdutosServerest.atualizarProduto(id).then((res) => {
                    cy.validarSchema(res, 'put-produtos', 401).then(res => expect(res).to.be.eq('Contrato válido'))
                    ValidaServerest.validarAtualizacaoDeProdutoSemAutenticacao(res)
                })
            })
        })

        it('Não deve deletar produto sem autenticação', () => {
            cy.fixture('produtoId.json').then(res => {
                let id = res._id
                ProdutosServerest.excluirProduto(id).then((res) => {
                    cy.validarSchema(res, 'delete-produtos', 401).then(res => expect(res).to.be.eq('Contrato válido'))
                    ValidaServerest.validarExclusaoDeProdutoSemAutenticacao(res)
                })
            })
        })

    })

})
