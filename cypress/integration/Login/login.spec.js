describe('Login Page', () => {
  it('fill username and password for login in', () => {
    cy.visit('/login')
    cy.get('input[name="username"]').type('user_test_01')
    cy.get('input[name="password"]').type('123')
    cy.contains('Submit').click()
    cy.wait(2000)
  })
})