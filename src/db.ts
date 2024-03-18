import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
    connectionString: process.env.PG_URI,
    max: 5
});

export default pool;