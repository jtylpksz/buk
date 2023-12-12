import SubmitPostForm from './form';
import { cookies } from 'next/headers';

const userExist = () => {
  return cookies().get('token') ? true : false;
};

const SubmitPost = () => {
  if (!userExist()) {
    return <p>You need to be logged in to submit a post</p>;
  }

  return <SubmitPostForm />;
};

export default SubmitPost;
