import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  Provider,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

const TEXT_AREA_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextAreaInputComponent),
  multi: true,
};

@Component({
  selector: 'app-text-area-input',
  templateUrl: './text-area-input.component.html',
  styleUrls: ['./text-area-input.component.scss'],
  providers: [TEXT_AREA_CONTROL_VALUE_ACCESSOR],
})
export class TextAreaInputComponent {
  @Input() Label = 'Description';
  @Input() minRows = 2;
  @Input() maxRows = 5;
  @Input() isRequired = false;
  @Input() maxlength = 500;
  @Input() minlength = 0;
  @Input() value: string | undefined;
  @Output() onChange = new EventEmitter<any>();

  private onTouched!: Function;
  private onChanged!: Function;

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');
  }

  handleChange(change: string): void {
    this.onTouched();
    this.writeValue(change);
    this.onChanged(change);
  }
  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
