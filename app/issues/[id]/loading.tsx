import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Box, Card, Flex, Heading } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Skeleton } from '@/app/components'


const LoadingIssueDetailPage = () => {
    return (
        <Box className='max-w-xl'>
            <Skeleton />
            <Flex className='space-x-3 ' my="2">
                <Skeleton width='5rem' />
                <Skeleton />
            </Flex>
            <Card className='prose' mt="4">
                <Skeleton count={3} />
            </Card>
        </Box>
    )
}

export default LoadingIssueDetailPage