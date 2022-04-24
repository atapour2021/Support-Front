import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  Provider,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent } from 'rxjs';

const TEXT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AuthInputComponent),
  multi: true,
};

@Component({
  selector: 'app-auth-input',
  templateUrl: './auth-input.component.html',
  styleUrls: ['./auth-input.component.scss'],
  providers: [TEXT_CONTROL_VALUE_ACCESSOR],
})
export class AuthInputComponent implements AfterViewInit {
  @Input() Label!: string;
  @Input() autocomplete = 'off';
  @Input() isRequired = false;
  @Input() isDisabled = false;
  @Input() maxlength = 500;
  @Input() minlength = 0;
  @Input() type!: string;
  @Input() iconClass!: string;

  value: string | undefined;

  @ViewChild('input') input!: ElementRef;

  private onTouched!: Function;
  private onChanged!: Function;

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');
  }

  ngAfterViewInit(): void {
    if (this.type === 'numericText') {
      fromEvent(this.input.nativeElement, 'keypress').subscribe((data: any) => {
        this.validate(data);
      });
    }
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
  validate(event: any): void {
    let theEvent = event || window.event;

    if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }
}
