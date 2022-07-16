import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentService } from '../../department.service';

@Component({
  selector: 'app-department-delete-dialog',
  templateUrl: './department-delete-dialog.component.html',
  styleUrls: ['./department-delete-dialog.component.scss']
})
export class DepartmentDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DepartmentDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private departmentService: DepartmentService) { }

  ngOnInit(): void {
  }
  deleteEmployee() {


    this.departmentService.deleteDepartment(this.data?.department).subscribe({
      complete: () => {
        this.dialogRef.close({ result: true });

      }
    });

  }
}
