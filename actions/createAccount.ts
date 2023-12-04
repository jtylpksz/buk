'use server';

import { USERS_TABLE } from '@/keys/keys';
import { supabase } from '@/lib/supabaseClient';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import { encrypt } from '@/lib/security/encrypt';

export const createAccount = async (_prevState: any, formData: FormData) => {
  const username = formData.get('username');
  const password = formData.get('password');

  const { error } = await supabase.from(USERS_TABLE).insert({
    username: username,
    password: encrypt(password),
  });

  if (error) {
    console.error(error.message);

    return {
      message: 'Something went wrong!',
      success: false,
    };
  }

  cookies().set('token', randomUUID());

  return {
    message: 'Account created successfully!',
    success: true,
  };
};
