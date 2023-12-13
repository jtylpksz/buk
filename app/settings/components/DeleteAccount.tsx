'use client';

import { Button, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Toaster, toast } from 'sonner';
import { useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { USERS_TABLE } from '@/keys/keys';
import { decrypt } from '@/lib/security/decrypt';

const DeleteAccountModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const passwordRef: any = useRef<HTMLInputElement>(null);

  const deleteAccount = async (event: React.FormEvent) => {
    event.preventDefault();

    const username = localStorage.getItem('username');
    const password = passwordRef.current.value;

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
        toast.error('Something went wrong.');
        throw new Error(error.message);
      }
      
      toast.success('Account deleted successfully.');
      localStorage.removeItem('auth')
      localStorage.removeItem('username');
      window.location.href = '/';
      return;
    }
    toast.error('Passwords do not match.');
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Account" centered>
        <form onSubmit={deleteAccount}>
          <TextInput
            mt="md"
            label="Your password"
            placeholder="Write here your password"
            name="currentPassword"
            ref={passwordRef}
            data-cy="passwordInput"
            required
            type="password"
          />

          <Button
            type="submit"
            mt="xl"
            fullWidth
            data-cy="deleteAccountButton"
          >
            Delete Account
          </Button>
        </form>
      </Modal>

      <Button onClick={open} data-cy="deleteAccountOpenModalButton">
        Delete Your Account
      </Button>

      <Toaster richColors />
    </>
  );
};

export default DeleteAccountModal;
