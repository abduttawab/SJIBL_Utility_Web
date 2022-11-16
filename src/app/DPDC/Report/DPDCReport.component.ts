import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {DatePipe, formatDate } from '@angular/common';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {Location} from '@angular/common';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from 'ngx-spinner';
import { DpdcPaymentService } from 'src/app/shared/DpdcPayment.service';
import { CommonService } from 'src/app/shared/common.service';
@Component({
  selector: 'DPDCReport',
  templateUrl: './DPDCReport.component.html',
  styles: []
})
export class DPDCReport implements OnInit {
  AllData =  [];

  PrepaidDetailsReports_GrandTotal;
  BranchList = [];

 
  currentDate;
  id;

  userName;
  reportFileName;
  userId;
  isLoading =false;
  myDate = new Date();

  constructor(
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    public service: DpdcPaymentService,

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

  if(this.service.reportModel.value.ReportType=='DPDC Postpaid Datewise Bill Collection Report'){

    this.dpdc_datewisereports();

    this.reportFileName = "SJIBL_DPDC_POSTPAID_DateWise_"+datestr;
  }
  if(this.service.reportModel.value.ReportType=='DPDC Postpaid Daily Bill Collection Details Report'){

    this.dpdc_detailsreports();

    this.reportFileName = "SJIBL_DPDC_POSTPAID_Daily_"+datestr;
  }
  
}

jspdf(filename){
    

  const doc = new jsPDF();
  var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
  var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

  doc.setFontSize(9);
  doc.setFont(undefined, 'bold');
  doc.text("Shahjalal Islami Bank Ltd.", pageWidth / 2, 10, {align: 'center'});
  doc.text("Electricity Bill Collection Report of", pageWidth / 2, 14, {align: 'center'});
  doc.text("Dhaka Power Distribution Company Limited", pageWidth / 2, 18, {align: 'center'});
  
  doc.setFontSize(8);
  doc.setFont(undefined, 'normal');
  doc.text(this.service.reportModel.value.ReportType, pageWidth / 2, 22, {align: 'center'});

  let date = "";
  if(this.service.SearchToDate){
    date = "Collection Date: "+ this.service.SearchFromDate+" To: "+ this.service.SearchToDate;
  }else{
    date ="Collection Date: "+ this.service.SearchFromDate;
  }  

  doc.text(date, pageWidth / 2, 26, {align: 'center'});

  doc.addImage("assets/images/sjibl.jpg", "JPEG", 10, 8, 20, 20);
  doc.addImage("assets/images/Logo_of_DPDC.png", "PNG", 170, 8, 25, 20);


  if(this.service.reportModel.value.ReportType=='DPDC Postpaid Datewise Bill Collection Report'){

    this.DDT(doc);
  }
  if(this.service.reportModel.value.ReportType=='DPDC Postpaid Daily Bill Collection Details Report'){

    this.DSS(doc);
  }


  // var pageNumber = doc.internal.getNumberOfPages();
  // doc.setPage(pageNumber);

  doc.save(filename+".pdf");

}
DDT(doc){
    
  autoTable(doc, { html: '#pdftable_1'
  ,startY: 38,
  styles: {
    lineColor: 0,
    lineWidth: 0.5 ,
    fontSize:6,
    valign: 'middle',
    halign: 'center'
  },
  headStyles: {
    fillColor: [255, 255, 255],
    fontSize: 6,
    textColor: 0
    
  },
  bodyStyles: {
    fillColor: [255, 255, 255],
    textColor: 0,
  }
    
    //, useCss: true
  });
}
DSS(doc){
    
  autoTable(doc, { html: '#pdftable_2'
  ,startY: 38,
  styles: {
    lineColor: 0,
    lineWidth: 0.5 ,
    fontSize:6,
    valign: 'middle',
    halign: 'center'
  },
  headStyles: {
    fillColor: [255, 255, 255],
    fontSize: 6,
    textColor: 0
    
  },
  bodyStyles: {
    fillColor: [255, 255, 255],
    textColor: 0,
  }
    
    //, useCss: true
  });
}


  async ngOnInit() {
    this.spinner.show();
    this.userName= localStorage.getItem('userFullName');
    this.userId= localStorage.getItem('UserID');

    this.BranchList = await this.getBranchList();

    this.service.reportModel.controls['BranchCode'].setValue(localStorage.getItem('BranchId'));
    
    this.spinner.hide();

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

  print_area(){
  
   //this.print_after(this.reportFileName);
   this.jspdf(this.reportFileName);
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

 
  dpdc_datewisereports(){
    this.AllData =  [];

    this.service.dpdc_datewisereports().subscribe(
      (res: any) => {
      
        this.AllData = res.data.filter(i => i.type != "GrandTotal");
        this.PrepaidDetailsReports_GrandTotal = res.data.filter(i => i.type === "GrandTotal");

        console.log(this.AllData);
        this.spinner.hide();
      },
      err => {
        console.log(err);
        this.spinner.hide();
      }
    );
}

dpdc_detailsreports(){
  this.AllData =  [];

  this.service.dpdc_detailsreports().subscribe(
    (res: any) => {
    
      this.AllData = res.data.filter(i => i.type != "GrandTotal");
      this.PrepaidDetailsReports_GrandTotal = res.data.filter(i => i.type === "GrandTotal");

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
