'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from 'next-axiom';

import { USERS_TABLE } from '@/keys/keys';
import { supabase } from '@/lib/supabaseClient';
import { decrypt } from '@/lib/security/decrypt';
import { sendErrorToClient } from '@/lib/sendErrorToClient';

export const login = async (_prevState: any, formData: FormData) => {
  const username = formData.get('username');
  const password = formData.get('password');

  const log = new Logger();

  // Syncronize data with supabase, this is useful if you changed your password
  revalidateTag('users');

  if (!username || !password) {
    return sendErrorToClient('Please fill in all fields');
  }

  const { data, error } = await supabase
    .from(USERS_TABLE)
    .select()
    .eq('username', username);

  if (error) {
    console.error(error);
    log.error(error.message);
    return sendErrorToClient('Something went wrong!');
  }

  if (data?.length === 0 || data === null) {
    return sendErrorToClient('User not found!');
  }

  const decryptedPasswordFromDB = decrypt(data[0].password);

  // Use cases

  if (
    decryptedPasswordFromDB.message ===
    'Error decrypting data, please report the issue on GitHub'
  ) {
    log.error(decryptedPasswordFromDB.message);
    return decryptedPasswordFromDB;
  }

  if (decryptedPasswordFromDB.message === password) {
    cookies().set('token', uuidv4());
    log.info('Login successful!', data[0].username);

    return {
      message: 'Login successful!',
      success: true,
      username: data[0].username,
    };
  }
  return sendErrorToClient('Login failed, check your credentials.');
};
