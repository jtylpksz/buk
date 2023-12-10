'use client';

import { Box, Group, Text } from '@mantine/core';

import styles from './styles.module.css';
import LoginModal from '../LoginModal/Modal';
import SignUpModal from '../SignUpModal/Modal';
import { useEffect, useState } from 'react';
import Account from '../Account/Account';
import SearchBar from './SearchBar';
import Link from 'next/link';

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
      <header className={styles.header}>
        <Group justify="space-between" h="100%">
          <Group>
            <Link href="/">
              <Text>Buk.</Text>
            </Link>
          </Group>

          <Group gap={10}>
            <SearchBar />
            <div className="accountContainer">
              {auth ? (
                <Account username={username} />
              ) : (
                <>
                  <LoginModal setAuth={isAuth} />
                  <SignUpModal setAuth={isAuth} />
                </>
              )}
            </div>
          </Group>
        </Group>
      </header>
    </Box>
  );
};

export default Nav;
