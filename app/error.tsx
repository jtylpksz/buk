'use client';

import { Container, Button, Flex } from '@mantine/core';
import {useLogger} from 'next-axiom';
import { useEffect } from 'react';

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string } | any;
  reset: () => void;
}) => {
  const log = useLogger();

  useEffect(() => {
    console.error(error);
    log.error(error);
  }, [error]);

  return (
    <Container size="xs">
      <Flex justify="center" align="center" direction="column">
        <h1>Something went wrong</h1>
        <p>Did you try to reload the page?</p>
        <Button mt="md" onClick={() => reset()}>Reload</Button>
      </Flex>
    </Container>
  );
};

export default Error;
