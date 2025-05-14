import dotenv from 'dotenv-safe';
import dotenvExpand from 'dotenv-expand';

const isDevelopment = process.env.PRO_ENV === 'DEV';

const env = dotenv.config({
    allowEmptyValues: false,
    path: '.env',
    ...(isDevelopment ? {example: '.env.example'} : {}),
});

dotenvExpand.expand(env);