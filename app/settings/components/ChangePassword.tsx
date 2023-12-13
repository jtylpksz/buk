'use client';

import { useDisclosure } from '@mantine/hooks';
import { Button, Modal, TextInput } from '@mantine/core';
import { Toaster, toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';
import { useRef } from 'react';
import { USERS_TABLE } from '@/keys/keys';
import { encrypt } from '@/lib/security/encrypt';
import { decrypt } from '@/lib/security/decrypt';

const ChangePasswordModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const currentPasswordRef: any = useRef<HTMLInputElement>(null);
  const newPasswordRef: any = useRef<HTMLInputElement>(null);

  const changePassword = async (event: React.FormEvent) => {
    event.preventDefault();

    const username = localStorage.getItem('username');
    const currentPassword = currentPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    console.table({ username, currentPassword, newPassword });

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
        toast.error('Something went wrong.');
        throw new Error(error.message);
      }

      toast.success('Password changed successfully.');
      return;
    }
    toast.error('Passwords do not match.');
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Change Password" centered>
        <form onSubmit={changePassword}>
          <TextInput
            mt="md"
            label="Your current password"
            placeholder="Your current password"
            name="currentPassword"
            ref={currentPasswordRef}
            data-cy="currentPasswordInput"
            type="password"
            required
          />
          <TextInput
            mt="md"
            label="New Password"
            placeholder="Your new Password"
            name="password"
            ref={newPasswordRef}
            data-cy="newPasswordInput"
            type="password"
            required
          />

          <Button
            type="submit"
            mt="xl"
            fullWidth
            data-cy="changePasswordButton"
          >
            Change Password
          </Button>
        </form>
      </Modal>

      <Button onClick={open} data-cy="changePasswordOpenModalButton">
        Change your password
      </Button>

      <Toaster richColors />
    </>
  );
};

export default ChangePasswordModal;
