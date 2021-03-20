import { DashboardAnalysisSection } from '../components/Sections/DashboardIntro'
import { StatCardSection } from '../components/Sections/StatCard'
import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { AuthContext } from '../../../core/contexts/auth_context'
import { ChartInfoSection } from '../components/Sections/ChartInfo'

function Index() {
  const router = useRouter()
  const authContext = useContext(AuthContext)
  const { code, state } = router.query

  useEffect(() => {
    if (code && state) {
      authContext.SITLogin(code, state)
    }
  }, [authContext, code, state])

  return (
    <>
      <div style={{ height: '1300px' }} className="relative overflow-hidden bg-grey-fbfcfd">
        <DashboardAnalysisSection />
        <StatCardSection />
      </div>
      <ChartInfoSection />
    </>
  )
}

export default Index
