'use client';

import { Modal, Button, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { Toaster, toast } from 'sonner';

import { login } from '@/actions/login';
import styles from './styles.module.css';
import SubmitButton from '../SubmitButton/SubmitButton';

const LoginModal = ({
  setAuth,
}: {
  setAuth: (value: {
    message: string;
    success: boolean;
    username: string;
  }) => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [broadcast, formAction]: any = useFormState(login, {
    message: '',
    success: false,
    username: '',
  });

  useEffect(() => {
    if (broadcast.success && broadcast.message) {
      toast.success(broadcast.message);
      setAuth(broadcast);
    } else if (!broadcast.success && broadcast.message) {
      toast.error(broadcast.message);
    }
  }, [broadcast]);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Login" centered>
        <form action={formAction}>
          <TextInput
            mt="md"
            label="Username"
            placeholder="Type here your username"
            name="username"
            data-cy="usernameInput"
            type="text"
            required
          />
          <TextInput
            mt="md"
            label="Password"
            placeholder="Type here your password"
            name="password"
            data-cy="passwordInput"
            type="password"
            required
          />

          <SubmitButton
            valueInRequest="Logging in..."
            defaultValue="Login"
            mt="xl"
            fullWidth
            dataCy="loginButton"
          />
        </form>
      </Modal>

      <Button onClick={open} variant="default" data-cy="signInModalButton">
        Login
      </Button>

      <div className={styles.absoluteNotification}>
        {/* Prevents "Jumps" in the interface */}
        <Toaster richColors />
      </div>
    </>
  );
};

export default LoginModal;
