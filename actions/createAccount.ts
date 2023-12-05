'use server';

import { USERS_TABLE } from '@/keys/keys';
import { supabase } from '@/lib/supabaseClient';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '@/lib/security/encrypt';

export const createAccount = async (_prevState: any, formData: FormData) => {
  const username = formData.get('username');
  const password = formData.get('password');

  const { error } = await supabase.from(USERS_TABLE).insert({
    username: username,
    password: encrypt(password),
  });

  const message = `duplicate key value violates unique constraint "${USERS_TABLE}_username_key"`
  if (error?.message.includes(message)) {
    return {
      message: 'Username already exists!',
      success: false,
    };
  }

  if (error) {
    console.error(error.message);

    return {
      message: 'Something went wrong!',
      success: false,
    };
  }

  cookies().set('token', uuidv4());

  return {
    message: 'Account created successfully!',
    success: true,
    username: username,
  };
};
