import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentEmployeeUploadComponent } from './department-employee-upload/department-employee-upload.component';
import { DepartmentListComponent } from './department-list/department-list.component';

import { DepartmentComponent } from './department.component';

const routes: Routes = [{ path: '', component: DepartmentComponent },
{ path: 'department-employee-upload', component: DepartmentEmployeeUploadComponent },
{ path: 'department-list', component: DepartmentListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
