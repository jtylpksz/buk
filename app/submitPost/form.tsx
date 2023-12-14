'use client';

import { TextInput, Textarea, Container } from '@mantine/core';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';

import SubmitButton from '@/components/SubmitButton/SubmitButton';
import { submitPostToDB } from '@/actions/createPost';

const SubmitPostForm = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const [broadcast, formAction]: any = useFormState(submitPostToDB, {
    message: '',
    success: false,
    username: username,
  });

  useEffect(() => {
    const username: any = localStorage.getItem('username');
    setUsername(username);

    if (broadcast.success && broadcast.message) {
      toast.success(broadcast.message);
      router.push('/');
    } else if (!broadcast.success && broadcast.message) {
      toast.error(broadcast.message);
    }
  }, [broadcast]);

  return (
    <>
      <Container size="xs">
        <form action={formAction}>
          <h1>Create Post</h1>
          <TextInput
            mt="sm"
            placeholder="Type here your title"
            name="title"
            autoComplete="off"
            autoFocus
            data-cy="postTitle"
            required
          />
          <Textarea
            mt="sm"
            placeholder="Type here your content"
            name="content"
            autoComplete="off"
            rows={5}
            data-cy="postContent"
            required
          />
          <input type="hidden" name="username" value={username} />

          <SubmitButton
            defaultValue="Create Post"
            valueInRequest="Creating Post..."
            fullWidth
            mt="md"
            dataCy="createPostButton"
          />
        </form>
      </Container>
      <Toaster richColors />
    </>
  );
};

export default SubmitPostForm;
