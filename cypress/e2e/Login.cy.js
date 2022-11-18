describe('User auth', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('fails when introducing incorrect username', () => {
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

  it('fails when introducing incorrect password', () => {
    cy.get('input[name="username"]')
      .type('test')
      .should('have.value', 'test')
      .get('input[name="password"]')
      .type('test1234')
      .should('have.value', 'test1234');

    cy.get('button[type="submit"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Invalid username and password`);
    });
  });

  it('works correctly with correct user data', () => {
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
