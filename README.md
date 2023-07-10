# "Summer Code Fest": Spotify Replica

![Alt text](https://github.com/JuditKaramazov/SummerCodeFest-Spotify/blob/e06f60ddbb6ae5baf34e440150c209c5d1343850/public/Screenshot-1.PNG)

![Alt text](https://github.com/JuditKaramazov/SummerCodeFest-Spotify/blob/24877823d31a078756d9f6ef9ca095887182633c/public/Screenshot-5.png)

## Prerequisites and Important Information

Before running the application, make sure you are taking into account the following prerequisites and important information:

- Required usage of environment variables:
  - `SPOTIFY_CLIENT_ID`: The client ID provided by Spotify for authentication.
  - `SPOTIFY_SECRET`: The client secret provided by Spotify for authentication.
  - `JWT_SECRET`: Secret key used for JSON Web Token (JWT) authentication.

Please note that although the application aspires to replicate Spotify's interface, some of their functionalities are still not available (something we'll work on in the future, no worries!).
To use the application, an active and operative Spotify account is required while interacting with the project itself, whether it's the Spotify application or the web player.

![Alt text](https://github.com/JuditKaramazov/SummerCodeFest-Spotify/blob/e06f60ddbb6ae5baf34e440150c209c5d1343850/public/Screenshot-2.png)

## Introduction

This project is part of the `Summer Code Fest` (inspired by the "Summer Game Fest" - what an unsettling idea!) and aims to practice the basics of Next.js, authentication, and Tailwind CSS. The project provides a Spotify interface and allows users to explore and interact with various Spotify features.

Some of them are:

- Login page and authentication using Spotify credentials.
- User's libraries, including playlists, liked songs, and more.
- Featured playlists and artists recommended by Spotify.
- Search bar to search for songs, artists, albums, and playlists.

![Alt text](https://github.com/JuditKaramazov/SummerCodeFest-Spotify/blob/e06f60ddbb6ae5baf34e440150c209c5d1343850/public/Screenshot-3.png)

Please note that while most of Spotify's features are available, some functionalities are still under development and will be added in the future! However, I still found it a nice practice to get to understand better some tools I wasn't familiarized with.

![Alt text](https://github.com/JuditKaramazov/SummerCodeFest-Spotify/blob/e06f60ddbb6ae5baf34e440150c209c5d1343850/public/Screenshot-4.png)

Oh, wait... not again... don't tell me that you'd also want to create these not-so-functional replicas! Well, let me tell you something you might find interesting, then...

## Getting Started

As you surely know (or suspect!) by now, this is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). In order to make it work, install the required dependencies (`npm install`), and then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/user](http://localhost:3000/api/user). This endpoint can be edited in `pages/api/user.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
