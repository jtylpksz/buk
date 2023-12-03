export const USERS_TABLE =
  process.env.USERS_TABLE ||
  process.env.USERS_TABLE_DEV ||
  '';

export const POSTS_TABLE =
  process.env.POSTS_TABLE ||
  process.env.POSTS_TABLE_DEV ||
  '';

export const SECRET_KEY = process.env.SECRET_KEY || '';
