import { Component, OnInit } from '@angular/core';
import { compileClassMetadata, InvokeFunctionExpr, IfStmt } from '@angular/compiler';
import { DefaultMatCalendarRangeStrategy } from '@angular/material/datepicker';
import { TitleStrategy, Router } from '@angular/router';
import { StudentService } from '../../student.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
      accountHolName:any;
     castList:any;
     achName:any;
     acList:any;
     form!:FormGroup;
  accountNumber: any;
  paymentFee:any;
  id:any;
  var:any;
  name:any;
  constructor(private studentService:StudentService, private fb:FormBuilder,private route:Router) { }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('id');
   //this.id=8;
   this.name=sessionStorage.getItem('name')
    this.form = this.fb.group({
      accountNo: new FormControl(null, Validators.required),
      paymentId:new FormControl(null, Validators.required),
      castId:new FormControl(null, Validators.required),
      accHolderName:new FormControl(null, Validators.required),
      accountNumber:new FormControl(null, Validators.required),
      paymentFee:new FormControl(null, Validators.required),
      registerId:new FormControl(null, Validators.required)
    })
    this.form.controls['paymentId'].setValue(0.00);
this.castData();
this.AccData();
  }
  castData(){
   this.studentService.getCastData().subscribe({
     next:(res:any)=>{
       this.castList=res;
       console.log(this.castList);

     }
   })
  }
  onPaymentSelect(pId:any){
   // alert(pId.value)
    this.studentService.getDataByPaymentId(pId.value).subscribe(
      {
        next:(res:any)=>{
          console.log(res);
          this.form.controls['paymentId'].setValue(res);//either use patch value in ts then automatic add in formcontrol but form controlname and patch value name must be same or either use  page we dont use [value]="paymentList"
            //alert(JSON.stringify(this.form.get('paymentId')?.value))
            // this.paymentFee=this.form.get('paymentId')?.value
            // alert(JSON.stringify(this.paymentFee))
        },
        error:(err:any)=>{
          console.log(err);
        }
      })

  }

  AccData(){
    this.studentService.getAcData().subscribe({
      next:(res:any)=>{
        console.log(res[0].accountNo);
        this.acList = res[0].accountNo;
        this.achName=res[0].accHolderName;
       // alert(JSON.stringify(this.achName));
        //this.form.controls['accountNo'].setValue(res[0].accountNo);//for list we can use array index[0] but in object we use normal list.variable what data you want
        // if(this.accountNumber==this.acList){
        //   this.achName=res[0].accHolderName;
        //    alert(JSON.stringify(this.achName));
        // }
      },
      error:(err:any)=>{
        console.log(err);
      }

    })
  }
  onBlur(){
    //alert("Here")
    //alert(JSON.stringify(this.form.get('accountNumber')?.value))
    //alert(JSON.stringify(this.acList))
    if(this.form.get('accountNumber')?.value==this.acList){

       this.accountHolName=this.achName;
       //alert(JSON.stringify(this.accountHolName))
    }
    else{
      this.accountHolName=null;
      alert("Account number is not matched")

    }

  }
  payment(){
    //alert(JSON.stringify(this.form.value))
    this.form.controls['registerId'].setValue(this.id);
    if(this.form.get('accountNumber')?.value!=null){
    if(this.acList==this.form.get('accountNumber')?.value){
      if(this.form.get('paymentId')?.value==this.form.get('paymentFee')?.value){
        this.studentService.paymentSave(this.form.value).subscribe({
          next:(res:any)=>{
            console.log(res);
        //    alert(JSON.stringify(res.value))
            if(res!=null){

              Swal.fire('Success!','payment successfully!!'+res.payment+'Rupees','success');
              this.form.reset();
              this.accountHolName=null;
            }

          },
          error:(err:any)=>{
            console.log(err);
          }


        })
      }
      else{
        Swal.fire('Oops!', 'check paymentDetails!!', 'error');
      }
    }
    else{
      Swal.fire('Oops!', 'check accountDetails!!', 'error');
    }
  }
  else{
    Swal.fire('Oops!', 'Give Account number!!', 'error');
  }
}
viewPage(){
  this.route.navigate(['AppModule/welcome/view'])
}

}
