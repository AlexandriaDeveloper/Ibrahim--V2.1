import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect, MatSelectChange } from '@angular/material/select';

import { Department } from 'src/app/department/models/department.model';
import { NotificationType } from 'src/app/shared/models/notifications';
import { NotificationBarService } from 'src/app/shared/services/notification-bar.service';
import { EmployeeService } from '../../services/employee.service';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};
@Component({
  selector: 'app-employee-contact-dialog',
  templateUrl: './employee-contact-dialog.component.html',
  styleUrls: ['./employee-contact-dialog.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class EmployeeContactDialogComponent implements OnInit, AfterViewInit {

  @ViewChild('departmentSelect', { static: false }) departmentSelectInput: MatSelect;
  employeeForm: FormGroup;
  filterdDepartments: Department[];
  constructor(public dialogRef: MatDialogRef<EmployeeContactDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private employeeService: EmployeeService, private notificationService: NotificationBarService) { }
  ngAfterViewInit(): void {


  }

  ngOnInit(): void {



    this.employeeForm = this.initilizeForm();
  }
  initilizeForm() {
    return this.fb.group({
      name: [this.data?.employee?.name, [Validators.required, Validators.minLength(5)]],
      tabCode: [this.data?.employee?.tabCode, []],
      tegaraCode: [this.data?.employee?.tegaraCode, []],
      nationalId: [this.data?.employee?.nationalId, [Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern("^[0-9]+$")]],
      phoneNumber: [this.data?.employee?.phoneNumber, [Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]+$")]],
      email: [this.data?.employee?.email, [Validators.pattern("^\\w+([\\.-]?\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")]],
      collage: [this.data?.employee?.collage, []],
      grade: [this.data?.employee?.grade, []],
      departmentId: [this.data?.employee?.departmentId],
      dob: [{ value: this.data?.employee.dob, disabled: true }]
    });
  }
  public employeeFormValidator(controlerName): ValidationErrors {
    return this.employeeForm.controls[controlerName].errors;
  }

  onSubmit() {

    this.data.employee = { ...this.data.employee, ...this.employeeForm.value }

    this.employeeService.updateEmployee(this.data.employee).subscribe({

      complete: () => {
        this.notificationService.openSnackBar("تم حفظ البيان", NotificationType.success, 5)
        this.SaveAndClose();
      }
    });

  }
  SaveAndClose() {


    this.dialogRef.close(this.data.employee)
  }
  close() {
    this.dialogRef.close();
  }
  onSelectionChange(ev: MatSelectChange) {



    this.employeeForm.patchValue({ 'departmentId': ev.value });
  }


  clearSearch() {
    this.employeeForm.patchValue({ departmentId: null })
    this.departmentSelectInput.value = '';
    this.data.employee.departmentId = null;


  }

  getDepartmentById(departmentId) {



    const index = this?.data?.departments.findIndex(x => x.id === departmentId);


    return this.data.departments[index] ? this.data.departments[index]?.name : '';

  }
}
