describe('Bookings', () => {
  beforeEach(() => {
    cy.login(); // Custom command that handles authentication
    cy.visit('/activities');
  });

  it('should allow users to book an activity', () => {
    cy.get('[data-cy=activity-card]').first().click();
    cy.get('[data-cy=book-now-button]').click();

    cy.get('[data-cy=date-picker]').click();
    cy.get('.react-datepicker__day--today').click();
    cy.get('[data-cy=participants-input]').clear().type('2');
    cy.get('[data-cy=book-submit]').click();

    cy.url().should('include', '/checkout');
    cy.get('[data-cy=booking-summary]').should('exist');
  });

  it('should show booking history', () => {
    cy.visit('/traveler/bookings');
    cy.get('[data-cy=booking-list]').should('exist');
    cy.get('[data-cy=booking-card]').should('have.length.at.least', 1);
  });
});