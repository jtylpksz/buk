'use server';

import { supabase } from '@/lib/supabaseClient';
import { POSTS_TABLE } from '@/keys/keys';
import { revalidateTag } from 'next/cache';

export const submitPostToDB = async (_prevState: any, formData: FormData) => {
  const title = formData.get('title');
  const content = formData.get('content');
  const username = formData.get('username');

  // Use cases
  if (!title || !content) {
    return {
      message: 'Please fill in all fields',
      success: false,
      username: username,
    };
  }

  if (!username) {
    return {
      message: 'You must be logged in to create a post',
      success: false,
      username: username,
    };
  }

  // Principal use case
  const post = {
    author: username,
    title,
    content,
  };

  const { error } = await supabase.from(POSTS_TABLE).insert([post]);

  if (error) {
    console.log(error);
    return {
      message: 'Error creating post, please try again later',
      success: false,
      username: username,
    };
  }
  revalidateTag('posts');

  return {
    message: 'Post created successfully!',
    success: true,
    username: username,
  };
};
