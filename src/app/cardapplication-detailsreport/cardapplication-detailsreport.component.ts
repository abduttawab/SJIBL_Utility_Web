import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardapplicationService } from '../shared/cardapplication.service';
import {formatDate } from '@angular/common';
import { CommonService } from '../shared/common.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ModalDeduplicationstatusComponent } from '../modal-decision-model/modal-decision-model.component';
@Component({
  selector: 'app-cardapplication-detailsreport',
  templateUrl: './cardapplication-detailsreport.component.html',
  styles: []
})
export class CardapplicationDetailsreportComponent implements OnInit {
  cardDataObject;
  currentDate;
  historyId;
  modalOptions:NgbModalOptions;
  InvestmentDetails= [];
  histories= [];
  ContactPoints= [];
  id;

  userName;
  userId;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: CardapplicationService,
    private commonService : CommonService,
    private modalService: NgbModal,
    private _location: Location
     ) {
      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop'
      }
   }
   
   generarPDF_2() {

    const div = document.getElementById('printArea');
    const options = {
      background: 'white',
      scale: 3
    };


    html2canvas(div, options).then((canvas) => {

      var imgData = canvas.toDataURL();
      var imgWidth = 210; 
      var pageHeight = 295;  
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc =new jsPDF('p', 'mm','a4',true);// new jsPDF('p', 'mm');
      var position = 0; // give some top padding to first page

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight,'','FAST');
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position += heightLeft - imgHeight; // top padding for other pages
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight,'','FAST');
        heightLeft -= pageHeight;
      }

      return doc;
    }).then((doc) => {
      doc.save('postres.pdf');  
    });
  }
   generatePdf(){

    html2canvas(document.getElementById('printArea')).then(function(canvas) {
      var data = canvas.toDataURL();
    
      var height = canvas.height;
     
  
      var docDefinition = {
          content: [{
              image: data,
              width: 500,
              height: height,
              pageSize:'A4'
          }]
      };
      pdfMake.createPdf(docDefinition).download("cardDataInformation.pdf");
  });
   
  }


///////////////////////////////////////












  print(){

    html2canvas(document.getElementById('printArea')).then(function(canvas) {
      var data = canvas.toDataURL();
      
      var docDefinition = {
          content: [{
              image: data,
              width: 500,
              pageSize:'A4'
          }]
      };
      pdfMake.createPdf(docDefinition).print();
  });
   
  }

  ngOnInit() {
    
    this.userName= localStorage.getItem('userFullName');
    this.userId= localStorage.getItem('UserID');


    this.activatedRoute.queryParams.subscribe(params => {
     this.id = params['CardApplicationId'];
     this.historyId = params['HistoryId'];
  });

  this.service.getWithStage(this.id,this.historyId).subscribe(
    (res: any) => {
      this.cardDataObject=res.data;
      console.log(res.data);
this.getHistory();
      this.getInvestmentDetails();
      this.getContactPointVerification();
    },
    err => {
      console.log(err);
 
    }
  );

let now = new Date();
this.currentDate= formatDate(now, 'dd/MM/yyyy', 'en-US', '+0530');

  }

  goBack(){
    this._location.back();
  }

  givededuplicationStatus(){

    const modalRef = this.modalService.open(ModalDeduplicationstatusComponent);
    modalRef.componentInstance.my_modal_title = 'Decision:';
    modalRef.componentInstance.historyId = this.historyId;
  }

  getInvestmentDetails(){

    // Get Branch list
    this.service.getInvestmentDetails(this.id).subscribe(
      (res: any) => {
        this.InvestmentDetails = res.data;

      },
      err => {
        console.log(err);
      }
    );
}

getHistory(){

  // Get Branch list
  this.service.getAllWithStatusForSingleApp(this.id).subscribe(
    (res: any) => {
      this.histories = res.data;
      console.log(res.data);
    },
    err => {
      console.log(err);
    }
  );
}
getContactPointVerification(){

    // Get Branch list
    this.service.getContactPointVerification(this.id).subscribe(
      (res: any) => {
      
        this.ContactPoints = res.data;

      },
      err => {
        console.log(err);
      }
    );
}
 

}
