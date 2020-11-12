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
    this.service.saveUser().subscribe(
      (res: any) => {
        
        if (res.isSuccessfull) {
          this.toastr.warning('Data saved!', res.message);
        } else {
          this.toastr.error('Ops! Something went worng!', res.message);
        }
      },
      err => {
        console.log(err);

        this.toastr.error('Ops! Something went worng!', err.error.message);
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


}
