'use server';

import { USERS_TABLE } from '@/keys/keys';
import { supabase } from '@/lib/supabaseClient';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import { encrypt } from '@/lib/security/encrypt';

export const createAccount = async (formData: FormData) => {
  const username = formData.get('username');
  const password = formData.get('password');

  const { error } = await supabase.from(USERS_TABLE).insert({
    username: username,
    password: encrypt(password),
  });

  if (error) {
    throw new Error(error.message);
  }

  cookies().set('token', randomUUID());
};
