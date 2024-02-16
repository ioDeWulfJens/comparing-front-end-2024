import { iDatabase } from '@common/types/db';
import { FireDatabaseConfiguration, addTask, app, getStore, getTasks, updateTask } from '@common/types/fdb';
import Task from '@common/types/task';

export const iDb = new iDatabase({
  name: process.env.NEXT_PUBLIC_DB_NAME,
  version: process.env.NEXT_PUBLIC_DB_VERSION,
});

const fDatabaseConfiguration: FireDatabaseConfiguration = {
  apiKey: process.env['apiKey'],
  authDomain: process.env['authDomain'],
  projectId: process.env['projectId'],
  storageBucket: process.env['storageBucket'],
  messagingSenderId: process.env['messagingSenderId'],
  appId: process.env['appId'],
};

export const useStore = () => {
  return getStore(app(fDatabaseConfiguration));
}

export const useTasks = () => {
  const store = useStore();
  let tasks: Task[] = [];
  getTasks(store, (snapshot) => {
    tasks = snapshot.docs.map((doc): Task => {
      return {
        id: doc.id,
        ...doc.data() as Task
      }
    })
  });

  const createTask = (task: Partial<Task>) => addTask(store, task);
  const patchTask = (task: Partial<Task>) => updateTask(store, task);
  
  return {
    tasks,
    createTask,
    patchTask
  }
}

