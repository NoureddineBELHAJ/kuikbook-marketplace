import './commands';

beforeEach(() => {
  cy.intercept('GET', '/api/activities*', { fixture: 'activities.json' });
  cy.intercept('GET', '/api/bookings*', { fixture: 'bookings.json' });
});