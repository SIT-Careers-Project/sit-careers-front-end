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
    cy.get(
      '#__next > div > div.flex.justify-center.mt-16 > div > div > div > div.col-span-7.px-4 > div:nth-child(2) > div:nth-child(2) > div > div > input'
    ).type('จิรัฐติกาล')
    cy.get(
      '#__next > div > div.flex.justify-center.mt-16 > div > div > div > div.col-span-7.px-4 > div:nth-child(2) > div:nth-child(3) > div > div > input'
    ).type('วิไลรัตน์')
    cy.get(
      '#__next > div > div.flex.justify-center.mt-16 > div > div > div > div.col-span-7.px-4 > div:nth-child(3) > div > div > div > input'
    ).type('0868226824')
    cy.get(
      '#__next > div > div.flex.justify-center.mt-16 > div > div > div > div.col-span-7.px-4 > div:nth-child(4) > div > div > div > input'
    ).type('jirattikarn.vil@mail.kmutt.ac.th')
    cy.get(
      '#__next > div > div.flex.justify-center.mt-16 > div > div > div > div.col-span-7.px-4 > div:nth-child(5) > div > div > div > input'
    ).type('www.google.com')
    cy.get('#button-application > button > p').click()
    cy.contains('ยืนยันการสมัคร')
    cy.contains('คุณต้องการยืนยันการสมัครใช่หรือไม่')
    cy.get('button').should('contain.text', 'สมัคร')
    cy.get('button').should('contain.text', 'ยกเลิก')
  })
})
