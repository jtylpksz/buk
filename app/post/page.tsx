import Post from '@/components/Post/Post';
import { POSTS_TABLE } from '@/keys/keys';
import { supabase } from '@/lib/supabaseClient';
import { Container } from '@mantine/core';
import Comments from '@/components/Comments/Comments';

const getData = async (id: string) => {
  const { data, error } = await supabase
    .from(POSTS_TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
};

export const dynamic = 'force-dynamic';

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
