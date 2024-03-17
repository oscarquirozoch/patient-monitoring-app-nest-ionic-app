import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsPageModule } from './pages/tabs/tabs.module';
import { MobileRouterModule } from './mobile-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MobileRouterModule,
    TabsPageModule
  ]
})
export class MobileModule { }
