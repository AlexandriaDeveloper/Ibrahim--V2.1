import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { MatButtonModule } from '@angular/material/button'
import { MatMoudleFiles } from './mat-imports';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './notification/notification.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchAutocompleteComponent } from './components/search-autocomplete/search-autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    NotificationComponent,
    SearchBoxComponent,
    SearchAutocompleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule

  ],
  exports: [
    MatMoudleFiles, RouterModule, ReactiveFormsModule, NotificationComponent, SearchBoxComponent, SearchAutocompleteComponent
  ]
})
export class SharedModule { }
