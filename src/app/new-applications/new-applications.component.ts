import { Component, OnInit } from '@angular/core';
import { CardapplicationService } from '../shared/cardapplication.service';
import * as $ from 'jquery';
import 'datatables.net';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppHistoryModelComponent } from '../app-history-model/app-history-model.component';


@Component({
  selector: 'app-new-applications',
  templateUrl: './new-applications.component.html',
  styles: []

  
})
export class NewApplicationsComponent implements OnInit {
  NewApplications: any[];
  ApprovedApplications: any[];
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
 this.getData();
 //this.getApprovedData();
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
    this.service.search("7a29c9dd-dad4-4ee0-ba2d-f5f75758fec4").subscribe(
      (res: any) => {
        this.NewApplications=res.data;
       
      },
      err => {
        console.log(err);
   
      }
    );
  }
getData(){
  this.service.getApplicationsWithStatusId("7a29c9dd-dad4-4ee0-ba2d-f5f75758fec4").subscribe(
    (res:any) =>{
      console.log(res);
      this.NewApplications=res.data;
    },
    err =>{
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
     // this.ApprovedApplications=res.data;
    },
    err =>{
      console.log(err);
    }
  );
}
  delete(id: string) {
    if(confirm("Are you sure to delete this information?")) {
      this.service.delete(id).subscribe(
        (res: any) => {
          console.log(res);

          if (res.isSuccessfull) {
            this.getData();
            this.toastr.warning('Data deleted!', 'Record successfully deleted.');
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

  changeStage(id: string) {
    if(confirm("Are you sure to sent this file to IRMD?")) {
      this.service.changeStage(id,2).subscribe(
        (res: any) => {
          console.log(res);

          if (res.isSuccessfull) {
            this.getData();
            this.toastr.warning('Data Send!', 'Record successfully Send.');
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



  sourceChannelOnChange(){

    if(this.service.formModel.controls['SourceChannel'].value=="Branch"){
      this.SourceByList = this.BranchList; 
    }else{
      this.SourceByList = this.SalesAgentList;
    }
  }
}
