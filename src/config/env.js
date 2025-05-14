import dotenv from 'dotenv-safe';
import dotenvExpand from 'dotenv-expand';

const isProduction = process.env.NODE_ENV === 'production';

const env = dotenv.config({
    allowEmptyValues: false,
    path: '.env',
    ...(isProduction ? {} : { example: '.env.example' }),
});

dotenvExpand.expand(env);