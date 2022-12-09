import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseURLMain="http://localhost:8081/api/";
   private baseURL="http://localhost:8081/api/signIn"
   private baseURL1="http://localhost:8081/api/signUp"
   private baseURL2="http://localhost:8081/api/forgot"
   private baseURL3="http://localhost:8081/api/getdistrictData"
   private baseURL4="http://localhost:8081/api/getBlockDataByDistId"
   private baseURL5="http://localhost:8081/api/getVillageDataByBlockId"
   private baseURL6="http://localhost:8081/api/saveData"
  student: any;

  constructor(private httpclient:HttpClient) { }

  verifyCaptcha(): boolean {
    return true;
  }
  a:any;
  b:any;
  c:any;
  d:any;
  e:any;
  public getCaptcha() {
    var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    var i;
    for (i = 0; i < 6; i++) {
      this.a = alpha[Math.floor(Math.random() * alpha.length)];
      this.b = alpha[Math.floor(Math.random() * alpha.length)];
      this.c = alpha[Math.floor(Math.random() * alpha.length)];
      this.d = alpha[Math.floor(Math.random() * alpha.length)];
      this. e = alpha[Math.floor(Math.random() * alpha.length)];
      // var f = alpha[Math.floor(Math.random() * alpha.length)];
      // var g = alpha[Math.floor(Math.random() * alpha.length)];
    }
    var code = this.a + ' ' + this.b + ' ' + ' ' + this.c + ' ' + this.d+ ' '+this.e ;
    return code;
  }

  public validateCaptcha(challange: string, captcha: string): boolean {
    console.log("validating captcha");
    //challange = this.removeSpaces(challange);
    captcha = this.removeSpaces(captcha);
    if (challange == captcha) {
      return true;
    } else {
      return false;
    }
  }
  removeSpaces(string:any) {
    return string.split(' ').join('');
  }

 searchData(std:any): Observable<any>{
   //alert(JSON.stringify(std));
  return this.httpclient.post(`${this.baseURL}`,std)

 }
 signUp(signUp:any): Observable<any>{
  // alert(JSON.stringify(signUp));
   return this.httpclient.post(`${this.baseURL1}`,signUp)

 }
 forgotPass(forgot:any): Observable<any> {
 // alert(JSON.stringify(forgot));
 return this.httpclient.post(`${this.baseURL2}`,forgot)
}
distData():Observable<any>{
  return this.httpclient.get(`${this.baseURL3}`)
}
distId(id:any):Observable<any>{
 // alert(id)
  return this.httpclient.get(`${this.baseURL4}/${id}`)
}
blockId(id:any):Observable<any>{
  return this.httpclient.get(`${this.baseURL5}/${id}`)
}
registerData(data:any):Observable<any>{
 //alert(data.value)
return this.httpclient.post(`${this.baseURL6}`,data);
}
getAllEducation(){
  return this.httpclient.get(this.baseURLMain+"getAllEdu");
}
getAllCourse(id:any){
  return this.httpclient.get(this.baseURLMain+"getSelectedCourses/"+id);
}
uploadFile( file: File , id : number ) : Observable<any>
  {
    let url = this.baseURLMain + "uploadImage/" + id ;

    const formdata: FormData = new FormData();

    formdata.append('file', file);

    return this.httpclient.post(url , formdata);
  }
  getAllCollgeData():Observable<any>{
    return this.httpclient.get(this.baseURLMain+"getAllCollgeData/");
  }
  collegeSaveData(data:any):Observable<any>{
    console.log(data);
    //alert(JSON.stringify(data.value))
    return this.httpclient.post(this.baseURLMain+"getcollegeIdSave/",data);
  }
  getCastData():Observable<any>{
    return this.httpclient.get(this.baseURLMain+"getAllcast/");
  }

  getDataByPaymentId(id:any):Observable<any>{
   // alert(id.value)
    return this.httpclient.get(this.baseURLMain+"getSelectedCast/" + id);

  }

  getAcData():Observable<any>{
    return this.httpclient.get(this.baseURLMain+"getAcno/");
  }
  paymentSave(paymentData:any):Observable<any>{
    alert(JSON.stringify(paymentData))
     return this.httpclient.post(this.baseURLMain+"getPayment/",paymentData);
  }
  viewData():Observable<any>{
    return this.httpclient.get(this.baseURLMain+"viewData");
  }
  deleteById(sId:any):Observable<any>{
    //alert(sId)
    return this.httpclient.delete(this.baseURLMain+"deleteData/"+sId);
  }
  download(fileId:any){
    alert(fileId)
return  this.httpclient.get(this.baseURLMain+"files/"+fileId);
  }
}
