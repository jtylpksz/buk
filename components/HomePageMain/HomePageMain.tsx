'use client';

import { useEffect, useState } from 'react';
import { Button, Container, Flex } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import CreatePostForm from '../CreatePostForm/CreatePostForm';
import Post from '../Post/Post';

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
  const [auth, setAuth] = useState(false);

  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const pageNumber = pageParam ? parseInt(pageParam) : 0;

  useEffect(() => {
    const auth = localStorage.getItem('auth');

    if (auth === 'true') {
      setAuth(true);
    }
  }, []);

  return (
    <Container size="xs">
      {auth ? <CreatePostForm /> : null}

      {posts?.length === 0 && <p>No posts yet. Be the first!</p>}

      {posts?.map((post) => <Post key={post.id} data={post} />)}

      <Flex component="footer" justify="center" gap={10} pb={20}>
        {/* TODO: Change this invalid syntax (button inside anchor) */}

        {pageNumber > 0 ? (
          <Link
            href={{
              pathname: '/',
              query: { page: pageNumber - 1 < 0 ? 0 : pageNumber - 1 },
            }}
          >
            <Button>
              <IconArrowLeft /> Prev Page
            </Button>
          </Link>
        ) : null}

        {posts!.length > 20 ? (
          <Link
            href={{
              pathname: '/',
              query: { page: pageNumber + 1 },
            }}
          >
            <Button>
              Next Page <IconArrowRight />
            </Button>
          </Link>
        ) : null}
      </Flex>
    </Container>
  );
};

export default HomePageMain;
