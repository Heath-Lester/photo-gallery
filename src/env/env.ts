import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
    UNSPLASH_ACCESS_KEY: str(),
});

export default env;
