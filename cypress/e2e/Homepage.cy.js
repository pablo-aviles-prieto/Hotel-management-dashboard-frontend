describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });
  it('redirect to login page when NO authed', () => {
    cy.get('#top-container').should('not.exist');
    cy.contains('Login page').should('exist');
  });

  it('shows correctly when IS authed', () => {
    window.localStorage.setItem('AUTH', 'yes');
    cy.get('#top-container').should('exist');
    cy.contains('Login page').should('not.exist');
    expect(localStorage.getItem('AUTH')).to.eq('yes');
  });

  it('renders correctly the header bground color depending on the theme', () => {
    cy.get('#header-menu')
      .should('have.css', 'background-color')
      .should('include', 'rgb(255, 255, 255)');

    cy.contains('Theme').click();

    cy.get('#header-menu')
      .should('have.css', 'background-color')
      .should('include', 'rgb(32, 32, 32)');
  });
});
