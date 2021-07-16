import isBetween from 'dayjs/plugin/isBetween'
import dayjs from 'dayjs'
import _ from 'lodash'

export const checkStatus = (startDate, endDate, status) => {
  if (status === 'CLOSE') {
    return 'CLOSE'
  }
  dayjs.extend(isBetween)
  if (dayjs().isBetween(startDate, endDate, null, '[]')) {
    return 'OPEN'
  } else {
    return 'CLOSE'
  }
}

export const sortAnnouncement = (announcements, key) => {
  return _.orderBy(announcements, key, ['desc'])
}

export const sortByDate = (data, key) => {
  return _.orderBy(data, key, ['desc'])
}

export const checkLoggedIn = (isLoggedIn, roleCheck: Array<string>, roleUser) => {
  const checkRole = _.includes(roleCheck, roleUser)
  if (isLoggedIn) {
    if (!checkRole) {
      return '/401'
    }
  } else {
    return '/login'
  }
}

export const checkRoleRender = (roleName) => {
  let tmpRoleName = ''
  switch (roleName) {
    case 'admin':
      tmpRoleName = 'ผู้ดูแล'
      break
    case 'manager':
      tmpRoleName = 'ผู้จัดการ'
      break
    case 'coordinator':
      tmpRoleName = 'ผู้ประสานงาน'
      break
    case 'student':
      tmpRoleName = 'นักศึกษา'
      break
    case 'viewer':
      tmpRoleName = 'ผู้ชม'
      break
  }
  return tmpRoleName
}
