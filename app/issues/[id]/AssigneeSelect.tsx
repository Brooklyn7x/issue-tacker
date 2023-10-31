'use client'
import { Issue } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from 'next-auth';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const { data: users, error, isLoading } = useUsers();
    if (isLoading) return <Skeleton />;
    if (error) return null;

    const assignIsssued = (userId: string) => {
        axios.patch('/api/issues/' + issue.id, { assignedToUserId: userId || null, }).catch(() => {
            toast.error('Changed could not be saved.')
        });
    }

    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || ""}
                onValueChange={assignIsssued}>
                <Select.Trigger placeholder='Assign...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value="null">Unassigned</Select.Item>
                        {users?.map(user => (
                            <Select.Item key={user.id} value={user.id}>
                                {user.name}
                            </Select.Item>)
                        )}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    );

};
export default AssigneeSelect;

const useUsers = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3,
});