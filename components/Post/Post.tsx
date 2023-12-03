'use client';

import { Card, Text, Button, Group, Flex } from '@mantine/core';

type Post = {
  author: string;
  title: string;
  content: string;
  likes: number;
};

const Post = ({ author, title, content, likes }: Post) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" mb={15} withBorder>
      <Text size="sm">Posted by {author}</Text>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
      </Group>

      <Text size="sm" c="dimmed">
        {content}
      </Text>

      <Flex gap={5}>
        <Button variant="light" color="blue" mt="md" radius="md">
          {likes} Likes
        </Button>
        <Button variant="light" color="orange" mt="md" radius="md">
          Comment
        </Button>
      </Flex>
    </Card>
  );
};

export default Post;
