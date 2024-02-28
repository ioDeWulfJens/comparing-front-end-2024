import { fDatabaseConfiguration } from '$lib/configuration';
import {
  addTask,
  app,
  getStore,
  getTasks,
} from '@/common/types/fdb';
import type Task from '@/common/types/task';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (): Promise<Response> => {
  const store = getStore(app(fDatabaseConfiguration));
  try {
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
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error retrieving tasks', error }),
      { status: 500 }
    );
  }
};

export const POST: RequestHandler = async ({ request }): Promise<Response> => {
  const data: Partial<Task> = await request.json();
  // Connect to Firestore
  const store = getStore(app(fDatabaseConfiguration));
  // Add a new task
  try {
    const docRef = await addTask(store, data);
    return new Response(JSON.stringify({ id: (docRef || data).id, ...data }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: `Error adding task`, error }),
      { status: 500 }
    );
  }
};
