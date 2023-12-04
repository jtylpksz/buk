'use client';
import { Textarea, Button, Text, Card } from '@mantine/core';
import { useRef, useState } from 'react';

import { supabase } from '@/lib/supabaseClient';
import { POSTS_TABLE } from '@/keys/keys';

type CommentType = {
  id: string;
  author: string;
  body: string;
};

const Comments = ({ data, id }: { data: CommentType[]; id: string }) => {
  const [comments, setComments] = useState(data);
  const commentBody = useRef<HTMLTextAreaElement>(null);

  const commentPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = commentBody.current?.value;

    // TODO const author = localStorage.getItem('username');
    const newComment = {
      author: 'Anonymous',
      body: body,
    }

    const { data, error } = await supabase
      .from(POSTS_TABLE)
      .update({ comments: [...comments, newComment] })
      .eq('id', id)
      .select();

    if (error) {
      console.log(error);
    } else {
      setComments(data[0].comments);
    }
  };

  return (
    <>
      <form onSubmit={commentPost}>
        <Textarea
          label="Comment"
          placeholder="What are your thoughts?"
          name="comment"
          ref={commentBody}
          autosize
          minRows={2}
          maxRows={4}
          mb="sm"
          required
        />
        <Button type="submit">Comment</Button>
      </form>

      <Text size="md" mt="md">
        Comments
      </Text>
      {comments?.map((comment: CommentType) => (
        <Card shadow="sm" padding="md" radius="md" mb={15} key={comment.id}>
          <Text size="sm">{comment.author}</Text>
          <Text size="md" c="dimmed">{comment.body}</Text>
        </Card>
      ))}
    </>
  );
};

export default Comments;
