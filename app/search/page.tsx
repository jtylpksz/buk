import { POSTS_TABLE } from "@/keys/keys";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import HomePageMain from "@/components/HomePageMain/HomePageMain";

type Post = {
  id: string;
  author: string;
  title: string;
  content: string;
  created_at: string;
};

const getPosts = async (query: string) => {
  const { data: posts, error }: PostgrestSingleResponse<Post[]> = await supabase
    .from(POSTS_TABLE)
    .select('*')
    .ilike('title', `%${query}%`)
    .order('created_at');

  if (error) {
    console.log(error);
  }

  return posts;
};

const Search = async ({ searchParams }: { searchParams: { query: string } }) => { 
  const { query } = searchParams;
  const posts: Post[] | null = await getPosts(query);

  return <HomePageMain posts={posts} />;
}

export default Search;
