import { fDatabaseConfiguration } from "$lib/configuration";
import { getStore, app, updateTask, removeTask } from "@/common/types/fdb";
import type Task from "@/common/types/task";
import type { RequestHandler } from "@sveltejs/kit";

export const PUT: RequestHandler = async ({ request }): Promise<Response> => {
    const data: Partial<Task> = await request.json();
    // Connect to Firestore
    const store = getStore(app(fDatabaseConfiguration));
    // Add a new task
    try {
      await updateTask(store, data);
      return new Response(JSON.stringify({ id: data.id, ...data }), {
        status: 202,
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ message: `Error editing task`, error }),
        { status: 500 }
      );
    }
};

export const DELETE: RequestHandler<{id: string}> = async ({params}) => {
    const id = params.id;
    // Connect to Firestore
    const store = getStore(app(fDatabaseConfiguration));
    // Remove a task
    try {
      await removeTask(store, id);
      return new Response(JSON.stringify({ message: 'Task removed successfully' }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Error removing task', error }), { status: 500 });
    }
  }