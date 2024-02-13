import { Component, EventEmitter, Input, Output } from '@angular/core';

import Task from "../../../../../common/types/task";
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '../input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule, InputComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements Task {
  @Input() editable: boolean = false;
  @Input() id?: string = "";
  @Input() description: string = "";
  @Input() created_at: Date = new Date();
  @Input() updated_at: Date = new Date();
  @Input() completed_at?: Date;

  @Output() change = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  edit(): void {
    if(this.editable){
      this.change.emit({
        id: this.id,
        description: this.description,
        created_at: this.created_at,
        updated_at: new Date(),
        completed_at: this.completed_at
      })
    }
    this.editable = !this.editable;
  }
}
