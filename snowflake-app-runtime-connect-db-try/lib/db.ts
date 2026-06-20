import fs from 'fs';
import snowflake from 'snowflake-sdk';

// see https://zenn.dev/fusic/articles/0016-snowflake-app-runtime-suspend
export async function getConnection() {
  const conn = snowflake.createConnection({
    account: process.env.SNOWFLAKE_ACCOUNT!,
    host: process.env.SNOWFLAKE_HOST!,
    warehouse: process.env.SNOWFLAKE_WAREHOUSE,
    database: process.env.SNOWFLAKE_DATABASE!,
    schema: process.env.SNOWFLAKE_SCHEMA ?? 'public',
    authenticator: 'OAUTH',
    token: fs.readFileSync('/snowflake/session/token', 'utf8').trim(),
  });
  await conn.connectAsync();
  return conn;
}
