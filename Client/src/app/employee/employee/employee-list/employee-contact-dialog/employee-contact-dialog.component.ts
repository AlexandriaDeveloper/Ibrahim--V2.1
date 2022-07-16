import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fromEvent, map } from 'rxjs';
import { Department } from 'src/app/department/models/department.model';
import { NotificationType } from 'src/app/shared/models/notifications';
import { NotificationBarService } from 'src/app/shared/services/notification-bar.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-contact-dialog',
  templateUrl: './employee-contact-dialog.component.html',
  styleUrls: ['./employee-contact-dialog.component.scss']
})
export class EmployeeContactDialogComponent implements OnInit, AfterViewInit {

  @ViewChild('departmentSelect') departmentSelectInput: ElementRef;
  employeeForm: FormGroup;
  filterdDepartments: Department[];
  constructor(public dialogRef: MatDialogRef<EmployeeContactDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private employeeService: EmployeeService, private notificationService: NotificationBarService) { }
  ngAfterViewInit(): void {
    var searchDepartment = fromEvent(this.departmentSelectInput.nativeElement, 'keyup')
    searchDepartment.pipe(map((val: any) => this._filter(val.target.value || '')
    )).subscribe();
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
      departmentId: [this.data?.employee?.departmentId]
    });
  }
  public employeeFormValidator(controlerName): ValidationErrors {
    return this.employeeForm.controls[controlerName].errors;
  }

  onSubmit() {

    this.data.employee = { ...this.data.employee, ...this.employeeForm.value }
    // this.data.employee.departmentId = null;


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
  onSelectionChange(ev) {


    this.employeeForm.patchValue({ 'departmentId': ev });
  }

  displayWithFun(ev) {

    const index = this.filterdDepartments.findIndex(x => x.id == ev);


    return this.filterdDepartments[index] ? this.filterdDepartments[index]?.name : '';



  }
  private _filter(value: string): Department[] {



    const filterValue = value.toLowerCase();



    this.filterdDepartments = this.data.departments.filter(option => option.name.startsWith(filterValue));


    return this.filterdDepartments;
  }
  clearSearch() {
    this.employeeForm.patchValue({ departmentId: null })
    this.departmentSelectInput.nativeElement.value = '';
    this.data.employee.departmentId = null;
  }

  getDepartmentById(departmentId) {



    const index = this?.data?.departments.findIndex(x => x.id === departmentId);


    return this.data.departments[index] ? this.data.departments[index]?.name : '';

  }
  test(ev) {
    console.log(ev);

  }
}
