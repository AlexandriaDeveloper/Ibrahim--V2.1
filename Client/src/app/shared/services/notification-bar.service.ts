import { Inject, Injectable } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NotificationType } from '../models/notifications';
import { NotificationComponent } from '../notification/notification.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationBarService {


private cssClass =['mat-snack-bar-success','mat-snack-bar-danger','mat-snack-bar-warn']
  constructor( private _snackBar: MatSnackBar) { }



  openSnackBar(message : string , type: NotificationType, durationInSeconds : number) {

    this._snackBar.openFromComponent(NotificationComponent,{
      duration: durationInSeconds * 1000,
      horizontalPosition:'start',
      verticalPosition:'top',
      direction:'rtl',
      data:{
        message:message,
        type:type
      },
      panelClass:[this.cssClass[type]],


    });
  }
}
