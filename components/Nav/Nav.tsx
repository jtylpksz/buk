'use client';

import { Box, Group } from '@mantine/core';

import classes from './styles.module.css';
import LoginModal from '../LoginModal/Modal';
import SignUpModal from '../SignUpModal/Modal';
import { useEffect, useState } from 'react';
import Account from '../Account/Account';

const Nav = () => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState('');

  const isAuth = (value: {
    message: string;
    success: boolean;
    username: string;
  }) => {
    setAuth(true);
    localStorage.setItem('auth', 'true');
    localStorage.setItem('username', value.username);
    window.location.reload();
  };

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    const username = localStorage.getItem('username');

    if (auth === 'true') {
      setAuth(true);
      setUsername(username || 'error reading username');
    }
  }, []);

  return (
    <Box pb={20}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          Buk.
          <Group>
            {auth ? (
              <Account username={username} />
            ) : (
              <>
                <LoginModal setAuth={isAuth} />
                <SignUpModal setAuth={isAuth} />
              </>
            )}
          </Group>
        </Group>
      </header>
    </Box>
  );
};

export default Nav;
