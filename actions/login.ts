'use server';
import { USERS_TABLE } from '@/keys/keys';
import { supabase } from '@/lib/supabaseClient';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
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
    cookies().set('token', randomUUID());

    return {
      message: 'Login successful!',
      success: true,
    };
  }
  return {
    message: 'Login failed, check your credentials.',
    success: false,
  };
};
