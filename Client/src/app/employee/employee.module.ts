import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmployeeComponent } from './employee/employee.component';
import { UploadEmployeesComponent } from './employee/upload-employees/upload-employees.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeContactDialogComponent } from './employee/employee-list/employee-contact-dialog/employee-contact-dialog.component';
import { EmployeeDeleteDialogComponent } from './employee/employee-list/employee-delete-dialog/employee-delete-dialog.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    UploadEmployeesComponent,
    EmployeeListComponent,
    EmployeeContactDialogComponent,
    EmployeeDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ]
})
export class EmployeeModule { }
