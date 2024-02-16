import Dexie, { Table, liveQuery } from 'dexie';
import { indexedDB, IDBKeyRange } from 'fake-indexeddb';
import Task from './task';

type DatabaseConfiguration = {
  name: string;
  version: number;
};

export class iDatabase extends Dexie {
  tasks!: Table<Task>;

  constructor({ name = 'Database', version = 1 }: DatabaseConfiguration) {
    super(
      name,
      typeof window === 'undefined'
        ? { indexedDB: indexedDB, IDBKeyRange }
        : undefined
    );
    this.version(version).stores({
      tasks: '++id, description, created_at, updated_at, completed_at',
    });
  }
}

export const getTasks = (db: iDatabase) => liveQuery(() => db.tasks.toArray());
