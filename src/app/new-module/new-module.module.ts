import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewModuleRoutingModule } from './new-module-routing.module';
import { NewModuleComponent } from './new-module.component';



@NgModule({
  declarations: [
    NewModuleComponent,

  ],
  imports: [
    CommonModule,
    NewModuleRoutingModule,

  ]
})
export class NewModuleModule { }
