import { Component, OnInit } from '@angular/core';
import { CardapplicationService } from '../shared/cardapplication.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-stage-retail-head',
  templateUrl: './stage-retail-head.component.html',
  styleUrls: ['./stage-retail-head.component.css']
})
export class StageRetailHeadComponent implements OnInit {

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
    private toastr: ToastrService
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

 

  
  onSearch() {
    this.service.search("58166bdf-2250-4795-9a77-13e906bcd566").subscribe(
      (res: any) => {
        this.NewApplications=res.data;
       
      },
      err => {
        console.log(err);
   
      }
    );
  }
getData(){
  this.service.getApplicationsWithStatusId("58166bdf-2250-4795-9a77-13e906bcd566").subscribe(
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

  changeStage(id: string) {
    if(confirm("Are you sure to sent this file to dmd?")) {
      this.service.changeStage(id,7).subscribe(
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

  backStage(id: string) {
    if(confirm("Are you sure to sent this file for Credit Analysis?")) {
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
