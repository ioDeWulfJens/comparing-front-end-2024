import { fDatabaseConfiguration } from '~/server/utils/configurations';
import { removeTask, app, getStore } from '../../../../common/types/fdb';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if(!id){
    setResponseStatus(event, 400);
    return;
  }
  const store = getStore(app(fDatabaseConfiguration));
  await removeTask(store, id);
  setResponseStatus(event, 200);
  return;
});
