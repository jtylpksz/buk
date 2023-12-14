'use client';

import { Box, Container, Text } from '@mantine/core';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import ChangePasswordModal from './components/ChangePassword';
import DeleteAccountModal from './components/DeleteAccount';

const Settings = () => {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const auth = localStorage.getItem('auth');

    if (!username || !auth) {
      router.push('/');
      return;
    }
  }, []);

  return (
    <Container size="xs">
      <h1>Settings</h1>

      <Text size="xl">Account Settings</Text>
      <Box mt="sm">
        <Text size="lg">Change your password</Text>
        <Text size="sm">
          If someone hacked your account, you can change your password here.
        </Text>
        <ChangePasswordModal />
      </Box>

      <Box mt="sm">
        <Text size="lg">Delete your account</Text>
        <Text size="sm">
          Warning: This action is permanent and cannot be undone.
        </Text>
        <DeleteAccountModal />
      </Box>
    </Container>
  );
};

export default Settings;
