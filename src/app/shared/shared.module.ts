import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MaterialModule } from './material.module';
import {
  ComboboxComponent,
  DatePickerComponent,
  NumericTextComponent,
  TextAreaInputComponent,
  TextComponent,
} from './components';

@NgModule({
  declarations: [
    ComboboxComponent,
    DatePickerComponent,
    NumericTextComponent,
    TextAreaInputComponent,
    TextComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
    MaterialModule,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    ComboboxComponent,
    DatePickerComponent,
    NumericTextComponent,
    TextAreaInputComponent,
    TextComponent,
  ],
  providers: [],
})
export class SharedModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
