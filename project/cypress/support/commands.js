Cypress.Commands.add('login', (email = 'test@example.com', password = 'password123') => {
  cy.request({
    method: 'POST',
    url: '/api/auth/login',
    body: { email, password }
  }).then((response) => {
    window.localStorage.setItem('auth', JSON.stringify(response.body));
  });
});

Cypress.Commands.add('logout', () => {
  window.localStorage.removeItem('auth');
  cy.visit('/');
});