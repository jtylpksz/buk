'use client';

import { useDisclosure } from '@mantine/hooks';
import { Button, Modal, TextInput } from '@mantine/core';
import { Toaster, toast } from 'sonner';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import SubmitButton from '@/components/SubmitButton/SubmitButton';
import { changePassword } from '@/actions/changePassword';

const ChangePasswordModal = () => {
  const [username, setUsername] = useState('');
  const [opened, { open, close }] = useDisclosure(false);

  const [broadcast, formAction]: any = useFormState(changePassword, {
    message: '',
    success: false,
    username: username,
  });

  useEffect(() => {
    const username: any = localStorage.getItem('username');
    setUsername(username);

    if (broadcast.success && broadcast.message) {
      toast.success(broadcast.message);
    } else if (!broadcast.success && broadcast.message) {
      toast.error(broadcast.message);
    }
  }, [broadcast]);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Change Password" centered>
        <form action={formAction}>
          <TextInput
            mt="md"
            label="Your current password"
            placeholder="Your current password"
            name="currentPassword"
            data-cy="currentPasswordInput"
            type="password"
            required
          />
          <TextInput
            mt="md"
            label="New Password"
            placeholder="Your new Password"
            name="newPassword"
            data-cy="newPasswordInput"
            type="password"
            minLength={8}
            maxLength={24}
            required
          />

          <input type="hidden" name="username" value={username} />

          <SubmitButton
            valueInRequest="Changing Password..."
            defaultValue="Change Password"
            mt="xl"
            fullWidth
            dataCy="changePasswordButton"
          />
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
