import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../app-config.module';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class BgdclPaymentService {
  

  constructor(private fb: FormBuilder,
     private http: HttpClient,
    private toastr: ToastrService,
    @Inject(APP_CONFIG) private config: AppConfig) {

     }

     readonly BaseConrtURI = this.config.apiEndpoint+'BGDCLTransaction/';

  paymentFormModel = this.fb.group({
    Id: [''],
    UtilityTypeId: [null, [Validators.required]],
    PaymentTypeId: ['', Validators.required],
    PaymentMethod: ['', Validators.required],
    CustomerBranchCode: [''],
    CustomerAccountNo: [''],
    WithdrawalReferenceNumber :[''],
    
    SlipNumber :[''],
    ChequeNumber :[''],
    ChequeOrSlipDate :[''],
    billYear: [''],
    billMonth: [''],
    billAmount: [''],
    
    installmentNo:[''],

   bpoPayDate: [''],
    bpoNumber: [''],
    bpoBankName: [''],
    bpoBranchName: [''],
   // bpoPayDetails:[''],

    aitAmount: [''],

    chalanNo: [''],
    chalanDate: [''],
    chalanBankName: [''],
    chalanBranchName: [''],
    
    payOrderNo: [''],
    payOrderDate: [''],
    payOrderBank: [''],
    payOrderBranch: [''],
    payOrderAuthorizedDate: [''],

    demandNoteCode: [''],
    CustomerCode: ['', Validators.required],
    CustomerMobileNumber: ['', Validators.required],
    TransactionId: [''],
    CheckerRemarks: [''],
    Amount: ['']
  });

  searchFormModel = this.fb.group({
    UtilityTypeId: [''],
    PaymentMethod: [''],
    PaymentTypeId: [''],
    BranchCode: [''],
    CustomerCode: [''],
    FromDate: ['', [CommonService.dateVaidator]],
    ToDate: ['', [CommonService.dateVaidator]],
  });





  removesetBPOValidators() {


    const bpoPayDate = this.paymentFormModel.get('bpoPayDate');
    const bpoNumber = this.paymentFormModel.get('bpoNumber');
    const bpoBankName = this.paymentFormModel.get('bpoBankName');
    const bpoBranchName = this.paymentFormModel.get('bpoBranchName');
  
    bpoPayDate.setValidators(null);
    bpoNumber.setValidators(null);
    bpoBankName.setValidators(null);
    bpoBranchName.setValidators(null);
  
    bpoPayDate.updateValueAndValidity();
    bpoNumber.updateValueAndValidity();
    bpoBankName.updateValueAndValidity();
    bpoBranchName.updateValueAndValidity();
  
  }
  removesetMeterValidators() {
  
  
    const billYear = this.paymentFormModel.get('billYear');
    const billMonth = this.paymentFormModel.get('billMonth');
    const billAmount = this.paymentFormModel.get('billAmount');
  
    billYear.setValidators(null);
    billMonth.setValidators(null);
    billAmount.setValidators(null);
    
    billYear.updateValueAndValidity();
    billMonth.updateValueAndValidity();
    billAmount.updateValueAndValidity();
  
  }
  removeset_34_Validators() {
  
    const aitAmount = this.paymentFormModel.get('aitAmount');
    const chalanNo = this.paymentFormModel.get('chalanNo');
    const chalanDate = this.paymentFormModel.get('chalanDate');
    const chalanBankName = this.paymentFormModel.get('chalanBankName');
    const chalanBranchName = this.paymentFormModel.get('chalanBranchName');
  
    aitAmount.setValidators(null);
    chalanNo.setValidators(null);
    chalanDate.setValidators(null);
    chalanBankName.setValidators(null);
    chalanBranchName.setValidators(null);
    
    aitAmount.updateValueAndValidity();
    chalanNo.updateValueAndValidity();
    chalanDate.updateValueAndValidity();
    chalanBankName.updateValueAndValidity();
    chalanBranchName.updateValueAndValidity();
  
  }
  removeset_35_Validators() {
  
    const aitAmount = this.paymentFormModel.get('aitAmount');
    const payOrderNo = this.paymentFormModel.get('payOrderNo');
    const payOrderDate = this.paymentFormModel.get('payOrderDate');
    const payOrderBank = this.paymentFormModel.get('payOrderBank');
    const payOrderBranch = this.paymentFormModel.get('payOrderBranch');
    const payOrderAuthorizedDate = this.paymentFormModel.get('payOrderAuthorizedDate');
  
    aitAmount.setValidators(null);
        payOrderNo.setValidators(null);
        payOrderDate.setValidators(null);
        payOrderBank.setValidators(null);
        payOrderBranch.setValidators(null);
        payOrderAuthorizedDate.setValidators(null);
        
        aitAmount.updateValueAndValidity();
        payOrderNo.updateValueAndValidity();
        payOrderDate.updateValueAndValidity();
        payOrderBank.updateValueAndValidity();
        payOrderBranch.updateValueAndValidity();
        payOrderAuthorizedDate.updateValueAndValidity();
  
  }
  removeset_37_Validators() {
  
    const aitAmount = this.paymentFormModel.get('aitAmount');
    const chalanNo = this.paymentFormModel.get('chalanNo');
    const chalanDate = this.paymentFormModel.get('chalanDate');
    const chalanBankName = this.paymentFormModel.get('chalanBankName');
    const chalanBranchName = this.paymentFormModel.get('chalanBranchName');
    const bpoPayDate = this.paymentFormModel.get('bpoPayDate');
    const bpoNumber = this.paymentFormModel.get('bpoNumber');
    const bpoBankName = this.paymentFormModel.get('bpoBankName');
    const bpoBranchName = this.paymentFormModel.get('bpoBranchName');
  
    aitAmount.setValidators(null);
    chalanNo.setValidators(null);
    chalanDate.setValidators(null);
    chalanBankName.setValidators(null);
    chalanBranchName.setValidators(null);
    bpoPayDate.setValidators(null);
    bpoNumber.setValidators(null);
    bpoBankName.setValidators(null);
    bpoBranchName.setValidators(null);
  
    aitAmount.updateValueAndValidity();
    chalanNo.updateValueAndValidity();
    chalanDate.updateValueAndValidity();
    chalanBankName.updateValueAndValidity();
    chalanBranchName.updateValueAndValidity();
    bpoPayDate.updateValueAndValidity();
    bpoNumber.updateValueAndValidity();
    bpoBankName.updateValueAndValidity();
    bpoBranchName.updateValueAndValidity();
  
  }
  removeset_38_Validators() {
  
    const aitAmount = this.paymentFormModel.get('aitAmount');
    const payOrderNo = this.paymentFormModel.get('payOrderNo');
    const payOrderDate = this.paymentFormModel.get('payOrderDate');
    const payOrderBank = this.paymentFormModel.get('payOrderBank');
    const payOrderBranch = this.paymentFormModel.get('payOrderBranch');
    const payOrderAuthorizedDate = this.paymentFormModel.get('payOrderAuthorizedDate');
    const bpoPayDate = this.paymentFormModel.get('bpoPayDate');
    const bpoNumber = this.paymentFormModel.get('bpoNumber');
    const bpoBankName = this.paymentFormModel.get('bpoBankName');
    const bpoBranchName = this.paymentFormModel.get('bpoBranchName');
  
    aitAmount.setValidators(null);
    payOrderNo.setValidators(null);
    payOrderDate.setValidators(null);
    payOrderBank.setValidators(null);
    payOrderBranch.setValidators(null);
    payOrderAuthorizedDate.setValidators(null);
    bpoPayDate.setValidators(null);
    bpoNumber.setValidators(null);
    bpoBankName.setValidators(null);
    bpoBranchName.setValidators(null);
    
    aitAmount.updateValueAndValidity();
    payOrderNo.updateValueAndValidity();
    payOrderDate.updateValueAndValidity();
    payOrderBank.updateValueAndValidity();
    payOrderBranch.updateValueAndValidity();
    payOrderAuthorizedDate.updateValueAndValidity();
    bpoPayDate.updateValueAndValidity();
    bpoNumber.updateValueAndValidity();
    bpoBankName.updateValueAndValidity();
    bpoBranchName.updateValueAndValidity();
  
  }
  removeset_310_Validators() {
  
    const installmentNo = this.paymentFormModel.get('installmentNo');
    const billAmount = this.paymentFormModel.get('billAmount');
  
    installmentNo.setValidators(null);
    billAmount.setValidators(null);
    
    installmentNo.updateValueAndValidity();
    billAmount.updateValueAndValidity();
  
  }
  removeset_43_Validators() {
  
    const demandNoteCode = this.paymentFormModel.get('demandNoteCode');
  
    demandNoteCode.setValidators(null);
    demandNoteCode.updateValueAndValidity();
  
  }

