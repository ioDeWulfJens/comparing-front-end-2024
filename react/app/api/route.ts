import { fDatabaseConfiguration } from '@/app/common/db';
import { addTask, updateTask, app, getStore, getTasks } from '@common/types/fdb';
import Task from '@common/types/task';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
export async function GET(){
  // Connect to Firestore
  const store = getStore(app(fDatabaseConfiguration));
  // Get all tasks 
  try {
    const tasksSnapshot = await getTasks(store); // Call your improved getTasks function
    const tasks = tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      description: doc.data().description,
      created_at: doc.data().created_at.toDate(),
      updated_at: doc.data().updated_at.toDate(),
      completed_at: typeof doc.data()["completed_at"] === "string" ? new Date(doc.data()["completed_at"]) : doc.data()["completed_at"]?.toDate(),
    })) as Task[];
      // Type assertion if needed
      return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
      return new Response(JSON.stringify({ message: 'Error retrieving tasks', error }), { status: 500 });
  }
}

export async function POST(req: NextRequest){
  const data: Partial<Task> = await req.json();
  // Connect to Firestore
  const store = getStore(app(fDatabaseConfiguration));
  // Add a new task
  try {
    const docRef = data.id ? await updateTask(store, data) : await addTask(store, data);
    return new Response(JSON.stringify({ id: (docRef || data).id, ...data }), { status: docRef ? 201 : 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: `Error ${data.id ? 'updating' : 'adding'} task`, error }), { status: 500 });
  }
}
