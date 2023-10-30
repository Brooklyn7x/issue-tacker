import { Pencil2Icon } from '@radix-ui/react-icons'
import { Box, Button, Link } from '@radix-ui/themes'
import React from 'react'

const EditIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Box>
            <Button>
                <Pencil2Icon />
                <Link href={`/issues/${issueId}/edit`}> Edit Issue</Link>
            </Button>
        </Box>
    )
}

export default EditIssueButton