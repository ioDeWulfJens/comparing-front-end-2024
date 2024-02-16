import { fDatabaseConfiguration } from '@/app/common/db';
import { addTask, app, getStore, getTasks } from '@common/types/fdb';
import Task from '@common/types/task';
import { NextApiRequest, NextApiResponse } from 'next';

// Optional authentication/authorization middleware (implement as needed)
// import { withAuth } from '../../middleware/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Task | Task[] | any>) {
  const { method, body, query } = req;

  // Connect to Firestore
  const store = getStore(app(fDatabaseConfiguration));
  // Authentication/authorization (if applicable)
  // const user = await withAuth(req, res); // Example usage if enabled

  switch (method) {
    case 'GET':
      // Get all tasks 
        try {
            const tasksSnapshot = await getTasks(store); // Call your improved getTasks function
            const tasks = tasksSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            })) as Task[]; // Type assertion if needed
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving tasks', error });
    }
      
      break;

    case 'POST':
      // Add a new task
      try {
        const newTask: Partial<Task> = JSON.parse(body); // Ensure body is parsed as JSON
        const docRef = await addTask(store, newTask);
        res.status(201).json({ id: docRef.id, ...newTask }); // Include added ID for convenience
      } catch (error) {
        res.status(500).json({ message: 'Error adding task', error });
      }
      break;

    // Add other HTTP methods as needed (PUT, DELETE, etc.)

    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}