import { Modal, Button, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Toaster, toast } from 'sonner';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { createAccount } from '@/actions/createAccount';
import SubmitButton from '../LoginModal/SubmitButton';
import styles from './styles.module.css';

const SignUpModal = ({
  authSuccess,
}: {
  authSuccess: (value: boolean) => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [broadcast, formAction] = useFormState(createAccount, {
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
      <Modal opened={opened} onClose={close} title="Sign Up" centered>
        <form action={formAction}>
          <TextInput
            label="Username"
            placeholder="John Doe"
            name="username"
            required
          />
          <TextInput
            mt="md"
            label="Password"
            placeholder="Min 8 characters"
            name="password"
            required
            type="password"
            minLength={8}
            maxLength={20}
          />

          <SubmitButton
            valueInRequest="Creating Account..."
            defaultValue="Create Account"
          />
        </form>
      </Modal>

      <Button onClick={open}>Sign Up</Button>

      <div className={styles.absoluteNotification}>
        {/* Prevents "Jumps" in the interface */}
        <Toaster richColors />
      </div>
    </>
  );
};

export default SignUpModal;