removeAllValidators(){

  this.removesetBPOValidators();
  this.removesetMeterValidators();
  this.removeset_34_Validators();
  this.removeset_35_Validators();
  this.removeset_37_Validators();
  this.removeset_38_Validators();
  this.removeset_310_Validators();
  this.removeset_43_Validators();
}






// Non-Meter / Meter Payorder
setBPOValidators() {


  const bpoPayDate = this.paymentFormModel.get('bpoPayDate');
  const bpoNumber = this.paymentFormModel.get('bpoNumber');
  const bpoBankName = this.paymentFormModel.get('bpoBankName');
  const bpoBranchName = this.paymentFormModel.get('bpoBranchName');

  this.paymentFormModel.get('PaymentTypeId').valueChanges
    .subscribe(PaymentTypeId => {

    
      if (PaymentTypeId === '122d9270-a656-4daf-8bfd-fadfaf400e72'
      ||
      PaymentTypeId === '875d6038-b359-47f0-a78a-92d33d322514') {
        bpoPayDate.setValidators([Validators.required,CommonService.dateVaidator]);
        bpoNumber.setValidators([Validators.required]);
        bpoBankName.setValidators([Validators.required]);
        bpoBranchName.setValidators([Validators.required]);

        bpoPayDate.updateValueAndValidity();
        bpoNumber.updateValueAndValidity();
        bpoBankName.updateValueAndValidity();
        bpoBranchName.updateValueAndValidity();
      }

 

    });

}



