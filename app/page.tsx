import Image from 'next/image'
import Pagination from './components/Pagination'
import LastestIssues from './LastestIssues'
import IssuesSummary from './IssuesSummary'
import prisma from '@/prisma/client'
import IssueCharts from './IssueCharts'

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })

  return (
    // <LastestIssues />
    <IssueCharts open={open} inProgress={inProgress} closed={closed} />
  )
}
