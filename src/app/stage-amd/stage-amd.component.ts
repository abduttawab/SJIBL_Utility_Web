import { Component, OnInit } from '@angular/core';
import { CardapplicationService } from '../shared/cardapplication.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../shared/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppHistoryModelComponent } from '../app-history-model/app-history-model.component';

@Component({
  selector: 'app-stage-amd',
  templateUrl: './stage-amd.component.html',
  styleUrls: ['./stage-amd.component.css']
})
export class StageAmdComponent implements OnInit {

  NewApplications: any[];
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

  getHistory(id){

    const modalRef = this.modalService.open(AppHistoryModelComponent, { windowClass : "myCustomModalClass" });
    modalRef.componentInstance.my_modal_title = 'History';
    modalRef.componentInstance.appId = id;
  }

  
  onSearch() {
    this.service.search("1529116E-419F-4C2A-B11B-6C3E4A82E097").subscribe(
      (res: any) => {
        this.NewApplications=res.data;
       
      },
      err => {
        console.log(err);
   
      }
    );
  }
getData(){
  this.service.getApplicationsWithStatusId("1529116E-419F-4C2A-B11B-6C3E4A82E097").subscribe(
    (res:any) =>{
      console.log(res);
      this.NewApplications=res.data;
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

  changeStage(id: string,limit) {
    this.changeStageDinamic(id,"MD Sir",7);

    // if(limit>1500000){
    //   this.changeStageDinamic(id,"MD Sir",9);
    // }else{
    //   this.changeStageDinamic(id,"Card Division",10);
    // }
  }
  backStage(id: string) {
    if(confirm("Are you sure to sent this file to DMD Sir?")) {
      this.service.changeStage(id,5).subscribe(
        (res: any) => {
          
          console.log(res);

          if (res.isSuccessfull) {
            this.getData();
            this.toastr.success('Data Send!', 'Record successfully Send.');
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
  changeStageDinamic(id: string,toStage: string, toStageSerial){
    if(confirm("Are you sure to sent this file to "+toStage +"?")) {
      this.service.changeStage(id,toStageSerial).subscribe(
        (res: any) => {
          
          console.log(res);

          if (res.isSuccessfull) {
            this.getData();
            this.toastr.success('Data Send!', 'Record successfully Send.');
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

  receiveDocument(id: string) {
    if(confirm("Are you sure to receive this file?")) {
      this.service.receiveDocument(id).subscribe(
        (res: any) => {
          console.log(res);

          if (res.isSuccessfull) {
            this.getData();
            this.toastr.warning('Data Received!', 'Successfully Received the file.');
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