// Meter Validator
setMeterValidators() {


  const billYear = this.paymentFormModel.get('billYear');
  const billMonth = this.paymentFormModel.get('billMonth');
  const billAmount = this.paymentFormModel.get('billAmount');

  this.paymentFormModel.get('UtilityTypeId').valueChanges
    .subscribe(PaymentTypeId => {

      if (PaymentTypeId === '689767ac-b2e9-4e25-9f95-4c66a9a76e57') {
        billYear.setValidators([Validators.required]);
        billMonth.setValidators([Validators.required]);
        billAmount.setValidators([Validators.required]);

        billYear.updateValueAndValidity();
        billMonth.updateValueAndValidity();
        billAmount.updateValueAndValidity();
      }

    

    });

}

// Meter Pay a Single Bill with AIT/Source Tax using Chalan
set_34_Validators() {

  const aitAmount = this.paymentFormModel.get('aitAmount');
  const chalanNo = this.paymentFormModel.get('chalanNo');
  const chalanDate = this.paymentFormModel.get('chalanDate');
  const chalanBankName = this.paymentFormModel.get('chalanBankName');
  const chalanBranchName = this.paymentFormModel.get('chalanBranchName');

  this.paymentFormModel.get('PaymentTypeId').valueChanges
    .subscribe(PaymentTypeId => {

      if (PaymentTypeId === '556e3d85-06ad-47f9-8f5c-84e5d10d26dc') {
        aitAmount.setValidators([Validators.required]);
        chalanNo.setValidators([Validators.required]);
        chalanDate.setValidators([Validators.required,CommonService.dateVaidator]);
        chalanBankName.setValidators([Validators.required]);
        chalanBranchName.setValidators([Validators.required]);

        aitAmount.updateValueAndValidity();
        chalanNo.updateValueAndValidity();
        chalanDate.updateValueAndValidity();
        chalanBankName.updateValueAndValidity();
        chalanBranchName.updateValueAndValidity();
      }

  

    });

}


