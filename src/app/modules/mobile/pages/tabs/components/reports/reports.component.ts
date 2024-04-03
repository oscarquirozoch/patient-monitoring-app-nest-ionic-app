import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { ActionSheet } from 'src/app/classes/action-sheet.class';
import { Pagination } from 'src/app/classes/pagination.class';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IPaginateEntityApiResponse } from 'src/app/interfaces/paginate-entity-api-response.interface';
import { IPagination } from 'src/app/interfaces/pagination.interface';
import { IListUserApiResponse } from 'src/app/interfaces/user/list-users-api-response.interface';
import { UserService } from 'src/app/services/user/user.service.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {

  users: IPaginateEntityApiResponse<IListUserApiResponse[]>;
  pagination: IPagination = new Pagination();
  noMoreData: boolean = false;
  actionSheet: ActionSheet = new ActionSheet();
  isModalAdvanceFiltersOpen: boolean = false;
  segmentValue: string = 'requests';

  constructor(
    private _userService: UserService
  ) {
    this.users = {
      data: [],
      page: 1,
      total_data: 1,
      total_page: 1
    }

  }

  ngOnInit() {
    this.getUserList(this.pagination.page, this.pagination.limit);
  }

  private getUserList(page: number, limit: number) {
    this._userService.list({ page, limit }).subscribe((data: IApiResponse<IPaginateEntityApiResponse<IListUserApiResponse[]>>) => {
      this.users.page = data.result.page;
      this.users.total_data = data.result.total_data;
      this.users.total_page = data.result.total_page;

      data.result.data.forEach((user: IListUserApiResponse) => {
        this.users.data.push(user);
      });

      if (data.result.total_page < this.pagination.limit || data.result.total_page === 0) {
        this.noMoreData = true;
      }

      this.pagination.page++;
    });
  }

  changeSegment(event: any) {
    console.log(event);
    this.segmentValue = event.detail.value;
  }

  handleRefresh(event: any) {
    this.users.data = [];

    setTimeout(() => {
      const pagination = new Pagination();
      this.getUserList(pagination.page, pagination.limit);
      event.target.complete();
    }, 2000);
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    console.log(event);
    if (this.noMoreData) event.target.disabled = true;
    else {
      this.getUserList(this.pagination.page, this.pagination.limit);

      setTimeout(() => {
        event.target.complete();
      }, 1000);
    }
  }

  setOpen(isOpen: boolean, id?: string) {
    this.actionSheet.isActionSheetOpen = isOpen;

    this.actionSheet.setDeleteAction('Eliminar', () => {
      console.log(id);
    });

    this.actionSheet.setViewAction('Ver', () => {
      console.log(id);
    })
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  setOpenModalAdvanceFilters(value: boolean): void {
    this.isModalAdvanceFiltersOpen = value;
  }

}
