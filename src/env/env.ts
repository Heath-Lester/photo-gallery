import { CleanedEnvAccessors, cleanEnv, str } from 'envalid';

/**
 * @returns sanitized & typed environment variables
 */
const env: Readonly<{ UNSPLASH_ACCESS_KEY: string } & CleanedEnvAccessors> = cleanEnv(process.env, {
    UNSPLASH_ACCESS_KEY: str(),
});

export default env;
