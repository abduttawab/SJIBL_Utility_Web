import { Component, OnInit } from '@angular/core';
import { CardapplicationService } from '../shared/cardapplication.service';
import * as $ from 'jquery';
import 'datatables.net';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppHistoryModelComponent } from '../app-history-model/app-history-model.component';


@Component({
  selector: 'app-approved-applications',
  templateUrl: './approved-applications.component.html',
  styles: []

  
})
export class ApprovedApplicationsComponent implements OnInit {
  NewApplications: any[];
  ApprovedApplications: any[];
  ApprovedApplicationsBoard: any[];
  Districts= [];
  BranchList= [];
  SourceByList= [];
  SalesAgentList= [];
    // Our future instance of DataTable
    dataTable: any;
  constructor(
    public service : CardapplicationService,
     private commonService : CommonService,
    private toastr: ToastrService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {

 this.getApprovedData();
         // Get Branch list
         this.commonService.getbranchList().subscribe(
          (res:any) =>{
            this.BranchList = [];
            for ( var key in res ){
              this.BranchList.push(res[key]);
            }
       
          },
          err =>{
            console.log(err);
          }
        );
   
  }

  initDatatable(){
  }
  onSearch() {
    this.service.search("dddf3cfd-903b-40d2-9747-95499eda1f6b").subscribe(
      (res: any) => {
        this.NewApplications=res.data;
       
      },
      err => {
        console.log(err);
   
      }
    );
  }

getHistory(id){

  const modalRef = this.modalService.open(AppHistoryModelComponent, { windowClass : "myCustomModalClass" });
  modalRef.componentInstance.my_modal_title = 'History';
  modalRef.componentInstance.appId = id;
}
getApprovedData(){
  this.service.getApplicationsWithStatusId("dddf3cfd-903b-40d2-9747-95499eda1f6b").subscribe(
    (res:any) =>{
      console.log(res);
      this.ApprovedApplications=res.data;
    },
    err =>{
      console.log(err);
    }
  );

  this.service.getApplicationsWithStatusId("58166bdf-2250-4795-9a77-13e906bcd566").subscribe(
    (res:any) =>{
      console.log(res);
      this.ApprovedApplicationsBoard=res.data;
    },
    err =>{
      console.log(err);
    }
  );
}

  sourceChannelOnChange(){

    if(this.service.formModel.controls['SourceChannel'].value=="Branch"){
      this.SourceByList = this.BranchList; 
    }else{
      this.SourceByList = this.SalesAgentList;
    }
  }
}
