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

const COMBOBOX_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ComboboxComponent),
  multi: true,
};

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
  providers: [COMBOBOX_CONTROL_VALUE_ACCESSOR],
})
export class ComboboxComponent {
  @Input() Label!: string;
  @Input() isRequired = false;
  @Input() isDisabled = false;
  @Input() loading = false;
  @Input() filterable = true;
  @Input() data: any[] = [];
  @Input() valueField = 'id';
  @Input() textField = 'name';

  @Output() filterChange = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any>();

  value: number | undefined;

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
    this.selectionChange.emit(change);
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

  onFilterChange(input: any): void {
    this.filterChange.emit(input);
  }
  onclearClick(): void {
    this.value = undefined;
  }
}
