describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should allow users to log in', () => {
    cy.get('[data-cy=login-button]').click();
    cy.url().should('include', '/login');

    cy.get('[data-cy=email-input]').type('test@example.com');
    cy.get('[data-cy=password-input]').type('password123');
    cy.get('[data-cy=submit-button]').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('[data-cy=user-menu]').should('exist');
  });

  it('should show error message for invalid credentials', () => {
    cy.get('[data-cy=login-button]').click();
    cy.get('[data-cy=email-input]').type('invalid@example.com');
    cy.get('[data-cy=password-input]').type('wrongpassword');
    cy.get('[data-cy=submit-button]').click();

    cy.get('[data-cy=error-message]')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });
});