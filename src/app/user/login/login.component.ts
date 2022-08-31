import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from "jwt-decode";
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/shared/common.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }
  clientIP;
  lastTranshour;
  constructor(private service:UserService,
     private router:Router,
      private toastr: ToastrService,
      private commonService: CommonService,
    private spinner: NgxSpinnerService) { }

   ngOnInit() {
   
    this.spinner.show();
    this.getClientIPasync();
    this. GetLastTransactionHour();
    setTimeout(() => {
      /** spinner ends after 1 seconds */
      this.spinner.hide();
    }, 800);
  
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl('/home/dashboard');
    }
  }

  onSubmit(form:NgForm){
    this.spinner.show();
    this.service.login(form.value).subscribe(

      async (res:any)=>{
        setTimeout(() => {
          /** spinner ends after 1 seconds */
          this.spinner.hide();
        }, 600);
        let tokenInfo = this.getDecodedAccessToken(res.token); 
  
        localStorage.setItem('role',tokenInfo.role);
        localStorage.setItem('token',res.token);
        localStorage.setItem('userFullName',tokenInfo.UserFullName);
        localStorage.setItem('UserID',tokenInfo.UserID);
        localStorage.setItem('UserRoles',tokenInfo.UserRoles);
        localStorage.setItem('BranchId',tokenInfo.BranchId);
       
      
        
        this.router.navigateByUrl('/home/dashboard');
      },
      err => {
        setTimeout(() => {
          /** spinner ends after 1 seconds */
          this.spinner.hide();
        }, 600);
        if(err.status==400){
          console.log(err);
          console.log(err.error);
          this.toastr.error('Login failed!',err.error.message)
        }else{
          this.toastr.error(err.message)
          console.log(err);
        }
        
      }


    );
  }
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }



  
    getClientIPasync(){
var result = this.commonService.getClientIP();
console.log(result);
if(result){
  localStorage.setItem('EndUserIp', result );
}
    
   
  }
  GetLastTransactionHour(){

    this.service.GetLastTransactionHour().subscribe(
      (res:any) =>{
        console.log(res);
        this.lastTranshour = res.data;
      },
      err =>{
        console.log(err);
      }
    );
  }
}
