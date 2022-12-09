import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewModuleComponent } from './new-module.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: '', redirectTo:'welcome',pathMatch:'full' },
  
  {path:'welcome',loadChildren:()=>import('../sas-module/sas-module-routing.module').then(m=> m.SasModuleRoutingModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewModuleRoutingModule { }
