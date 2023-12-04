'use client';

import { Box, Button, Group } from '@mantine/core';

import classes from './styles.module.css';
import LoginModal from '../LoginModal/Modal';
import SignUpModal from '../SignUpModal/Modal';
import { useEffect, useState } from 'react';

const Nav = () => {
  const [auth, setAuth] = useState(false);

  const isAuth = (value: boolean) => {
    setAuth(value);
    localStorage.setItem('auth', value.toString());
  };

  const logout = () => {
    setAuth(false);
    localStorage.setItem('auth', 'false');
  };

  useEffect(() => {
    const auth = localStorage.getItem('auth');

    if (auth === 'true') {
      setAuth(true);
    }
  }, []);

  return (
    <Box pb={20}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          Buk.
          <Group>
            {auth ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              <>
                <LoginModal authSuccess={isAuth} />
                <SignUpModal authSuccess={isAuth} />
              </>
            )}
          </Group>
        </Group>
      </header>
    </Box>
  );
};

export default Nav;
