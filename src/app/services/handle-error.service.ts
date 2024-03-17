import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(
    private _toastController: ToastController
  ) { }

  throw(error: HttpErrorResponse) {
    this.presentToast('top', error.error.message);
    return throwError(() => error);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this._toastController.create({
      color: 'danger',
      message: message,
      duration: 3000,
      position: position,
    });

    await toast.present();
  }
}
