'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import SubmitPostForm from './form';

const SubmitPost = () => {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const auth = localStorage.getItem('auth');

    if (!username || !auth) {
      router.push('/');
      return;
    }
  }, []);

  return <SubmitPostForm />;
};

export default SubmitPost;
