import { Container } from '@mantine/core';
import { Logger } from 'next-axiom';

import Post from '@/components/Post/Post';
import { POSTS_TABLE } from '@/keys/keys';
import { supabase } from '@/lib/supabaseClient';
import Comments from '@/components/Comments/Comments';

// Disable cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const getData = async (id: string) => {
  const log = new Logger();
  const { data, error } = await supabase
    .from(POSTS_TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    log.error(error.message);
  }

  log.info('Post data successfully fetched');
  return data;
};

const post = async ({ searchParams }: { searchParams: { id: string } }) => {
  const { id } = searchParams;
  const postData = await getData(id);

  return (
    <Container size="xs">
      <Post data={postData} />
      <Comments data={postData?.comments} id={id} />
    </Container>
  );
};

export default post;
