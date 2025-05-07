import dotenv from 'dotenv-safe';
import dotenvExpand from 'dotenv-expand';

const env = dotenv.config({
    allowEmptyValues: false,
    example: '.env.example',
    path: '.env',
});

dotenvExpand.expand(env);