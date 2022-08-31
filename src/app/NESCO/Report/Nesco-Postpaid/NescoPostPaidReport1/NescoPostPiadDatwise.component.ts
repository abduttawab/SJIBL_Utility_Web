import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {formatDate } from '@angular/common';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {Location} from '@angular/common';
import html2canvas from 'html2canvas';
import { NescoPaymentService } from 'src/app/shared/NescoPayment.service';
import { NgxSpinnerService } from 'ngx-spinner';

import domtoimage from 'dom-to-image';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'NescoPostPiadDatwise',
  templateUrl: './NescoPostPiadDatwise.component.html',
  styles: []
})
export class NescoPostPiadDatwise implements OnInit {
  AllData =  [];
  DateWiseReportNescoPostPaids;
  DateWiseReportNescoPostPaids_SNDWise;
  DateWiseReportNescoPostPaids_GrandTotal;
  PrepaidDetailsReports;
  PrepaidSummaryReports;
 sndWiseTotla = {
  sndId:'',
sndCountTotalTrx:0,
sndSumCollectedAmount:0,
sndSumPrincipalAmount:0,
sndSumVAT:0,
sndSumLPC:0,
sndSumRevStm:0,
sndSumNetAmount:0
 };
  currentDate;
  id;

  userName;

  reportFileName;
 
