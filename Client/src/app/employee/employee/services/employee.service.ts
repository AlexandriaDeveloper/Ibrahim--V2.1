import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
    return this.http.post(this.baseApiUrl, formData, { reportProgress: true, observe: "events" });
  }
  uploadPhoneFile(file): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post(this.baseApiUrl + 'upload-phone', formData, { reportProgress: true, observe: "events" });
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
    filterPara = filterPara.append('isPagination', params.isPagination);
    return this.http.get(this.baseApiUrl, { params: filterPara });
  }
  downloadPhoneExcelFile() {
    // let options = new RequestOptions({responseType: ResponseContentType.Blob });
    // const blob = new Blob([data], { type: 'application/octet-stream' });
    // const url = window.URL.createObjectURL(blob);
    // window.open(url);
    return this.http.get(this.baseApiUrl + 'download-phone', { observe: 'response', responseType: 'blob' }).pipe(map((x: HttpResponse<any>) => {


      let blob = new Blob([x.body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      const url = window.URL.createObjectURL(blob);
      console.log(url);

      window.open(url);

    }))
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
