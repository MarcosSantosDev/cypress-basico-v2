/// <reference types="Cypress" />

beforeEach(function () {
    cy.visit('./src/index.html');
})

describe('Central de Atendimento ao Cliente TAT', function () {
    // ---------------------- AULA 01 -------------------------------

    it('verifica o título da aplicação', function () {
        cy.title().should('equal', 'Central de Atendimento ao Cliente TAT')
    })

    // ---------------------- AULA 02 -------------------------------

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.clock()

        cy.get('form').within(function () {
            cy.get('input[name="firstName"]')
                .should('be.visible')
                .type('Marcos')
                .should('have.value', 'Marcos');

            cy.get('input[name="lastName"]')
                .should('be.visible')
                .type('Santos')
                .should('have.value', 'Santos');


            cy.get('input[type="email"]')
                .should('be.visible')
                .type('marcos@gmail.com')
                .should('have.value', 'marcos@gmail.com');

            cy.get('textarea[name="open-text-area"]')
                .should('be.visible')
                .type('Esse é um teste de escrita no text-area')
                .should('have.value', 'Esse é um teste de escrita no text-area');

            cy.contains('button', 'Enviar')
                .should('be.visible')
                .click();
        })

        cy.get('.success')
            .should('be.visible');

        cy.tick(3000)

        cy.get('.success')
            .should('not.be.visible');
    })

    // Exercício extra 1
    it('escrever texto de forma estantanea', function () {
        cy.get('form').within(function () {
            cy.get('input[name="firstName"]')
                .type('Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti blanditiis, vero quo voluptas id ex ratione saepe velit recusandae alias! Iusto facilis officia recusandae at nihil odit animi error nulla?', {
                    delay: 0,
                })
        })
    })

    // Exercício extra 2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.clock();

        cy.get('form').within(function () {
            cy.get('input[name="firstName"]')
                .type('Marcos')

            cy.get('input[name="lastName"]')
                .type('Santos')


            cy.get('input[type="email"]')
                .type('marcos@gmail,com')

            cy.get('textarea[name="open-text-area"]')
                .type('Esse é um teste de escrita no text-area')

            cy.contains('button', 'Enviar')
                .should('be.visible')
                .click();
        })

        cy.get('.error')
            .should('be.visible');

        cy.tick(3000)

        cy.get('.error')
            .should('not.be.visible');

    })

    // Exercício extra 3
    it('não permitir escrever caracters que não são numeros no campo de telefone', function () {
        cy.get('form').within(function () {
            cy.get('input[name="phone"][type="number"]')
                .type('Hello world')
                .should('be.empty');
        })
    })

    // Exercício extra 4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.clock()

        cy.get('form').within(function () {
            cy.get('input[name="firstName"]').type('mensagem de teste');
            cy.get('input[name="lastName"]').type('mensagem de teste');
            cy.get('input[type="email"][name="email"]').type('example@test.com');
            cy.get('textarea[name="open-text-area"]').type('mensagem de teste');


            cy.get('#check > input[type="checkbox"]')
                .check('phone');

            cy.contains('button', 'Enviar')
                .should('be.visible')
                .click();
        });

        cy.get('.error')
            .should('be.visible');

        cy.tick(3000)

        cy.get('.error')
            .should('not.be.visible');
    })

    // Exercício extra 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('input[name="firstName"]')
            .type('Marcos')
            .should('have.value', 'Marcos')
            .clear()
            .should('have.value', '');

        cy.get('input[name="lastName"]')
            .type('Santos')
            .should('have.value', 'Santos')
            .clear()
            .should('have.value', '');

        cy.get('input[type="email"][name="email"]')
            .type('marcos@gmail.com')
            .should('have.value', 'marcos@gmail.com')
            .clear()
            .should('have.value', '');

        cy.get('input[type="number"][name="phone"]')
            .type('12345678')
            .should('have.value', '12345678')
            .clear()
            .should('have.value', '');
    })

    // Exercício extra 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.clock()

        cy.contains('button', 'Enviar')
            .should('be.visible')
            .click();

        cy.get('.error')
            .should('be.visible')
            .find('strong')
            .should('have.text', 'Valide os campos obrigatórios!');

        cy.tick(3000)

        cy.get('.error')
            .should('not.be.visible');

    })

    // Exercício extra 7 - custom comands
    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.clock()

        cy.fillMandatoryFieldsAndSubmit();

        cy.get('.success')
            .should('be.visible');

        cy.tick(3000)

        cy.get('.success')
            .should('not.be.visible');
    })

    // ---------------------- AULA 03 -------------------------------
    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('select[id="product"]')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    // Exercício extra 1
    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('select[id="product"]')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    // Exercício extra 2
    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('select[id="product"]')
            .select(1)
            .should('have.value', 'blog')
    })

    // ---------------------- AULA 04 -------------------------------
    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('#support-type').within(function () {
            cy.get('input[value="feedback"]')
                .check()
        })
    })

    it('marca cada tipo de atendimento', function () {
        cy.get('#support-type').within(function () {
            cy.get('input[type="radio"]')
                .should('have.length', 3)
                .each(($radioElement) => {
                    cy.wrap($radioElement)
                        .check()
                        .should('be.checked')
                })
        })
    })

    // ---------------------- AULA 05 -------------------------------
    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('#check').within(function () {
            cy.get('input[type="checkbox"]')
                .as('checkboxes');

            cy.get('@checkboxes')
                .check()
                .should('be.checked')
                .last()
                .uncheck()
                .should('not.be.checked');
        })
    })

    // ---------------------- AULA 06 -------------------------------
    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"][id="file-upload"]')
            .selectFile('cypress/fixtures/example.json')
            .then(function ($input) {
                const files = $input[0].files;

                expect(files[0].name).to.eq('example.json');
            })
    })


    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"][id="file-upload"]')
            .selectFile(
                'cypress/fixtures/example.json',
                { action: 'drag-drop' }
            )
            .then(function ($input) {
                const files = $input[0].files;

                expect(files[0].name).to.be.equal('example.json');
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('fileSelected');

        cy.get('input[type="file"][id="file-upload"]')
            .selectFile('@fileSelected')
            .then(function ($input) {
                const files = $input[0].files;

                expect(files[0].name).to.be.equal('example.json');
            })
    })

    // ---------------------- AULA 07 -------------------------------
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('a[href="privacy.html"]')
            .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr', 'target')
            .click();

        cy.contains('CAC TAT - Política de privacidade')
            .should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')

        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('Aprendendo testes automatizados. ', 10)

        cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)
    })


    it('faz um requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
            const { status, statusText, body } = response;

            expect(status).to.equal(200);
            expect(statusText).to.equal('OK');
            expect(body).to.include('CAC TAT');
        })
    })

    it.only('encontre o gato o gato escondido', function() {
        cy.get('#cat')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible');
    })
})
