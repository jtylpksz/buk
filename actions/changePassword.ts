'use server';

import { supabase } from '@/lib/supabaseClient';

import { USERS_TABLE } from '@/keys/keys';
import { decrypt } from '@/lib/security/decrypt';
import { encrypt } from '@/lib/security/encrypt';
import { Logger } from 'next-axiom';
import { sendErrorToClient } from '@/lib/sendErrorToClient';

export const changePassword = async (_prevState: any, formData: FormData) => {
  const username = formData.get('username') as string;
  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;

  const log = new Logger();

  if (!currentPassword || !newPassword) {
    return sendErrorToClient('Please fill in all fields');
  }

  if (currentPassword === newPassword) {
    return sendErrorToClient(
      'New password must be different from current password'
    );
  }

  if (newPassword.length < 8) {
    return sendErrorToClient('Password must be at least 8 characters long');
  }

  if (newPassword.length > 24) {
    return sendErrorToClient('Password must be less than 24 characters long');
  }

  const { data: passwordUserOnDB }: any = await supabase
    .from(USERS_TABLE)
    .select('password')
    .eq('username', username);

  const passwordOnDB = passwordUserOnDB[0].password;

  if (decrypt(passwordOnDB).message === currentPassword) {
    const { error } = await supabase
      .from(USERS_TABLE)
      .update({ password: encrypt(newPassword) })
      .eq('username', username);

    if (error) {
      log.error(`changePassword: ${error.message}`);
      return sendErrorToClient('Something went wrong!');
    }

    log.info('Password changed successfully.');
    return {
      message: 'Password changed successfully.',
      success: true,
      username: username,
    };
  }
  return sendErrorToClient('Wrong password!');
};
