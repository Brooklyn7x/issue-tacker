'use client'
import { TextArea, TextFieldInput, TextFieldRoot, Button, Callout, Text } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/createIssueSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';


type IssueForm = z.infer<typeof createIssueSchema>;
// interface IssueForm {
//     title: string;
//     description: string
// }



const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('')
    const [issumit, setIsSumit] = useState(false)
    const onSubmit = async (data: IssueForm) => {
        try {
            setIsSumit(true)
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setIsSumit(false)
            setError('SomeThing Wrong.')
        }
    };
    return (
        <div className='max-w-xl '>
            {error && <Callout.Root color='red' className='mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
                <TextFieldRoot>
                    <TextFieldInput placeholder='Title' {...register('title')} />
                </TextFieldRoot>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={issumit}>Sumbit New Issue{issumit && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default NewIssuePage