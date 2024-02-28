import { fDatabaseConfiguration } from '~/server/utils/configurations';
import { addTask, app, getStore } from '../../../../common/types/fdb';
import Task from '../../../../common/types/task';

export default defineEventHandler<{ body: Partial<Task> }>(async (event) => {
  const body = await readBody(event);
  const store = getStore(app(fDatabaseConfiguration));
  const docRef = await addTask(store, body);
  setResponseStatus(event, 201);
  return { id: (docRef || body).id, ...body };
});
