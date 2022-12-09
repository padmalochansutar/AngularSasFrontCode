import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../../student.service';
import Swal from 'sweetalert2';
import { compileComponentFromMetadata } from '@angular/compiler';
import { Router, NavigationExtras } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css'],
})
export class StudentRegisterComponent implements OnInit {
  courseList: any;
  streamList: any;
  dropdownSettings: IDropdownSettings = {};
  datas: any;
  form!: FormGroup;
  distList: any;
  blockList: any;
  villageList: any;
  postdetails: any;
  selectedItemimagefile: any;
  empForm: any;
  imagePath: any;
  swal: any;
  selectedItemimagefile11: any;
  name:any;
  submitFlag:boolean=false
  //selectedFiles: any;

  selectedFiles: FileList | undefined;
  currentFileUpload: File | undefined;

  constructor(private studentService: StudentService, private route: Router) {}

  ngOnInit(): void {
    this.name=sessionStorage.getItem('name')

    // Data Picker Initialization
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     transd: 'TRANS001',
    //     workQueue: false,
    //     services: 10,
    //     code: '003'
    //   }
    // };
    // this.route.navigate(['college'], navigationExtras);
    //this.route.navigate(['college'],  { state: { example: 'bar' } });

    this.getDistrictData();
    this.form = new FormGroup({
      userName: new FormControl(null, Validators.required),
      fatherName: new FormControl(null, Validators.required),
      motherName: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      course: new FormControl(null, Validators.required),
      eduObj: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      file: new FormControl(null, Validators.required),
      districtId: new FormControl(null,  Validators.required),
      blockId: new FormControl(null,  Validators.required),
      villageObj: new FormControl(null, Validators.required),
      // files:new FormControl(null),
      file1: new FormControl(null, Validators.required),
    });

    this.dropdownSettings = {
      idField: 'id',
      textField: 'courseName',
      enableCheckAll: true,
      allowSearchFilter: true,
      unSelectAllText: 'Un-Select All',
    };
    this.studentService.getAllEducation().subscribe({
      next: (res: any) => {
        this.streamList = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });

    // this.datas= [{
    //   id:1,
    //  course:"Physics"
    // },

    //   {
    //     id:2,
    //     course:"Chemistry"
    //   },
    //   {
    //     id:3,
    //     course:"Mathmateics"
    //   },
    //   {
    //     id:4,
    //     course:"Botany"
    //   },
    //   {
    //     id:5,
    //     course:"Zoology"
    //   },
    //   {
    //     id:4,
    //     course:"IT"
    //   }
    // ]
  }
  keyFunc1(e:any){
    if(e.value[0] == ' ') {
      $('#userName').val('');
      this.submitFlag=true;

    }

  }

  swalD(title: any, text: any, icon: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }

  onFileChange(event: any) {
    this.selectedItemimagefile11 = event.target.files[0];
    let documentFile1 = event.target.files[0];
    if (Math.round(documentFile1.size / 1024) <= 5120) {
      var pname = documentFile1.name;
      // var re = /(\.pdf|png|jpg|jpeg|doc)$/i;
      var re = /(\.png|jpg|jpeg)$/i;
      if (!re.exec(pname)) {
        this.swalD('Info', 'File type is not supported!', 'info');
        this.form.controls['file1'].setValue(null);
      }
    } else {
      this.swalD('Info', 'Document size should be less than 5MB', 'info');
      this.form.controls['file1'].setValue(null);
    }
    this.selectedItemimagefile = event.target.files[0];
    let documentFile = event.target.files[0];
    if (Math.round(documentFile.size / 1024) <= 2048) {
      var fatherName = documentFile.name;
      var re = /(\.png|jpg|jpeg)$/i;
      if (!re.exec(fatherName)) {
        this.swal('Info', 'File type is not supported!', 'info');
        this.empForm.controls['file'].setValue(null);
      }
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imagePath = reader.result as string;
        };
      }
    } else {
      this.swal('Info', 'Document size should be less than 2MB', 'info');
      this.empForm.controls['file'].setValue(null);
    }
  }
  handleChange() {
    // alert(JSON.stringify(name))
    this.form.controls['eduObj'].reset(); //reset the multiplecheck box data if i select one means science then go to another it will refresh the multichecbox data.
    var id = this.form.get('course')?.value; //get is used for get the value from form
    // alert(id);
    this.studentService.getAllCourse(id).subscribe({
      next: (res: any) => {
        this.courseList = res;
      },
      error: (err: any) => {},
    });
    // if ($('input[name="course"]:checked').val() == 'Science') {
    //   this.datas = [
    //     {
    //       id: 1,
    //       course: 'Physics',
    //     },

    //     {
    //       id: 2,
    //       course: 'Chemistry',
    //     },
    //     {
    //       id: 3,
    //       course: 'Mathmateics',
    //     },
    //     {
    //       id: 4,
    //       course: 'Botany',
    //     },
    //     {
    //       id: 5,
    //       course: 'Zoology',
    //     },
    //     {
    //       id: 6,
    //       course: 'IT',
    //     },
    //   ];
    // } else if ($('input[name="course"]:checked').val() == 'Commerce') {
    //   this.datas = [
    //     {
    //       id: 1,
    //       course: 'Accounting',
    //     },

    //     {
    //       id: 2,
    //       course: 'Statitics',
    //     },
    //     {
    //       id: 3,
    //       course: 'BusinessIT',
    //     },
    //   ];
    // } else if ($('input[name="course"]:checked').val() == 'Arts') {
    //   this.datas = [
    //     {
    //       id: 1,
    //       course: 'Mil',
    //     },

    //     {
    //       id: 2,
    //       course: 'English',
    //     },
    //     {
    //       id: 3,
    //       course: 'Economics',
    //     },
    //     {
    //       id: 4,
    //       course: 'Sociology',
    //     },
    //     {
    //       id: 5,
    //       course: 'Anthopology',
    //     },
    //   ];
    // }
    //this.getDistrictData();
  }
  getDistrictData() {
    this.studentService.distData().subscribe({
      next: (res: any) => {
        this.distList = res;
        //alert(JSON.stringify(this.distList))
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  onDistrictSelect(id: any) {
    this.studentService.distId(id.value).subscribe({
      next: (res: any) => {
        // alert(JSON.stringify(res));
        this.blockList = res;
      },
      error: (err: any) => {
        //alert(err);
      },
    });
  }
  onBlockSelect(id: any) {
    this.studentService.blockId(id.value).subscribe({
      next: (res: any) => {
        //alert(JSON.stringify(res));
        this.villageList = res;
      },
      error: (err: any) => {
        //alert(err);
      },
    });
  }
  onSelectFile(event: any) {
    this.selectedItemimagefile = event.target.files[0];
    let documentFile = event.target.files[0];
    if (Math.round(documentFile.size / 1024) <= 5120) {
      var fatherName = documentFile.name;
      // var re = /(\.pdf|png|jpg|jpeg|doc)$/i;
      var re = /(\.pdf|doc)$/i;
      if (!re.exec(fatherName)) {
        this.swalD('Info', 'File type is not supported!', 'info');
        this.form.controls['file'].setValue(null);
      }
    } else {
      this.swalD('Info', 'Document size should be less than 5MB', 'info');
      this.form.controls['file'].setValue(null);
    }
  }
  // selectFile(event:any) {
  //   let fi:File = event.target.files[0];
  //   console.log(fi);
  //   //alert(JSON.stringify(event.value))
  //   const file = event.target.file.item(0);

  //   if (file.type.match('image.*')) {
  //     var size = event.target.files[0].size;
  //     if(siz)
  //     {
  //         alert("size must not exceeds 1 MB");
  //         this.form.get('file')?.setValue("");
  //     }
  //     else
  //     {
  //       this.selectedFiles = event.target.file;
  //       alert(this.selectedFiles);
  //     }
  //   } else {
  //     alert('invalid format!');
  //   }

  // }
  register() {

    const formData: FormData = new FormData();//formData means-> string,file,blog

    formData.append('file', this.selectedItemimagefile);
    formData.append('file1', this.selectedItemimagefile11);
    formData.append('data', JSON.stringify(this.form.value));

   // alert(JSON.stringify(formData.get('this.form.value')?.valueOf))
    if(this.form.valid){
    this.studentService.registerData(formData).subscribe({
      next: (res: any) => {
        //  let result = res.json();
        console.log(res);
        if(res==0){
          Swal.fire('Failed!', 'Aleardy name is Registered ', 'error')
          this.form.reset();
          this.imagePath = null;
        }
        else{
        if (res != null) {
          if (res != -1) {
            sessionStorage.setItem('id', res);
           // sessionStorage.clear();
            console.log(res);
            Swal.fire({
              title: 'Do you want to save ?',
              showDenyButton: true,  showCancelButton: true,
              confirmButtonText: `Save`,
              denyButtonText: `Don't save`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  Swal.fire('Saved!', '', 'success')
                  this.form.reset();
                  this.imagePath = null;
                  this.route.navigate(['AppModule/welcome/college'],res);
                } else if (result.isDenied) {
                 Swal.fire('Register is not  Sucessfully!!', '', 'info')
                 this.form.reset();
                 this.imagePath = null;


               }
            });
            //  let nav: NavigationExtras = {
            //    state: {

            //      "idToSend": res,
            //    },
            // };



           // this.selectedItemimagefile.reset();
          // this.route.navigate(['college', nav]);

          }
          else{

            Swal.fire('Register is not  Sucessfully!!', '', 'info')
            this.form.reset();
            this.imagePath = null;
          }
        }
        //  else {
        //   Swal.fire('Failed!', 'Register is not  Sucessfully!!!', 'error');
        // }
      }

    },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
else{
  Swal.fire('Failed!', 'All fields are mandatory!!!', 'error');
}

  }
}
