import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'


interface Props {
    open: number;
    inProgress: number;
    closed: number
}

const IssuesSummary = ({ open, inProgress, closed }: Props) => {
    const status: {
        label: string,
        value: number,
        status: Status
    }[] = [
            { label: 'Open Issues', value: open, status: 'OPEN' },
            { label: 'Closed Issues', value: closed, status: 'CLOSED' },
            { label: 'In Progress Issues', value: inProgress, status: 'IN_PROGRESS' }
        ]
    return (
        <Flex gap='4'>
            {status.map(status => (
                <Card key={status.label}>
                    <Flex direction='column' gap="1">
                        <Link className='text-sm' href={`/issues/status=${status.status}`}>
                            {status.label}
                        </Link>
                        <Text size='5' className='font-bold'>{status.value}</Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    )
}

export default IssuesSummary