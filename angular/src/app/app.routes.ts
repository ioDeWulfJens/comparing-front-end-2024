import { Routes } from '@angular/router';
import { TasksService } from './common/tasks.service';
import { TasksComponent } from './routes/tasks/tasks.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Tasky Angular',
    component: TasksComponent,
    providers: [TasksService],
  },
];
