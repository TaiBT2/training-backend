import * as dotenv from 'dotenv';

dotenv.config();

export const configuration = () => ({
  secret:
    process.env.SECRET ||
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE. @ code test 1233 @ test code 1234 @ test code 1235 @ test code 1236 @ test code',
  port: parseInt(process.env.PORT, 10) || 4200,
  database: {
    host: process.env.DATABASE_HOST || 'database-demo.postgres.database.azure.com',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME || 'taibt',
    password: process.env.DATABASE_PASSWORD || 'Laodai2023',
    database: process.env.DATABASE_NAME || 'training',
  },
});
