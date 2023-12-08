# Buk
A Singular Social Network

## Languages
- [English](README.md)
- [Spanish](README.es.md)

## Setup
First, clone the project and install the dependencies:

```sh
$ git clone https://github.com/martinval11/buk
$ cd buk
$ npm install
```

We need to create a `.env.local` file to configure the database and other features:

```
NEXT_PUBLIC_SUPABASE_URL= {YOUR SUPABASE URL}
NEXT_PUBLIC_SUPABASE_KEY= {KEY OF YOUR SUPABASE DB}
NEXT_PUBLIC_USERS_TABLE= {TABLE TO USE FOR USERS}
NEXT_PUBLIC_POSTS_TABLE= {TABLE TO USE FOR POSTS}
NEXT_PUBLIC_SECRET_KEY= {SECRET KEY FOR ENCRYPTING AND DECRYPTING DATA}
```

Then, run the following command to start the development server:

```sh
$ npm run dev
   ▲ Next.js 14.0.3
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 7.2s
```

## Scripts available:
- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run start`: Start the production server
- `npm run test`: Run tests with Cypress

## Technologies used
- Next.js
- Mantine
- Supabase
- TypeScript
- Cypress

## Some context
Buk is the successor of [Mitter](https://github.com/martinval11/Mitter), I abandoned it because of its complexity.