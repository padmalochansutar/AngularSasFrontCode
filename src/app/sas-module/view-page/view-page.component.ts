import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/student.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Workbook } from 'Exceljs';

import { saveAs } from 'file-saver';
declare var $: any;
import Swal from 'sweetalert2';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit {
  viewList: any;
   temp1:any[] = [] ;//array create here

  public pageElement: any;
  public count: any;
  currentView: any;
 record1: any;
  elementTo: any;
  public page!: number;
  currentPage!:number;


  constructor(private studentService:StudentService) { }

  ngOnInit(): void {
    this.page=1;
    this.currentPage=1;
    this.pageElement=15 ;
    this.View();
  }
  showPegi:boolean=false;
View(){

this.studentService.viewData().subscribe({
  next:(res:any)=>{

    this.viewList=res;


    this.record1 = this.viewList.length;

    if(this.record1>0){
      this.showPegi= true;
    }
    else{
      this.showPegi= false;
    }
    console.log("the data is:"+JSON.stringify(this.viewList))
    this.temp1.push(this.viewList)
    console.log(this.temp1)

    //alert(JSON.stringify(this.viewList))
  },
  error:(err:any)=>{
    console.log(err);
  }

})
}

pageChange(current: number){
  // alert(current);
   this.currentPage=current;
   var total=this.currentPage * this.pageElement;
var istotal= this.compare(total,this.record1);
if(istotal){
  this.elementTo=total;
}
else{
  this.elementTo=this.record1;
}

 }
 compare(first:number,second:number){
  if(first>second){
    console.log(first);

    return ;

  }
  else{
    console.log(second);

    return true;
  }
}
pageItemChange() {
  // this.ngOnInit();
  this.pageElement = (<HTMLInputElement>document.getElementById("pageItem")).value;
  console.log(this.pageElement);

}
downloadAsPDF(){

  var doc = new jsPDF('p', 'mm', 'a4');
    var col = [['Sl No.','Name','Fname','Mname','Dob','GENDER','STREAM','COURSE','STATE','PHOTO','DOCUMENT','DISTRICT','BLOCK','VILLAGE','COLLEGE','CAST','PAYMENT']]
    var rows = [];

    console.log(this.temp1[0].register.edu.length)
    let dataView:string ="";
    // console.log(JSON.stringify(this.viewList.register.edu.courseName.length));

console.log("the temp length is:"+JSON.stringify(this.temp1.length))

    for (var i = 0; i < this.temp1.length; i++) {
      for(var j=0; j<this.temp1[i].register.edu.length;j++)
        dataView += this.temp1[i].register.edu[j].courseName+" ";

      var temp = [i + 1,this.temp1[i].register.userName, this.temp1[i].register.fname, this.temp1[i].register.mname,this.temp1[i].register.dob,this.temp1[i].register.gender,this.temp1[i].register.edu[0].education.stream,dataView,this.temp1[i].register.state,this.temp1[i].register.file1,this.temp1[i].register.file,this.temp1[i].register.district.districtName,this.temp1[i].register.block.blockName,this.temp1[i].register.village.villageName,this.temp1[i].register.village.villageName,this.temp1[i].cast.castName,this.temp1[i].payment];
      rows.push(temp);

    };

    autoTable(doc, {
      head: col,
      body: rows,
      didDrawCell: () => { },
    });
    doc.save('student.pdf');
}
//EXCEL CODE WRITTEN BELOW...DONT NEED TO COMMIT OUT.....
// downloadAsExcel(){

//   const workBook = new Workbook();
//     const workSheet = workBook.addWorksheet('Subdivision Mapping');

//     workSheet.addRow(["Sl No.", "District", "Sub-Division", "SPDP_Id", "Lgd Code"]);
//     let i: number = 0;
//     this.viewList.forEach((item) => {
//       i = i + 1;

//       const row = workSheet.addRow([i, item.districtName,item.subdivisionName,item.spdpSubId,item.lgdCode]);
//       workSheet.columns.forEach(column => {
//         // const lengths = column.values.map(v => v.toString().length);
//         // const maxLength = Math.max(...lengths.filter(v => typeof v === 'number'));
//         column.width = 18;

//       });

//     });
//     workBook.xlsx.writeBuffer().then(viewList => {
//       let blob = new Blob([viewList], {
//         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//       });
//       saveAs(blob, 'Subdivision.xlsx');
//     })

// }
// printReceipt(){
//   const printContent = document.getElementById("PrintIt");
//   const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
//  WindowObjectt.write(printContent.innerHTML);
//   WindowPrt.document.close();
//   WindowPrt.focus();
//   WindowPrt.print();
//   WindowPrt.close();
// }

delStudent(id:any){
  //alert(id)
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to delete this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.studentService.deleteById(id).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.viewList.reset();
        },
        error:(err:any)=>{
          console.log(err);
        }
      })
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })


}
// updateEmployee(id:any){
// alert(id)


// }
viewEmployee(){
alert("hii")

}
downloadAsExcel(){
  let data:string ="";
  const workBook = new Workbook();
      const workSheet = workBook.addWorksheet(' Status Report ');

      workSheet.addRow(['Sl No.','Name','Fname','Mname','Dob','GENDER','STREAM','COURSE','STATE','PHOTO','DOCUMENT','DISTRICT','BLOCK','VILLAGE','COLLEGE','CAST','PAYMENT']);
     // let i: number = 0;
     console.log("before "+JSON.stringify(this.temp1))

      for (var i = 0; i < this.temp1.length; i++) {
        //console.log("after "+JSON.stringify(this.temp1.length))


       // console.log("before "+JSON.stringify(this.temp1[0].register.edu.length))

        for(var j=0; j <this.temp1[i].register.edu.length;j++)
      //  console.log("after "+JSON.stringify(this.temp1[0].register.edu.length))
     // console.log("the list data is:"+JSON.stringify(this.temp1[i].register.edu[j].courseName+" "))
          data += this.temp1[i].register.edu[j].courseName+" ";
         // console.log("the course name is:"+JSON.stringify(data))

        const row = workSheet.addRow([i + 1,this.temp1[i].register.userName, this.temp1[i].register.fname, this.temp1[i].register.mname,this.temp1[i].register.dob,this.temp1[i].register.gender,this.temp1[i].register.edu[0].education.stream,data,this.temp1[i].register.state,this.temp1[i].register.file1,this.temp1[i].register.file,this.temp1[i].register.district.districtName,this.temp1[i].register.block.blockName,this.temp1[i].register.village.villageName,this.temp1[i].register.village.villageName,this.temp1[i].cast.castName,this.temp1[i].payment]);
      }
      workSheet.columns.forEach(column => {
          column.width = 18;

        });

      workBook.xlsx.writeBuffer().then(viewList => {
        let blob = new Blob([viewList], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        saveAs(blob, 'Student.xlsx');
      })

}

printReceipt(){
  const printContent:any = document.getElementById("PrintIt");
  const WindowPrt:any = window.open('', '', 'left=0,top=0,width	=900,height=900,toolbar=0,scrollbars=0,status=0');
  WindowPrt.document.write(printContent.innerHTML);
  WindowPrt.document.close();
  WindowPrt.focus();
  WindowPrt.print();
  WindowPrt.close();
}
downloadFile(fileData: any): void {
  console.log(fileData.value)
  alert(JSON.stringify(fileData))
  this.studentService
    .download(fileData)
    .subscribe();
}
}
