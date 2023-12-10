import { POSTS_TABLE } from "@/keys/keys";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import HomePageMain from "@/components/HomePageMain/HomePageMain";

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


const getPosts = async (query: string) => {
  const { data: posts, error }: PostgrestSingleResponse<PostType[]> = await supabase
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
  const posts: PostType[] | null = await getPosts(query);

  return <HomePageMain posts={posts} />;
}

export default Search;
