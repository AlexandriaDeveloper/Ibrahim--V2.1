import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Param } from 'src/app/shared/models/params';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseApiUrl = environment.baseUrl + 'employee/';
  constructor(private http: HttpClient) { }
  uploadFile(file): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post(this.baseApiUrl, formData);
  }

  getEmployees(params: EmployeeParam) {
    let filterPara = new HttpParams();
    filterPara = filterPara.append('pageIndex', params.pageIndex);


    filterPara = filterPara.append('pageSize', params.pageSize);

    if (params.name !== null) {
      filterPara = filterPara.append('name', params.name);
    }
    if (params.departmentId !== null) {
      filterPara = filterPara.append('departmentId', params.departmentId);
    }


    if (params.tabCode !== null) {
      filterPara = filterPara.append('tabCode', params.tabCode);
    }

    if (params.tegaraCode !== null) {
      filterPara = filterPara.append('tegaraCode', params.tegaraCode);
    }
    if (params.nationalId !== null) {
      filterPara = filterPara.append('nationalId', params.nationalId);
    }
    return this.http.get(this.baseApiUrl, { params: filterPara });
  }

  updateEmployee(model: any) {
    return this.http.put(this.baseApiUrl, model);
  }
  deleteEmployee(model: any) {
    return this.http.delete(this.baseApiUrl + model.id);
  }

}


export class EmployeeParam extends Param {
  name?: string = null;
  tabCode?: string = null;
  tegaraCode?: string = null;
  nationalId?: string = null;
  departmentId?: string = null;
}
