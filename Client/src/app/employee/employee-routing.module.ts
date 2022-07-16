import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { UploadEmployeesComponent } from './employee/upload-employees/upload-employees.component';

const routes: Routes = [{path:'',component: EmployeeComponent},
{path:'upload-employees',component: UploadEmployeesComponent, data:{title:'رفع الملف',icon :'cloud_upload'}},
{path:'employee-list',component: EmployeeListComponent, data:{title:'بيانات الموظفين',icon :'cloud_upload'},}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
