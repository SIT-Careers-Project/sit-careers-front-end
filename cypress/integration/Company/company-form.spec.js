describe('[Company feature] Add company', () => {
  it('It should add data of company success.', () => {
    cy.visit('/company/info')
    cy.contains('เพิ่มบริษัท').click()
    cy.wait(1000)
  })
  it.skip('It should add company success.', () => {
    cy.visit('/company/form-create')
    const emailManager = emailGenerator() + '@sit.mail.com'
    const emailCoordinator = emailGenerator() + '@sit.mail.com'
    const startTime = Cypress.moment().locale('th').format('HH:mm')
    const endTime = Cypress.moment().locale('th').format('HH:mm')

    cy.wait(3000)
    cy.get('[name=company_name_th]').type('บริษัท สิท แคเลีย จำกัด', { force: true })
    cy.get('[name=company_name_en]').type('SIT Career Company', { force: true })
    cy.get('[name=company_type]').click({ force: true }).type('Software House', { force: true })
    cy.get('[name=website]').type('-', { force: true })
    cy.get('[data-cy=about_us]').type('Lorem ipsum dolor sit amet consectetur .', { force: true })
    cy.get('[data-cy=description]').type('Lorem ipsum dolor sit.', { force: true })
    cy.get('[name=e_mail_manager]').type(emailManager, { force: true })
    cy.get('[name=e_mail_coordinator]').type(emailCoordinator, { force: true })
    cy.get('[name=tel_no]').type('0987988876', { force: true })
    cy.get('[name=phone_no]').type('0887342276')
    cy.get('[name=address_one]').type('122/3 ถ.ประชาอุทิศ 45')
    cy.get('[name=lane]').type('2')
    cy.get('[name=road]').type('ถ.ประชาอุทิศ')
    cy.get('[name=sub_district]').type('ประชาอุทิศ')
    cy.get('[name=district]').type('บางมด')
    cy.get('[name=province]').type('กรุงเทพมหานคร')
    cy.get('[name=postal_code]').type('10400')
    cy.get('[name=start_business_day]').click({ force: true }).type('จันทร์')
    cy.get('[name=start_business_time]').clear().type(`${startTime}`)
    cy.get('[name=end_business_day]').click({ force: true }).type('ศุกร์')
    cy.get('[name=end_business_time]').clear().type(`${endTime}`)

    cy.contains('บันทึก').click()
    cy.wait(500)
    cy.get('[data-cy=core-modal-submit]').click({ force: true })
    cy.wait(3000)
  })
})

describe('[Company feature] Update company', () => {
  it('Go to company table page', () => {
    cy.visit('/company/info')
    cy.wait(1000)
  })

  it.skip('It should update company success.', () => {
    const emailManager = emailGenerator() + '@sit.mail.com'
    const emailCoordinator = emailGenerator() + '@sit.mail.com'
    const startTime = Cypress.moment().locale('th').format('HH:mm')
    const endTime = Cypress.moment().locale('th').format('HH:mm')
    const period = Cypress.moment('12-12-2024').format('yyyy-MM-DD')

    cy.getCookie('token').then((cookie) => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8000/api/companies',
        headers: {
          Authorization: `Bearer ${cookie.value}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        cy.get(`[value=${response.body[0].company_id}] > [data-cy=link-update]`).click({ multiple: true })
      })
    })
    cy.wait(5000)

    cy.get('input[name=company_name_th]').clear().type('ทดสอบการอัพเดทข้อมูล')
    cy.get('input[name=company_name_en]').clear().type('Test Update data')
    cy.get('input[name=company_type]').click({ force: true }).type('DevOps')
    cy.get('input[name=website]').clear().type('www.hello-update-test.com')
    cy.get('[data-cy=about_us]').type(' hello.')
    cy.get('[data-cy=description]').type(' hello.')
    cy.get('input[name=e_mail_manager]').clear().type(emailManager)
    cy.get('input[name=e_mail_coordinator]').clear().type(emailCoordinator)
    cy.get('input[name=tel_no]').clear().type('0987900076')
    cy.get('input[name=phone_no]').clear().type('0887342765')
    cy.get('input[name=address_one]').clear().type('133/3 ถ.ประชาอุทิศ 45')
    cy.get('input[name=lane]').clear().type('2')
    cy.get('input[name=road]').clear().type('ถ.ประชาอุทิศ')
    cy.get('input[name=sub_district]').clear().type('ประชาอุทิศ')
    cy.get('input[name=district]').clear().type('บางมด')
    cy.get('input[name=province]').clear().type('กรุงเทพมหานคร')
    cy.get('input[name=postal_code]').clear().type('10400')
    cy.get('input[name=start_business_day]').click({ force: true }).type('จันทร์')
    cy.get('input[name=start_business_time]').clear().type(`${startTime}`)
    cy.get('input[name=end_business_day]').click({ force: true }).type('ศุกร์')
    cy.get('input[name=end_business_time]').clear().type(`${endTime}`)
    cy.get('input[name=mou_type]').clear().type('MOU WiL')
    cy.get('input[name=contact_period]').type(period)
    cy.get('input[name=mou_link]').clear().type('www.google.co.th')

    cy.contains('บันทึก').click()
    cy.wait(500)
    cy.get('[data-cy=core-modal-submit]').click()
    cy.getCookie('token').then((cookie) => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8000/api/companies',
        headers: {
          Authorization: `Bearer ${cookie.value}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        const filterData = response.body.filter((data) => {
          return data.company_name_th === 'ทดสอบการอัพเดทข้อมูล'
        })

        expect(filterData[0].company_name_th).to.eq('ทดสอบการอัพเดทข้อมูล')
        expect(filterData[0].company_name_en).to.eq('Test Update data')
        expect(filterData[0].website).to.eq('www.hello-update-test.com')
        expect(filterData[0].mou_type).to.eq('MOU WiL')
        expect(filterData[0].mou_link).to.eq('www.google.co.th')
      })
    })
    cy.wait(1000)
  })
})

function emailGenerator() {
  return 'test' + Math. floor(Math. random() * 999)
}