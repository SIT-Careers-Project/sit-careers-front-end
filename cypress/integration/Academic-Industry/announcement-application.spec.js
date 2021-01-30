describe('The Announcement Application Form Page', () => {
  it('successfully loads', () => {
    cy.visit('/academic-industry/form-application')
  })
  it('This page contains navbar component', () => {
    cy.get('[data-cy=core-navbar]').should('be.visible')
  })
  it('It is a have footer component', () => {
    cy.get('[data-cy=core-footer]').should('be.visible')
  })
  it('should show modal ยืนยันการสมัคร when all of the required input has been filled', () => {
    cy.get('button').should('contain.text', 'ยืนยันการสมัคร')
    cy.get('#trinity-select').click()
    cy.contains('นาย').click()
    cy.get('input[name="first_name"]').type('จิรัฐติกาล')
    cy.get('input[name="last_name"]').type('วิไลรัตน์')
    cy.get('input[name="tel_no"]').type('0868226824')
    cy.get('input[name="email"]').type('jirattikarn.vil@mail.kmutt.ac.th')
    cy.get('input[name="resume_link"]').type('www.google.com')
    cy.get('#button-application > button > p').click()
    cy.contains('ยืนยันการสมัคร')
    cy.contains('คุณต้องการยืนยันการสมัครใช่หรือไม่')
    cy.get('button').should('contain.text', 'สมัคร')
    cy.get('button').should('contain.text', 'ยกเลิก')
  })
})
