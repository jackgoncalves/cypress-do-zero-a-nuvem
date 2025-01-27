describe('Central de atendimento ao cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('Verifica o título do app', () => {

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preencher os campos obrigatórios', () => {
    const longText = Cypress._.repeat('abc', 10)
    cy.get('#firstName').type('Jack')
    cy.get('#lastName').type('Gonca')
    cy.get('#email').type('jack@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0}) 
    // cy.get('[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Jack')
    cy.get('#lastName').type('Gonca')
    cy.get('#email').type('jack@gmail,com')
    cy.get('#open-text-area').type('Ola')

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Campo telefone continua vazio quando preenchido com valor não-númerico', () => {
    cy.get('#phone')
      .type('abc')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Jack')
    cy.get('#lastName').type('Gonca')
    cy.get('#email').type('jack@gmail.com')
    cy.get('#open-text-area').type('Ola')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Jack')
      .should('have.value', 'Jack')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Gonca')
      .should('have.value', 'Gonca')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('jack@gmail.com')
      .should('have.value', 'jack@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Jack',
      lastName: 'Gonca',
      email: 'jack@gmail.com',
      text: 'teste'
    }
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each((tipos) => {
        cy.wrap(tipos)
        .check()
        .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('./cypress/fixtures/example.json')
      .should((input) => {
        console.log(input)
        expect(input[0].files[0].name).to.eq('example.json')

      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
    .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
    .should((input) => {
      console.log(input)
      expect(input[0].files[0].name).to.eq('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should((input) => {
        console.log(input)
        expect(input[0].files[0].name).to.eq('example.json')

      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')

  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })


})