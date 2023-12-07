'use client';

import { Button, Group, TextInput } from '@mantine/core';
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
    <Group>
      <TextInput placeholder="Search" ref={searchRef} />
      <Button onClick={search}>Search</Button>
    </Group>
  );
};

export default SearchBar;
