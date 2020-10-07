import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DocumentTypeService } from '../shared/document-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeduplicationstatusComponent } from '../modal-deduplicationstatus/modal-deduplicationstatus.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-card-app-doc',
  templateUrl: './card-app-doc.component.html',
  styleUrls: ['./card-app-doc.component.css']
})
export class CardAppDocComponent implements OnInit {
  @ViewChild('pdfLoaderArea') pdfLoaderArea: ElementRef;
  DocTypes:any[];
  historyId;
  userRole;
  modalOptions:NgbModalOptions;
  docUrl:"http://africau.edu/images/default/sample.pdf";
  public baseUrl: string = ``;
  public pictureUrl: string = `https://angular.io/assets/images/logos/angular/angular.svg`;
  constructor(
    private service : DocumentTypeService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private _location: Location
  ) { 
    this.userRole = localStorage.getItem('role');
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  CardApplicationId:string;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.CardApplicationId = params['Id'];
      this.historyId = params['HistoryId'];
      if(params['Id']==null){
        this.router.navigate(["/home/newapplications"]);
      }
    });
    this.getData();
    this.baseUrl = this.service.getBaseUrl();
  }
 
  public response: {dbPath: ''};
  givededuplicationStatus(){

    const modalRef = this.modalService.open(ModalDeduplicationstatusComponent);
    modalRef.componentInstance.my_modal_title = 'Decision:';
    modalRef.componentInstance.historyId = this.historyId;
  }

  public uploadFinished = (event,obj) => {

    this.response = event;

    var body = {
      Details : "",
      CardAppDocId : obj.cardAppDocId,
      DocumentTypeId : obj.documentTypeId,
      ApplicationStageId : obj.applicationStageId,
      CardApplicationDataId :this.CardApplicationId,
      DocumentPath : event.dbPath
    };

    this.service.SaveCardAppDoc(body).subscribe(
      (res:any) =>{
        console.log(res);
        this.getData();
      
      },
      err =>{
        console.log(err);
      }
    );
  }

  download(link) {

    window.open(this.baseUrl+link.documentPath, '_blank');
 }
 goBack(){
  this._location.back();
}
  getData(){
    this.service.getAllCardAppDoc(this.CardApplicationId,this.historyId).subscribe(
      (res:any) =>{
 
  
      this.DocTypes=res.data;
      },
      err =>{
        this.goBack();
        console.log(err);
      }
    );
  }

}
