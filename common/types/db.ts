import Dexie, { Table } from "dexie";
import Task from "./task";


type DatabaseConfiguration = {
    name: string;
    version: number;
}

export class Database extends Dexie {

    tasks!: Table<Task>;

    constructor({name = "Database", version = 1}: DatabaseConfiguration) {
        super(name);
        this.version(version).stores({
            tasks: "++id, description, created_at, updated_at, completed_at"
        })
    }
}

export const db = new Database({name: process.env.DB_NAME, version: Number(process.env.DB_VERSION) || 1});