import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { TaskComponent } from '../../common/task/task.component';
import { InputComponent } from '../../common/input/input.component';

import { getTasks } from '../../../../../common/types/db';
import { iDb } from '../../common/db';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import Task from '../../../../../common/types/task';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    TaskComponent,
    InputComponent,
    AsyncPipe,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class TasksComponent implements OnInit {
  constructor() {}

  tasks: Task[] = [];
  archivedTasks: Task[] = [];
  newTask: string = '';

  ngOnInit(): void {
    getTasks(iDb).subscribe((tasks) => {
      this.tasks = tasks.filter(({ completed_at }) => !completed_at);
      this.archivedTasks = tasks.filter(({ completed_at }) => !!completed_at);
    });
  }

  async add(): Promise<void> {
    const entry = await iDb.tasks.add({
      description: this.newTask,
      created_at: new Date(),
      updated_at: new Date(),
    });
    if (entry) {
      this.newTask = '';
    }
  }

  async edit(task: Task): Promise<void> {
    if (!task.id) return;
    await iDb.tasks
      .where('id')
      .equals(task.id)
      .modify({
        ...task,
      });
  }

  async delete(id: string): Promise<void> {
    await iDb.tasks.where('id').equals(id).delete();
  }
}
