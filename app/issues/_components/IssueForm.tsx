'use client'
import { TextArea, TextFieldInput, TextFieldRoot, Button, Callout, Text } from '@radix-ui/themes'
import dynamic from 'next/dynamic';
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validateSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

type IssueFormData = z.infer<typeof createIssueSchema>;
// interface IssueFormData {
//     title: string;
//     description: string
// }


const IssueForm = ({ issue }: { issue?: Issue }) => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('')
    const [issumit, setIsSumit] = useState(false)
    const onSubmit = async (data: IssueFormData) => {
        try {
            setIsSumit(true)
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setIsSumit(false)
            setError('SomeThing went wrong.')
        }
    };
    return (
        <div className='max-w-xl '>
            {error && <Callout.Root color='red' className='mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
                <TextFieldRoot>
                    <TextFieldInput placeholder='Title' defaultValue={issue?.title} {...register('title')} />
                </TextFieldRoot>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => (
                        <SimpleMDE placeholder='Description' {...field} />)}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={issumit}>Sumbit New Issue{issumit && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default IssueForm