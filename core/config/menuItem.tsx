import { Business, People, Assignment, SaveAlt, AssignmentTurnedIn } from '@material-ui/icons'

export const navLink = [
  { path: '/', name: 'หน้าหลัก' },
  { path: '/academic-industry/announcements', name: 'ประกาศรับสมัครงาน' },
  { path: '/company/all-company', name: 'ข้อมูลบริษัท' },
  { path: '/dashboard/info', name: 'Dashboard' }
]

export const dropdownLink = [
  { path: '/company/company-table', name: 'จัดการข้อมูลบริษัท', icon: <Business /> },
  { path: '/academic-industry/info-management', name: 'ลงประกาศรับสมัครงาน', icon: <Assignment /> },
  {
    path: '/academic-industry/applications/history',
    name: 'ประวัติการสมัครงาน',
    icon: <AssignmentTurnedIn />
  },
  { path: '/report-management/info', name: 'ดาวห์โหลดรายงานสรุป', icon: <SaveAlt /> },
  { path: '/user-management/info', name: 'จัดการผู้ใช้งาน', icon: <People /> }
]
