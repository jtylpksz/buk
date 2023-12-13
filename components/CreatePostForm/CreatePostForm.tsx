'use client';

import { TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';

const CreatePostForm = () => {
  const router = useRouter();

  const redirectToSubmitPostPage = () => {
    router.push('/submitPost');
  };
  
  return (
    <TextInput
      mt="sm"
      mb="sm"
      placeholder="Create Post"
      onClick={redirectToSubmitPostPage}
      data-cy="createPostInput"
    />
  );
};

export default CreatePostForm;
