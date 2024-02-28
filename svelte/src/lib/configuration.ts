import type { FireDatabaseConfiguration } from '@/common/types/fdb';
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } from '$env/static/private';
export const fDatabaseConfiguration: FireDatabaseConfiguration = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};
