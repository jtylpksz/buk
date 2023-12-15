'use server';

import { revalidateTag } from 'next/cache';
import { Logger } from 'next-axiom';

import { supabase } from '@/lib/supabaseClient';
import { POSTS_TABLE } from '@/keys/keys';

export const submitPostToDB = async (_prevState: any, formData: FormData) => {
  const title = formData.get('title');
  const content = formData.get('content');
  const username = formData.get('username');

  const log = new Logger();

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
    log.error('Error creating post:', error);
    return {
      message: 'Error creating post, please try again later',
      success: false,
      username: username,
    };
  }
  revalidateTag('posts');

  log.info('Post created successfully');
  return {
    message: 'Post created successfully!',
    success: true,
    username: username,
  };
};
