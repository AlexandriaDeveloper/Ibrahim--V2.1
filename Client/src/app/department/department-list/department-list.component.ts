import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import { EmployeeParam } from 'src/app/employee/employee/services/employee.service';
import { NotificationBarService } from 'src/app/shared/services/notification-bar.service';
import { DepartmentParam, DepartmentService } from '../department.service';
import { debounce, debounceTime, distinctUntilChanged, fromEvent, map, Observable, of, startWith, tap } from 'rxjs';
import { DepartmentAddDialogComponent } from './department-add-dialog/department-add-dialog.component';
import { NotificationType } from 'src/app/shared/models/notifications';
import { DepartmentDeleteDialogComponent } from './department-delete-dialog/department-delete-dialog.component';
@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
  animations: [trigger('rowsAnimation', [
    transition('void => *', [
      style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
      sequence([
        animate(".35s ease", style({ height: '*', opacity: '.4', transform: 'translateX(0)', 'box-shadow': 'none' })),
        animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ])]
})
export class DepartmentListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  count;
  displayedColumns: string[] = ['action', 'name', 'employeesCount'];
  dataSource;

  departmentParam: DepartmentParam = new DepartmentParam();
  constructor(private departmentService: DepartmentService, public dialog: MatDialog, private notificationService: NotificationBarService) { }

  ngOnInit(): void {
    this.departmentParam.isPagination = true;
  }
  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        map((x) => {
          this.departmentParam.pageIndex = x.pageIndex
          this.departmentParam.pageSize = x.pageSize
        }),
        startWith(null),
        tap(() => {
          this.loadDepartment(
            //this.departmentParam
            // this.paginator?.pageIndex ?? 0,
            // this.paginator?.pageSize ?? 5
          );
        })
      )
      .subscribe((x) => { });
    this.search();
  }

  loadDepartment() {
    this.departmentService.getDepartments(this.departmentParam).subscribe((x: any) => {


      this.count = x.count
      this.departmentParam.pageIndex = x.pageIndex;
      this.departmentParam.pageSize = x.pageSize;

      this.dataSource = x.data;
    }
    )
  }
  @ViewChild('nameInput') nameSearchField: ElementRef;

  search() {

    var nameObservable = fromEvent(this.nameSearchField.nativeElement, 'keyup')
    nameObservable.pipe(debounceTime(1000), distinctUntilChanged(), tap((x: any) => {



      this.departmentParam.pageIndex = 0
      this.departmentParam.name = x.target.value;
      this.loadDepartment()
    })).subscribe();
  }

  openNewDepartmentDialog(type, element = null): void {


    const dialogRef = this.dialog.open(DepartmentAddDialogComponent, {
      minWidth: '600px',
      data: { type: type, department: element },
      hasBackdrop: true,
      direction: 'rtl',
      minHeight: '300px',
      panelClass: ['dialog'],
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDepartment();
        this.notificationService.openSnackBar("تم حفظ البيان", NotificationType.success, 5)
      }
    });
  }

  deleteDialog(element): void {


    const dialogRef = this.dialog.open(DepartmentDeleteDialogComponent, {
      minWidth: '600px',
      data: { department: element },
      hasBackdrop: true,
      direction: 'rtl',
      minHeight: '200px',
      panelClass: ['dialog'],
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.loadDepartment();
        this.notificationService.openSnackBar("تم حذف القسم", NotificationType.success, 5)
      }
    });
  }
}
