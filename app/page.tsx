import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { Suspense } from 'react';

import HomePageMain from '@/components/HomePageMain/HomePageMain';
import { POSTS_TABLE } from '@/keys/keys';
import { supabase } from '@/lib/supabaseClient';
import Loader from '@/components/SkeletonLoader/Loader';

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

export const dynamic = 'force-dynamic'; // Prevent caching

const getPosts = async (pages: number) => {
  const { data: posts, error }: PostgrestSingleResponse<PostType[]> =
    await supabase.from(POSTS_TABLE).select('*').order('created_at');

  if (error) {
    console.error(error);
    return null;
  }

  // 10 posts per page, next page you will get the next 10 posts on the Array
  const postsAmountPerPage = posts?.slice(pages * 20, 20 * (pages + 1)) ?? null;

  return postsAmountPerPage;
};

const Home = async ({ searchParams }: { searchParams: { page: number } }) => {
  const posts: PostType[] | null = await getPosts(searchParams?.page || 0);

  return (
    <Suspense fallback={<Loader />}>
      <HomePageMain posts={posts} />
    </Suspense>
  );
};

export default Home;