//Pay a Single Bill with AIT/Source Tax using Payorder
set_35_Validators() {

  const aitAmount = this.paymentFormModel.get('aitAmount');
  const payOrderNo = this.paymentFormModel.get('payOrderNo');
  const payOrderDate = this.paymentFormModel.get('payOrderDate');
  const payOrderBank = this.paymentFormModel.get('payOrderBank');
  const payOrderBranch = this.paymentFormModel.get('payOrderBranch');
  const payOrderAuthorizedDate = this.paymentFormModel.get('payOrderAuthorizedDate');

  this.paymentFormModel.get('PaymentTypeId').valueChanges
    .subscribe(PaymentTypeId => {

      if (PaymentTypeId === '9475abfb-2857-4c6f-9cca-e52e15ee4491') {
        aitAmount.setValidators([Validators.required]);
        payOrderNo.setValidators([Validators.required]);
        payOrderDate.setValidators([Validators.required,CommonService.dateVaidator]);
        payOrderBank.setValidators([Validators.required]);
        payOrderBranch.setValidators([Validators.required]);
        payOrderAuthorizedDate.setValidators([Validators.required,CommonService.dateVaidator]);

        aitAmount.updateValueAndValidity();
      payOrderNo.updateValueAndValidity();
      payOrderDate.updateValueAndValidity();
      payOrderBank.updateValueAndValidity();
      payOrderBranch.updateValueAndValidity();
      payOrderAuthorizedDate.updateValueAndValidity();
      }

      

    });

}


//Pay a Single Bill with Source Tax Chalan by Bill Pay Order (BPO)
set_37_Validators() {

  const aitAmount = this.paymentFormModel.get('aitAmount');
  const chalanNo = this.paymentFormModel.get('chalanNo');
  const chalanDate = this.paymentFormModel.get('chalanDate');
  const chalanBankName = this.paymentFormModel.get('chalanBankName');
  const chalanBranchName = this.paymentFormModel.get('chalanBranchName');
  const bpoPayDate = this.paymentFormModel.get('bpoPayDate');
  const bpoNumber = this.paymentFormModel.get('bpoNumber');
  const bpoBankName = this.paymentFormModel.get('bpoBankName');
  const bpoBranchName = this.paymentFormModel.get('bpoBranchName');

  this.paymentFormModel.get('PaymentTypeId').valueChanges
    .subscribe(PaymentTypeId => {

      if (PaymentTypeId === 'cc6c971f-50f9-4641-9d45-90932c0c083f') {
        aitAmount.setValidators([Validators.required]);
        chalanNo.setValidators([Validators.required]);
        chalanDate.setValidators([Validators.required,CommonService.dateVaidator]);
        chalanBankName.setValidators([Validators.required]);
        chalanBranchName.setValidators([Validators.required]);
        bpoPayDate.setValidators([Validators.required,CommonService.dateVaidator]);
        bpoNumber.setValidators([Validators.required]);
        bpoBankName.setValidators([Validators.required]);
        bpoBranchName.setValidators([Validators.required]);

        aitAmount.updateValueAndValidity();
      chalanNo.updateValueAndValidity();
      chalanDate.updateValueAndValidity();
      chalanBankName.updateValueAndValidity();
      chalanBranchName.updateValueAndValidity();
      bpoPayDate.updateValueAndValidity();
      bpoNumber.updateValueAndValidity();
      bpoBankName.updateValueAndValidity();
      bpoBranchName.updateValueAndValidity();
      }

      

    });

}

//Pay a Single Bill with Source Tax Pay Order by Bill Pay Order (BPO)

