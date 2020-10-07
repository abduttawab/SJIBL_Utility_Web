    import { Component, OnInit } from '@angular/core';
    import { NgForm, ValidationErrors } from '@angular/forms';
    import { of } from 'rxjs';
    import { CommonService } from '../shared/common.service';
    import { CardapplicationService } from '../shared/cardapplication.service';
    import { ToastrService } from 'ngx-toastr';
    import { ActivatedRoute, Router } from '@angular/router';
    @Component({
      selector: 'app-entry-form',
      templateUrl: './entry-form.component.html',
      styles: []
    })
    export class EntryFormComponent implements OnInit {
      Districts = [];
      BranchList = [];
      SourceByList = [];
      SalesAgentList = [];
      EmployeeInfo;
      EmployeeInfo_ref;
      errorText;
      checked: boolean;
      public response: {dbPath: ''};
      constructor(private commonService: CommonService,
        private activatedRoute: ActivatedRoute,
        public service: CardapplicationService,
        private toastr: ToastrService,
        private router: Router) {

      }

      ngAfterViewInit() {
        // ...
        this.sourceChannelOnChange();
      }
      ngOnInit() {

        let id;



        // async orders getbranchList
       // this.resetWithDefault();

        // Get Districts 
        this.commonService.getdistrict().subscribe(
          (res: any) => {
            var obj = {};

            for (var i = 0, len = res.length; i < len; i++)
              obj[res[i]['district']] = res[i];

            for (var key in obj)
              this.Districts.push(obj[key]);
          },
          err => {
            console.log(err);
          }
        );

        // Get Branch list
        this.commonService.getbranchList().subscribe(
          (res: any) => {
            this.BranchList = res.data;

          },
          err => {
            console.log(err);
          }
        );

        this.activatedRoute.queryParams.subscribe(params => {
          id = params['Id'];
          if(params['Id']==null){
            this.resetWithDefault();
          }
        });
    
        if (id != null) {
          this.getcurrentValues(id);
        }

      }
      public uploadFinished = (event) => {
        this.response = event;
      }
      sourceChannelOnChange() {
    
        if (this.service.formModel.controls['SourceChannel'].value == "Branch") {
          this.SourceByList = this.BranchList;
        } else {
          this.SourceByList = this.SalesAgentList;
        }
      }
      getEmployeeId() {

        // Get Employee Info
        this.commonService.getEmpInfo(this.service.formModel.controls['SourcedBy'].value).subscribe(
          (res: any) => {
            
            if (res.isSuccessfull) {
              this.EmployeeInfo = res.data;
              this.errorText = null;
            } else {
              this.EmployeeInfo = null;
              this.service.formModel.controls['SourcedBy'].setValue("")
              this.errorText = "Invalid Employee Id !!!"
            }


          },
          err => {
            this.EmployeeInfo = null;
            this.service.formModel.controls['SourcedBy'].setValue("")
            this.errorText = "Invalid Employee Id !!!"
            console.log(err);
          }
        );
      }
      getEmployeeIdForRef() {

        // Get Employee Info
        this.commonService.getEmpInfo(this.service.formModel.controls['ReferenceName'].value).subscribe(
          (res: any) => {
       
            if (res.isSuccessfull) {
              this.EmployeeInfo_ref = res.data;
              this.errorText = null;
            } else {
              this.EmployeeInfo_ref = null;
              this.service.formModel.controls['ReferenceName'].setValue("")
              this.errorText = "Invalid Employee Id !!!"
            }


          },
          err => {
            this.EmployeeInfo_ref = null;
            this.service.formModel.controls['ReferenceName'].setValue("")
            this.errorText = "Invalid Employee Id !!!"
            console.log(err);
          }
        );
      }
    
      getcurrentValues(id) {
        this.service.getApplicationDetailsAndBind(id).subscribe(
          (res: any) => {
            this.service.formModel.controls['Id'].setValue(res.data.id);
            this.service.formModel.controls['SourceChannel'].setValue(res.data.sourceChannel);
            this.service.formModel.controls['SourcedBy'].setValue(res.data.sourcedBy);

            this.service.formModel.controls['FileNo'].setValue(res.data.fileNo);
           
            this.service.formModel.controls['ReferenceName'].setValue(res.data.referenceName);

            if (this.service.formModel.controls['SourceChannel'].value != "" &&
              this.service.formModel.controls['SourcedBy'].value != "" &&
              this.SourceByList !=null) {
              this.sourceChannelOnChange();
            }
          },
          err => {
            this.resetWithDefault();
            console.log(err);

          }
        );
      }

      toUpper(event: any) { // without type info
        event.target.value= event.target.value.toUpperCase();
      }
      resetWithDefault() {
        this.service.formModel.reset();
 
        this.service.formModel.controls['SourceChannel'].setValue("");
        this.service.formModel.controls['SourcedBy'].setValue("");


        //
      }
      onSubmit() {
        if (this.service.formModel.valid) {
            if (this.service.formModel.controls['Id'].value != null) {
              this.service.save().subscribe(
                (res: any) => {
                  console.log(res);

                  if (res.isSuccessfull) {

                    this.toastr.warning('Data updated!', 'Record successfully updated.');
                  } else {
                    this.toastr.error('Ops! Something went worng!', res.message);
                  }
                },
                err => {
                  console.log(err);
                  this.toastr.error(err);
                }
              );
            } else {
              this.service.save().subscribe(
                (res: any) => {
                  console.log(res);

                  if (res.isSuccessfull) {
                    this.service.formModel.reset();
                    this.toastr.success('Data saved!', 'Record successfully saved.');
                    this.router.navigate(['/home/appDoc'], { queryParams: { Id: res.data } });
                  } else {
                    this.toastr.success('Ops! Something went worng!', res.message);
                  }
                },
                err => {
                  console.log(err);
                  this.toastr.error(err);
                }
              );
            }
          }else{
            this.getFormValidationErrors();
          }
      }
      copyAddress(e){
        this.checked=e;
        if(this.checked){
          this.service.formModel.controls['PermanentAddress1'].
          setValue(this.service.formModel.controls['ResidentialAddressLine1'].value);
          this.service.formModel.controls['PermanentAddress2'].
          setValue(this.service.formModel.controls['ResidentialAddressLine2'].value);
          this.service.formModel.controls['PermanentPostCode'].
          setValue(this.service.formModel.controls['ResidentialPostCode'].value);
          this.service.formModel.controls['PermanentDistrict'].
          setValue(this.service.formModel.controls['ResidentialDistrict'].value);
  
        }
    else{
      this.service.formModel.controls['PermanentAddress1'].
      setValue('');
      this.service.formModel.controls['PermanentAddress2'].
      setValue('');
      this.service.formModel.controls['PermanentPostCode'].
      setValue('');
      this.service.formModel.controls['PermanentDistrict'].
      setValue('');

    }
      }

      getFormValidationErrors() {
        Object.keys(this.service.formModel.controls).forEach((key) => {
          const controlErrors: ValidationErrors = this.service.formModel.get(key).errors;
          if (controlErrors != null) {
            Object.keys(controlErrors).forEach((keyError) => {
              const errors =
                "Key control: " + key + ", keyError: " + keyError + ", err value: ";
              this.toastr.error(errors);
              console.log(errors);
            });
          }
        });
      }
    }
