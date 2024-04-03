import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPaginateEntityApiResponse } from 'src/app/interfaces/paginate-entity-api-response.interface';
import { Pagination } from 'src/app/classes/pagination.class';
import { ActionSheet } from 'src/app/classes/action-sheet.class';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { Toast } from 'src/app/classes/toast.class';
import { IGetManagementTypesApiResponse } from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { IPatientsApiFilters } from 'src/app/interfaces/patient/patients-api-filters.interface';
import { PatientFiltersModel } from 'src/app/models/patients-filters.model';
import { PatientService } from 'src/app/services/patient/patient.service';
import { IListPatientsApiResponse } from 'src/app/interfaces/patient/list-patients-api-response.interface';
import { IPatient } from 'src/app/interfaces/patient/patient.interface';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {

  toast: Toast;
  loading: any;

  patientsGeneralSegment: IPaginateEntityApiResponse<IListPatientsApiResponse[]> = { data: [], page: 1, total_data: 0, total_page: 0 };
  patientsRequestsSegment: IPaginateEntityApiResponse<IListPatientsApiResponse[]> = { data: [], page: 1, total_data: 0, total_page: 0 };
  pagination: Pagination = new Pagination();
  noMoreData = false;
  actionSheet: ActionSheet = new ActionSheet();
  isModalAdvanceFiltersOpen = false;
  patientFiltersGeneralSegment: IPatientsApiFilters;
  patientFiltersRequestsSegment: IPatientsApiFilters;
  segmentValue: string = 'requests';

  typeDocuments: IGetManagementTypesApiResponse[] = [];
  typeRoles: IGetManagementTypesApiResponse[] = [];

  constructor(
    private _patientService: PatientService,
    private _managementTypeService: ManagementTypeService,
    private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.patientFiltersGeneralSegment = new PatientFiltersModel();
    this.patientFiltersGeneralSegment = { ...this.pagination.getAsObject() };
    this.patientFiltersRequestsSegment = new PatientFiltersModel();
    this.patientFiltersRequestsSegment = { ...this.pagination.getAsObject() };
    this.toast = new Toast();
  }

  async ngOnInit() {
    this.getPatientList();
    this.getManagementTypes();
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  changeSegment(event: any) {
    this.segmentValue = event.detail.value;
    this.initialSearch();
  }

  private getPatientList(event = 'reload') {
    console.log(this.segmentValue);
    const filters = this.segmentValue === 'general' ? this.patientFiltersGeneralSegment : this.patientFiltersRequestsSegment;

    this._patientService.list(filters).subscribe(response => {

      if (this.segmentValue === 'general') {
        if (event === 'reload') this.patientsGeneralSegment = response.result;
        if (event === 'infinite') response.result.data.forEach((item) => this.patientsGeneralSegment.data.push(item));
        this.noMoreData = response.result.total_page < this.pagination.limit || response.result.total_page === 0;
        this.pagination.page++;
      }

      if (this.segmentValue === 'requests' && (this.patientFiltersRequestsSegment.document_number !== undefined && this.patientFiltersRequestsSegment.document_number != '')) {
        if (event === 'reload') this.patientsRequestsSegment = response.result;
        if (event === 'infinite') response.result.data.forEach((item) => this.patientsRequestsSegment.data.push(item));
      }
    });
  }

  private deletePatient(id: string) {
    this._patientService.delete(id).subscribe((response: IApiResponse<IPatient>) => {
      if (response.code === 200) {
        let userName = response.result.name + ' ' + response.result.paternal_surname;
        this.toast.success().setMessage('El paciente ' + userName + ' se eliminó correctamente').show();
        this.initialSearch();
      }
    });
  }

  initialSearch() {
    this.isModalAdvanceFiltersOpen = false;
    this.pagination.reset();
    this.patientFiltersGeneralSegment = { ...this.patientFiltersGeneralSegment, page: this.pagination.page, limit: this.pagination.limit };
    this.patientFiltersRequestsSegment = { ...this.patientFiltersRequestsSegment, page: this.pagination.page, limit: this.pagination.limit };
    this.getPatientList();
  }

  private getManagementTypes() {
    this._managementTypeService.get({ type: 'type_document' }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeDocuments = data.result;
    });
    this._managementTypeService.get({ type: 'type_role' }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeRoles = data.result;
    });
  }

  handleSearchbar(event: any) {
    const query = event.target.value.toLowerCase();
    this.patientFiltersGeneralSegment.document_number = query;
    this.initialSearch();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.initialSearch();
      event.target.complete();
    }, 2000);
  }

  onIonInfinite(event: any) {
    if (this.noMoreData) {
      event.target.disabled = true;
    } else {
      this.patientFiltersGeneralSegment = { ...this.patientFiltersGeneralSegment, page: this.pagination.page, limit: this.pagination.limit };
      this.getPatientList('infinite');
      setTimeout(() => event.target.complete(), 1000);
    }
  }

  setOpen(isOpen: boolean, id?: any) {
    this.actionSheet.clearButtons();
    this.actionSheet.isActionSheetOpen = isOpen;

    this.actionSheet
      .setCancelAction()
      .setDeleteAction('Eliminar', () => {
        this.presentDeleteButton(id);
      })
      .setUpdateAction('Actualizar', () => {
        this.router.navigateByUrl(`/mobile/patients/update/${id}`);
      })
      .setUpdateAction('Asignar paquete', () => {
        this.router.navigateByUrl(`/mobile/patients/assign-packet/${id}`);
      })
      .setViewAction('Ver', () => {
        this.router.navigateByUrl(`/mobile/patients/view/${id}`);
      });
  }

  setOpenModalAdvanceFilters(value: boolean): void {
    this.isModalAdvanceFiltersOpen = value;
  }

  async presentDeleteButton(id: string) {
    const alert = await this.alertController.create({
      header: '¿Está seguro?',
      subHeader: 'El paciente se eliminará permanentemente',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => { },
      },
      {
        text: 'Confirmar',
        role: 'confirm',
        handler: () => {
          this.deletePatient(id);
        },
      }],
    });

    await alert.present();
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Espere por favor...'
    });
  }

}
