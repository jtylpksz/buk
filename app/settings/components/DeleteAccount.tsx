'use client';

import { Button, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Toaster, toast } from 'sonner';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import SubmitButton from '@/components/SubmitButton/SubmitButton';
import { deleteAccount } from '@/actions/deleteAccount';

const DeleteAccountModal = () => {
  const [username, setUsername] = useState('');
  const [opened, { open, close }] = useDisclosure(false);

  const [broadcast, formAction]: any = useFormState(deleteAccount, {
    message: '',
    success: false,
    username: username,
  });

  useEffect(() => {
    const username: any = localStorage.getItem('username');
    setUsername(username);

    if (broadcast.success && broadcast.message) {
      toast.success(broadcast.message);
      localStorage.removeItem('username');
      localStorage.removeItem('auth');
      window.location.href = '/';
    } else if (!broadcast.success && broadcast.message) {
      toast.error(broadcast.message);
    }
  }, [broadcast]);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Account" centered>
        <form action={formAction}>
          <TextInput
            mt="md"
            label="Your password"
            placeholder="Write here your password"
            name="password"
            data-cy="passwordInput"
            required
            type="password"
          />

          <input type="hidden" name="username" value={username} />

          <SubmitButton
            valueInRequest="Deleting Account..."
            defaultValue="Delete Account"
            mt="xl"
            fullWidth
            dataCy="deleteAccountButton"
          />
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
