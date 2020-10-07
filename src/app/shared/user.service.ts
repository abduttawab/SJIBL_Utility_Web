import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../app-config.module';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
  
})
export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig) { }

  readonly BaseURI = this.config.apiEndpoint;

  formModel = this.fb.group({
    Id:[''],
    UserName:['',Validators.required],
    Role:['',Validators.required],
    Email:['',Validators.email],
    FullName:[''],
    Passwords:this.fb.group({
      Password:['',[Validators.required,Validators.minLength(4)]],
      ConfirmPassword:['',Validators.required]
    },{validator:this.comparePasswords})
  });

  changePasswordModel = this.fb.group({

    OldPassword:['',[Validators.required,Validators.minLength(4)]],
    Passwords:this.fb.group({
      Password:['',[Validators.required,Validators.minLength(4)]],
      ConfirmPassword:['',Validators.required]
    },{validator:this.comparePasswords})
  });

  comparePasswords(fb:FormGroup){
    let confirmPassCtr = fb.get('ConfirmPassword');

    if(confirmPassCtr.errors == null || 'passwordMismatch' in confirmPassCtr.errors){
      if(fb.get('Password').value != confirmPassCtr.value)
        confirmPassCtr.setErrors({passwordMismatch:true});
      else
        confirmPassCtr.setErrors(null);
    }

  }


  register()
  
  {
    var body = {
      UserName : this.formModel.value.UserName,
      Email : this.formModel.value.Email,
      Password : this.formModel.value.Passwords.Password,
      FullName : this.formModel.value.FullName,
      Role : this.formModel.value.Role
    } ;
    
    return this.http.post(this.BaseURI+'ApplicationUser/Register',body);
  }

  changePassword()
  
  {
    var body = {
      Id : localStorage.getItem('UserID'),
      Password : this.changePasswordModel.value.Passwords.Password,
      OldPassword : this.changePasswordModel.value.OldPassword
    } ;
    
    return this.http.post(this.BaseURI+'ApplicationUser/ChangePassword',body);
  }


login(formData){

  return this.http.post(this.BaseURI+'ApplicationUser/Login',formData);
}

getUserProfile(){
  return this.http.get(this.BaseURI+'UserProfile');
}

getAllUsers(){
  return this.http.get(this.BaseURI+'ApplicationUser/GetUsers');
}

getRoles(){
  return this.http.get(this.BaseURI+'ApplicationUser/GetRoles');
}
roleMatch(allowedRoles): boolean {
  var isMatch = false;
  var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
  var userRole = payLoad.role;
  allowedRoles.forEach(element => {
    if (userRole == element) {
      isMatch = true;
      return false;
    }
  });
  return isMatch;
}
}