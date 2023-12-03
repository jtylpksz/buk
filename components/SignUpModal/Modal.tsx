import { Modal, Button, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { createAccount } from '@/actions/createAccount';

const SignUpModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Sign Up" centered>
        <form action={createAccount}>
          <TextInput label="Username" placeholder="John Doe" name='username' required />
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

          <Button type="submit" mt="xl" fullWidth>
            Create Account
          </Button>
        </form>
      </Modal>

      <Button onClick={open}>Sign Up</Button>
    </>
  );
};

export default SignUpModal;
