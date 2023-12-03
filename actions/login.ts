'use server';
import { USERS_TABLE } from '@/keys/keys';
import { supabase } from '@/lib/supabaseClient';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import { decrypt } from '@/lib/security/decrypt';

export const login = async (formData: FormData) => {
  const username = formData.get('username');
  const password = formData.get('password');

  const { data, error } = await supabase
    .from(USERS_TABLE)
    .select()
    .eq('username', username);

  if (error) {
    throw new Error(error.message);
  }

  const decryptedPasswordFromDB = decrypt(data[0].password);

  if (decryptedPasswordFromDB.message === password) {
    cookies().set('token', randomUUID());
    console.log('Login successful!');
    return;
  }
  console.log('Passwords do not match!');
  // TODO: Add toast message
};