  userId;
  isLoading =false;
  constructor(
    private activatedRoute: ActivatedRoute,
    public service: NescoPaymentService,

    private _location: Location,
    private router: Router,
    
    private spinner: NgxSpinnerService
     ) {
     
   }
  
///////////////////////

downloadPDF()
            {

              var node = document.getElementById('printArea');

              var img;
              var filename;
              var newImage;


              domtoimage.toPng(node, { bgcolor: '#fff' })

                .then(function(dataUrl) {

                  img = new Image();
                  img.src = dataUrl;
                  newImage = img.src;

                  img.onload = function(){

                  var pdfWidth = img.width;
                  var pdfHeight = img.height;

                    // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

                    var doc;

                    if(pdfWidth > pdfHeight)
                    {
                      doc = new jsPDF('l', 'px', [pdfWidth , pdfHeight]);
                    }
                    else
                    {
                      doc = new jsPDF('p', 'px', [pdfWidth , pdfHeight]);
                    }


                    var width = doc.internal.pageSize.getWidth();
                    var height = doc.internal.pageSize.getHeight();


                    doc.addImage(newImage, 'PNG',  10, 10, width, height);
                    filename = 'mypdf_' + '.pdf';
                    doc.save(filename);

                  };


                })
                .catch(function(error) {

                 // Error Handling

                });



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


  if(this.service.reportModel.value.ReportType=='Daily Detail Report (DDT)'){

    this.GetDateWiseReportNescoPostPaids();

    this.reportFileName = "SJI_DDT_"+datestr;
  }
  if(this.service.reportModel.value.ReportType=='Daily S&D-wise Summary (DSS)'){

    this.DateWiseSummaryReportNescoPostPaids();

    this.reportFileName = "SJI_DSS_"+datestr;
  }
  if(this.service.reportModel.value.ReportType=='Monthly S&D-wise Summary (MSS)'){
    this.MonthlySummaryReportNescoPostPaids();
    this.reportFileName = "SJI_MSS_"+datestr;
  }
  if(this.service.reportModel.value.ReportType=='Monthly Date-wise Summary (MDS)'){
    this.MonthlyDatewiseReportNescoPostPaids();

    this.reportFileName = "SJI_MDS_"+datestr;
  }
  
}
print(){
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
reset(){
  
  var type = this.service.reportModel.value.ReportType;
  this.service.reportModel.reset();
  this.service.SearchToDate = null;
  this.service.SearchFromDate = null;
  this.service.reportModel.controls['ReportType'].setValue(type);

  
}
  ngOnInit() {
    this.spinner.show();
    this.reset();
    this.userName= localStorage.getItem('userFullName');
    this.userId= localStorage.getItem('UserID');

    

    let now = new Date();
    this.currentDate= formatDate(now, 'dd/MM/yyyy', 'en-US', '+0530');

    this.spinner.hide();

  }

  generateData(amount) {
    var result = [];
    var data = {
      coin: "100",
      game_group: "GameGroup",
      game_name: "XPTO2",
      game_version: "25",
      machine: "20485861",
      vlt: "0"
    };
    for (var i = 0; i < amount; i += 1) {
      //data.id = (i + 1).toString();
      result.push(Object.assign({}, data));
    }
    return result;
  };
  
   createHeaders(keys) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: 65,
        align: "center",
        padding: 0
      });
    }
    return result;
  }
  
  


  jspdf(filename){
    

    const doc = new jsPDF();
    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text("Shahjalal Islami Bank Ltd.", pageWidth / 2, 10, {align: 'center'});
    doc.text("Electricity Bill Collection Report of", pageWidth / 2, 14, {align: 'center'});
    doc.text("Northern Electricity Supply Company Limited", pageWidth / 2, 18, {align: 'center'});
    
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
    doc.addImage("assets/images/Logo_of_NESCO.png", "PNG", 170, 8, 25, 20);


    if(this.service.reportModel.value.ReportType=='Daily Detail Report (DDT)'){

      this.DDT(doc);
    }
    if(this.service.reportModel.value.ReportType=='Daily S&D-wise Summary (DSS)'){
  
      this.DSS(doc);
    }
    if(this.service.reportModel.value.ReportType=='Monthly S&D-wise Summary (MSS)'){
      this.DSS(doc);
    }
    if(this.service.reportModel.value.ReportType=='Monthly Date-wise Summary (MDS)'){
      this.MSD(doc);
    }

    
   
    // var pageNumber = doc.internal.getNumberOfPages();
    // doc.setPage(pageNumber);

    doc.save(filename+".pdf");

  }
  DDT(doc){
    
    var q=0;
    this.AllData.forEach(childObj=> {
      if(q==0){
        doc.setFontSize(8).setFont(undefined, 'bold').text(childObj.name, 14, 34);
        autoTable(doc, { html: '#pdftable_1_'+q//,tableWidth: 'wrap'
        ,startY: 38,
        styles: {
          lineColor: 0,
          lineWidth: 0.5 ,
          fontSize:6,
          valign: 'middle',
          halign: 'center'
        },
        columnStyles: {
          4: { valign: 'middle',
          halign: 'center',
        // cellWidth: "auto",
          cellPadding: {top: 0, right: 5, bottom: 1, left: 5}}, 
      },
        headStyles: {
          fillColor: [255, 255, 255],
          fontSize: 6,
          textColor: 0
          
        },
        bodyStyles: {
          fillColor: [255, 255, 255],
          textColor: 0,
        },
          
          //, useCss: true
        });
      }else{
        doc.setFontSize(8).setFont(undefined, 'bold').text(childObj.name, 14, doc.lastAutoTable.finalY + 6);
        autoTable(doc, { html: '#pdftable_1_'+q//,tableWidth: 'wrap'
        ,startY: doc.lastAutoTable.finalY+10,
        styles: {
          lineColor: 0,
          lineWidth: 0.5 ,
          fontSize:6,
          valign: 'middle',
          halign: 'center'
          
        },
        columnStyles: {
          4: { valign: 'middle',
          halign: 'center',
          cellWidth: "auto",
          cellPadding: {top: 0, right: 5, bottom: 1, left: 5}}, 
      },
        headStyles: {
          fillColor: [255, 255, 255],
          fontSize: 6,
          textColor: 0
          
        },
        bodyStyles: {
          fillColor: [255, 255, 255],
          textColor: 0,
        },
          
          
          //, useCss: true
        });
      
      }
          
          q++;
        });
        doc.autoTable({
        
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
          },
          head: [[{content:'',colSpan: 10},'Count', 'Collected Amount(Tk.)', 'Principal Amount(Tk.)',
          'VAT(Tk.)', 'LPC (Tk.)','Rev. St. (Tk.)','Net Amount(Tk.)'],
          [{content:'Grand Total:',colSpan: 10},this.DateWiseReportNescoPostPaids.length,
          this.DateWiseReportNescoPostPaids_GrandTotal[0].grandTotalCollectedAmount,
          this.DateWiseReportNescoPostPaids_GrandTotal[0].grandTotalPrincipalAmount,
          this.DateWiseReportNescoPostPaids_GrandTotal[0].grandTotalVAT,
          this.DateWiseReportNescoPostPaids_GrandTotal[0].grandTotalLPC,
          this.DateWiseReportNescoPostPaids_GrandTotal[0].grandTotalRevStm,
          this.DateWiseReportNescoPostPaids_GrandTotal[0].grandTotalNetAmount],
        ],
        columnStyles: {
          0: {valign: "right",columnWidth: 80}, 
      }
        })
  }
  DSS(doc){
    
    var q=0;
    this.AllData.forEach(childObj=> {
      if(q==0){
        doc.setFontSize(8).setFont(undefined, 'bold').text(childObj.name, 14, 34);
        autoTable(doc, { html: '#pdftable_2_'+q//,tableWidth: 'wrap'
        ,startY: 38,
        styles: {
          lineColor: 0,
          lineWidth: 0.5 ,
          fontSize:6,
          valign: 'middle',
          halign: 'center'
        },
        columnStyles: {
          4: { valign: 'middle',
          halign: 'center',
        // cellWidth: "auto",
          cellPadding: {top: 0, right: 5, bottom: 1, left: 5}}, 
      },
        headStyles: {
          fillColor: [255, 255, 255],
          fontSize: 6,
          textColor: 0
          
        },
        bodyStyles: {
          fillColor: [255, 255, 255],
          textColor: 0,
        },
          
          //, useCss: true
        });
      }else{
        doc.setFontSize(8).setFont(undefined, 'bold').text(childObj.name, 14, doc.lastAutoTable.finalY + 6);
        autoTable(doc, { html: '#pdftable_2_'+q//,tableWidth: 'wrap'
        ,startY: doc.lastAutoTable.finalY+10,
        styles: {
          lineColor: 0,
          lineWidth: 0.5 ,
          fontSize:6,
          valign: 'middle',
          halign: 'center'
          
        },
        columnStyles: {
          4: { valign: 'middle',
          halign: 'center',
          cellWidth: "auto",
          cellPadding: {top: 0, right: 5, bottom: 1, left: 5}}, 
      },
        headStyles: {
          fillColor: [255, 255, 255],
          fontSize: 6,
          textColor: 0
          
        },
        bodyStyles: {
          fillColor: [255, 255, 255],
          textColor: 0,
        },
          
          
          //, useCss: true
        });
      
      }
          
          q++;
        });
        doc.autoTable({
        
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
          },
          head: [[{content:'',colSpan: 10},'Count', 'Collected Amount(Tk.)', 'Principal Amount(Tk.)',
          'VAT(Tk.)', 'LPC (Tk.)','Rev. St. (Tk.)','Net Amount(Tk.)'],
          [{content:'Grand Total:',colSpan: 10},this.DateWiseReportNescoPostPaids_GrandTotal[0].sndCountTotalTrx,
          this.DateWiseReportNescoPostPaids_GrandTotal[0].grandTotalCollectedAmount,
          this.DateWiseReportNescoPostPaids_GrandTotal[0].grandTotalPrincipalAmount,
          this.DateWiseReportNescoPostPaids_GrandTotal[0].grandTotalVAT,
          this.DateWiseReportNescoPostPaids_GrandTotal[0].grandTotalLPC,
          this.DateWiseReportNescoPostPaids_GrandTotal[0].grandTotalRevStm,
          this.DateWiseReportNescoPostPaids_GrandTotal[0].grandTotalNetAmount],
        ],
        columnStyles: {
          0: {valign: "right",columnWidth: 80}, 
      }
        })
  }
 
  MSD(doc){
      
    autoTable(doc, { html: '#pdftable_3_MDS'
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
      //   doc.autoTable({
        
      //     styles: {
      //       lineColor: 0,
      //       lineWidth: 0.5 ,
      //       fontSize:6,
      //     valign: 'middle',
      //     halign: 'center'
      //     },
      //     headStyles: {
      //       fillColor: [255, 255, 255],
      //       fontSize: 6,
      //       textColor: 0
            
      //     },
      //     bodyStyles: {
      //       fillColor: [255, 255, 255],
      //       textColor: 0,
      //     },
      //     head: [[{content:'',colSpan: 10},'SL', 'Collected Amount(Tk.)', 'Principal Amount(Tk.)',
      //     'VAT(Tk.)', 'LPC (Tk.)','Rev. St. (Tk.)','Net Amount(Tk.)'],
      //     [{content:'Grand Total:',colSpan: 10},this.DateWiseReportNescoPostPaids_GrandTotal[0].trxCount,
      //     this.DateWiseReportNescoPostPaids_GrandTotal[0].collectedAmount,
      //     this.DateWiseReportNescoPostPaids_GrandTotal[0].principalAmount,
      //     this.DateWiseReportNescoPostPaids_GrandTotal[0].vat,
      //     this.DateWiseReportNescoPostPaids_GrandTotal[0].lpc,
      //     this.DateWiseReportNescoPostPaids_GrandTotal[0].revStAmount,
      //     this.DateWiseReportNescoPostPaids_GrandTotal[0].netPrincipalAmount],
      //   ],
      //   columnStyles: {
      //     0: {valign: "right",columnWidth: 80}, 
      // }
      //   })
  }
 
  
  goBack(){
    this._location.back();
  }

  DateWiseSummaryReportNescoPostPaids(){
    this.AllData =  [];

    this.service.DateWiseSummaryReportNescoPostPaids().subscribe(
      (res: any) => {
      
        this.DateWiseReportNescoPostPaids = res.data.filter(i => i.date != "SNDWise" && i.date != "GrandTotal");
        this.DateWiseReportNescoPostPaids_SNDWise = res.data.filter(i => i.date === "SNDWise");
        this.DateWiseReportNescoPostPaids_GrandTotal = res.data.filter(i => i.date === "GrandTotal");


      var groudata = res.data.filter(i => i.date != "GrandTotal");
      var groups = new Set(groudata.map(item => item.sndCenterName));
  
      groups.forEach(g =>
        this.AllData.push({
          
          name: g,
          values: groudata.filter(i => i.sndCenterName === g ),
          sndWiseTotla:this.totalAmountFunc(groudata.filter(i => i.sndCenterName === g ))
        }
        ));
        console.log(this.AllData);
        this.spinner.hide();

      },
      err => {
        console.log(err);
        this.spinner.hide();
      }
    );
}

MonthlySummaryReportNescoPostPaids(){
  this.AllData =  [];

  this.service.MonthlySummaryReportNescoPostPaids().subscribe(
    (res: any) => {
    
      this.DateWiseReportNescoPostPaids = res.data.filter(i => i.date != "SNDWise" && i.date != "GrandTotal");
      this.DateWiseReportNescoPostPaids_SNDWise = res.data.filter(i => i.date === "SNDWise");
      this.DateWiseReportNescoPostPaids_GrandTotal = res.data.filter(i => i.date === "GrandTotal");


    var groudata = res.data.filter(i => i.date != "GrandTotal");
    var groups = new Set(groudata.map(item => item.sndCenterName));

    groups.forEach(g =>
      this.AllData.push({
        
        name: g,
        values: groudata.filter(i => i.sndCenterName === g ),
        sndWiseTotla:this.totalAmountFunc(groudata.filter(i => i.sndCenterName === g ))
      }
      ));
      console.log(this.AllData);

      this.spinner.hide();
    },
    err => {
      console.log(err);
      this.spinner.hide();
    }
  );
}
totalAmountFunc(list) {
  var sndCountTotalTrx = 0;
  var sndSumCollectedAmount = 0;
  var sndSumPrincipalAmount = 0;
  var sndSumVAT = 0;
  var sndSumLPC = 0;
  var sndSumRevStm = 0;
  var sndSumNetAmount = 0;
  
 for(let data of list){
   sndCountTotalTrx += this.ConvertToInt(data.sndCountTotalTrx);
   sndSumCollectedAmount += this.ConvertToInt(data.sndSumCollectedAmount);
   sndSumPrincipalAmount += this.ConvertToInt(data.sndSumPrincipalAmount);
   sndSumVAT += this.ConvertToInt(data.sndSumVAT);
   sndSumLPC += this.ConvertToInt(data.sndSumLPC);
   sndSumRevStm += this.ConvertToInt(data.sndSumRevStm);
   sndSumNetAmount += this.ConvertToInt(data.sndSumNetAmount);
 }
 return this.sndWiseTotla = {
  sndId:'Total',
  sndCountTotalTrx:sndCountTotalTrx,
  sndSumCollectedAmount:sndSumCollectedAmount,
  sndSumLPC:sndSumLPC,
  sndSumNetAmount:sndSumNetAmount,
  sndSumPrincipalAmount:sndSumPrincipalAmount,
  sndSumRevStm:sndSumRevStm,
  sndSumVAT:sndSumVAT
};

}
ConvertToInt(val){
  return Number(val);
}
MonthlyDatewiseReportNescoPostPaids(){
  this.AllData =  [];

  this.service.MonthlyDatewiseReportNescoPostPaids().subscribe(
    (res: any) => {
    
      
      this.DateWiseReportNescoPostPaids_GrandTotal = res.data.filter(i => i.date === "GrandTotal");


      this.AllData = res.data.filter(i => i.date != "GrandTotal");
   

   
      console.log(this.AllData);
      this.spinner.hide();

    },
    err => {
      console.log(err);
      this.spinner.hide();
    }
  );
}

    GetDateWiseReportNescoPostPaids(){
      this.AllData =  [];

      this.service.GetDateWiseReportNescoPostPaids().subscribe(
        (res: any) => {
        
          this.DateWiseReportNescoPostPaids = res.data.filter(i => i.date != "SNDWise" && i.date != "GrandTotal");
          this.DateWiseReportNescoPostPaids_SNDWise = res.data.filter(i => i.date === "SNDWise");
          this.DateWiseReportNescoPostPaids_GrandTotal = res.data.filter(i => i.date === "GrandTotal");


        var groudata = res.data.filter(i => i.date != "GrandTotal");
        var groups = new Set(groudata.map(item => item.sndId));
    
        groups.forEach(g =>
          this.AllData.push({
            
            name: g,
            values: groudata.filter(i => i.sndId === g )
          }
          ))


          this.spinner.hide();
        },
        err => {
          console.log(err);
          this.spinner.hide();
        }
      );
  }
 

}
