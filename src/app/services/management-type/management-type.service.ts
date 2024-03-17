import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IGetManagementTypesApiResponse } from 'src/app/interfaces/management-type/get-management-types-api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ManagementTypeService {

  constructor(
    private http: HttpClient
  ) { }

  get(args: any): Observable<IApiResponse<IGetManagementTypesApiResponse[]>> {
    return this.http.get<IApiResponse<IGetManagementTypesApiResponse[]>>('management-types/get', { params: args });
  }

  create(data: any): Observable<any> {
    return this.http.post('management-types', data);
  }
}
