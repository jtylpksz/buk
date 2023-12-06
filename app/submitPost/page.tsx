'use client';

import { Text, TextInput, Textarea, Container } from '@mantine/core';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import { supabase } from '@/lib/supabaseClient';
import { POSTS_TABLE } from '@/keys/keys';
import { useRef } from 'react';
import { Toaster, toast } from 'sonner';

const SubmitPost = () => {
  const titleRef: any = useRef<HTMLInputElement>(null);
  const contentRef: any = useRef<HTMLTextAreaElement>(null);

  const submitPostToDB = async (event: React.FormEvent) => {
    event.preventDefault();
    const username = localStorage.getItem('username');
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    const post = {
      author: username,
      title,
      content,
    };

    const { error } = await supabase.from(POSTS_TABLE).insert([post]);

    if (error) {
      console.log(error);
      toast.error('Error creating post');
      return;
    }

    toast.success('Post created successfully');
    window.location.href = '/';
  };

  return (
    <>
      <Container size="xs">
        <form onSubmit={submitPostToDB}>
          <Text size="xl">Create Post</Text>
          <TextInput
            mt="sm"
            placeholder="Type here your title"
            name="title"
            autoComplete="off"
            autoFocus
            ref={titleRef}
            data-cy="postTitle"
            required
          />
          <Textarea
            mt="sm"
            placeholder="Type here your content"
            name="content"
            autoComplete="off"
            rows={5}
            ref={contentRef}
            data-cy="postContent"
            required
          />

          <SubmitButton
            defaultValue="Create Post"
            valueInRequest="Creating Post..."
            fullWidth
            mt="md"
            data-cy="createPostButton"
          />
        </form>
      </Container>
      <Toaster richColors />
    </>
  );
};

export default SubmitPost;
