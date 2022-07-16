import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/navbar/navbar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    NavBarComponent,
    SideBarComponent,

  ],
  imports: [
    CommonModule,SharedModule
  ], exports: [
    NavBarComponent,
    SideBarComponent
  ]
})
export class CoreModule { }
