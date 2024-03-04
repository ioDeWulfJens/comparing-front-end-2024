import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { FireDatabaseConfiguration, app, getStore, watchTasks, addTask, updateTask, removeTask } from '../../../../common/types/fdb';
import { Firestore, FirestoreError } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import Task from '../../../../common/types/task';

const fDatabaseConfiguration: FireDatabaseConfiguration = {
  apiKey: environment['apiKey'],
  authDomain: environment['authDomain'],
  projectId: environment['projectId'],
  storageBucket: environment['storageBucket'],
  messagingSenderId: environment['messagingSenderId'],
  appId: environment['appId'],
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private _app: FirebaseApp;
  private _store: Firestore;
  constructor() {
    this._app = app(fDatabaseConfiguration);
    this._store = getStore(this._app);
  }

  getTasks(onAction: (tasks: Task[])=> void, onError?: ((error: FirestoreError) => void) | undefined) {
    return watchTasks(this._store, ({docs}) => onAction(docs.map((doc) => ({
      id: doc.id,
      description: doc.data()["description"],
      created_at: doc.data()["created_at"].toDate(),
      updated_at: doc.data()["updated_at"]?.toDate(),
      completed_at: typeof doc.data()["completed_at"] === "string" ? new Date(doc.data()["completed_at"]) : doc.data()["completed_at"]?.toDate(),
    }))), onError);
  }

  addTask(task: Partial<Task>) {
    return addTask(this._store, task);
  }

  updateTask(id: string, task: Partial<Task>) {
    return updateTask(this._store, { id, ...task });
  }

  deleteTask(id: string) {
    return removeTask(this._store, id);
  }
}