set_38_Validators() {

  const aitAmount = this.paymentFormModel.get('aitAmount');
  const payOrderNo = this.paymentFormModel.get('payOrderNo');
  const payOrderDate = this.paymentFormModel.get('payOrderDate');
  const payOrderBank = this.paymentFormModel.get('payOrderBank');
  const payOrderBranch = this.paymentFormModel.get('payOrderBranch');
  const payOrderAuthorizedDate = this.paymentFormModel.get('payOrderAuthorizedDate');
  const bpoPayDate = this.paymentFormModel.get('bpoPayDate');
  const bpoNumber = this.paymentFormModel.get('bpoNumber');
  const bpoBankName = this.paymentFormModel.get('bpoBankName');
  const bpoBranchName = this.paymentFormModel.get('bpoBranchName');

  this.paymentFormModel.get('PaymentTypeId').valueChanges
    .subscribe(PaymentTypeId => {

      if (PaymentTypeId === '12023eac-2ebb-4aeb-b4b0-13042c53bd4c') {
        aitAmount.setValidators([Validators.required]);
        payOrderNo.setValidators([Validators.required]);
        payOrderDate.setValidators([Validators.required,CommonService.dateVaidator]);
        payOrderBank.setValidators([Validators.required]);
        payOrderBranch.setValidators([Validators.required]);
        payOrderAuthorizedDate.setValidators([Validators.required,CommonService.dateVaidator]);
       
        bpoPayDate.setValidators([Validators.required,CommonService.dateVaidator]);
        bpoNumber.setValidators([Validators.required]);
        bpoBankName.setValidators([Validators.required]);
        bpoBranchName.setValidators([Validators.required]);

        aitAmount.updateValueAndValidity();
        payOrderNo.updateValueAndValidity();
        payOrderDate.updateValueAndValidity();
        payOrderBank.updateValueAndValidity();
        payOrderBranch.updateValueAndValidity();
        payOrderAuthorizedDate.updateValueAndValidity();
        bpoPayDate.updateValueAndValidity();
        bpoNumber.updateValueAndValidity();
        bpoBankName.updateValueAndValidity();
        bpoBranchName.updateValueAndValidity();
      }

    

    });

}

//Pay Partial Installment
set_310_Validators() {

  const installmentNo = this.paymentFormModel.get('installmentNo');
  const billAmount = this.paymentFormModel.get('billAmount');

  this.paymentFormModel.get('PaymentTypeId').valueChanges
    .subscribe(PaymentTypeId => {

      if (PaymentTypeId === 'a9ff6bb8-4525-47a1-89f5-557c1f9013d8') {
        installmentNo.setValidators([Validators.required]);
        billAmount.setValidators([Validators.required]);
        installmentNo.updateValueAndValidity();
      billAmount.updateValueAndValidity();
      
      }

      

    });

}



