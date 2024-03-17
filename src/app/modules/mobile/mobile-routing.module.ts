import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'users/create',
    loadChildren: () => import('./pages/users/create-user/create-user.module').then(m => m.CreateUserPageModule)
  },
  {
    path: 'users/update/:id',
    loadChildren: () => import('./pages/users/update-user/update-user.module').then(m => m.UpdateUserPageModule)
  },
  {
    path: 'users/view/:id',
    loadChildren: () => import('./pages/users/view-user/view-user.module').then(m => m.ViewUserPageModule)
  },
  {
    path: 'patients/create',
    loadChildren: () => import('./pages/patients/create-patient/create-patient.module').then(m => m.CreatePatientPageModule)
  },
  {
    path: 'patients/update/:id',
    loadChildren: () => import('./pages/patients/update-patient/update-patient.module').then(m => m.UpdatePatientPageModule)
  },
  {
    path: 'patients/view/:id',
    loadChildren: () => import('./pages/patients/view-patient/view-patient.module').then(m => m.ViewPatientPageModule)
  }


]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MobileRouterModule { }