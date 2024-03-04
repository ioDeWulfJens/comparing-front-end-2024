import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { TaskComponent } from '../../common/task/task.component';
import { InputComponent } from '../../common/input/input.component';

import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import Task from '../../../../../common/types/task';
import { TasksService } from '../../common/tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    TaskComponent,
    InputComponent,
    AsyncPipe
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  private tasksService: TasksService;
  constructor(tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  tasks: Task[] = [];
  archivedTasks: Task[] = [];
  newTask: string = '';

  ngOnInit(): void {
    this.tasksService.getTasks((tasks) => {
      this.tasks = tasks.filter(({ completed_at }) => !completed_at);
      this.archivedTasks = tasks.filter(({ completed_at }) => !!completed_at);
    });
  }

  async add(): Promise<void> {
    const entry = await this.tasksService.addTask({
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
    await this.tasksService.updateTask(task.id, {
      ...task,
    });
  }

  async delete(id: string): Promise<void> {
    if (!id) return;
    await this.tasksService.deleteTask(id);
  }
}
