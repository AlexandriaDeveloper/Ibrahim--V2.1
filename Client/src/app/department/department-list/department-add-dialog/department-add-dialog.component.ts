import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentService } from '../../department.service';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-department-add-dialog',
  templateUrl: './department-add-dialog.component.html',
  styleUrls: ['./department-add-dialog.component.scss']
})
export class DepartmentAddDialogComponent implements OnInit, AfterViewInit {
  departmentForm: FormGroup;
  deparment: Department;
  constructor(public dialogRef: MatDialogRef<DepartmentAddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private departmentService: DepartmentService) { }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {



    if (this.data.type === 'update') {



      this.deparment = { id: this.data.department.id, name: this.data.department.name }


    }
    else if (this.data.type === 'add') {
      this.deparment = new Department();

    }
    this.departmentForm = this.initilizeForm();
  }
  initilizeForm() {
    return this.fb.group({
      name: [this.deparment.name, [Validators.required, Validators.minLength(5), Validators.maxLength(300)]]
    })
  }
  departmentFormValidator(control) {
    return this.departmentForm.controls[control].errors
  }
  onSubmit() {
    if (this.data.type === "add")
      this.departmentService.postDepartment(this.departmentForm.value).subscribe({
        complete: () => {
          this.dialogRef.close(true)
        }
      })
    else if (this.data.type === 'update') {
      this.deparment = Object.assign({ ...this.deparment, ... this.departmentForm.value })
      this.departmentService.putDepartment(this.deparment).subscribe({
        complete: () => {
          this.dialogRef.close(true)
        }
      })
    }
  };

}
