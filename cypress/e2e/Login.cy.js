describe('User auth', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('is working correctly and redirects to home', () => {
    cy.get('input[name="username"]')
      .type('manolete')
      .should('have.value', 'manolete')
      .get('input[name="password"]')
      .type('test123')
      .should('have.value', 'test123');

    cy.get('button[type="submit"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Invalid username and password`);
    });
  });

  it('users loggin flow', () => {
    cy.get('input[name="username"]')
      .type('test')
      .should('have.value', 'test')
      .get('input[name="password"]')
      .type('test123')
      .should('have.value', 'test123');

    cy.get('button[type="submit"]').click();
    cy.get('#top-container').should('exist');
  });
});
