'use client';

import { Button, Group, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const SearchBar = () => {
  const router = useRouter();
  const searchRef: any = useRef<HTMLInputElement>(null);

  const search = () => {
    const searchValue = searchRef.current.value;

    if (!searchValue) {
      return;
    }

    router.push(`/search?query=${searchValue}`);
  };

  return (
    <Group gap={2} mr={5}>
      <TextInput placeholder="Search" ref={searchRef} />
      <Button onClick={search}>
        <IconSearch />
      </Button>
    </Group>
  );
};

export default SearchBar;
