import { Modal, Button, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { login } from '@/actions/login';

const LoginModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Login" centered>
        <form action={login}>
          <TextInput
            mt="md"
            label="Username"
            placeholder="Username"
            name='username'
            required
            type="text"
          />
          <TextInput
            mt="md"
            label="Password"
            placeholder="Password"
            name='password'
            required
            type="password"
          />
          <Button type="submit" mt="xl" fullWidth>
            Login
          </Button>
        </form>
      </Modal>

      <Button onClick={open} variant="default">
        Login
      </Button>
    </>
  );
};

export default LoginModal;
