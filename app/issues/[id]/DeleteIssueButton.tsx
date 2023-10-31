'use client'
import { Spinner } from '@/app/components'
import { Flex } from '@radix-ui/themes'
import { AlertDialog, Button } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'



const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    
    const router = useRouter()
    const [error, setError] = useState(false)
    const [isDeleting, setDeleting] = useState(false)
    const onDelete = async () => {
        try {
            setDeleting(true)
            await axios.delete('/api/issues/' + issueId)
            router.push('/issues')
            router.refresh();
        } catch (error) {
            setDeleting(false)
            setError(true)

        }

    }
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='red' disabled={isDeleting}>Delete Issue
                        {isDeleting && <Spinner />}
                    </Button>
                </AlertDialog.Trigger>

                <AlertDialog.Content style={{ maxWidth: 350 }}>
                    <AlertDialog.Title >Confirm Deletion</AlertDialog.Title>
                    <Flex mt='4' gap='3'>
                        <AlertDialog.Cancel >
                            <Button variant='outline' color='gray'>Cancel </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Cancel >
                            <Button variant='soft' color='red' onClick={onDelete}>Delete Issue</Button>
                        </AlertDialog.Cancel>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content style={{ maxWidth: 300 }}>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>This issue could be deleted.</AlertDialog.Description>
                    <Button color='gray' variant='surface' mt='2' onClick={() => setError(false)}>OK</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton