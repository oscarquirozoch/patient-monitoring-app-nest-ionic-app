import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IGetManagementTypesApiResponse } from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { IShowUserApiResponse } from 'src/app/interfaces/user/show-user-api-response.interface';
import { UpdateUserModel } from 'src/app/models/update-user.model';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { UserService } from 'src/app/services/user/user.service.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {

  userId: string = '';
  user: IShowUserApiResponse | undefined;
  userToUpdate: UpdateUserModel;

  typeDocuments: IGetManagementTypesApiResponse[] = [];
  typeGenders: IGetManagementTypesApiResponse[] = [];
  typeRoles: IGetManagementTypesApiResponse[] = [];

  constructor(
    private _userService: UserService,
    private _managementTypeService: ManagementTypeService,
    private route: ActivatedRoute
  ) {
    this.userToUpdate = new UpdateUserModel()
  }

  ngOnInit() {
    this.showUser();
    this.getManagementTypes();
  }

  private showUser() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id')!;
      this._userService.show(params.get('id')!).subscribe((data: IApiResponse<IShowUserApiResponse>) => {
        this.user = data.result;
        this.userToUpdate = this.user as UpdateUserModel;
      });
    });
  }

  private getManagementTypes() {
    this._managementTypeService.get({ type: 'type_document' }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeDocuments = data.result;
    });
    this._managementTypeService.get({ type: 'type_gender' }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeGenders = data.result;
    });
    this._managementTypeService.get({ type: 'type_role' }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeRoles = data.result;
    });
  }

  updateUser() { }
}
