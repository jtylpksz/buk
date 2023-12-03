import { Text, TextInput, Textarea, Input, Container } from '@mantine/core';
import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';
import { POSTS_TABLE } from '@/keys/keys';

const SubmitPost = () => {
  const submitPostToDB = async (formData: FormData) => {
    'use server';

    const title = formData.get('title');
    const content = formData.get('content');

    const post = {
      author: 'John Doe',
      title,
      content,
    };

    const { error } = await supabase.from(POSTS_TABLE).insert([post]);

    if (error) {
      console.log(error);
    }

    redirect('/');
  };

  return (
    <Container size="xs">
      <form action={submitPostToDB}>
        <Text size="xl">Create Post</Text>
        <TextInput
          mt="sm"
          placeholder="Type here your title"
          name="title"
          autoComplete='off'
          autoFocus
          required
        />
        <Textarea
          mt="sm"
          placeholder="Type here your content"
          name="content"
          autoComplete='off'
          rows={5}
          required
        />

        <Input mt="sm" type="submit" value="Create Post" variant="filled" />
      </form>
    </Container>
  );
};

export default SubmitPost;
