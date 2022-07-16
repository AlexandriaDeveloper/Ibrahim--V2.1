import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeParam } from '../employee/employee/services/employee.service';
import { Param } from '../shared/models/params';
import { Department, DepartmentEmployeeFileUpload } from './models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {


  baseApiUrl = environment.baseUrl + 'department/';
  constructor(private http: HttpClient) { }
  uploadFile(file: DepartmentEmployeeFileUpload): Observable<any> {


    const formData = new FormData();
    formData.append("fileUpload", file.fileUpload, file.fileUpload.name);
    formData.append("selectedDepartmentId", file.selectedDepartmentId)

    return this.http.post(this.baseApiUrl + 'upload', formData);

  }

  getDepartments(params: DepartmentParam) {
    let filterPara = new HttpParams();
    filterPara = filterPara.append('pageIndex', params.pageIndex);

    filterPara = filterPara.append('pageSize', params.pageSize);

    if (params.name !== null) {
      filterPara = filterPara.append('name', params.name);
    }


    if (params.isPagination === true) {
      filterPara = filterPara.append('isPagination', params.isPagination);
    }
    return this.http.get(this.baseApiUrl, { params: filterPara });
  }

  postDepartment(deparment: Department) {
    return this.http.post(this.baseApiUrl, deparment);
  }
  putDepartment(deparment: Department) {
    return this.http.put(this.baseApiUrl, deparment);
  }
  deleteDepartment(department: any) {


    return this.http.delete(this.baseApiUrl + department.id);
  }
}

export class DepartmentParam extends Param {
  name?: string = null;

}
