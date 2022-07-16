import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeParam, EmployeeService } from '../services/employee.service';
import { debounce, debounceTime, distinctUntilChanged, forkJoin, fromEvent, map, Observable, of, skip, startWith, Subscription, tap } from 'rxjs';
import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { NotificationBarService } from 'src/app/shared/services/notification-bar.service';
import { NotificationType } from 'src/app/shared/models/notifications';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeContactDialogComponent } from './employee-contact-dialog/employee-contact-dialog.component';
import { EmployeeDeleteDialogComponent } from './employee-delete-dialog/employee-delete-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { DepartmentParam, DepartmentService } from 'src/app/department/department.service';
import { Department } from 'src/app/department/models/department.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Param } from 'src/app/shared/models/params';




@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
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
export class EmployeeListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  count;
  displayedColumns: string[] = ['action', 'name', 'tabCode', 'tegaraCode', 'department', 'nationalId'];
  dataSource;
  departments: Department[] = [];
  filterdDepartments
  employeeParam: EmployeeParam = new EmployeeParam();
  departmentParam: DepartmentParam = new DepartmentParam();
  filteredOptions: Observable<any[]>;


  searchSubscrion: Subscription;
  constructor(private employeeService: EmployeeService,
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private notificationService: NotificationBarService, private departmentService: DepartmentService) { }
  ngOnDestroy(): void {
    this.searchSubscrion.unsubscribe();
  }
  ngAfterViewInit(): void {



    this.paginator.page
      .pipe(
        map((x) => {
          this.employeeParam.pageIndex = x.pageIndex
          this.employeeParam.pageSize = x.pageSize
        }),
        startWith(null),
        tap(() => {
          this.loadEmployee(

            // this.paginator?.pageIndex ?? 0,
            // this.paginator?.pageSize ?? 5
          );
        })
      )
      .subscribe((x) => { });
    this.search();

    // this.filteredOptions = fromEvent(this.autoComplete.nativeElement, ("keyup")).pipe(startWith(''), map((val: any) => this._filter(val.target.value || '')));
    // this.filteredOptions.subscribe();
  }


  ngOnInit(): void {
    const departmentId = this.router.snapshot.queryParams["departmentId"];
    if (departmentId !== undefined) {
      this.employeeParam.departmentId = departmentId;
    }

    this.departmentService.getDepartments(this.departmentParam).subscribe({
      next: (x: Department[]) => {
        this.departments = x;
      }
    });




    // this.departmentService.getDepartments().subscribe((x: any) => this.departments = x);

    this.loadEmployee()
  }

  loadEmployee() {



    this.employeeService.getEmployees(this.employeeParam).subscribe((x: any) => {


      this.dataSource = x.data;
      this.employeeParam.pageIndex = x.pageIndex;
      this.employeeParam.pageSize = x.pageSize;
      this.count = x.count;


    })

  }

  @ViewChild('nameInput') nameSearchField: ElementRef;
  @ViewChild('tabCodeInput') tabCodeSearchField: ElementRef;
  @ViewChild('tegaraCodeInput') tegaraCodeSearchField: ElementRef;
  @ViewChild('nationalIdInput') nationalIdSearchField: ElementRef;
  @ViewChild('searchDepartmentInput') departmentSearchField: ElementRef;
  search() {

    var nameObservable = fromEvent(this.nameSearchField.nativeElement, 'keyup')
      .pipe(debounceTime(1000), distinctUntilChanged(), tap((x: any) => {


        if (this.employeeParam.name !== x.target.value) {
          this.employeeParam.pageIndex = 0
          this.employeeParam.name = x.target.value;

          this.loadEmployee()


        }
      }));


    var tabCodeObservable = fromEvent(this.tabCodeSearchField.nativeElement, 'keyup')
      .pipe(debounceTime(600), distinctUntilChanged(), tap((x: any) => {


        if (this.employeeParam.tabCode !== x.target.value) {
          this.employeeParam.pageIndex = 0
          this.employeeParam.tabCode = x.target.value;
          this.loadEmployee()
        }
      }));


    var tegaraCodeObservable = fromEvent(this.tegaraCodeSearchField.nativeElement, 'keyup')
      .pipe(debounceTime(600), distinctUntilChanged(), tap((x: any) => {
        if (this.employeeParam.tegaraCode !== x.target.value) {
          this.employeeParam.pageIndex = 0
          this.employeeParam.tegaraCode = x.target.value;
          this.loadEmployee()
        }
      }));

    var nationalIdObservable = fromEvent(this.nationalIdSearchField.nativeElement, 'keyup').
      pipe(debounceTime(600), distinctUntilChanged(), tap((x: any) => {
        if (this.employeeParam.nationalId !== x.target.value) {
          this.employeeParam.pageIndex = 0
          this.employeeParam.nationalId = x.target.value;
          this.loadEmployee();
        }
      }));


    var searchDepartmentObservable = fromEvent(this.departmentSearchField.nativeElement, 'keyup')
    searchDepartmentObservable.pipe(map((val: any) => this._filter(val.target.value || '')
    )).subscribe();



    this.searchSubscrion = forkJoin([nameObservable, tabCodeObservable, tegaraCodeObservable, nationalIdObservable, searchDepartmentObservable])

      .subscribe();
  }


  openDialog(element): void {

    const dialogRef = this.dialog.open(EmployeeContactDialogComponent, {
      minWidth: '600px',
      data: { employee: element, departments: this.departments },
      hasBackdrop: true,
      direction: 'rtl',
      minHeight: '600px',
      panelClass: ['dialog'],
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployee();
        this.notificationService.openSnackBar("تم حفظ البيان", NotificationType.success, 5)
      }
    });
  }

  deleteDialog(element): void {


    const dialogRef = this.dialog.open(EmployeeDeleteDialogComponent, {
      minWidth: '600px',
      data: { employee: element },
      hasBackdrop: true,
      direction: 'rtl',
      minHeight: '200px',
      panelClass: ['dialog'],
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.loadEmployee();
        this.notificationService.openSnackBar("تم حذف الموظف", NotificationType.success, 5)
      }
    });
  }

  private _filter(value: string): Department[] {



    const filterValue = value.toLowerCase();



    this.filterdDepartments = this.departments.filter(option => option.name.startsWith(filterValue));


    return this.filterdDepartments;
  }
  displayWithFun(ev) {

    const index = this.filterdDepartments.findIndex(x => x.id == ev);


    return this.filterdDepartments[index] ? this.filterdDepartments[index]?.name : '';



  }
  autocompleteSelectionChange(ev: MatAutocompleteSelectedEvent) {

    this.employeeParam.departmentId = ev.option.value;
    this.loadEmployee();

  }

  getDepartmentById(departmentId) {


    const index = this.departments.findIndex(x => x.id === departmentId);


    return this.departments[index] ? this.departments[index]?.name : '';

  }
  clearSearch(param: any) {
    switch (param) {
      case 'name':
        this.employeeParam.name = null
        this.nameSearchField.nativeElement.value = '';
        break;
      case 'tabCode':
        this.employeeParam.tabCode = null
        this.tabCodeSearchField.nativeElement.value = '';
        break;
      case 'tegaraCode':
        this.employeeParam.tegaraCode = null
        this.tegaraCodeSearchField.nativeElement.value = '';
        break;
      case 'departmentId':
        this.employeeParam.departmentId = null
        this.departmentSearchField.nativeElement.value = '';
        break;
      case 'nationalId':
        this.employeeParam.nationalId = null
        this.nationalIdSearchField.nativeElement.value = '';
        break;
      default:
        break;
    }


    this.loadEmployee();
  }
}

