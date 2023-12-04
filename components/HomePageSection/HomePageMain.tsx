'use client';

import CreatePostForm from '../CreatePostForm/CreatePostForm';
import Post from '../Post/Post';
import { Container } from '@mantine/core';

type PostType = {
  id: number;
  author: string;
  title: string;
  content: string;
  likes: number;
  comments: Array<Comment>;
};

type Comment = {
  author: string;
  body: string;
};

const HomePageMain = ({ posts }: { posts: PostType[] | null }) => {
  return (
    <Container size="xs">
      <CreatePostForm />

      {posts?.length === 0 && <p>No posts yet. Be the first!</p>}

      {posts?.map((post) => <Post key={post.id} data={post} />)}
    </Container>
  );
};

export default HomePageMain;
