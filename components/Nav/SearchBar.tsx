'use client';

import { Button, Group, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import {useLogger} from 'next-axiom';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const SearchBar = () => {
  const router = useRouter();
  const log = useLogger();
  const searchRef: any = useRef<HTMLInputElement>(null);

  const search = (event: React.FormEvent) => {
    event.preventDefault();
    const searchValue = searchRef.current.value;

    if (!searchValue) {
      return;
    }

    log.info(`searching for ${searchValue}, URL: /search?query=${searchValue}`);
    router.push(`/search?query=${searchValue}`);
  };

  return (
    <form onSubmit={search}>
      <Group gap={2} mr={5}>
        <TextInput placeholder="Search" ref={searchRef} data-cy="searchInput" />
        <Button type="submit" data-cy="searchButton">
          <IconSearch />
        </Button>
      </Group>
    </form>
  );
};

export default SearchBar;
