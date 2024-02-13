import { Database } from '../../../../common/types/db';
import { environment } from '../../environments/environment';

export const db = new Database({
  name: environment.DB_NAME,
  version: environment.DB_VERSION,
});
