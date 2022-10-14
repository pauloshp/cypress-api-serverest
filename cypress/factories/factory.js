const faker = require('faker')

export default class Factory {

    static gerarUsuarioAdministrador() {
        return {
            "nome": faker.name.findName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "administrador": "true"
        }
    }

    static gerarUsuario() {
        return {
            "nome": faker.name.findName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "administrador": "false"
        }
    }

    static gerarProduto() {
        return {
            "nome": faker.commerce.productName(),
            "preco": faker.commerce.price(),
            "descricao": faker.commerce.productDescription(),
            "quantidade": faker.datatype.number()
        }
    }
    
}
