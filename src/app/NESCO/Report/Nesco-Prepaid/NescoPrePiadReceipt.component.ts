import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {DatePipe, formatDate } from '@angular/common';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {Location} from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NescoPaymentService } from 'src/app/shared/NescoPayment.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'NescoPrePiadReceipt',
  templateUrl: './NescoPrePiadReceipt.component.html',
  styles: []
})
export class NescoPrePiadReceipt implements OnInit {
  AllData =  [];

  PrepaidDetailsReports_GrandTotal;
  PrepaidSummaryReports_GrandTotal;

 
  currentDate;
  id;
  reportFileName;
  userName;
 
  userId;
  isLoading =false;
  myDate = new Date();
  NescoInfo: any;
  TransactionInfo: any;
  TransactionId: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: NescoPaymentService,

    private _location: Location,
    private router: Router,
    
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
     ) {
      this.currentDate = this.datePipe.transform(this.myDate, 'dd-MMM-yyyy hh:mm:ss a');
   }
  




///////////////////////////////////////


print_area(){
  
  this.print_after("SJI_PREPAID_TOKEN_"+this.datePipe.transform(this.myDate, 'dd_MM_yyyy'));

 }

 print_after(filename){


   var HTML_Width = $("#printArea").width();
   var HTML_Height = $("#printArea").height();
   var top_left_margin = 15;
   var PDF_Width = HTML_Width+(top_left_margin*2);
   var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
   var canvas_image_width = HTML_Width;
   var canvas_image_height = HTML_Height;
   
   var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
   

   html2canvas($("#printArea")[0],{allowTaint:true}).then(function(canvas) {
     canvas.getContext('2d');
     
     console.log(canvas.height+"  "+canvas.width);
     
     
     var imgData = canvas.toDataURL("image/jpeg", 1.0);
     var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
       pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
     
     
     for (var i = 1; i <= totalPDFPages; i++) { 
       pdf.addPage(PDF_Width, PDF_Height);
       pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
     }
     pdf.save(filename+".pdf");
     
      
       });
 
}

  ngOnInit() {
    this.spinner.show();
    this.userName= localStorage.getItem('userFullName');
    this.userId= localStorage.getItem('UserID');

    this.activatedRoute.queryParams.subscribe(params => {
      this.TransactionId = params['TransactionId'];
      if (params['TransactionId'] == null) {
        this.router.navigate(["/home/dashboard"]);
      } else {
        this.getVerifiedTrans(params['TransactionId']);
      }
    });

    // let now = new Date();
    // this.currentDate= formatDate(now, 'dd/MM/yyyy', 'en-US', '+0530');

    this.spinner.hide();

  }
  getVerifiedTrans(traxId) {
    this.service.getverified(traxId).subscribe(
      (res: any) => {
        

        this.NescoInfo = res.data.nescoTransactionInfo;
        this.TransactionInfo  = res.data;
        console.log(res.data);
        
      },
      err => {
        console.log(err);
      }
    );
  }
 
  
  goBack(){
    this._location.back();
  }

 

}
