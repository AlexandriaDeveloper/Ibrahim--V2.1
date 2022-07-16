import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/employee/employee/services/employee.service';
import { NotificationType } from 'src/app/shared/models/notifications';
import { NotificationBarService } from 'src/app/shared/services/notification-bar.service';
import { DepartmentParam, DepartmentService } from '../department.service';

@Component({
  selector: 'app-department-employee-upload',
  templateUrl: './department-employee-upload.component.html',
  styleUrls: ['./department-employee-upload.component.scss']
})
export class DepartmentEmployeeUploadComponent implements OnInit {
  departmentForm: FormGroup
  @ViewChild('fileInput') inputNode: ElementRef;
  header: any;
  srcResult;
  fileName: string;
  // file: File;
  progress = 0;
  uploading = false;
  selectedDepartmentId = '';
  departments;
  departmentParam: DepartmentParam = new DepartmentParam();
  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private departmentService: DepartmentService, private _snackBar: NotificationBarService) { }

  ngOnInit(): void {

    this.departmentForm = this.initilizeForm();
    this.loadDepartments(this.departmentParam)
  }

  loadDepartments(param: DepartmentParam) {
    this.departmentService.getDepartments(param).subscribe(x => {


      this.departments = x;
    })
  }
  initilizeForm() {
    return this.fb.group({
      fileUpload: [],
      selectedDepartmentId: [this.selectedDepartmentId]
    })
  }



  uploadFile() {
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onprogress = ((e: any) => {

      });

      reader.addEventListener("progress", (e) => {
        const fr = e.target;
        this.progress = 100 * e.loaded / e.total;



      })
      reader.onloadstart = (e: any) => {


        this.uploading = true;
      }
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;

        this.departmentForm.value.fileUpload = this.inputNode.nativeElement.files[0];

      };
      reader.onloadend = (e => {





        this.departmentService.uploadFile(this.departmentForm.value).subscribe({
          next: (result) => { },
          error: (err) => {
            this._snackBar.openSnackBar("تم تحميل الملف", NotificationType.fail, 5);
            this.uploading = false;
          },
          complete: () => {
            this._snackBar.openSnackBar("تم تحميل الملف", NotificationType.success, 5);
            this.uploading = false
          }



        },
        );

      });

      reader.readAsArrayBuffer(this.inputNode.nativeElement.files[0]);



    }



  }
  submit() {


    this.uploadFile()

  }
  onFileSelected() {
    if (this.inputNode.nativeElement.files[0]) {

      this.fileName = this.inputNode.nativeElement.files[0]?.name
    }
  }
  onSelectionChange(ev: MatSelectChange) {

    this.selectedDepartmentId = ev.value
  }
}
