import { Routes } from '@angular/router';
import { TasksComponent } from './routes/tasks/tasks.component';
import { TasksService } from './common/tasks.service';

export const routes: Routes = [
    {
        path: "",
        title: "A: TaskHandler",
        component: TasksComponent,
        providers: [
            TasksService
        ]
    }
];
