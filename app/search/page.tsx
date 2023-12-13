import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { Suspense } from 'react';

import { POSTS_TABLE } from '@/keys/keys';
import { supabase } from '@/lib/supabaseClient';
import HomePageMain from '@/components/HomePageMain/HomePageMain';
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

// disable cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const getPosts = async (query: string) => {
  const { data: posts, error }: PostgrestSingleResponse<PostType[]> =
    await supabase
      .from(POSTS_TABLE)
      .select('*')
      .ilike('title', `%${query}%`)
      .order('created_at');

  if (error) {
    console.error(error);
    return null;
  }

  return posts;
};

const Search = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  const { query } = searchParams;
  const posts: PostType[] | null = await getPosts(query);

  return (
    <Suspense fallback={<Loader />}>
      <HomePageMain posts={posts} />
    </Suspense>
  );
};

export default Search;
