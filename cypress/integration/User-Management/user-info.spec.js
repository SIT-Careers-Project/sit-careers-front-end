describe('The User Management Page', () => {
  it('successfully loads', () => {
    cy.visit('/user-management/info')
  })
  it('This page contains navbar component', () => {
    cy.get('[data-cy=core-navbar]').should('be.visible')
  })
  it('It is a have footer component', () => {
    cy.get('[data-cy=core-footer]').should('be.visible')
  })
  it('should show modal add user when click button เพิ่มผู้ประสานงาน.', () => {
    cy.contains('เพิ่มผู้ประสานงาน').click()
    cy.contains('เพิ่มผู้ประสานงาน')
    cy.get('button').should('contain.text', 'เพิ่ม')
    cy.get('button').should('contain.text', 'ยกเลิก')
  })
})
