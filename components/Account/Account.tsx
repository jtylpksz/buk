import { Menu, Button, rem } from '@mantine/core';
import { IconSettings, IconTrash, IconArrowDown } from '@tabler/icons-react';
import Link from 'next/link';

const Account = ({ username }: { username: string }) => {
  const logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    window.location.reload();
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="default" data-cy="accountButton">
          {username}
          <IconArrowDown
            style={{ width: rem(16), height: rem(16), marginLeft: rem(5) }}
          />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Options</Menu.Label>
        <Link href="/settings">
          <Menu.Item
            leftSection={
              <IconSettings style={{ width: rem(14), height: rem(14) }} />
            }
            data-cy="settingsButton"
          >
            Settings
          </Menu.Item>
        </Link>

        <Menu.Divider />

        <Menu.Item
          onClick={logout}
          color="red"
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
          data-cy="logoutButton"
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Account;
