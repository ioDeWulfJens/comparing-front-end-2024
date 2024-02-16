import { Database } from '@common/types/db';

export const db = new Database({
  name: process.env.NEXT_PUBLIC_DB_NAME,
  version: process.env.NEXT_PUBLIC_DB_VERSION,
});
