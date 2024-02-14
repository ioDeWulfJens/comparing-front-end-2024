import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  @Input() label: string = ''; // Optional label for the checkbox
  @Input() checked: boolean = false; // Initial checked state
  @Output() checkedChange = new EventEmitter<boolean>(); // Event emitted on toggle

  toggle() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
