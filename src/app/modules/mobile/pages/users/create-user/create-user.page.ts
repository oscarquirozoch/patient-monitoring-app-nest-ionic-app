import { Component, OnInit } from '@angular/core';
import { Toast } from 'src/app/classes/toast.class';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IGetManagementTypesApiResponse } from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { IUser } from 'src/app/interfaces/user/user.interface';
import { CreateUserModel } from 'src/app/models/create-user.model';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { UserService } from 'src/app/services/user/user.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {

  toast: Toast;

  userToCreate: CreateUserModel;

  typeDocuments: IGetManagementTypesApiResponse[] = [];
  typeGenders: IGetManagementTypesApiResponse[] = [];
  typeRoles: IGetManagementTypesApiResponse[] = [];

  constructor(
    private _userService: UserService,
    private _managementTypeService: ManagementTypeService,
    private router: Router
  ) {
    this.userToCreate = new CreateUserModel();
    this.toast = new Toast();
  }

  ngOnInit() {
    this.getManagementTypes();
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

  createUser() {

    if (
      this.userToCreate.type_document.id == '' ||
      this.userToCreate.document_number == '' ||
      this.userToCreate.name == '' ||
      this.userToCreate.paternal_surname == '' ||
      this.userToCreate.dob == '' ||
      this.userToCreate.type_gender.id == '' ||
      this.userToCreate.username == '' ||
      this.userToCreate.password == '' ||
      this.userToCreate.confirm_password == '' ||
      this.userToCreate.type_role.id == ''
    ) {
      this.toast.warning().setMessage('Faltan completar datos!').show();
      return;
    }

    if (this.userToCreate.password !== this.userToCreate.confirm_password) {
      this.toast.warning().setMessage('Las contraseñas no coinciden!').show();
      return;
    }


    try {
      this._userService.create({
        document_number: this.userToCreate.document_number,
        dob: this.userToCreate.dob,
        name: this.userToCreate.name,
        paternal_surname: this.userToCreate.paternal_surname,
        maternal_lastname: this.userToCreate.maternal_lastname,
        email: this.userToCreate.email,
        phone_number: this.userToCreate.phone_number,
        username: this.userToCreate.username,
        password: this.userToCreate.password,
        status: true,
        type_document: this.userToCreate.type_document.id,
        type_gender: this.userToCreate.type_gender.id,
        type_role: this.userToCreate.type_role.id
      }).subscribe((response: IApiResponse<IUser>) => {
        if (response.code === 201) {
          this.userToCreate.reset();
          this.toast.success().setMessage('El usuario se creo correctamente').show();
          this.router.navigateByUrl('/mobile/tabs/users');
        };
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}
