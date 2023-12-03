'use client';

import { Box, Group } from '@mantine/core';
import classes from './styles.module.css';
import LoginModal from '../LoginModal/Modal';
import SignUpModal from '../SignUpModal/Modal';

export default function Nav() {
  return (
    <Box pb={20}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          Buk.
          <Group>
            <LoginModal />
            <SignUpModal />
          </Group>
        </Group>
      </header>
    </Box>
  );
}
