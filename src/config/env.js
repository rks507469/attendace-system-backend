import dotenv from 'dotenv-safe';
import dotenvExpand from 'dotenv-expand';

// Don't use any .env.example in production
const isProduction = process.env.PRO_ENV === 'PRD';


const options = {
    allowEmptyValues: false,
    path: '.env',
};

if (!isProduction) {
    options.example = '.env.example';
}

console.log('[ENV] isProduction:', isProduction);
console.log('[ENV] config options:', options);

const env = dotenv.config(options);
dotenvExpand.expand(env);