import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { HandleErrorService } from '../handle-error.service';
import { IPaginateEntityApiResponse } from 'src/app/interfaces/paginate-entity-api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PacketService {

  constructor(
    private _http: HttpClient,
    private _handleErrorService: HandleErrorService
  ) { }

  show(id: string): Observable<IApiResponse<any>> {
    return this,this._http.get<>
  }

  get(args: any): Observable<IApiResponse<any>>{

  }

  list(args: any): Observable<IApiResponse<IPaginateEntityApiResponse<any>>>{

  }

  create(data: any): Observable<IApiResponse<any>>{

  }

  update(data: any): Observable<IApiResponse<any>>{

  }

  delete(id: string): Observable<IApiResponse<any>>{

  }

}
