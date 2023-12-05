import { Box, Button, Container, Text } from '@mantine/core';
import ChangePasswordModal from './components/ChangePassword';

const Settings = () => {
  return (
    <Container size="xs">
      <h1>Settings</h1>

      <Text size="xl">Account Settings</Text>
      <Box mt="sm">
        <Text size="lg">Change your password</Text>
        <Text size="sm">If someone hacked your account, you can change your password here.</Text>
        <ChangePasswordModal />
      </Box>
     
      <Box mt="sm">
        <Text size="lg">Delete your account</Text>
        <Text size="sm">Warning: This action is permanent and cannot be undone.</Text>
        <Button>Delete your account</Button>
      </Box>
    </Container>
  );
};

export default Settings;
