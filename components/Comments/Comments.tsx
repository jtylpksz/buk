'use client';

import {
  Textarea,
  Text,
  Card,
  Button,
  Group,
  Menu,
  ActionIcon,
  rem,
} from '@mantine/core';
import { IconDots, IconTrash } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Toaster, toast } from 'sonner';
import { Logger } from 'next-axiom';

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
  const [auth, setAuth] = useState(false);
  const [comments, setComments] = useState(data);
  const [pending, setPending] = useState(false);

  const commentBody: any = useRef<HTMLTextAreaElement>(null);

  const log = new Logger();

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
      log.error('Error Comments', error);
      toast.error('Something went wrong, please try again!');
    } else {
      setComments(data[0].comments);
      setPending(false);
      toast.success('Comment submitted successfully!');
      log.info('Comment submitted successfully!');
      commentBody.current.value = '';
    }
  };

  const deleteComment = async (event: any) => {
    const commentID = event.currentTarget.id; // get the comment.id from the `delete` button

    const confirmation = window.confirm(
      'Are you sure you want to delete this comment?'
    );

    if (!confirmation) {
      return;
    }

    // Filter all the comments except the one we want to delete
    const filteredComments = comments.filter(
      (comment) => comment.id !== commentID
    );

    const { error } = await supabase
      .from(POSTS_TABLE)
      .update({ comments: filteredComments })
      .eq('id', id);

    if (error) {
      console.log(error);
      log.error('Error delete Comments', error);
      toast.error('Something went wrong, please try again!');
    }

    toast.success('Comment deleted successfully!');
    window.location.reload();
  };

  useEffect(() => {
    const username: any = localStorage?.getItem('username');
    const auth: any = localStorage?.getItem('auth');

    if (username && auth) {
      log.debug(`Username: ${username}, Auth: ${auth}`);
      setUsername(username);
      setAuth(auth);
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
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <Text fw={500}>{comment.author}</Text>
              {comment.author === username && auth ? (
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
                      id={comment.id}
                      onClick={deleteComment}
                      leftSection={
                        <IconTrash
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                      color="red"
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : null}
            </Group>
          </Card.Section>

          <Text size="md" c="dimmed" mt="sm">
            {comment.body}
          </Text>
        </Card>
      ))}
      <Toaster richColors />
    </>
  );
};

export default Comments;
