
import LastestIssues from './LastestIssues'
import IssuesSummary from './IssuesSummary'
import prisma from '@/prisma/client'
import IssueCharts from './IssueCharts'
import { Flex, Grid } from '@radix-ui/themes'
import { Metadata } from 'next'

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })

  return (
    <Grid columns={{ initial: '1', md: "2" }} gap="5" >
      <Flex direction='column' gap='5'>
        <IssuesSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueCharts open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LastestIssues />
    </Grid>
  )
}

export const metadata: Metadata = {
  title: 'Issue Tacker - Dashboard',
  description: 'View a summary of project issues'
}