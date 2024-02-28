import { app, getStore, getTasks } from '../../../../common/types/fdb';
import Task from '../../../../common/types/task';
import { fDatabaseConfiguration } from '~/server/utils/configurations';

export default defineEventHandler(async (event) => {
  // Connect to Firestore
  const store = getStore(app(fDatabaseConfiguration));
  // Get all tasks
  const tasksSnapshot = await getTasks(store); // Call your improved getTasks function
  const tasks = tasksSnapshot.docs.map((doc) => ({
    id: doc.id,
    description: doc.data().description,
    created_at: doc.data().created_at.toDate(),
    updated_at: doc.data().updated_at.toDate(),
    completed_at:
      typeof doc.data()['completed_at'] === 'string'
        ? new Date(doc.data()['completed_at'])
        : doc.data()['completed_at']?.toDate(),
  })) as Task[];
  // Type assertion if needed
  setResponseStatus(event, 200);
  return tasks;
});
