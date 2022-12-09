import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  studentForgotPass!:FormGroup;
  constructor(private sfp:FormBuilder,private studentService:StudentService) { }

  ngOnInit(): void {
    this.studentForgotPass=this.sfp.group(
      {
        emailId :[null ,Validators.required],
        password:[null,Validators.required],
        cpassword:[null,Validators.required]
      }
    )

  }
  forgot(){


    if(this.studentForgotPass.get("password")?.value==this.studentForgotPass.get("cpassword")?.value){

       this.studentService.forgotPass(this.studentForgotPass.value).
       subscribe({
         next:(res:any)=>{

           console.log(res);

           if(res.success=="reset password"){
            Swal.fire(
              'Success!',
              'Reset password successfully!!!',
              'success',
               )
           }
           else if(res.failed=="wrong mailId"){
            Swal.fire(
              'Failed!',
              'wrong mailId!!!',
              'error',
               )

           }
         },
         error:(err:any)=>{
           console.log(err);
         }
       });
    this.studentForgotPass.reset();

    }
    else{
      Swal.fire(
        'Failed!',
        'Password not same!!!',
        'error',
         )
    }

  }

}
