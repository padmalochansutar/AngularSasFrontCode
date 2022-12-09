import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { CollegeComponent } from './college/college.component';
import { PaymentComponent } from './payment/payment.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from '../new-module/header/header.component';
import { ViewPageComponent } from './view-page/view-page.component';

const routes: Routes = [
  {path:'',redirectTo:'sasheader',pathMatch:'full'},
  {path:'sasheader',component:HeaderComponent},
  {path:'registerStudent',component:StudentRegisterComponent},
  {path:'college',component:CollegeComponent},
  {path:'contact',component:ContactComponent},
  {path:'payment',component:PaymentComponent},

  {path:'view',component:ViewPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SasModuleRoutingModule { }
