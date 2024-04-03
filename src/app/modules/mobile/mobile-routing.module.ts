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
  },
  {
    path: 'patients/assign-packet/:id',
    loadChildren: () => import('./pages/patients/assign-packet/assign-packet.module').then(m => m.AssignPacketPageModule)
  },
  {
    path: 'packets/list',
    loadChildren: () => import('./pages/packets/list-packets/list-packets.module').then(m => m.ListPacketsPageModule)
  },
  {
    path: 'packets/view/:id',
    loadChildren: () => import('./pages/packets/view-packet/view-packet.module').then(m => m.ViewPacketPageModule)
  },
  {
    path: 'packets/create',
    loadChildren: () => import('./pages/packets/create-packet/create-packet.module').then(m => m.CreatePacketPageModule)
  },
  {
    path: 'packets/update/:id',
    loadChildren: () => import('./pages/packets/update-packet/update-packet.module').then(m => m.UpdatePacketPageModule)
  },
  {
    path: 'specialities/list',
    loadChildren: () => import('./pages/specialities/list-specialities/list-specialities.module').then(m => m.ListSpecialitiesPageModule)
  },
  {
    path: 'specialities/create',
    loadChildren: () => import('./pages/specialities/create-speciality/create-speciality.module').then(m => m.CreateSpecialityPageModule)
  },
  {
    path: 'specialities/update/:id',
    loadChildren: () => import('./pages/specialities/update-speciality/update-speciality.module').then(m => m.UpdateSpecialityPageModule)
  },
  {
    path: 'management-types/list',
    loadChildren: () => import('./pages/management-types/list-management-types/list-management-types.module').then(m => m.ListManagementTypesPageModule)
  },
  {
    path: 'management-types/view/:id',
    loadChildren: () => import('./pages/management-types/view-management-type/view-management-type.module').then(m => m.ViewManagementTypePageModule)
  },
  {
    path: 'management-types/create',
    loadChildren: () => import('./pages/management-types/create-management-type/create-management-type.module').then(m => m.CreateManagementTypePageModule)
  },
  {
    path: 'management-types/update/:id',
    loadChildren: () => import('./pages/management-types/update-management-type/update-management-type.module').then(m => m.UpdateManagementTypePageModule)
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MobileRouterModule { }