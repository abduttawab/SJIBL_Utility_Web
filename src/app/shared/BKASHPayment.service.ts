import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../app-config.module';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from './common.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BKASHPaymentService {
  

  constructor(private fb: FormBuilder,
     private http: HttpClient,
    private toastr: ToastrService,
    public datepipe: DatePipe,
    @Inject(APP_CONFIG) private config: AppConfig) {

     }

     readonly BaseConrtURI = this.config.apiEndpoint+'BKASH/';

     SearchFromDate;
     SearchToDate;

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

    ShortCode: ['', [Validators.required]],
 

    TransactionId: [''],
    CheckerRemarks: [''],
    Amount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    ConfirmAmount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
  },  {
    validator: matchAmountValidator // 🧠 important: `validator`, not `validators`
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

  reportModel = this.fb.group({
    ReportType: [''],
   
    FromDate: ['', [CommonService.dateVaidator]],
    ToDate: ['', [CommonService.dateVaidator]]
  });





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

        CompanyShortCode: 'BKASH',
        ShortCode: this.paymentFormModel.value.ShortCode,
        Amount: Number(this.paymentFormModel.getRawValue().Amount)
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


        ShortCode: this.paymentFormModel.getRawValue().ShortCode
     

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
        Amount: Number(this.paymentFormModel.getRawValue().Amount),
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

        ShortCode: this.paymentFormModel.value.ShortCode,
   

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

  GetDateWiseReportBKASHPostPaids() {

  
    if(this.reportModel.value.FromDate){
      this.SearchFromDate=('0'+this.reportModel.value.FromDate.day).slice(-2)+'-'
            +('0'+this.reportModel.value.FromDate.month).slice(-2)+'-'
             + this.reportModel.value.FromDate.year;
    }

    if(this.reportModel.value.ToDate){
      this.SearchToDate=('0'+this.reportModel.value.ToDate.day).slice(-2)+'-'
            +('0'+this.reportModel.value.ToDate.month).slice(-2)+'-'
             + this.reportModel.value.ToDate.year;
    
             return this.http.get(this.BaseConrtURI +
               'GetDateRangeWiseReportBKASHPostPaids?fromDate='+this.SearchFromDate+'&toDate='+this.SearchToDate);
            }


    return this.http.get(this.BaseConrtURI + 'GetDateWiseReportBKASHPostPaids?date='+this.SearchFromDate);
  }

  PrepaidDetailsReports(){
    if(this.reportModel.value.FromDate){
      this.SearchFromDate=('0'+this.reportModel.value.FromDate.day).slice(-2)+'-'
            +('0'+this.reportModel.value.FromDate.month).slice(-2)+'-'
             + this.reportModel.value.FromDate.year;
    }
    return this.http.get(this.BaseConrtURI + 'PrepaidDetailsReports?date='+this.SearchFromDate);
 
  }

  PrepaidSummaryReports(){
    if(this.reportModel.value.FromDate){
      this.SearchFromDate=('0'+this.reportModel.value.FromDate.day).slice(-2)+'-'
            +('0'+this.reportModel.value.FromDate.month).slice(-2)+'-'
             + this.reportModel.value.FromDate.year;
    }
    return this.http.get(this.BaseConrtURI + 'PrepaidSummaryReports?date='+this.SearchFromDate);
 
  }



  DateWiseSummaryReportBKASHPostPaids(){

  
    if(this.reportModel.value.FromDate){
      this.SearchFromDate=('0'+this.reportModel.value.FromDate.day).slice(-2)+'-'
            +('0'+this.reportModel.value.FromDate.month).slice(-2)+'-'
             + this.reportModel.value.FromDate.year;
    }


    return this.http.get(this.BaseConrtURI + 'DateWiseSummaryReportBKASHPostPaids?date='+this.SearchFromDate);
  }

  MonthlySummaryReportBKASHPostPaids(){

  
    if(this.reportModel.value.FromDate){
      this.SearchFromDate=('0'+this.reportModel.value.FromDate.day).slice(-2)+'-'
            +('0'+this.reportModel.value.FromDate.month).slice(-2)+'-'
             + this.reportModel.value.FromDate.year;

             var lastDay = new Date(this.reportModel.value.FromDate.year,
              this.reportModel.value.FromDate.month, 0);

              console.log(this.datepipe.transform(lastDay, 'dd-MM-yyyy'));

              this.SearchToDate=this.datepipe.transform(lastDay, 'dd-MM-yyyy');
    }


    return this.http.get(this.BaseConrtURI + 'MonthlySummaryReportBKASHPostPaids?fromDate='+this.SearchFromDate);
  }
  MonthlyDatewiseReportBKASHPostPaids(){

  
    if(this.reportModel.value.FromDate){
      this.SearchFromDate=('0'+this.reportModel.value.FromDate.day).slice(-2)+'-'
            +('0'+this.reportModel.value.FromDate.month).slice(-2)+'-'
             + this.reportModel.value.FromDate.year;

             var lastDay = new Date(this.reportModel.value.FromDate.year,
              this.reportModel.value.FromDate.month, 0);

              console.log(this.datepipe.transform(lastDay, 'dd-MM-yyyy'));

              this.SearchToDate=this.datepipe.transform(lastDay, 'dd-MM-yyyy');
    }


    return this.http.get(this.BaseConrtURI + 'MonthlyReportBKASHPostpaids?date='+this.SearchFromDate);
  }

  //
}
export const matchAmountValidator: ValidatorFn = (group: FormGroup): { [key: string]: any } | null => {
  const amount = group.get('Amount').value;
  const confirm = group.get('ConfirmAmount').value;
  if (amount && confirm && amount !== confirm) {
    return { amountMismatch: true };
  }
  return null;
};