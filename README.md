# Photo Gallery with Unsplash

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## How to run locally

### Register with Unsplash to get API credentials

1. Go to [Unsplash](https://unsplash.com/developers)

1. Register as a developer and create a project with Unsplash

1. You should be provided with API credentials or go to your [Unsplash projects](https://unsplash.com/oauth/applications) and locate your new credentials

1. Create a file called `.env.local` at the project level

1. Create variable called `UNSPLASH_ACCESS_KEY` and add your _access key_ from Unsplash as the value

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

Got to `http://localhost:3000/`
