import {
  Component,
  forwardRef,
  Input,
  OnInit,
  Provider,
  TemplateRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

const TEXT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextComponent),
  multi: true,
};

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  providers: [TEXT_CONTROL_VALUE_ACCESSOR],
})
export class TextComponent implements OnInit {
  @Input() Label!: string;
  @Input() autocomplete = 'off';
  @Input() isRequired = false;
  @Input() isDisabled = false;
  @Input() maxlength = 500;
  @Input() minlength = 0;
  @Input() suftFix!: TemplateRef<any>;
  @Input() preFix!: TemplateRef<any>;

  suftFixTemplate!: TemplateRef<any>;
  preFixTemplate!: TemplateRef<any>;
  value: string | undefined;

  private onTouched!: Function;
  private onChanged!: Function;

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');
  }

  ngOnInit(): void {
    this.suftFixTemplate = this.suftFix;
    this.preFixTemplate = this.preFix;
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
