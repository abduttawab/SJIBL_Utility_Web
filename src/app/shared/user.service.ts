import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../app-config.module';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'

})
export class UserService {

//public userSelectedRoles=[];
  constructor(private fb: FormBuilder, private http: HttpClient,
    private toastr: ToastrService,
    @Inject(APP_CONFIG) private config: AppConfig) {

      

     }

  readonly BaseURI = this.config.apiEndpoint;

  formModel = this.fb.group({

    Id: [''],
    UserType:['', Validators.required],
    UserName: ['', Validators.required],
     Role: [''],
    Email: ['', Validators.email],
    FullName: [''],
    BranchId: [''],
    Branch: [''],
    selectedRoles: [[]],
    // Passwords: this.fb.group({
    //   Password: ['', [Validators.required, Validators.minLength(4)]],
    //   ConfirmPassword: ['', Validators.required]
    // }, { validator: this.comparePasswords }),
    
  });

  changePasswordModel = this.fb.group({

    OldPassword: ['', [Validators.required, Validators.minLength(4)]],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  });

  comparePasswords(fb: FormGroup) {
    let confirmPassCtr = fb.get('ConfirmPassword');

    if (confirmPassCtr.errors == null || 'passwordMismatch' in confirmPassCtr.errors) {
      if (fb.get('Password').value != confirmPassCtr.value)
        confirmPassCtr.setErrors({ passwordMismatch: true });
      else
        confirmPassCtr.setErrors(null);
    }

  }

  isInRole(userRoles, roles) {

    userRoles = JSON.parse(userRoles);
   
      try {

        var responce = false;

        for(let role of roles) {
          if (userRoles.includes(role)) {
            responce= true;
            break;
          }else{
            responce= false;
          }
       }

       return responce;


      } catch (error) {
  
        responce= false;
        return responce;
      }

     
  }
  register() {
    if (this.formModel.value.selectedRoles.length<1) {
      this.toastr.warning('Error!',"Please select user roles!");
    }
    try {
      var body = {
        Id: this.formModel.value.Id,
        UserType: this.formModel.value.UserType,
        UserName: this.formModel.value.UserName,
        Email: this.formModel.value.Email,
        //Password: this.formModel.value.Passwords.Password,
        FullName: this.formModel.value.FullName,
        Role: this.formModel.value.Role,
        Branch: this.formModel.value.Branch,
        Roles:this.formModel.value.selectedRoles
      };

      return this.http.post(this.BaseURI + 'ApplicationUser/Register', body);
    } catch (error) {
      console.log(error);
    }


  }

  saveUser() {
    try {

const normalizedRoles = [];


if (this.formModel.value.selectedRoles && this.formModel.value.selectedRoles.length<1) {
  this.toastr.warning('Error!',"Please select user roles!");
}

this.formModel.value.selectedRoles.forEach(element => {
        normalizedRoles.push(element.normalizedName);
});

      if (this.formModel.value.Id) {

        var bodyEdit = {
          Id: this.formModel.value.Id,
          UserType:this.formModel.value.UserType,
          UserName: this.formModel.value.UserName,
          Email: this.formModel.value.Email,
         // Password: this.formModel.value.Passwords.Password,
          FullName: this.formModel.value.FullName,
          Role: this.formModel.value.Role,
          Branch: this.formModel.value.Branch,
          BranchId: this.formModel.value.BranchId,
          Roles:normalizedRoles
        };

        return this.http.post(this.BaseURI + 'ApplicationUser/Register', bodyEdit);
      }

      else {
        var body = {
          UserName: this.formModel.value.UserName,
          UserType:this.formModel.value.UserType,
          Email: this.formModel.value.Email,
        //  Password: this.formModel.value.Passwords.Password,
          FullName: this.formModel.value.FullName,
          RoleName: this.formModel.value.Role,
          Branch: this.formModel.value.Branch,
          BranchId: this.formModel.value.BranchId,
          Roles:normalizedRoles
        };

        return this.http.post(this.BaseURI + 'UnAuthApplicationUser', body);

      }
    }
    catch (error) {
      console.log(error);
    }
  }
  delete(id) {
    return this.http.delete(this.BaseURI + 'UnAuthApplicationUser' + '/' + id);
  }
  authorizeUser(id) {
    return this.http.get(this.BaseURI + 'UnAuthApplicationUser' + '/AuthorizeUser?id=' + id);
  }
  changePassword() {
    var body = {
      Id: localStorage.getItem('UserID'),
      Password: this.changePasswordModel.value.Passwords.Password,
      OldPassword: this.changePasswordModel.value.OldPassword
    };

    return this.http.post(this.BaseURI + 'ApplicationUser/ChangePassword', body);
  }

  deleteUser(id) {
    return this.http.get(this.BaseURI + 'ApplicationUser/DeleteUser?userId=' + id);
  }
  inactiveUser(id,isActive) {
    return this.http.get(this.BaseURI + 'ApplicationUser/InActiveUser?userId=' + id+'&isActive='+isActive);
  }
  unlock(id){
    return this.http.get(this.BaseURI + 'ApplicationUser/UnlockUser?userId=' + id);
  
  }
  removeClientIp(id) {
    return this.http.get(this.BaseURI + 'ApplicationUser/RemoveClientIp?userId=' + id);
  }
  login(formData) {

    return this.http.post(this.BaseURI + 'ApplicationUser/Login', formData);
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + 'UserProfile');
  }

  getAllUsers() {
    return this.http.get(this.BaseURI + 'ApplicationUser/GetUsers');
  }

  getAllUnAuthUsers() {
    return this.http.get(this.BaseURI + 'UnAuthApplicationUser');
  }

  getRoles() {
    return this.http.get(this.BaseURI + 'ApplicationUser/GetRoles');
  }

  
  getData(id) {
    return this.http.get(this.BaseURI + 'ApplicationUser/GetUser?id=' + id);
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
