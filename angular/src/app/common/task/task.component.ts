import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { InputComponent } from '../input/input.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import Task from "../../../../../common/types/task";
import { formatRelativeDate } from "../../../../../common/utils/dateUtils";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule, InputComponent, CheckboxComponent, DatePipe],
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

  complete(checked: boolean): void {
    this.completed_at = checked ? new Date() : undefined;
    this.emit();
  }

  edit(): void {
    if(this.editable){
      this.emit();
    }
    this.editable = !this.editable;
  }

  emit(): void {
    this.change.emit({
      id: this.id,
      description: this.description,
      created_at: this.created_at,
      updated_at: new Date(),
      completed_at: this.completed_at
    })
  }

  formatDate(date: Date): string {
    return formatRelativeDate(date, "be-NL");
  }
}
