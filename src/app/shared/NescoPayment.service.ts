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
export class NescoPaymentService {
  

  constructor(private fb: FormBuilder,
     private http: HttpClient,
    private toastr: ToastrService,
    @Inject(APP_CONFIG) private config: AppConfig) {

     }

     readonly BaseConrtURI = this.config.apiEndpoint+'NESCO/';

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

    ConsumerNo: [''],
    Year: [''],
    Month: [''],  
    BillNo  :[''],

    TransactionId: [''],
    CheckerRemarks: [''],
    Amount: ['']
  });

  searchFormModel = this.fb.group({
    UtilityTypeId: [''],
    PaymentMethod: [''],
    PaymentTypeId: [''],
    BranchCode: [''],
   // BillNo: [''],
    FromDate: ['', [CommonService.dateVaidator]],
    ToDate: ['', [CommonService.dateVaidator]],
  });



  removePayByBillValidators() {
    const BillNo = this.paymentFormModel.get('BillNo');
    BillNo.setValidators(null);
  }
  removePayByConsumerNoValidators() {
    const Year = this.paymentFormModel.get('Year');
    const Month = this.paymentFormModel.get('Month');
    const ConsumerNo = this.paymentFormModel.get('ConsumerNo');
  
    Year.setValidators(null);
    Month.setValidators(null);
    ConsumerNo.setValidators(null);
    
    Year.updateValueAndValidity();
    Month.updateValueAndValidity();
    ConsumerNo.updateValueAndValidity();
  
  }
  

removeAllValidators(){

  this.removePayByBillValidators();
  this.removePayByConsumerNoValidators();

}


setPayByBillValidators() {

  const BillNo = this.paymentFormModel.get('BillNo');

  const ConsumerNo = this.paymentFormModel.get('ConsumerNo');
  const Year = this.paymentFormModel.get('Year');
  const Month = this.paymentFormModel.get('Month');

  this.paymentFormModel.get('PaymentTypeId').valueChanges
    .subscribe(PaymentTypeId => {
      this.removeAllValidators();
      if (PaymentTypeId === '3f385296-6592-4c3a-87a8-8df24c0626d7') {
        BillNo.setValidators([Validators.required]);

        BillNo.updateValueAndValidity();

      }
     
      if (PaymentTypeId === '7529013a-4e0a-48ff-be5a-797195d4d8f1') {
        BillNo.setValidators(null);
        ConsumerNo.setValidators([Validators.required]);
        Year.setValidators([Validators.required]);
        Month.setValidators([Validators.required]);
        
        BillNo.updateValueAndValidity();
        ConsumerNo.updateValueAndValidity();
        Year.updateValueAndValidity();
        Month.updateValueAndValidity();
       
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

var ChequeOrSlipDate ="";


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

        ConsumerNo: this.paymentFormModel.value.ConsumerNo,
        Year: this.paymentFormModel.value.Year,
        Month: this.paymentFormModel.value.Month,
        BillNo: this.paymentFormModel.value.BillNo,
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
        Amount: Number(this.paymentFormModel.getRawValue().Amount),
        UtilityTypeId: this.paymentFormModel.value.UtilityTypeId,
        PaymentTypeId: this.paymentFormModel.value.PaymentTypeId,
        PaymentMethod: this.paymentFormModel.value.PaymentMethod,
        CustomerBranchCode: this.paymentFormModel.getRawValue().CustomerBranchCode,
        CustomerAccountNo: this.paymentFormModel.getRawValue().CustomerAccountNo,


        BillNo: this.paymentFormModel.getRawValue().BillNo,
        ConsumerNo: this.paymentFormModel.getRawValue().ConsumerNo,
        Year: this.paymentFormModel.getRawValue().Year,
        Month: this.paymentFormModel.getRawValue().Month

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
        CustomerAccountNo: this.paymentFormModel.getRawValue().CustomerAccountNo

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
        Amount: Number(this.paymentFormModel.getRawValue().Amount),
        UtilityTypeId: this.paymentFormModel.value.UtilityTypeId,
        PaymentTypeId: this.paymentFormModel.value.PaymentTypeId,
        PaymentMethod: this.paymentFormModel.value.PaymentMethod,
        CustomerBranchCode: this.paymentFormModel.getRawValue().CustomerBranchCode,
        CustomerAccountNo: this.paymentFormModel.getRawValue().CustomerAccountNo,

        ConsumerNo: this.paymentFormModel.value.ConsumerNo,
        Year: this.paymentFormModel.value.Year,
        Month: this.paymentFormModel.value.Month,
        BillNo: this.paymentFormModel.value.BillNo,

        CheckerRemarks:this.paymentFormModel.value.CheckerRemarks
    
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
 reconciliation(date) {
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
        FromDate: FromDate,
         ToDate: ToDate,
      };
      return this.http.post(this.BaseConrtURI + 'Search', body);
    } catch (error) {
      console.log(error);
    }
  }
}
