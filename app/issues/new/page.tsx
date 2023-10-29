'use client'
import { TextArea, TextFieldInput, TextFieldRoot, Button, Callout } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';



interface IssueForm {
    title: string;
    description: string
}



const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<IssueForm>();
    const [error, setError] = useState('')
    const onSubmit = async (data: IssueForm) => {
        try {
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
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
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <Button>Sumbit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage