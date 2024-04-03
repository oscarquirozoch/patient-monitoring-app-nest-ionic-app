import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IGetManagementTypesApiResponse } from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { IShowPatientApiResponse } from 'src/app/interfaces/patient/show-patient-api-response.interface';
import { UpdatePatientModel } from 'src/app/models/update-patient.model';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.page.html',
  styleUrls: ['./update-patient.page.scss'],
})
export class UpdatePatientPage implements OnInit {

  userId: string = '';
  patient: IShowPatientApiResponse | undefined;
  patientToUpdate: UpdatePatientModel;

  typeDocuments: IGetManagementTypesApiResponse[] = [];
  typeGenders: IGetManagementTypesApiResponse[] = [];
  typeFinancing: IGetManagementTypesApiResponse[] = [];

  constructor(
    private _patientService: PatientService,
    private _managementTypeService: ManagementTypeService,
    private route: ActivatedRoute
  ) {
    this.patientToUpdate = new UpdatePatientModel()
  }

  ngOnInit() {
    this.showUser();
    this.getManagementTypes();
  }

  private showUser() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id')!;
      this._patientService.show(params.get('id')!).subscribe((data: IApiResponse<IShowPatientApiResponse>) => {
        this.patient = data.result;
        this.patientToUpdate = this.patient as UpdatePatientModel;
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
    this._managementTypeService.get({ type: 'type_financing' }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeFinancing = data.result;
    });
  }

  updateUser() { }

}
