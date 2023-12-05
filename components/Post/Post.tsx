'use client';

import { Card, Text, Button, Group, Flex } from '@mantine/core';
import { supabase } from '@/lib/supabaseClient';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { POSTS_TABLE } from '@/keys/keys';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Post = {
  id: number;
  author: string;
  title: string;
  content: string;
  likes: number;
  comments: Array<Comment>;
  data: any;
};

const Post = ({ data }: Post) => {
  const { id, author, title, content, likes, comments } = data;
  const [likesCount, setLikesCount] = useState(likes);
  const router = useRouter();

  const sendLikesCountToDB = useDebouncedCallback(async (count) => {
    const { error } = await supabase
      .from(POSTS_TABLE)
      .update({ likes: count })
      .eq('id', id)
      .select();

    if (error) {
      console.log('error', error);
    }
  }, 300);

  const like = (event: React.FormEvent) => {
    event.preventDefault();
    setLikesCount(likesCount + 1);
    sendLikesCountToDB(likesCount + 1);
  };

  const comment = () => {
    router.push(`/post?id=${id}`);
  };

  return (
    <Link href={`/post?id=${id}`}>
      <Card shadow="sm" padding="lg" radius="md" mb={15} withBorder>
        <Text size="sm">Posted by {author}</Text>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{title}</Text>
        </Group>

        <Text size="sm" c="dimmed">
          {content}
        </Text>

        <Flex gap={5}>
          <Button
            onClick={like}
            variant="light"
            color="blue"
            mt="md"
            radius="md"
          >
            {likesCount} Likes
          </Button>
          <Button
            onClick={comment}
            variant="light"
            color="orange"
            mt="md"
            radius="md"
          >
            {comments.length} Comments
          </Button>
        </Flex>
      </Card>
    </Link>
  );
};

export default Post;
