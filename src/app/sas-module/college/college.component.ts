import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgStyle } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css'],
})
export class CollegeComponent implements OnInit {
  data: any;
  tempArray: any = [];
  temp: any = [];
  collegeallData: any;
  idtoGet: any;
  public collegeList!: any;
  form!: FormGroup;
  registerId!: string | undefined;
  id!: any;
  controls: any;
  object: any;
  option1 = 0;
  name:any;
  constructor(private studentService: StudentService, private route: Router) {}

  //console.log(this.route.getCurrentNavigation()?.extras.state);//inside constructor written

  ngOnInit(): void {
    this.id = sessionStorage.getItem('id');

    this.name=sessionStorage.getItem('name')
    // if(sessionStorage.getItem("id")){
    // alert(this.id);
    // this.data=sessionStorage.getItem("id");
    //  }

    this.form = new FormGroup({
      collegeId: new FormControl(null, Validators.required),
      registerId: new FormControl(null),
    });
    this.getcollege();

    const navigation = this.route.getCurrentNavigation();
    console.log(navigation);

    if (this.route.getCurrentNavigation()) {
      this.idtoGet = this.route.getCurrentNavigation()?.extras.state;
      alert(this.idtoGet);
    }
  }
  getcollege() {
    this.studentService.getAllCollgeData().subscribe({
      next: (res: any) => {
        this.collegeList = res;
        console.log(this.collegeList);
      },
    });
  }

  addMore() {
    this.collegeallData = this.form.controls['collegeId'].value;
    if (this.collegeallData == null) {
      Swal.fire('Oops!', 'Choose college!!', 'error');
    }
    // this.temp=this.form.controls['registerId'].value;
    // alert(JSON.stringify(this.collegeallData.value))
    else if (this.collegeallData != null) {
      for (let c of this.collegeList) {
        if (c.collegeId == this.collegeallData)
        this.collegeallData = c;

      }
      console.log(this.collegeallData);

      this.form.reset();
      let variable = 0;
      for (let co of this.tempArray) {
        if (co.collegeId == this.collegeallData.collegeId) {
          Swal.fire('Failed!', 'Already college added!!', 'error');
          variable = 1;
        }
      }
      if(variable ==0){
        if (this.tempArray.length <= 2) {
          this.tempArray.push(this.collegeallData);
          this.option1++;
        }
        
        else {
          Swal.fire('Failed!', 'you can apply only three college!!', 'error');
        }
      }
    }

    ///////console.log(this.tempArray)
  }
  collegeRegister() {
    this.form.controls['collegeId'].setValue(this.tempArray); //here data take college object
    this.form.controls['registerId'].setValue(this.id); //here take integer data
    console.log('the value data is' + JSON.stringify(this.form.value));
    // alert(JSON.stringify(this.form.value))
    console.log(this.form.get('collegeId')?.value.length);

    if (this.form.get('collegeId')?.value.length < 3) {
      Swal.fire('Oops!', 'Choose At Least 3 Colleges!!', 'error');
    } else {
      this.studentService.collegeSaveData(this.form.value).subscribe({
        next: (res: any) => {
          //console.log(this.tempArray);

          //this.tempArray.splice(0, this.tempArray.length);
          // console.log(this.tempArray);

          // console.log(res);
          this.data = res;
          if (res != null) {
            Swal.fire('Success!', 'College register sucessfully!!', 'success');
            this.form.reset();
          }
        },
        error: (err: any) => {
          console.error();
        },
      });
    }
    // this.tempArray.forEach((element: { collegeId: any; }) => {

    // });

    // alert(JSON.stringify(this.form.value));
    //  this.collegeallData=this.form.value;
    //  alert(JSON.stringify(this.collegeallData))

    //  console.log( this.tempArray)
  }
  option() {
    if (this.option1 <= 9) {
      this.option1++;
    } else {
      this.option1 = 1;
    }
  }
  nextPage() {
    alert(JSON.stringify(this.tempArray))
    console.log(this.tempArray);
    if(this.tempArray!=0){
      this.tempArray.splice(0, this.tempArray.length);
    this.route.navigate(['AppModule/welcome/payment']);
    }
    else{
      Swal.fire('Oops!', 'Add college then goto next page!!', 'error');
    }
  }
}
