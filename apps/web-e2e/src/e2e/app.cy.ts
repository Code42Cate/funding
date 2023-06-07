describe('web', () => {
  beforeEach(() => cy.visit('/'));

  it('notification is disabled before result is present', () => {
    cy.get('[data-testid="notification-button"]').should('be.disabled');
  });

  it('can enter description by typing', () => {
    cy.get('[data-testid="description-input"]').type('test description');
    cy.get('[data-testid="description-input"]').should('have.value', 'test description');
  });

  it('can upload text file as input', () => {
    cy.get('[data-testid="upload-button"]').click();

    cy.get('[data-testid="upload-input"]').selectFile(
      {
        fileName: './src/fixtures/project.txt',
        contents: Cypress.Buffer.from('test description'),
      },
      { force: true }
    );

    cy.get('[data-testid="description-input"]').should('have.value', 'test description');
  });

  it('can upload pdf file as input', () => {
    cy.get('[data-testid="upload-button"]').click();
    cy.get('[data-testid="upload-input"]').selectFile('./src/fixtures/project.pdf', { force: true });
    cy.get('[data-testid="description-input"]').should('have.value', 'Test   description '); // yes, the whitespaces are correct
  });

  it('can go through the whole process', () => {
    // enter text
    cy.get('[data-testid="description-input"]').type('Erasmus für Jungunternehmer');
    cy.get('[data-testid="description-input"]').should('have.value', 'Erasmus für Jungunternehmer');

    // expect result-card to not be found, because we have not submitted yet
    cy.get('[data-testid="result-card"]').should('not.exist');

    // submit
    cy.get('[data-testid="search-button"]').click();

    // expect id in url query
    cy.url().should('include', '?id=');

    // notification button is enabled
    cy.get('[data-testid="notification-button"]').should('not.be.disabled');

    // expect result-card to be present
    cy.get('[data-testid="result-card"]').should('be.visible');

    // expect result-card to contain text
    cy.get('[data-testid="result-card"]').contains('Erasmus für Jungunternehmer');

    // clicking bookmark button copies url to clipboard
    cy.get('[data-testid="bookmark-button"]').click();
    // TODO: Check clipboard, doesn't really work in cypress+chrome because the browser needs permission to access the clipboard

    // Check external link works, has href to some url and target="_blank"
    // data-testid=external-link
    cy.get('[data-testid="external-link"]')
      .should('have.attr', 'href')
      .and('include', 'https://www.foerderdatenbank.de');

    cy.get('[data-testid="notification-button"]').click();

    cy.get('[data-testid="notification-email-input"]').type('notavalidemail');
    cy.get('[data-testid="notification-email-input"]').should('have.value', 'notavalidemail');

    // lose focus
    cy.get('[data-testid="notification-email-input"]').blur();

    // expect error message

    // notification-submit-button is disabled
    cy.get('[data-testid="notification-submit-button"]').should('be.disabled');

    cy.get('[data-testid="notification-invalid-warning"]').should('be.visible');

    // retry with valid email
    cy.get('[data-testid="notification-email-input"]').clear();
    cy.get('[data-testid="notification-email-input"]').type('ubvja@student.kit.edu');

    // lose focus
    cy.get('[data-testid="notification-email-input"]').blur();

    // notification-submit-button is enabled
    cy.get('[data-testid="notification-submit-button"]').should('not.be.disabled');
    // submit
    cy.get('[data-testid="notification-submit-button"]').click();

    // modal closed
    cy.get('[data-testid="notification-modal"]').should('not.be.visible');

    // refreshing the page, result-card is instantly visible
    cy.reload();

    cy.get('[data-testid="result-card"]').should('be.visible');

    // id still in url query
    cy.url().should('include', '?id=');
  });
});
