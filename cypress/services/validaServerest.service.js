export default class ValidaServerest {

    // Login

    static validarLogin(resposta) {
        expect(resposta.body.message).to.be.eq('Login realizado com sucesso')
    }

    static validarLoginDadosInvalidos(resposta) {
        expect(resposta.body.message).to.be.eq('Email e/ou senha inválidos')
    }

    static validarLoginCamposVazios(resposta) {
        
    }

    static validarLoginTiposInvalidos(resposta) {
           
    }

    // Usuário

    static validarBuscaDeUsuarios(resposta) {
        expect(resposta.body.quantidade).to.be.greaterThan(0)
    }

    static validarBuscaDeUsuarioPorId(resposta) {
        
    }

    static validarCadastroDeUsuario(resposta) {
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
    }

    static validarCadastroDeUsuarioEmailInvalido(resposta) {
        expect(resposta.body.message).to.be.eq('Este email já está sendo usado')
    }

    static validarAtualizacaoDeUsuario(resposta) {
        expect(resposta.body.message).to.be.eq('Registro alterado com sucesso')
    }

    static validarExclusaoDeUsuario(resposta) {
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso')
    }

    // Produto

    static validarBuscaDeProdutos(resposta) {
        expect(resposta.body.quantidade).to.be.greaterThan(0)
    }

    static validarBuscaDeProdutoPorId(resposta) {
       
    }

    static validarCadastroDeProduto(resposta) {
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
    }

    static validarCadastroDeProdutoSemAdmin(resposta) { 
        expect(resposta.body.message).to.be.eq('Rota exclusiva para administradores')
    }

    static validarCadastroDeProdutoSemAutenticacao(resposta) { 
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    static validarAtualizacaoDeProduto(resposta) {
        expect(resposta.body.message).to.be.eq('Registro alterado com sucesso')
    }

    static validarAtualizacaoDeProdutoSemAdm(resposta) {
        expect(resposta.body.message).to.be.eq('Rota exclusiva para administradores')
    }

    static validarAtualizacaoDeProdutoSemAutenticacao(resposta) {
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    static validarExclusaoDeProduto(resposta) {
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso')
    }

    static validarExclusaoDeProdutoSemAdm(resposta) {
        expect(resposta.body.message).to.be.eq('Rota exclusiva para administradores')
    }

    static validarExclusaoDeProdutoSemAutenticacao(resposta) {
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    // Carrinho

    static validarBuscaDeCarrinhos(resposta) {
        expect(resposta.body.quantidade).to.be.greaterThan(0)
    }

    static validarBuscaDeCarrinhoPorId(resposta) {
        
    }

    static validarCadastroDeCarrinho(resposta) {
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
    }

    static validarCadastroDeCarrinhoDuplicado(resposta) {
        expect(resposta.body.message).to.be.eq('Não é permitido ter mais de 1 carrinho')
    }
    
    static validarCadastroDeCarrinhoSemAutenticacao(resposta) { 
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    static validarExclusaoDeCarrinhoConcluirCompra(resposta) {
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso')
    }

    static validarExclusaoDeCarrinhoConcluirCompraSemCarrinho(resposta) {
        expect(resposta.body.message).to.be.eq('Não foi encontrado carrinho para esse usuário')
    }

    static validarExclusaoDeCarrinhoConcluirCompraSemAutenticacao(resposta){
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    static validarExclusaoDeCarrinhoCancelarCompra(resposta) {
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso')
    }

}
