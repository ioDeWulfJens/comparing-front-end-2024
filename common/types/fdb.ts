import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import {
  getFirestore,
  query,
  collection,
  Firestore,
  onSnapshot,
  QuerySnapshot,
  updateDoc,
  doc,
  serverTimestamp,
  addDoc,
  getDocs,
  DocumentReference,
  DocumentData,
  deleteDoc,
  Timestamp,
  FirestoreError,
  orderBy,
} from 'firebase/firestore';
import Task from './task';

export type FireDatabaseConfiguration = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

export const app = (configuration: FirebaseOptions) =>
  initializeApp(configuration);

export const getStore = (app: FirebaseApp): Firestore => getFirestore(app);

export const watchTasks = (
  store: Firestore,
  callback: (snapshot: QuerySnapshot) => void,
  onError?: ((error: FirestoreError) => void) | undefined
) =>
  onSnapshot(
    query(collection(store, 'tasks'), orderBy('created_at', 'desc')),
    callback,
    onError
  );

export const getTasks = async (
  store: Firestore
): Promise<QuerySnapshot<DocumentData, DocumentData>> =>
  await getDocs(query(collection(store, 'tasks'), orderBy('created_at', 'desc')));

export const addTask = async (
  store: Firestore,
  task: Partial<Task>
): Promise<DocumentReference<DocumentData, DocumentData>> => await addDoc(collection(store, 'tasks'), {
  ...task,
  created_at: serverTimestamp(),
  updated_at: serverTimestamp(),
});

export const updateTask = async (
  store: Firestore,
  task: Partial<Task>
): Promise<void> => { 
  delete task.created_at;
  return await updateDoc(doc(store, 'tasks', task.id!), {
    ...task,
    updated_at: serverTimestamp(),
    completed_at: task.completed_at || null
  }).catch((reason) => { console.error(reason)});
};

export const removeTask = async (
  store: Firestore,
  id: string
): Promise<void> => await deleteDoc(doc(store, 'tasks', id));

export const convertTimestamp = (timestamp: Timestamp): Date => {
		//extract the seconds and nanos values from your Firestore timestamp object
		const { seconds, nanoseconds } = timestamp;
		//combine the seconds and nanos values into a single timestamp in milliseconds
		const milliseconds = seconds * 1000 + nanoseconds / 1e6;
		//use Moment.js to convert the timestamp to a date
		return new Date(milliseconds);
}
