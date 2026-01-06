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
import { BREBPaymentService } from 'src/app/shared/BREBPayment.service';
import { CommonService } from 'src/app/shared/common.service';
@Component({
  selector: 'BREBReport',
  templateUrl: './BREBReport.component.html',
  styles: []
})
export class BREBReport implements OnInit {
  AllData =  [];

  PrepaidDetailsReports_GrandTotal;
  PrepaidSummaryReports_GrandTotal;

 
  currentDate;
  id;

  userName;
  reportFileName;
  userId;
  isLoading =false;
  myDate = new Date();
  CompanySetups: any[];
  totalBrebAmount: number;
  totalBrebVat: number;
  totalAmount: number;
  totalVat: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    public service: BREBPaymentService,
    private commonService: CommonService,
    private _location: Location,
    private router: Router,
    
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
     ) {
      this.currentDate = this.datePipe.transform(this.myDate, 'dd-MMM-yyyy hh:mm:ss a');
   }
  




///////////////////////////////////////

generateReport(){
  this.spinner.show();

  var datestr;
  if(this.service.reportModel.value.FromDate){
    datestr= this.service.reportModel.value.FromDate.year +'_'
    +('0'+this.service.reportModel.value.FromDate.month).slice(-2)+'_'
    +('0'+this.service.reportModel.value.FromDate.day).slice(-2);
  }

  if(this.service.reportModel.value.ReportType=='BREB Collection Details Report'){

    this.GetDateWiseDetailsReport();

    this.reportFileName = "SJI_BREB_DDR_"+datestr;
  }
  if(this.service.reportModel.value.ReportType=='BREB Collection Summary Report'){

    this.PrepaidSummaryReports();

    this.reportFileName = "SJI_BREB_DSR_"+datestr;
  }
 

  
}

 

  ngOnInit() {
    this.spinner.show();
    this.userName= localStorage.getItem('userFullName');
    this.userId= localStorage.getItem('UserID');
    this.getCompanySetups();
    

    // let now = new Date();
    // this.currentDate= formatDate(now, 'dd/MM/yyyy', 'en-US', '+0530');

    this.spinner.hide();

  }

  print_area(){
  
   this.print_after(this.reportFileName);

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
  
  goBack(){
    this._location.back();
  }

 
  GetDateWiseDetailsReport(){
    this.AllData =  [];

    this.service.GetDateWiseDetailsReport().subscribe(
      (res: any) => {
      console.log(res.data);


      this.totalAmount = res.data && res.data.transactionList 
      ? res.data.transactionList.reduce((sum, item) => sum + (item.amount !== null && item.amount !== undefined ? item.amount : 0), 0)
      : 0;
    
    this.totalVat = res.data && res.data.transactionList 
      ? res.data.transactionList.reduce((sum, item) => sum + (item.vatAmount !== null && item.vatAmount !== undefined ? item.vatAmount : 0), 0)
      : 0;


      this.totalBrebAmount = res.data && res.data.breB_Res_Report_Details 
      ? res.data.breB_Res_Report_Details.reduce((sum, item) => sum + (item.amount !== null && item.amount !== undefined ? item.amount : 0), 0)
      : 0;
    
    this.totalBrebVat = res.data && res.data.breB_Res_Report_Details 
      ? res.data.breB_Res_Report_Details.reduce((sum, item) => sum + (item.vat !== null && item.vat !== undefined ? item.vat : 0), 0)
      : 0;
    
        this.AllData = res.data;

 console.log(this.AllData);
 this.spinner.hide();
      },
      err => {
        console.log(err);
        this.spinner.hide();
      }
    );
}

getCompanySetups(){
  this.commonService.getCompanySetups().subscribe(
    (res:any) =>{
      
      this.CompanySetups=res.data;


      this.CompanySetups = Object.assign([], this.CompanySetups).filter(
        item => item.companyShortCode.indexOf("BREB") > -1
     );
     
    },
    err =>{
     
    }
  );
}

PrepaidSummaryReports(){
  this.AllData =  [];

  this.service.PrepaidSummaryReports().subscribe(
    (res: any) => {
    
      this.AllData = res.data.filter(i => i.date != "GrandTotal");
      this.PrepaidDetailsReports_GrandTotal = res.data.filter(i => i.date === "GrandTotal");

      console.log(this.AllData);
      this.spinner.hide();
    },
    err => {
      console.log(err);
      this.spinner.hide();
    }
  );
}
}
