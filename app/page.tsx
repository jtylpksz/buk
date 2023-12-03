import HomePageMain from '@/components/HomePageSection/HomePageMain';
import { POSTS_TABLE } from '@/keys/keys';
import { supabase } from '@/lib/supabaseClient';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

type Post = {
  id: string;
  author: string;
  title: string;
  content: string;
  created_at: string;
};

export const dynamic = 'force-dynamic'; // Prevent caching

const getPosts = async () => {
  const { data: posts, error }: PostgrestSingleResponse<Post[]> = await supabase
    .from(POSTS_TABLE)
    .select('*')
    .order('created_at');

  if (error) {
    console.log(error);
  }

  return posts;
};

const Home = async () => {
  const posts: Post[] | null = await getPosts();

  return <HomePageMain posts={posts} />;
};

export default Home;
