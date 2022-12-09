import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { StudentService } from '../student.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  student!: FormGroup;
  inValidCaptcha: boolean = false;

  constructor(
    private st: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    var component = this;
    $('#loginCaptchaImg').html(this.studentService.getCaptcha());
    $('#loginRefreshCaptcha').click(function () {
      $('#loginCaptchaImg').html(component.studentService.getCaptcha());
    });

    this.student = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

  }

  onSubmit() {
    //this.router.navigate(['AppModule/welcome/registerStudent']);
    this.inValidCaptcha = false;
    let challange = $('#txtLoginCaptcha').val();
    let captcha = $('#loginCaptchaImg').html();
    let isValid: boolean = false;
    isValid = this.studentService.validateCaptcha(challange, captcha);
    alert("The captcha is "+JSON.stringify(isValid))

    if (isValid == false) {
      this.inValidCaptcha = true;
      // return false;
    } else {
      //Code Here (Login credential..)
      if (this.student.valid) {
      //  alert(JSON.stringify(this.student.value));
        this.studentService.searchData(this.student.value).subscribe({
          next: (res: any) => {
            console.log('the response is:' + JSON.stringify(res));
          //  alert(JSON.stringify(this.student.get('userName')?.value))
           sessionStorage.setItem('name',this.student.get('userName')?.value)
            if (res.success == 'SuccessFully signin') {
              this.router.navigate(['AppModule/welcome/registerStudent']);
            }
            if (res.viewData == 'Same Id') {
              this.router.navigate(['AppModule/welcome/registerStudent']);
            }
            if (res.failed == 'No account!!please SignUp your Account') {
              Swal.fire(
                'Failed!',
                'No account!!please signUp your account!!',
                'error'
              );
            }
            this.student.reset(); //it is used for reset the name and password
          },
          error: (err: any) => {
            console.log(err);
            Swal.fire(
              'Failed!',
              'Please Enter validate User Name And Password!!!',
              'error'
            );
          },
        });
      } else {
        Swal.fire('Failed!', 'Please Enter User Name And Password!!!', 'info');
      }
    }
  }
}
