
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs';

type InputTypes = "text" | "password" | "date" | "number" | "datetime-local" | "email";

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [ReactiveFormsModule, TranslateModule, FormsModule ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputComponent,
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor {

  inputControl = new FormControl('');
  @Input() id: string = "default-input-id";
  @Input() label: string | undefined;
  @Input() placeholder: string | undefined = "";
  @Input() set disabled(isDisabled: boolean) { 
    isDisabled ? this.inputControl.disable() : this.inputControl.enable();
  }

  private _type: InputTypes = "text";
  @Input() set type(value: InputTypes) {
    this._type = value;
    this.setValidators();
  }
  get type(): InputTypes {
    return this._type;
  }

  private _required: boolean = false;
  @Input() set required(value: boolean) {
    this._required = value;
    this.setValidators();
  }

  private _minLength: number | undefined;
  @Input() set minLength(value: number | undefined) {
    this._minLength = value;
    this.setValidators();
  }

  private _maxLength: number | undefined;
  @Input() set maxLength(value: number | undefined) {
    this._maxLength = value;
    this.setValidators();
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if(!value) return;
    this.inputControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.inputControl.valueChanges
    .pipe(filter(val => !!val))
    .subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onTouched: any = () => {};

  private setValidators(): void {
    const validators = [];

    if (this._required) {
      validators.push(Validators.required);
    }

    if (this._minLength !== undefined) {
      validators.push(Validators.minLength(this._minLength));
    }

    if (this._maxLength !== undefined) {
      validators.push(Validators.maxLength(this._maxLength));
    }

    switch (this._type) {
      case "email":
        validators.push(Validators.email);
        break;
      case "number":
        validators.push(Validators.pattern("^[0-9]*$"));
        break;
    }

    this.inputControl.setValidators(validators);
    this.inputControl.updateValueAndValidity();
  }
}