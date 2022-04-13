import { Component, forwardRef, Input, Provider } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

const DATEPICKER_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true,
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [DATEPICKER_CONTROL_VALUE_ACCESSOR],
})
export class DatePickerComponent {
  @Input() Label!: string;
  @Input() isRequired = false;
  @Input() isDisabled = false;

  value: string | undefined;

  private onTouched!: Function;
  private onChanged!: Function;

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');
  }

  handleChange(change: any): void {
    this.onTouched();
    this.writeValue(change);
    this.onChanged(change);
  }
  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onclearClick(): void {
    this.value = undefined;
  }
}
