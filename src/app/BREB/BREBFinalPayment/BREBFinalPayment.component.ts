import { Component, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';

import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/shared/common.service';
import { UserService } from 'src/app/shared/user.service';
import { BREBPaymentService } from 'src/app/shared/BREBPayment.service';

@Component({
  selector: 'app-BREBFinalPayment.component',
  templateUrl: './BREBFinalPayment.component.html',
  styles: []
})
export class BREBFinalPaymentComponent implements OnInit {
  Districts = [];
  BranchList = [];
  SourceByList = [];
  SalesAgentList = [];
  userRoles;
  EmployeeInfo;
  EmployeeInfo_ref;
  errorText;
  checked: boolean;
  public response: { dbPath: '' };


  TransactionId;
  IsAuth;
  TransactionInfo;

  constructor(private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    public service: BREBPaymentService,
    public userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private _location: Location,
    private spinner: NgxSpinnerService
  ) {

  }

  ngAfterViewInit() {
    // ...
  }
  async ngOnInit() {
    this.spinner.show();
    this.service.removeAllValidators();


    this.activatedRoute.queryParams.subscribe(params => {
      this.TransactionId = params['TransactionId'];
      this.IsAuth = params['IsAuth'];
      if (params['TransactionId'] == null) {
        this.router.navigate(["/home/dashboard"]);
      } if (params['TransactionId'] != null && params['IsAuth'] == 'Yes') {
        this.getVerifiedTransAuth(params['TransactionId']);
      }else{
        this.getVerifiedTrans(params['TransactionId']);
      }
    });
    this.userRoles = localStorage.getItem('UserRoles');

    setTimeout(() => {
      /** spinner ends after 1 seconds */
      this.spinner.hide();
    }, 600);
  }
  public uploadFinished = (event) => {
    this.response = event;
  }
  goBack() {
    this._location.back();
  }
  getVerifiedTrans(traxId) {
    this.service.getverified(traxId).subscribe(
      (res: any) => {
      

        this.TransactionInfo = res.data.brebTransactionInfo;
        this.TransactionInfo.isMake = res.data.isMake;
        this.TransactionInfo.paymentTypeId = res.data.paymentTypeId;
        
        
        this.service.paymentFormModel.controls['CompanySetupId'].setValue(res.data.companyShortCode);
        this.service.paymentFormModel.controls['TransactionId'].setValue(res.data.id);
        this.service.paymentFormModel.controls['UtilityTypeId'].setValue(res.data.utilityTypeId);
        this.service.paymentFormModel.controls['PaymentTypeId'].setValue(res.data.paymentTypeId);
        this.service.paymentFormModel.controls['PaymentMethod'].setValue(res.data.paymentMethod);
        this.service.paymentFormModel.controls['CustomerBranchCode'].setValue(res.data.customerBranchCode);
        this.service.paymentFormModel.controls['CustomerAccountNo'].setValue(res.data.customerAccountNo);
        if(res.data.brebTransactionInfo){
          this.service.paymentFormModel.controls['SMSAccountNo'].setValue(res.data.brebTransactionInfo.smsAccountNo);
         
          
        }
        
        this.service.paymentFormModel.controls['Amount'].setValue(res.data.amount);
   
      },
      err => {
        console.log(err);
      }
    );
  }
  getVerifiedTransAuth(traxId) {
    this.service.getverifiedAuth(traxId).subscribe(
      (res: any) => {
     

        if(res.isSuccessfull){
          this.TransactionInfo = res.data.brebTransactionInfo;
          this.TransactionInfo.isMake = res.data.isMake;
          this.TransactionInfo.paymentTypeId = res.data.paymentTypeId;
          
          this.service.paymentFormModel.controls['CompanySetupId'].setValue(res.data.companyShortCode);
          this.service.paymentFormModel.controls['TransactionId'].setValue(res.data.id);
          this.service.paymentFormModel.controls['UtilityTypeId'].setValue(res.data.utilityTypeId);
          this.service.paymentFormModel.controls['PaymentTypeId'].setValue(res.data.paymentTypeId);
          this.service.paymentFormModel.controls['PaymentMethod'].setValue(res.data.paymentMethod);
          this.service.paymentFormModel.controls['CustomerBranchCode'].setValue(res.data.customerBranchCode);
          this.service.paymentFormModel.controls['CustomerAccountNo'].setValue(res.data.customerAccountNo);
          if(res.data.brebTransactionInfo){
            this.service.paymentFormModel.controls['SMSAccountNo'].setValue(res.data.brebTransactionInfo.smsAccountNo);
          }
          
          this.service.paymentFormModel.controls['Amount'].setValue(res.data.amount);
        }else{
          this.toastr.error('Ops! Something went worng!', res.message);
        }
      

       
   
      },
      err => {
        console.log(err);
      }
    );
  }
  onDecline() {

    if (confirm("Are you sure to decline this transaction?")) {
      this.spinner.show();
      if (this.service.paymentFormModel.valid) {
        this.service.decline_Payment().subscribe(
          (res: any) => {
            setTimeout(() => {
              /** spinner ends after 1 seconds */
              this.spinner.hide();
            }, 600);

            if (res.isSuccessfull) {
              setTimeout(() => {
                /** spinner ends after 1 seconds */
                this.spinner.hide();
              }, 600);

              this.toastr.warning('Transaction declined!', 'Operation successfull.');
              this.router.navigate(["/home/transactions"]);
            } else {
              this.toastr.error('Ops! Something went worng!', res.message);
            }
          },
          err => {
            setTimeout(() => {
              /** spinner ends after 1 seconds */
              this.spinner.hide();
            }, 600);
            console.log(err);
            this.toastr.error(err.statusText);
          }
        );


      } else {
        this.getFormValidationErrors();
      }
    }
  }
  onMake() {
    this.spinner.show();
    if (this.service.paymentFormModel.valid) {
      this.service.make_Payment().subscribe(
        (res: any) => {
          setTimeout(() => {
            /** spinner ends after 1 seconds */
            this.spinner.hide();
          }, 600);

          if (res.isSuccessfull) {


            this.toastr.success('Submission Successfull!', 'Operation successfull.');
            this.router.navigate(["/home/transactions"]);
          } else {

            this.toastr.error('Ops! Something went worng!', res.message);
          }
        },
        err => {
          setTimeout(() => {
            /** spinner ends after 1 seconds */
            this.spinner.hide();
          }, 600);
          console.log(err);
          this.toastr.error(err.statusText);
        }
      );


    } else {
      setTimeout(() => {
        /** spinner ends after 1 seconds */
        this.spinner.hide();
      }, 600);
      this.getFormValidationErrors();
    }
  }

  onSubmit() {
    if (confirm("Are you sure to authorize this transaction?")) {
      this.spinner.show();
      if (this.service.paymentFormModel.valid) {
        this.service.final_Payment().subscribe(
          (res: any) => {
            setTimeout(() => {
              /** spinner ends after 1 seconds */
              this.spinner.hide();
            }, 600);

            if (res.isSuccessfull) {


              this.toastr.success('Payment Successfull!', 'Operation successfull.');
              this.router.navigate(["/home/transactions"]);
            } else {

              this.toastr.error('Ops! Something went worng!', res.message);
            }
          },
          err => {
            setTimeout(() => {
              /** spinner ends after 1 seconds */
              this.spinner.hide();
            }, 600);
            console.log(err);
            this.toastr.error(err.statusText);
          }
        );


      } else {
        setTimeout(() => {
          /** spinner ends after 1 seconds */
          this.spinner.hide();
        }, 600);
        this.getFormValidationErrors();
      }
    }
  }


  getFormValidationErrors() {

    Object.keys(this.service.paymentFormModel.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.service.paymentFormModel.get(key).errors;
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
