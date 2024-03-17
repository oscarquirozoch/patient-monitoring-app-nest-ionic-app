import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry } from 'rxjs';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IPaginateEntityApiResponse } from 'src/app/interfaces/paginate-entity-api-response.interface';
import { IListUserApiResponse } from 'src/app/interfaces/user/list-users-api-response.interface';
import { IShowUserApiResponse } from 'src/app/interfaces/user/show-user-api-response.interface';
import { IUser } from 'src/app/interfaces/user/user.interface';
import { HandleErrorService } from '../handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient,
    private _handleErrorService: HandleErrorService
  ) { }

  show(id: string): Observable<IApiResponse<IShowUserApiResponse>> {
    return this._http.get<IApiResponse<IShowUserApiResponse>>('users/show/' + id);
  }

  list(args: any): Observable<IApiResponse<IPaginateEntityApiResponse<IListUserApiResponse[]>>> {
    return this._http.get<IApiResponse<IPaginateEntityApiResponse<IListUserApiResponse[]>>>('users/list', { params: args });
  }

  create(data: any): Observable<IApiResponse<IUser>> {
    return this._http.post<IApiResponse<IUser>>('users', data).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error); })
    );
  }

  update(data: any): Observable<IApiResponse<IUser>> {
    return this._http.put<IApiResponse<IUser>>('users', data);
  }

  delete(id: string): Observable<IApiResponse<IUser>> {
    return this._http.delete<IApiResponse<IUser>>('users', { body: { id } })
  }
}
