import prisma from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { IssueStatusBadge } from './components'

const LastestIssues = async () => {
    const issue = await prisma.issue.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
            assignedToUser: true
        }
    })

    return (
        <Card>
            <Heading size='4' mb='3'>Lastest Issues</Heading>
            <Table.Root>
                <Table.Body>
                    {issue.map(issue => <Table.Row key={issue.id}>
                        <Table.Cell>
                            <Flex justify='between'>
                                <Flex direction='column' align='start' gap='2'>
                                    <Link href={`/issues/${issue.id}`}> {issue.title}</Link>
                                    <IssueStatusBadge status={issue.status} />
                                </Flex>
                                {issue.assignedToUser && (
                                    <Avatar src={issue.assignedToUser.image!}
                                        fallback="?" size='2'
                                        radius='medium' />
                                )}
                            </Flex>

                        </Table.Cell>
                    </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </Card>
    )
}

export default LastestIssues