set_43_Validators() {

  const demandNoteCode = this.paymentFormModel.get('demandNoteCode');

  this.paymentFormModel.get('PaymentTypeId').valueChanges
    .subscribe(PaymentTypeId => {

      if (PaymentTypeId === 'a924f513-b942-4bba-a353-3b685954bc32') {
        demandNoteCode.setValidators([Validators.required]);
        demandNoteCode.updateValueAndValidity();
      
      }

      
    });

}


  setPaymentMethodValidators() {
 
    const CustomerBranchCode = this.paymentFormModel.get('CustomerBranchCode');
    const CustomerAccountNo = this.paymentFormModel.get('CustomerAccountNo');

    this.paymentFormModel.get('PaymentMethod').valueChanges
      .subscribe(paymentMethod => {

        if (paymentMethod === 'CASH') {
          CustomerBranchCode.setValidators(null);
          CustomerAccountNo.setValidators(null);
        }

        if (paymentMethod === 'TRANSFER') {
          CustomerBranchCode.setValidators([Validators.required, Validators.maxLength(4), Validators.minLength(4)]);
          CustomerAccountNo.setValidators([Validators.required, Validators.maxLength(11), Validators.minLength(11)]);
        }

        CustomerBranchCode.updateValueAndValidity();
        CustomerAccountNo.updateValueAndValidity();
      });
  }

  verify_Payment() {
  var bpoDetails="";
  var bpoPayDate="";
  var chalanDate ="";
var payOrderDate ="";
var payOrderAuthorizedDate="";
var ChequeOrSlipDate ="";


    if(this.paymentFormModel.value.bpoNumber &&
      this.paymentFormModel.value.bpoBankName &&
      this.paymentFormModel.value.bpoBranchName){

        bpoDetails = this.paymentFormModel.value.bpoNumber.replace(/\s/g, "")+
        "_"+this.paymentFormModel.value.bpoBranchName.replace(/\s/g, "")+
        "_"+this.paymentFormModel.value.bpoBankName.replace(/\s/g, "");
    }

if(this.paymentFormModel.value.bpoPayDate){
  bpoPayDate=this.paymentFormModel.value.bpoPayDate.day+'-'
        +this.paymentFormModel.value.bpoPayDate.month+'-'
         + this.paymentFormModel.value.bpoPayDate.year;
}

if(this.paymentFormModel.value.chalanDate){
  chalanDate=this.paymentFormModel.value.chalanDate.day+'-'
        +this.paymentFormModel.value.chalanDate.month+'-'
         + this.paymentFormModel.value.chalanDate.year;
}

if(this.paymentFormModel.value.payOrderAuthorizedDate){
  payOrderAuthorizedDate=this.paymentFormModel.value.payOrderAuthorizedDate.day+'-'
        +this.paymentFormModel.value.payOrderAuthorizedDate.month+'-'
         + this.paymentFormModel.value.payOrderAuthorizedDate.year;
}


if(this.paymentFormModel.value.payOrderDate){
  payOrderDate=this.paymentFormModel.value.payOrderDate.day+'-'
        +this.paymentFormModel.value.payOrderDate.month+'-'
         + this.paymentFormModel.value.payOrderDate.year;
}
if(this.paymentFormModel.value.ChequeOrSlipDate){
  ChequeOrSlipDate=this.paymentFormModel.value.ChequeOrSlipDate.day+'-'
        +this.paymentFormModel.value.ChequeOrSlipDate.month+'-'
         + this.paymentFormModel.value.ChequeOrSlipDate.year;
}

    try {
      var body = {
        Id: this.paymentFormModel.value.Id,
        UtilityTypeId: this.paymentFormModel.value.UtilityTypeId,
        PaymentTypeId: this.paymentFormModel.value.PaymentTypeId,
        PaymentMethod: this.paymentFormModel.value.PaymentMethod,
        CustomerBranchCode: this.paymentFormModel.getRawValue().CustomerBranchCode,
        CustomerAccountNo: this.paymentFormModel.value.CustomerAccountNo,
        WithdrawalReferenceNumber:this.paymentFormModel.value.WithdrawalReferenceNumber,
        SlipNumber:this.paymentFormModel.value.SlipNumber,
        ChequeNumber:this.paymentFormModel.value.ChequeNumber,
        
        ChequeOrSlipDate:ChequeOrSlipDate,
        
        billYear: this.paymentFormModel.value.billYear,
        billMonth: this.paymentFormModel.value.billMonth,
        billAmount: this.paymentFormModel.value.billAmount,
        installmentNo: this.paymentFormModel.value.installmentNo,
        bpoPayDate: bpoPayDate,

        bpoDetails:bpoDetails,
        aitAmount: this.paymentFormModel.value.aitAmount==null?"":this.paymentFormModel.value.aitAmount.toString(),
        chalanNo: this.paymentFormModel.value.chalanNo,

        chalanDate: chalanDate,

        chalanBank: this.paymentFormModel.value.chalanBankName,
        chalanBranch: this.paymentFormModel.value.chalanBranchName,
        payOrderNo: this.paymentFormModel.value.payOrderNo,
        demandNoteCode: this.paymentFormModel.value.demandNoteCode,
        payOrderDate: payOrderDate,

        payOrderBank: this.paymentFormModel.value.payOrderBank,
        payOrderBranch: this.paymentFormModel.value.payOrderBranch,

        payOrderDateAuthorized: payOrderAuthorizedDate,
  

        CustomerCode: this.paymentFormModel.value.CustomerCode,
        CustomerMobileNumber: this.paymentFormModel.value.CustomerMobileNumber
      };

      return this.http.post(this.BaseConrtURI + 'VerifyPayment', body);
    } catch (error) {
      console.log(error);
    }
  }

   final_Payment() {
  
    try {
      var body = {
        TransactionId: this.paymentFormModel.value.TransactionId,
        aitAmount: this.paymentFormModel.value.aitAmount==null?"":this.paymentFormModel.value.aitAmount.toString(),
        Amount: Number(this.paymentFormModel.value.Amount),
        UtilityTypeId: this.paymentFormModel.value.UtilityTypeId,
        PaymentTypeId: this.paymentFormModel.value.PaymentTypeId,
        PaymentMethod: this.paymentFormModel.value.PaymentMethod,
        CustomerBranchCode: this.paymentFormModel.getRawValue().CustomerBranchCode,
        CustomerAccountNo: this.paymentFormModel.getRawValue().CustomerAccountNo,


        CustomerCode: this.paymentFormModel.value.CustomerCode,
        CustomerMobileNumber: this.paymentFormModel.value.CustomerMobileNumber,
      
      };

      return this.http.post(this.BaseConrtURI + 'Payment', body);
    } catch (error) {
      console.log(error);
    }
  }
  make_Payment() {
  
    try {
      var body = {
        TransactionId: this.paymentFormModel.value.TransactionId,
        aitAmount: this.paymentFormModel.value.aitAmount==null?"":this.paymentFormModel.value.aitAmount.toString(),
        Amount: Number(this.paymentFormModel.value.Amount),
        UtilityTypeId: this.paymentFormModel.value.UtilityTypeId,
        PaymentTypeId: this.paymentFormModel.value.PaymentTypeId,
        PaymentMethod: this.paymentFormModel.value.PaymentMethod,
        CustomerBranchCode: this.paymentFormModel.getRawValue().CustomerBranchCode,
        CustomerAccountNo: this.paymentFormModel.getRawValue().CustomerAccountNo,


        CustomerCode: this.paymentFormModel.value.CustomerCode,
        CustomerMobileNumber: this.paymentFormModel.value.CustomerMobileNumber,
      
      };

      return this.http.post(this.BaseConrtURI + 'MakePayment', body);
    } catch (error) {
      console.log(error);
    }
  }

  decline_Payment() {
  
    try {
      var body = {
        TransactionId: this.paymentFormModel.value.TransactionId,
        aitAmount: this.paymentFormModel.value.aitAmount==null?"":this.paymentFormModel.value.aitAmount.toString(),
        Amount: Number(this.paymentFormModel.value.Amount),
        UtilityTypeId: this.paymentFormModel.value.UtilityTypeId,
        PaymentTypeId: this.paymentFormModel.value.PaymentTypeId,
        PaymentMethod: this.paymentFormModel.value.PaymentMethod,
        CustomerBranchCode: this.paymentFormModel.value.CustomerBranchCode,
        CustomerAccountNo: this.paymentFormModel.value.CustomerAccountNo,

        CheckerRemarks:this.paymentFormModel.value.CheckerRemarks,
        CustomerCode: this.paymentFormModel.value.CustomerCode,
        CustomerMobileNumber: this.paymentFormModel.value.CustomerMobileNumber,
      
      };

      return this.http.post(this.BaseConrtURI + 'DeclinePayment', body);
    } catch (error) {
      console.log(error);
    }
  }
