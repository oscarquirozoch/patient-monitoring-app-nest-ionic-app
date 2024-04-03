import { Component, OnInit } from '@angular/core';
import { Toast } from 'src/app/classes/toast.class';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IGetManagementTypesApiResponse } from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { Router } from '@angular/router';
import { CreatePatientModel } from 'src/app/models/create-patient.model';
import { PatientService } from 'src/app/services/patient/patient.service';
import { IPatient } from 'src/app/interfaces/patient/patient.interface';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.page.html',
  styleUrls: ['./create-patient.page.scss'],
})
export class CreatePatientPage implements OnInit {

  toast: Toast;

  patientToCreate: CreatePatientModel;

  typeDocuments: IGetManagementTypesApiResponse[] = [];
  typeGenders: IGetManagementTypesApiResponse[] = [];
  typeFinancing: IGetManagementTypesApiResponse[] = [];

  constructor(
    private _patientService: PatientService,
    private _managementTypeService: ManagementTypeService,
    private router: Router
  ) {
    this.patientToCreate = new CreatePatientModel();
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
    this._managementTypeService.get({ type: 'type_financing' }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeFinancing = data.result;
    });
  }

  createUser() {

    if (
      this.patientToCreate.type_document.id == '' ||
      this.patientToCreate.document_number == '' ||
      this.patientToCreate.name == '' ||
      this.patientToCreate.paternal_surname == '' ||
      this.patientToCreate.type_gender.id == '' ||
      this.patientToCreate.type_financing.id == ''
    ) {
      this.toast.warning().incompleteDataMessage().show();
      return;
    }

    try {
      this._patientService.create({
        document_number: this.patientToCreate.document_number,
        dob: this.patientToCreate.dob,
        name: this.patientToCreate.name,
        paternal_surname: this.patientToCreate.paternal_surname,
        maternal_lastname: this.patientToCreate.maternal_lastname,
        email: this.patientToCreate.email,
        phone_number: this.patientToCreate.phone_number,
        status: true,
        user_creator: '0027cf5c-d290-40c3-93cf-6b60cf87beba',
        type_document: this.patientToCreate.type_document.id,
        type_gender: this.patientToCreate.type_gender.id,
        type_financing: this.patientToCreate.type_financing.id
      }).subscribe((response: IApiResponse<IPatient>) => {
        if (response.code === 201) {
          this.patientToCreate.reset();
          this.toast.success().createMessage().show();
          this.router.navigateByUrl('/mobile/tabs/patients');
        };
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

}
