# Cypress - Api ServeRest

Automação de Testes da Api ServeRest com Cypress.

## Tecnologias utilizadas

As seguintes tecnologias foram utilizadas na construção do projeto.

* [Node.js](https://nodejs.org/en/)
* [Cypress](https://www.cypress.io/)
* [ServeRest](https://serverest.dev/)
* [Faker](https://fakerjs.dev/)
* [Ajv](https://ajv.js.org/)
* [Mochawesome](https://www.npmjs.com/package/mochawesome)

## Como executar

Clone o projeto:

```
git clone https://github.com/pauloshp/cypress-api-serverest.git
```

Acesse a pasta do projeto:

```
cd LogicalForest_Sprint6_Paulo_Santos_Compass
```

Instale as dependências:

```
npm install
```

Execute os testes em ambiente de produção:

```
npm run cy:open:prod
```

Ou

Execute os testes em ambiente de desenvolvimento:

```
npx serverest@latest
```

```
npm run cy:open
```

Gerar relatórios dos testes:

```
npm run test
```

O relátorio de testes gerado pode ser encontrado na pasta cypress/reports

## Cenários de Testes automatizados

####  LOGIN
    ✓ validar o esquema do contrato - SCHEMA

    ✓ Validar respostas da rota POST do /login

####  USUÁRIOS
    ✓ Validar o esquema do contrato - SCHEMA

    ✓ Validar respostas da rota POST do /usuarios

#### PRODUTOS
    ✓ Validar contrato de Produtos - SCHEMA

    ✓ Validar respostas da rota GET do /produtos

    ✓ Validar respostas da rota POST do /produtos

    ✓ Validar respostas da rota PUT do /produtos

    ✓ Validar respostas da rota DELETE do /produtos

####  CARRINHOS
    ✓ Validar o esquema do contrato - SCHEMA

    ✓ Validar respostas da rota POST do /carrinhos

    ✓ Validar respostas da rota DELETE do /carrinhos
