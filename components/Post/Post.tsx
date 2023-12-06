'use client';

import { Card, Text, Button, Group, Flex, Menu, rem } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { IconDots, IconTrash } from '@tabler/icons-react';
import { supabase } from '@/lib/supabaseClient';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { POSTS_TABLE } from '@/keys/keys';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IconShare } from '@tabler/icons-react';

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

  const like = (event: any) => {
    event.preventDefault();
    setLikesCount(likesCount + 1);
    sendLikesCountToDB(likesCount + 1);
  };

  const comment = () => {
    router.push(`/post?id=${id}`);
  };

  const deletePost = async (event: any) => {
    event.preventDefault();
    const confirmation = window.confirm(
      'Are you sure you want to delete this post?'
    );

    if (!confirmation) {
      return;
    }

    const { error } = await supabase.from(POSTS_TABLE).delete().eq('id', id);

    if (error) {
      console.log('error', error);
    }

    window.location.href = '/';
  };

  const sharePost = (event: any) => {
    event.preventDefault()
    alert(`Here is the url to share the post:\nhttps://buk.vercel.app/post?id=${id}`);
  };

  return (
    <Link href={`/post?id=${id}`}>
      <Card shadow="sm" padding="lg" radius="md" mb={15} withBorder>
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500}>Posted by {author}</Text>
            <Menu withinPortal position="bottom-end" shadow="sm">
              <Menu.Target>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={(event) => event.preventDefault()}
                >
                  <IconDots style={{ width: rem(16), height: rem(16) }} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  leftSection={
                    <IconShare style={{ width: rem(14), height: rem(14) }} />
                  }
                  onClick={sharePost}
                >
                  Share
                </Menu.Item>
                {author === localStorage?.getItem('username') ? (
                  <Menu.Item
                    onClick={deletePost}
                    leftSection={
                      <IconTrash style={{ width: rem(14), height: rem(14) }} />
                    }
                    color="red"
                  >
                    Delete
                  </Menu.Item>
                ) : null}
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Card.Section>
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
