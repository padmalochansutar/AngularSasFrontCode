import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  UserMenu:boolean=false;
  logName:any;
  name:any;
  uname:any;
  showUserMenu:boolean=false;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.logName = sessionStorage.getItem('name')
    // this.logName='ram';
  }
  search(){
    // alert(JSON.stringify( this. showUserMenu))
     if( this.showUserMenu==false){
     this. showUserMenu=true;
      this.name=this.showUserMenu;
    }

    else if(this.name==true){
       this.name=false;
       this.showUserMenu=false;
    }
  }
  logout(){

    Swal.fire({
      title: 'Are you sure want to logout ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Logout',
      denyButtonText: `Don't Logout`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       this.router.navigate(['signin'])
      }
      // } else if (result.isDenied) {
      //   Swal.fire('Changes are not saved', '', 'info')
      // }
    })
    sessionStorage.clear();
  }
  setting(){
    if( this.UserMenu==false){
      this. UserMenu=true;
       this.uname=this.UserMenu;
     }

     else if(this.uname==true){
        this.uname=false;
        this.UserMenu=false;
     }
  }
  forgot(){
     this.router.navigate(['forgot'])
  }

}
