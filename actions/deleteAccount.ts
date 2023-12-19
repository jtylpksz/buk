'use server';

import { Logger } from 'next-axiom';

import { supabase } from '@/lib/supabaseClient';
import { USERS_TABLE } from '@/keys/keys';
import { decrypt } from '@/lib/security/decrypt';
import { sendErrorToClient } from '@/lib/sendErrorToClient';

export const deleteAccount = async (_prevState: any, formData: FormData) => {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const log = new Logger();

  if (!username || !password) {
    return sendErrorToClient('Please fill in all fields');
  }

  const { data: passwordUserOnDB }: any = await supabase
    .from(USERS_TABLE)
    .select('password')
    .eq('username', username);

  const passwordOnDB = passwordUserOnDB[0].password;

  if (decrypt(passwordOnDB).message === password) {
    const { error } = await supabase
      .from(USERS_TABLE)
      .delete()
      .eq('username', username);

    if (error) {
      log.error(`deleteAccount: ${error.message}`);
      return sendErrorToClient('Something went wrong');
    }

    log.info('deleteAccount: Account deleted successfully.');

    return {
      message: 'Account deleted successfully.',
      success: true,
      username: username,
    };
  }
  return sendErrorToClient('Wrong password!');
};
