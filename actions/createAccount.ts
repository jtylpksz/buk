'use server';

import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from 'next-axiom';

import { USERS_TABLE } from '@/keys/keys';
import { supabase } from '@/lib/supabaseClient';
import { encrypt } from '@/lib/security/encrypt';
import { sendErrorToClient } from '@/lib/sendErrorToClient';

export const createAccount = async (_prevState: any, formData: FormData) => {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const log = new Logger();

  // Use cases
  if (!username || !password) {
    return sendErrorToClient('Please fill in all fields');
  }

  if (password.length < 8) {
    return sendErrorToClient('Password must be at least 8 characters long!');
  }

  if (password.length > 24) {
    return sendErrorToClient('Password must be less than 24 characters long!');
  }

  // Principal use case
  const { error } = await supabase.from(USERS_TABLE).insert({
    username: username,
    password: encrypt(password),
  });

  const message = `duplicate key value violates unique constraint "${USERS_TABLE}_username_key"`;
  if (error?.message.includes(message)) {
    return sendErrorToClient('Username already exists!');
  }

  if (error) {
    console.error(error.message);
    log.error('Error creating account:', error);
    return sendErrorToClient('Something went wrong!');
  }

  cookies().set('token', uuidv4());
  log.info('Account created successfully!');

  return {
    message: 'Account created successfully!',
    success: true,
    username: username,
  };
};
