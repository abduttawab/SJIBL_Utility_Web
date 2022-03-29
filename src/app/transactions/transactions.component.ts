import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import 'datatables.net';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../shared/payment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {saveAs as importedSaveAs} from "file-saver";
import { formatDate } from '@angular/common';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styles: []

  
})
export class TransactionsComponent implements OnInit {
  Transactions: any[];
  ApprovedApplications: any[];
  Districts= [];
  BranchList= [];
  SourceByList= [];
  SalesAgentList= [];
  UtilityTypes: any[];
  PaymentTypes: any[];
  totalAmount=0;
  viewPrintArea=false;
    // Our future instance of DataTable
    dataTable: any;
    userRoles;
  constructor(
    public service : PaymentService,
     private commonService : CommonService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    public userService:UserService,
    ) { }

  async ngOnInit() {
    this.spinner.show();
    
    this.userRoles= localStorage.getItem('UserRoles');
      this.getData();
      this.BranchList = await this.getBranchList();
 
        this.service.searchFormModel.reset();
  
        this.service.searchFormModel.controls['UtilityTypeId'].setValue("");
        this.service.searchFormModel.controls['PaymentTypeId'].setValue("");
        this.getUtilityType();

        setTimeout(() => {
          /** spinner ends after 1 seconds */
          this.spinner.hide();
        }, 600);



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
  getUtilityType(){
    this.commonService.getUtilityType().subscribe(
      (res:any) =>{
        
        this.UtilityTypes=res.data;
        
        console.log(res.data);
      },
      err =>{
        console.log(err);
      }
    );
  }

  getPaymentType(){
    this.commonService.getPaymentType(this.service.searchFormModel.value.UtilityTypeId).subscribe(
      (res:any) =>{
        
        this.PaymentTypes=res.data;
      },
      err =>{
        console.log(err);
      }
    );
  }
  initDatatable(){
  }
  ConvertToInt(val){
    return Number(val);
  }
  onSearch() {
    this.service.searchTransactions().subscribe(
      (res: any) => {

        
        this.Transactions=res.data;
        this.totalAmountFunc(res.data);
      },
      err => {
        console.log(err);
   
      }
    );
  }

  // onExcelReport(utilityName) {
  //   
  //   this.service.excelReportDownload(utilityName).subscribe(
  //     (res: any) => {
  //      this.downloadFile(res)
  //      // this.HandleBase64(res,"application/csv","filenasdad");

  //     },
  //     err => {
  //       console.log(err);
   
  //     }
  //   );
  // }

  onExcelReport(utilityName){


    //this.service.excelReportDownload(utilityName).subscribe(data => importedSaveAs(data, `excereport.xlsx`));


    this.service.excelReportDownload(utilityName).subscribe(
      (res: any) => {
        var currentDate = new Date();
        const cValue = formatDate(currentDate, 'dd-MM-yyyyTh:mm:ssa', 'en-US');
        importedSaveAs(res, utilityName+`ReconciliationReport_`+cValue+`.xlsx`)
      },
      err => {
        console.log(err);
      }
    );
  }

  
  HandleBase64  (data , contentType,fileName ){ 
    let byteCharacters = atob(data);    
    let byteNumbers = new Array(byteCharacters.length);    
    for (var i = 0; i < byteCharacters.length; i++) 
        byteNumbers[i] = byteCharacters.charCodeAt(i);

    let byteArray = new Uint8Array(byteNumbers);    
    let blob = new Blob([byteArray], {type: contentType});
    if(contentType === "audio/wav"){
        var blobURL=URL.createObjectURL(blob);
        window.open(blobURL);       
    }
    else{
        var blobURL = window.URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.download = fileName;
        anchor.href = blobURL;
        anchor.click();
    }
}
  downloadFile(data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }
  print_area(){
  this.viewPrintArea = true;
  if(!document.getElementById('printArea')){
    this.print_area();
  }
    var printContents = document.getElementById('printArea').innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;


    window.open(window.location.href, '_blank');

 

  }
  totalAmountFunc(list) {
     this.totalAmount = 0;
    for(let data of list){
      this.totalAmount += this.ConvertToInt(data.amount)   + this.ConvertToInt(data.aitAmount);
    }
   
  }


getData(){
  this.service.getTransactions().subscribe(
    (res:any) =>{
    
      this.Transactions=res.data;
      this.totalAmountFunc(res.data);
    },
    err =>{
      console.log(err);
    }
  );
}



allowTranxDecline(trxId: string){
  if(confirm("Are you sure to allow this transaction to decline?")) {
    this.service.allowTranxDecline(trxId).subscribe(
      (res: any) => {
        if (res.isSuccessfull) {
          this.getData();
          this.toastr.warning('Data updated!', 'Record successfully updated.');
        } else {
          this.toastr.error('Ops! Something went worng!', res.message);
        }
      },
      err => {
        console.log(err);
   
      }
    );
  }
}
}


