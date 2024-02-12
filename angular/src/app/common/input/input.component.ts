
import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

type InputTypes = "text" | "password" | "date" | "number" | "datetime-local" | "email";

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [TranslateModule, FormsModule ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputComponent,
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor, OnInit {

  @Input() type: InputTypes = 'text';
  @Input() label: string | undefined;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() minLength?: number;
  @Input() maxLength?: number;

  valid: boolean = true;

  writeValue(value: any): void {
    this.inputValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  inputValue: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit() {
    if (this.required) {
      this.onChange({ value: this.inputValue, valid: !!this.inputValue });
    }
  }

  validate(): void {
    let valid = true;

    if (this.required && !this.inputValue) {
      valid = false;
    }

    switch (this.type) {
      case 'number':
        if (isNaN(this.inputValue)) {
          valid = false;
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.inputValue)) {
          valid = false;
        }
        break;
      default:
        break;
    }

    if (this.minLength && this.inputValue.length < this.minLength) {
      valid = false;
    }

    if (this.maxLength && this.inputValue.length > this.maxLength) {
      valid = false;
    }
    this.valid = valid;
    this.onChange({ value: this.inputValue, valid: valid });
  }

  isMailValid(value: string): boolean {
    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  isNaN(value: number): boolean {
    return isNaN(value);
  }

  onInputChange(event: any) {
    this.inputValue = event.target.value;
    this.validate();
    this.onTouched();
  }
}
