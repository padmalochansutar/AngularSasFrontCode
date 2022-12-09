import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { StudentRegisterComponent } from './sas-module/student-register/student-register.component';
import { CollegeComponent } from './sas-module/college/college.component';
import { PaymentComponent } from './sas-module/payment/payment.component';
import { ViewPageComponent } from './sas-module/view-page/view-page.component';
import { HeaderComponent } from './new-module/header/header.component';

const routes: Routes = [

  {path:'',redirectTo:'signin',pathMatch:'full'},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'forgot',component:ForgotPasswordComponent},


  { path: 'AppModule', loadChildren: () => import('./new-module/new-module.module').then(m => m.NewModuleModule) },
  {path:'**',component:PageNotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
