import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    studentSignIn!:FormGroup;
  constructor(private stSign:FormBuilder,private studentService:StudentService) { }

  ngOnInit(): void {
    this.studentSignIn=this.stSign.group({
      userName:[null ,Validators.required],
      mobileNo:[null,Validators.required],
      emailId:[null,Validators.required],
      password:[null,Validators.required]
    })

  }

  onSubmit(){
    if(this.studentSignIn.valid){
      this.studentService.signUp(this.studentSignIn.value).
      subscribe({
        next:(res:any)=>{
          console.log(res);
          if(res==1){
            Swal.fire(
              'Failed!',
              'All are manadatory!!',
              'error',
               )
          }
         else if(res==2){
            Swal.fire(
              'sucess!',
              'sucess registered!!',
              'success',
               )
               this.studentSignIn.reset();
          }
          else if(res==3){
            Swal.fire(
              'Failed!',
              'Already emailId egistered!!',
              'error',
               )
          }
          else if(res==4){
            Swal.fire(
              'Failed!',
              'Already mobileNo Registered!!',
              'error',
               )
          }
        },
        error:(err:any)=>{
          console.log(err);
        }
      })

    }else{
      Swal.fire(

        'Failed!',
        'All are manadatory!!!',
        'info',
      )
    }



  }

}
