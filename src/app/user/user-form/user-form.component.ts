import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { CommonService } from 'src/app/shared/common.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


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
  RoleList = [];

  dropdownList = [];
  // selectedItems = [];
  dropdownSettings: IDropdownSettings;

  ShowFilter = false;
  limitSelection = false;
  cities = [];

  constructor(
    public activeModal: NgbActiveModal,
    public service: UserService,
    private toastr: ToastrService,
    private commonService: CommonService) { }

  ngOnInit() {

    this.getRoles();
   
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'normalizedName',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.service.formModel.controls['UserType'].setValue("BranchUser");
  }
  changeUserType(){

    this.resetFormModel();
  }
  getEmployeeId() {

    if (this.service.formModel.controls['UserType'].value == "SupportUser") {

      // Get Employee Info From HRMS
      this.commonService.getEmpInfoFromHrm(this.service.formModel.controls['UserName'].value).subscribe(
        (res: any) => {

          if (res.isSuccessfull) {
            this.EmployeeInfo = res.data;
            this.service.formModel.controls['FullName'].setValue(res.data.name);
            this.service.formModel.controls['Branch'].setValue(res.data.branchAndDivision);
            this.service.formModel.controls['BranchId'].setValue(res.data.branchId);
            this.service.formModel.controls['Email'].setValue(res.data.email);
            this.service.formModel.controls['selectedRoles'].setValue(null);
            

            this.errorText = null;
          } else {
            this.resetFormModel();
            this.errorText = "Invalid Employee Id !!!";
          }


        },
        err => {
         
          this.resetFormModel();
          this.errorText = "Invalid Employee Id !!!";
          console.log(err);
        }
      );


    } else {

      // Get Employee Info From Ultimus
      this.commonService.getEmpInfo(this.service.formModel.controls['UserName'].value).subscribe(
        (res: any) => {

          if (res.isSuccessfull) {
            this.EmployeeInfo = res.data;
            this.service.formModel.controls['FullName'].setValue(res.data.name);
            this.service.formModel.controls['Branch'].setValue(res.data.branchAndDivision);
            this.service.formModel.controls['BranchId'].setValue(res.data.branchId);
            this.service.formModel.controls['Email'].setValue(res.data.email);
            this.service.formModel.controls['selectedRoles'].setValue(null);

            this.errorText = null;
          } else {
            this.resetFormModel();
            this.errorText = "Invalid Employee Id !!!"
          }


        },
        err => {
          this.resetFormModel();
          this.errorText = "Invalid Employee Id !!!"
          console.log(err);
        }
      );

    }

  }
  resetFormModel(){
    this.service.formModel.controls['UserName'].setValue("");
    this.service.formModel.controls['FullName'].setValue("");
    this.service.formModel.controls['Branch'].setValue("");
    this.service.formModel.controls['BranchId'].setValue("");
    this.service.formModel.controls['Email'].setValue("");
    this.service.formModel.controls['selectedRoles'].setValue(null);
    this.EmployeeInfo = null;
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
      }
    );
  }
  getRoles() {
    this.service.getRoles().subscribe(
      (res: any) => {
        this.RoleList = res.data;
        if (this.id) {
          this.getData(this.id, res.data);
        }
      },
      err => {
        console.log(err);
      }
    );
  };
  getData(id, roleList) {

    this.service.getData(id).subscribe(
      (res: any) => {
        const obj = res.data;
        console.log(obj);
        this.service.formModel.controls['Id'].setValue(obj.id);
        this.service.formModel.controls['UserName'].setValue(obj.userName);
        this.service.formModel.controls['UserType'].setValue(obj.userType);
        this.service.formModel.controls['Email'].setValue(obj.email);
        this.service.formModel.controls['Branch'].setValue(obj.branch);
        this.service.formModel.controls['FullName'].setValue(obj.fullName);
        this.service.formModel.controls['Role'].setValue(obj.normalizedName);
        this.service.formModel.controls['selectedRoles'].setValue(obj.roles);
        

        var dbRoles = [];
        if (obj.roles) {
          obj.roles.forEach(element => {

            if (roleList.filter(m => m.normalizedName == element).length > 0) {

              dbRoles.push(roleList.filter(m => m.normalizedName == element)[0]);

            }
          });
          this.service.formModel.controls['selectedRoles'].setValue(dbRoles);

        }
      },
      err => {
        console.log(err);
      }
    );
  }
  onItemSelect(item: any) {

    //this.service.formModel.value.selectedRoles.push(item);
    //this.service.userSelectedRoles.push(item);
    //  this.service.formModel.controls['selectedRoles'].setValue(
    //    this.service.formModel.value.selectedRoles.push(item));

  }
  onSelectAll(items: any) {
    // items.forEach(element => {
    //   //this.service.userSelectedRoles.push(element);
    //   this.service.formModel.controls['selectedRoles'].setValue(element);
    // });

  }


  //   onDeSelect(item: any) {
  //     var result =  this.service.formModel.value.selectedRoles
  //     var filtered = result.filter(m => m.normalizedName !== item.normalizedName);
  //     this.service.formModel.controls['selectedRoles'].setValue(filtered);


  // }
  // onDeSelectAll() {

  //   //this.service.userSelectedRoles =[];
  //   this.service.formModel.controls['selectedRoles'].setValue([]);

  // }
}
