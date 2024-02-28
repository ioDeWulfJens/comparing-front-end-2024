import { fDatabaseConfiguration } from '~/server/utils/configurations';
import { updateTask, app, getStore } from '../../../../common/types/fdb';
import Task from '../../../../common/types/task';

export default defineEventHandler<{ body: Partial<Task> }>(async (event) => {
  const id = getRouterParam(event, 'id');
  if(!id){
    setResponseStatus(event, 400);
    return;
  }
  const body = await readBody(event);
  const store = getStore(app(fDatabaseConfiguration));
  await updateTask(store, body);
  setResponseStatus(event, 202);
  return { id, ...body };
});
