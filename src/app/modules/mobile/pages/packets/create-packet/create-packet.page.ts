import { Component, OnInit } from '@angular/core';
import { Toast } from 'src/app/classes/toast.class';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IUser } from 'src/app/interfaces/user/user.interface';
import { CreateUserModel } from 'src/app/models/create-user.model';
import { UserService } from 'src/app/services/user/user.service.service';
import { Router } from '@angular/router';
import { SpecialityService } from 'src/app/services/speciality/speciality.service';
import { IGetSpecialitiesApiResponse } from 'src/app/interfaces/speciality/get-specialities-api-response.interface';
import { ICheckbox } from 'src/app/interfaces/checkbox.interface';

@Component({
  selector: 'app-create-packet',
  templateUrl: './create-packet.page.html',
  styleUrls: ['./create-packet.page.scss'],
})
export class CreatePacketPage implements OnInit {

  toast: Toast;

  specialities: ICheckbox[] | undefined;
  specialitiesSelected: string[] = [];
  userToCreate: CreateUserModel;
  isModalAddSpecialitiesOpen: boolean = false;

  constructor(
    private _userService: UserService,
    private _specialityService: SpecialityService,
    private router: Router
  ) {
    this.userToCreate = new CreateUserModel();
    this.toast = new Toast();
  }

  ngOnInit() {
    this.getSpecialities();
  }

  getSpecialities() {
    this._specialityService.get({}).subscribe((data: IApiResponse<IGetSpecialitiesApiResponse[]>) => {
      this.specialities = data.result.map((item: IGetSpecialitiesApiResponse) => {
        return {
          value: item.id,
          text: item.name,
          checked: false
        }
      });
    })
  }

  setOpenModalAddSpecialities(value: boolean): void {
    this.isModalAddSpecialitiesOpen = value;
  }

  checkSpeciality(event: any) {
    if (event.detail.checked) {
      this.specialitiesSelected.push(event.detail.value)
    } else {
      let index = this.specialitiesSelected.indexOf(event.detail.value);
      if (index !== -1) this.specialitiesSelected.splice(index, 1);
    }
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
