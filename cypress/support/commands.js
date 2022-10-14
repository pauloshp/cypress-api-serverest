import Ajv from 'ajv'
const ajv = new Ajv({allerrors: true, verbose: true, strict: false})

Cypress.Commands.add('validarSchema', (res, schema, status) => {
    cy.log(`Validando contrato para ${schema} com status ${status}`)
    cy.fixture(`schemas/${schema}/${status}.json`).then(schema => {
        const validate = ajv.compile(schema)
        const valid = validate(res.body)
        if (!valid) {
            var errors = ''
            for(let each in validate.errors) {
                let err = validate.errors[each]
                errors += `\n ${err.instancePath} ${err.message}, but receive ${typeof err.data}`
            }
            throw new Error(`Erros encontrados na validação de contrato: ` + errors)
        }
        return 'Contrato válido'
    })
})
