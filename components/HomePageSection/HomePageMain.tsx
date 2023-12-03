'use client';

import CreatePostForm from '../CreatePostForm/CreatePostForm';
import Post from '../Post/Post';
import { Container } from '@mantine/core';

type PostType = {
  author: string;
  title: string;
  content: string;
  likes: number;
  comments: Array<Comment>;
};

type Comment = {
  author: string;
  body: string;
}

const HomePageMain = ({ posts }: { posts: PostType[] | null }) => {
  return (
    <Container size="xs">
      <CreatePostForm />

      {posts?.length === 0 && <p>No posts yet. Be the first!</p>}

      {posts?.map((post) => (
        <Post
          key={post.title}
          author={post.author}
          title={post.title}
          content={post.content}
          likes={post.likes}
        />
      ))}
    </Container>
  );
};

export default HomePageMain;
