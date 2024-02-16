import { iDatabase } from '../../../../common/types/db';
import {
  FireDatabaseConfiguration,
  app,
  getStore,
} from '../../../../common/types/fdb';
import { environment } from '../../environments/environment';

export const iDb = new iDatabase({
  name: environment.DB_NAME,
  version: environment.DB_VERSION,
});

const fDatabaseConfiguration: FireDatabaseConfiguration = {
  apiKey: environment['apiKey'],
  authDomain: environment['authDomain'],
  projectId: environment['projectId'],
  storageBucket: environment['storageBucket'],
  messagingSenderId: environment['messagingSenderId'],
  appId: environment['appId'],
};

const _app = app(fDatabaseConfiguration);

export const fDb = getStore(_app);
