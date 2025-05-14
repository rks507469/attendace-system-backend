import dotenv from 'dotenv-safe';
import dotenvExpand from 'dotenv-expand';

const isProduction = process.env.PRO_ENV === 'PRO';

const env = dotenv.config({
    allowEmptyValues: false,
    path: '.env',
    ...(isProduction ? {} : {example: '.env.example'}),
});

dotenvExpand.expand(env);