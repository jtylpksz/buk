export const USERS_TABLE =
  process.env.NEXT_PUBLIC_USERS_TABLE ||
  process.env.NEXT_PUBLIC_USERS_TABLE_DEV ||
  '';

export const POSTS_TABLE =
  process.env.NEXT_PUBLIC_POSTS_TABLE ||
  process.env.NEXT_PUBLIC_POSTS_TABLE_DEV ||
  '';

export const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || '';
