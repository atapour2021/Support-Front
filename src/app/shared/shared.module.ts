import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from '../core/core.module';
import {
  CardListComponent,
  ComboboxComponent,
  DatePickerComponent,
  FileUploaderComponent,
  NumericTextComponent,
  PaginationComponent,
  TextAreaInputComponent,
  TextComponent,
} from './components';
import { CardService } from './components/card-list/card-list.service';
import { FileUploaderService } from './components/file-uploader/file-uploader.service';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    ComboboxComponent,
    DatePickerComponent,
    NumericTextComponent,
    TextAreaInputComponent,
    TextComponent,
    CardListComponent,
    PaginationComponent,
    FileUploaderComponent,
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
    CoreModule,
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
    CardListComponent,
    PaginationComponent,
    FileUploaderComponent,
  ],
  providers: [CardService, FileUploaderService],
})
export class SharedModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
