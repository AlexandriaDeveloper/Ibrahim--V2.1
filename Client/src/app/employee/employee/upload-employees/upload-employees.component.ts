import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { NotificationType } from 'src/app/shared/models/notifications';

import { NotificationBarService } from 'src/app/shared/services/notification-bar.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-upload-employees',
  templateUrl: './upload-employees.component.html',
  styleUrls: ['./upload-employees.component.scss']
})
export class UploadEmployeesComponent implements OnInit {
  @ViewChild('fileInput') inputNode: ElementRef;
  header: any;
  srcResult;
  fileName: string;
  file: File;
  progress = 0;
  uploading = false;

  employeeForm: FormGroup;
  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private employeeService: EmployeeService, private _snackBar: NotificationBarService) { }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(data => {
      this.header = data;

    })

    this.employeeForm = this.buildForm();
  }
  onFileSelected() {
    if (this.inputNode.nativeElement.files[0]) {

      this.fileName = this.inputNode.nativeElement.files[0]?.name
    }

    // const inputNode: HTMLInputElement = document.querySelector('#file');



  }

  buildForm() {
    return this.fb.group({
      fileUpload: [, Validators.required]
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

        this.file = this.inputNode.nativeElement.files[0];

      };
      reader.onloadend = (e => {


        this.employeeService.uploadFile(this.file).subscribe({
          next: (result) => { },
          error: (err) => {
            this._snackBar.openSnackBar("تم تحميل الملف", NotificationType.fail, 5);
            this.uploading = false;
          },
          complete: () => {
            this._snackBar.openSnackBar("تم تحميل الملف", NotificationType.success, 5);
            this.uploading = false
          }


        }

        );

      });

      reader.readAsArrayBuffer(this.inputNode.nativeElement.files[0]);



    }



  }
  submit() {
    this.uploadFile();


  }

  // openSnackBar() {

  //   this._snackBar.openSnackBar("تم تحميل الملف", NotificationType.success, 5);

  // }

}

