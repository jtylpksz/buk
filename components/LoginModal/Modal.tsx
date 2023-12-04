'use client';

import { Modal, Button, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { Toaster, toast } from 'sonner';

import { login } from '@/actions/login';
import styles from './styles.module.css';
import SubmitButton from './SubmitButton';

const LoginModal = ({
  authSuccess,
}: {
  authSuccess: (value: boolean) => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [broadcast, formAction] = useFormState(login, {
    message: '',
    success: false,
  });

  useEffect(() => {
    if (broadcast.success && broadcast.message) {
      toast.success(broadcast.message);
      authSuccess(true);
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
            placeholder="Username"
            name="username"
            required
            type="text"
          />
          <TextInput
            mt="md"
            label="Password"
            placeholder="Password"
            name="password"
            required
            type="password"
          />

          <SubmitButton valueInRequest="Logging in..." defaultValue="Login" />
        </form>
      </Modal>

      <Button onClick={open} variant="default">
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
