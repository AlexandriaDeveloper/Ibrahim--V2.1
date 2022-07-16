import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';
import { SharedModule } from '../shared/shared.module';
import { DepartmentEmployeeUploadComponent } from './department-employee-upload/department-employee-upload.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentAddDialogComponent } from './department-list/department-add-dialog/department-add-dialog.component';

import { DepartmentDeleteDialogComponent } from './department-list/department-delete-dialog/department-delete-dialog.component';



@NgModule({
  declarations: [
    DepartmentComponent,
    DepartmentEmployeeUploadComponent,
    DepartmentListComponent,
    DepartmentAddDialogComponent,

    DepartmentDeleteDialogComponent,

  ],
  imports: [
    CommonModule, SharedModule,
    DepartmentRoutingModule,

  ]
})
export class DepartmentModule { }
