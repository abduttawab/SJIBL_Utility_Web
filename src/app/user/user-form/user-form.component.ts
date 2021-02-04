import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles: []
})
export class UserFormComponent implements OnInit {

  @Input() my_modal_title;
  EmployeeInfo;

  errorText;
  @Input() id;
  RoleList =[];
  constructor(
    public activeModal: NgbActiveModal,
     public service: UserService,
     private toastr: ToastrService,
     private commonService : CommonService) {}
 
  ngOnInit() {
   
    this.getRoles();

    if(this.id){
      this.getData(this.id);
    }
  }
  getEmployeeId() {

    // Get Employee Info
    this.commonService.getEmpInfo(this.service.formModel.controls['UserName'].value).subscribe(
      (res: any) => {
        
        if (res.isSuccessfull) {
          this.EmployeeInfo = res.data;
          this.service.formModel.controls['FullName'].setValue(res.data.name)
          this.errorText = null;
        } else {
          this.EmployeeInfo = null;
          this.service.formModel.controls['UserName'].setValue("")
          this.errorText = "Invalid Employee Id !!!"
        }


      },
      err => {
        this.EmployeeInfo = null;
        this.service.formModel.controls['UserName'].setValue("")
        this.errorText = "Invalid Employee Id !!!"
        console.log(err);
      }
    );
  }
  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        
        if (res.isSuccessfull) {
          this.toastr.warning('Data saved!', res.message);
        } else {
          this.toastr.error('Ops! Something went worng!', res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  getRoles() {
    this.service.getRoles().subscribe(
      (res: any) => {
        this.RoleList = res.data;

      },
      err => {
        console.log(err);
      }
    );
   };
   getData(id){
    this.service.getData(id).subscribe(
      (res: any) => {
       const obj = res.data;
       this.service.formModel.controls['Id'].setValue(obj.id);
       this.service.formModel.controls['UserName'].setValue(obj.userName);
       this.service.formModel.controls['Email'].setValue(obj.email);
       this.service.formModel.controls['FullName'].setValue(obj.fullName);
       this.service.formModel.controls['Role'].setValue(obj.role);
       this.service.formModel.get('Passwords').get('Password').setValue("00000");
       this.service.formModel.get('Passwords').get('ConfirmPassword').setValue("00000");

     
      },
      err => {
        console.log(err);
      }
    );
   }

}
