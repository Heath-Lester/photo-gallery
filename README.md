# Photo Gallery with Unsplash

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Required Dependencies:

-   Node v18.17.0
-   NPM 10.4.0

## How to run locally

### Register with Unsplash to get API credentials

1. Go to [Unsplash](https://unsplash.com/developers)

1. Register as a developer and create a new project with Unsplash

1. You should be provided with API credentials or go to your [Unsplash projects](https://unsplash.com/oauth/applications) and locate your new credentials

1. Create a new file called `.env.local` at project directory level:

    ![.env.local](https://github.com/Heath-Lester/photo-gallery/blob/main/assets/images/env.local.png)

1. Create variable called `UNSPLASH_ACCESS_KEY`

1. Add your _access key_ from Unsplash as the value

### Install dependencies

```bash
npm i
```

### Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Open the application in your browser

Got to [http://localhost:3000/](http://localhost:3000/)
