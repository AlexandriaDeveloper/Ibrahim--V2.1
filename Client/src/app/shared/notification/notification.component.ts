import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit  {

  constructor(public snackBarRef: MatSnackBarRef<NotificationComponent>,@Inject(MAT_SNACK_BAR_DATA) public data: any) {

  }

  ngOnInit(): void {


  }

}
