'use client';

import { Textarea, Text, Card, Button } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Toaster, toast } from 'sonner';

import { supabase } from '@/lib/supabaseClient';
import { POSTS_TABLE } from '@/keys/keys';

type CommentType = {
  id: string;
  author: string;
  body: string;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Comments = ({ data, id }: { data: CommentType[]; id: string }) => {
  const [username, setUsername] = useState('');
  const [comments, setComments] = useState(data);
  const [pending, setPending] = useState(false);

  const commentBody: any = useRef<HTMLTextAreaElement>(null);

  const commentPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    const body = commentBody.current?.value;
    const author = localStorage.getItem('username');

    const newComment = {
      id: uuidv4(),
      author: author,
      body: body,
    };

    const { data, error } = await supabase
      .from(POSTS_TABLE)
      .update({ comments: [...comments, newComment] })
      .eq('id', id)
      .select();

    if (error) {
      console.log(error);
      toast.error('Something went wrong, please try again!');
    } else {
      setComments(data[0].comments);
      setPending(false);
      toast.success('Comment submitted successfully!');
      commentBody.current.value = '';
    }
  };

  useEffect(() => {
    const username = localStorage.getItem('username');

    if (username) {
      setUsername(username);
    }
  }, []);

  return (
    <>
      {username ? (
        <form onSubmit={commentPost}>
          <Textarea
            label="Comment"
            placeholder="What are your thoughts?"
            name="body"
            ref={commentBody}
            data-cy="commentInput"
            autosize
            minRows={2}
            maxRows={4}
            mb="sm"
            required
          />

          <Button type="submit" data-cy="submitComment">
            {pending ? 'Submitting Comment...' : 'Comment'}
          </Button>
        </form>
      ) : (
        <Text size="sm" c="dimmed">
          Login to comment
        </Text>
      )}

      <Text size="md" fw={600} mt="md">
        Comments
      </Text>

      {comments.length === 0 ? (
        <Text size="sm">No comments yet, be the first!</Text>
      ) : null}

      {comments?.map((comment: CommentType) => (
        <Card shadow="sm" padding="md" radius="md" mb={15} key={comment.id}>
          <Text size="sm">{comment.author}</Text>
          <Text size="md" c="dimmed">
            {comment.body}
          </Text>
        </Card>
      ))}
      <Toaster richColors />
    </>
  );
};

export default Comments;
