import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-delete-dialog',
  templateUrl: './employee-delete-dialog.component.html',
  styleUrls: ['./employee-delete-dialog.component.scss']
})
export class EmployeeDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EmployeeDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.data?.employee).subscribe({
      complete: () => {
        this.dialogRef.close({ result: true });

      }
    });

  }

}
