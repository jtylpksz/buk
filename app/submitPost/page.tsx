import { cookies } from 'next/headers';
import { Container, Text } from '@mantine/core';

import SubmitPostForm from './form';

const userExist = () => {
  return cookies().get('token') ? true : false;
};

const SubmitPost = () => {
  if (!userExist()) {
    return (
      <Container size="xs">
        <h1>Create Post</h1>
        <Text>You need to be logged in to view this page.</Text>
      </Container>
    );
  }

  return <SubmitPostForm />;
};

export default SubmitPost;
