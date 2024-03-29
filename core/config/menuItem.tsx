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
    role: ['student'],
    permission: ['access_resume', 'create_resume']
  },
  {
    path: '/company/info',
    name: 'จัดการข้อมูลบริษัท',
    icon: <Business />,
    role: ['admin', 'manager', 'coordinator', 'viewer'],
    permission: ['access_company', 'create_company']
  },
  {
    path: '/academic-industry/info-management',
    name: 'ลงประกาศรับสมัครงาน',
    icon: <Assignment />,
    role: ['admin', 'manager', 'coordinator', 'viewer'],
    permission: ['access_academic_announcement', 'create_academic_announcement']
  },
  {
    path: '/academic-industry/applications/history',
    name: 'ประวัติการสมัครงาน',
    icon: <AssignmentTurnedIn />,
    role: ['admin', 'student', 'manager', 'coordinator', 'viewer'],
    permission: [
      'access_history',
      'access_announcement_resume_by_company',
      'access_announcement_resume_by_student'
    ]
  },
  {
    path: '/report-management/info',
    name: 'ดาวน์โหลดรายงานสรุป',
    icon: <SaveAlt />,
    role: ['admin'],
    permission: ['access_dashboard']
  },

  {
    path: '/user-management/info',
    name: 'จัดการผู้ใช้งาน',
    icon: <People />,
    role: ['admin', 'manager'],
    permission: ['access_user']
  }
]
