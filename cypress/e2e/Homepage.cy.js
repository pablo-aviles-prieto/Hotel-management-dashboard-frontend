describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });
  it('shows the login page', () => {
    cy.get('#top-container').should('not.exist');
    cy.contains('Login page').should('exist')
    // cy.get('#top-container').should('have.length', 2);
  });
});
