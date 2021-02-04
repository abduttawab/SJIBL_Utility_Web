import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from "jwt-decode";

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
  constructor(private service:UserService, private router:Router, private toastr: ToastrService) { }

  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl('/home/dashboard');
    }
  }

  onSubmit(form:NgForm){

    this.service.login(form.value).subscribe(

      (res:any)=>{

        let tokenInfo = this.getDecodedAccessToken(res.token); 
  
        localStorage.setItem('role',tokenInfo.role);
        localStorage.setItem('token',res.token);
        localStorage.setItem('userFullName',tokenInfo.UserFullName);
        localStorage.setItem('UserID',tokenInfo.UserID);
        localStorage.setItem('UserRoles',tokenInfo.UserRoles);
        
        this.router.navigateByUrl('/home/dashboard');
      },
      err => {
        
        if(err.status==400){
          this.toastr.error('Incorrect Username or Password!','Authentication Failed!!')
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

}
