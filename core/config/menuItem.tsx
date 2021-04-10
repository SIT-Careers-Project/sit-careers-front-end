import {
  Business,
  People,
  Assignment,
  SaveAlt,
  AssignmentTurnedIn,
  AccountBox
} from '@material-ui/icons'

export const navLink = [
  { path: '/', name: 'หน้าหลัก', permission: 'general' },
  { path: '/academic-industry/announcements', name: 'ประกาศรับสมัครงาน', permission: 'general' },
  { path: '/company/all-company', name: 'ข้อมูลบริษัท', permission: 'general' },
  { path: '/dashboard/info', name: 'Dashboard', permission: 'access_dashboard' }
]

export const dropdownLinkAdmin = [
  {
    path: '/resume/info',
    name: 'โปรไฟล์สมัครงาน',
    icon: <AccountBox />,
    role: ['admin', 'student'],
    permission: ['access_resume', 'create_resume']
  },
  {
    path: '/company/company-table',
    name: 'จัดการข้อมูลบริษัท',
    icon: <Business />,
    role: ['admin', 'manager', 'coordinator'],
    permission: ['access_company', 'create_company']
  },
  {
    path: '/academic-industry/info-management',
    name: 'ลงประกาศรับสมัครงาน',
    icon: <Assignment />,
    role: ['admin', 'manager', 'coordinator'],
    permission: ['access_academic_announcement', 'create_academic_announcement']
  },
  {
    path: '/academic-industry/applications/history',
    name: 'ประวัติการสมัครงาน',
    icon: <AssignmentTurnedIn />,
    role: ['admin', 'student', 'manager', 'coordinator'],
    permission: ['access_history']
  },
  {
    path: '/report-management/info',
    name: 'ดาวห์โหลดรายงานสรุป',
    icon: <SaveAlt />,
    role: ['admin'],
    permission: ['access_dashboard']
  },
  {
    path: '/user-management/info',
    name: 'จัดการผู้ใช้งาน',
    icon: <People />,
    role: ['admin'],
    permission: ['access_user']
  }
]