//
  getverified(trxId) {
    return this.http.get(this.BaseConrtURI + 'GetVerifiedTrx?trxId=' + trxId);
  }

  getDashboardVM(){

    return this.http.get(this.BaseConrtURI + 'GetDashBoardData');
  }
  getTransactions() {
    return this.http.get(this.BaseConrtURI + 'List');
  }
  bgdclReconciliation(date) {
    return this.http.get(this.BaseConrtURI + 'ReconciliationForBGDCL?date='+date);
  }
  getUnAuthTransactions() {
    return this.http.get(this.BaseConrtURI + 'UnAuthTransactionList');
  }

  searchTransactions() {
    try {
var FromDate,ToDate;
      if(this.searchFormModel.value.FromDate && this.searchFormModel.value.ToDate){

FromDate =this.searchFormModel.value.FromDate.year+'-'
+this.searchFormModel.value.FromDate.month+'-'
 + this.searchFormModel.value.FromDate.day;

ToDate = this.searchFormModel.value.ToDate.year+'-'
+this.searchFormModel.value.ToDate.month+'-'
 + this.searchFormModel.value.ToDate.day;

      }
      var body = {
        UtilityTypeId: this.searchFormModel.value.UtilityTypeId,
        PaymentTypeId: this.searchFormModel.value.PaymentTypeId,
        PaymentMethod:this.searchFormModel.value.PaymentMethod,
        BranchCode: this.searchFormModel.value.BranchCode,
        UtilityCustomerCode: this.searchFormModel.value.CustomerCode,

        FromDate: FromDate,
         ToDate: ToDate,
      };
      return this.http.post(this.BaseConrtURI + 'Search', body);
    } catch (error) {
      console.log(error);
    }
  }
}
