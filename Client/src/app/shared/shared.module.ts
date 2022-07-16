import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { MatButtonModule } from '@angular/material/button'
import { MatMoudleFiles } from './mat-imports';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './notification/notification.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    //MatMoudleFiles,
    MatIconModule,
    MatButtonModule,

  ],
  exports: [
    MatMoudleFiles,  RouterModule,ReactiveFormsModule,NotificationComponent
  ]
})
export class SharedModule { }
