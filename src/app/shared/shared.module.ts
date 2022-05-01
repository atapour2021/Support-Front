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
  GridComponent,
  NumericTextComponent,
  TextAreaInputComponent,
  TextComponent,
} from './components';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MockServerResultsService } from './components/grid/mock.server.results.service';


@NgModule({
  declarations: [
    ComboboxComponent,
    DatePickerComponent,
    NumericTextComponent,
    TextAreaInputComponent,
    TextComponent,
    GridComponent,
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
    NgxDatatableModule
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
    GridComponent,
  ],
  providers: [MockServerResultsService],
})
export class SharedModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
