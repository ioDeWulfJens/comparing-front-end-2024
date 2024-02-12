import { Component } from '@angular/core';

import { InputComponent} from "../../common/input/input.component";
import { TaskComponent } from "../../common/task/task.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TranslateModule, InputComponent, TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {

}
