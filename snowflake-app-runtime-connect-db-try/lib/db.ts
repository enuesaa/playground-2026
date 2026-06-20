import fs from 'fs';
import snowflake from 'snowflake-sdk';

export async function getConnection() {
  return snowflake.createConnection({
    account: process.env.SNOWFLAKE_ACCOUNT!,
    database: process.env.SNOWFLAKE_DATABASE!,
    schema: process.env.SNOWFLAKE_SCHEMA ?? 'public',
    warehouse: process.env.SNOWFLAKE_WAREHOUSE,
    role: process.env.SNOWFLAKE_ROLE,
    authenticator: 'OAUTH',
    token: fs.readFileSync('/snowflake/session/token', 'utf8').trim(),
  });
}
