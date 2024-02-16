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
  callback: (snapshot: QuerySnapshot) => void
) => onSnapshot(query(collection(store, 'tasks')), callback);

export const getTasks = async (
  store: Firestore
): Promise<QuerySnapshot<DocumentData, DocumentData>> =>
  await getDocs(query(collection(store, 'tasks')));

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
): Promise<void> => await updateDoc(doc(store, 'tasks', task.id!), {
  ...task,
  created_at: serverTimestamp(),
  updated_at: serverTimestamp(),
});
