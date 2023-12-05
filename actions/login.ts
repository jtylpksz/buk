'use server';

import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

import { USERS_TABLE } from '@/keys/keys';
import { supabase } from '@/lib/supabaseClient';
import { decrypt } from '@/lib/security/decrypt';

export const login = async (_prevState: any, formData: FormData) => {
  const username = formData.get('username');
  const password = formData.get('password');

  const { data, error } = await supabase
    .from(USERS_TABLE)
    .select()
    .eq('username', username);

  if (error) {
    console.error(error.message);

    return {
      message: 'Something went wrong!',
      success: false,
    };
  }

  const decryptedPasswordFromDB = decrypt(data[0].password);

  if (decryptedPasswordFromDB.message === password) {
    cookies().set('token', uuidv4());

    return {
      message: 'Login successful!',
      success: true,
      username: data[0].username,
    };
  }
  return {
    message: 'Login failed, check your credentials.',
    success: false,
  };
};
