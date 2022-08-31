    import { Component, OnInit } from '@angular/core';
    import { ValidationErrors } from '@angular/forms';
    import { CommonService } from '../../shared/common.service';
    import { ToastrService } from 'ngx-toastr';
    import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { DescoPaymentService } from 'src/app/shared/DescoPayment.service';
    @Component({
      selector: 'app-DescoVerify.component',
      templateUrl: './DescoVerify.component.html',
      styles: []
    })
    export class DescoVerifyComponent implements OnInit {
      Districts = [];
      BranchList = [];
      SourceByList = [];
      SalesAgentList = [];
      Years = [];
      AccountInfo;
      
      userBranchId;
      EmployeeInfo_ref;
      errorText;
      checked: boolean;
      public response: {dbPath: ''};

      UtilityTypes: any[];
      PaymentTypes: any[];

      constructor(private commonService: CommonService,
        public service: DescoPaymentService,
        private toastr: ToastrService,
        private router: Router,
        private spinner: NgxSpinnerService) {

      }

      ngAfterViewInit() {
        // ...
      }
      async ngOnInit() {

        this.spinner.show();

        var year = new Date().getFullYear();
        var range = [];
        range.push(year);
        for (var i = 1; i < 10; i++) {
            range.push(year - i);
        }
        this.Years = range;


       

        this.userBranchId= localStorage.getItem('BranchId');
        this.service.paymentFormModel.get('CustomerBranchCode').enable();
       
       this.getUtilityType();
       this.service.setPaymentMethodValidators();

       this.service.setPayByBillValidators();
   
       this.BranchList = await this.getBranchList();

       this.resetWithDefault();

       setTimeout(() => {
        /** spinner ends after 1 seconds */
        this.spinner.hide();
      }, 600);

      }
      public uploadFinished = (event) => {
        this.response = event;
      }
      slipCheckOnChange(){
        var withdrawalReferenceNumber = this.service.paymentFormModel.controls['WithdrawalReferenceNumber'];
        if(withdrawalReferenceNumber.value=='Slip'){
           this.service.paymentFormModel.controls['CustomerBranchCode'].setValue(this.userBranchId);
           this.service.paymentFormModel.get('CustomerBranchCode').disable({ emitEvent: true });
         }else{
           this.service.paymentFormModel.get('CustomerBranchCode').enable();
         }
      }
      getUtilityType(){
        this.commonService.getUtilityType().subscribe(
          (res:any) =>{
            
            this.UtilityTypes=res.data;
            console.log(res.data);

            this.UtilityTypes = Object.assign([], this.UtilityTypes).filter(
              item => item.companyShortCode.indexOf("DESCO") > -1
           );
            
          },
          err =>{
           
          }
        );
      }
      async  getBranchList() : Promise<any>{

        return new Promise((resolve, reject) => {
          this.commonService.getbranchList().subscribe(
            (res: any) => {
              resolve(res.data);
            },
            err => {
              console.log(err);
              reject(err);
            }
          );
        })
       
      }
      resetWithDefault() {
        this.service.paymentFormModel.reset();
 
        this.service.paymentFormModel.controls['Year'].setValue("");
        this.service.paymentFormModel.controls['Month'].setValue("");
        this.service.paymentFormModel.controls['UtilityTypeId'].setValue("");
        this.service.paymentFormModel.controls['PaymentTypeId'].setValue("");
        this.service.paymentFormModel.controls['PaymentMethod'].setValue("");
        this.service.paymentFormModel.controls['CustomerBranchCode'].setValue("");
        this.service.paymentFormModel.get('CustomerBranchCode').enable();


      }

      lpad(v,left,padwith,total)
      {
                      
          var zero='';
          for(var i=v.length;i<total; i++)
          {
            zero=zero+padwith;
          }
          
          var result = v.substring(0,left) + zero + v.substring(left,v.length);

      return result;
      }
      
      accountPadding(){
        var accNo = this.service.paymentFormModel.controls['CustomerAccountNo'];
        if (accNo.value && accNo.value != "" && accNo.value.length >= 4) {

          if(accNo.value.charAt(0)=='9'){
           // this.service.paymentFormModel.get('CustomerBranchCode').disable({ emitEvent: true });
            this.service.paymentFormModel.controls['CustomerBranchCode'].setValue(this.userBranchId);
            this.service.paymentFormModel.get('CustomerBranchCode').disable({ emitEvent: true });
          }else{
            this.service.paymentFormModel.get('CustomerBranchCode').enable();
          }

          accNo.setValue(this.lpad(accNo.value, 3, '0', 11));
          this.getAccountInfo();
        }
        this.slipCheckOnChange();
      }
      getAccountInfo() {

        // Get Employee Info
      
console.log(this.service.paymentFormModel.controls['CustomerBranchCode'].value);
        this.commonService.getAccountInfo(this.service.paymentFormModel.controls['CustomerBranchCode'].value,
        this.service.paymentFormModel.controls['CustomerAccountNo'].value
        ).subscribe(
          (res: any) => {
            
            if (res.isSuccessfull) {
             
              if (res.data.flag=="1") {
                this.AccountInfo = res.data;
                this.errorText = null;
              }else{
                this.AccountInfo = null;
              this.service.paymentFormModel.controls['CustomerAccountNo'].setValue("")
              this.errorText = "Invalid Account No. !!!"
              }
            } else {
              this.AccountInfo = null;
              this.service.paymentFormModel.controls['CustomerAccountNo'].setValue("")
              this.errorText = "Invalid Account No. !!!"
            }


          },
          err => {
            this.AccountInfo = null;
            this.service.paymentFormModel.controls['CustomerAccountNo'].setValue("")
            this.errorText = "Invalid Account No. !!!"
            console.log(err);
          }
        );
      }
      getPaymentType(){
        this.spinner.show();
        this.service.removeAllValidators();
        this.commonService.getPaymentType(this.service.paymentFormModel.value.UtilityTypeId).subscribe(
          (res:any) =>{
            
            this.PaymentTypes=res.data;

            this.spinner.hide();
          },
          err =>{
            console.log(err);
            this.spinner.hide();
          }
        );
      }
      onSubmit() 
        {
                  this.spinner.show();
                 
          try {
            if (this.service.paymentFormModel.valid) {
              this.service.verify_Payment().subscribe(
                (res: any) => {


                  if (res.isSuccessfull) {

                    this.router.navigate(['/home/DescoFinalPayment'], { queryParams: { TransactionId: res.data } });
                    this.spinner.hide();
                    this.toastr.success('Data Verified!', 'Operation successfull.');
                    
                  } else {
                    this.spinner.hide();
                    this.toastr.error('Ops! Something went worng!', res.message);
                  }
                },
                err => {
                  this.spinner.hide();
                  console.log(err);
                  this.toastr.error(err);
                }
              );

              
              }else{
                this.spinner.hide();
                this.getFormValidationErrors();
              }
          } catch (error) {
            this.spinner.hide();
            console.log(error);
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
