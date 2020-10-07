import { Component, OnInit } from '@angular/core';
import { CardapplicationService } from '../shared/cardapplication.service';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { CardReceiveModalComponent } from '../card-receive-modal/card-receive-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeliveredToModalComponent } from '../delivered-to-modal/delivered-to-modal.component';
@Component({
  selector: 'app-stage-board-secretary',
  templateUrl: './stage-board-secretary.component.html',
  styles: []
})
export class StageBoardSecretaryComponent implements OnInit {

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
     private modalService: NgbModal,
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

  getXML(id){
    this.service.getXML(id).subscribe(
      (res: any) => {
        
        this.HandleBase64(res.data,"application/xml","test");
      },
      err => {
        console.log(err);
      }
    );
  }
  HandleBase64  (data , contentType,fileName ){ 
    let byteCharacters = atob(data);    
    let byteNumbers = new Array(byteCharacters.length);    
    for (var i = 0; i < byteCharacters.length; i++) 
        byteNumbers[i] = byteCharacters.charCodeAt(i);

    let byteArray = new Uint8Array(byteNumbers);    
    let blob = new Blob([byteArray], {type: contentType});
    if(contentType === "audio/wav"){
        var blobURL=URL.createObjectURL(blob);
        window.open(blobURL);       
    }
    else{
        var blobURL = window.URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.download = fileName;
        anchor.href = blobURL;
        anchor.click();
    }
}
  onSearch() {
    this.service.search("e6e3feb3-f676-4b05-bb53-ea3667110590").subscribe(
      (res: any) => {
        this.NewApplications=res.data;
       
      },
      err => {
        console.log(err);
   
      }
    );
  }
getData(){
  this.service.getApplicationsWithStatusId("e6e3feb3-f676-4b05-bb53-ea3667110590").subscribe(
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
    if(confirm("Are you sure to sent this file to retails?")) {
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

  giveOtherStatus(id: string, statusName: string, sourceChannel: string, sourceBy: string ) {
if(statusName=='CardDelv' || statusName=='PinDelv'){

  this.service.deliverdModel.controls['SourceChannel'].setValue("");
  this.service.deliverdModel.controls['SourcedBy'].setValue("");
  if(statusName=='CardDelv'){
    const modalRef = this.modalService.open(DeliveredToModalComponent);
    modalRef.componentInstance.my_modal_title = 'Card Delivery:';
    modalRef.componentInstance.cardDataId = id;
    modalRef.componentInstance.statusName = statusName;
    modalRef.componentInstance.sourceChannel = sourceChannel;
    modalRef.componentInstance.sourceBy = sourceBy;

    modalRef.result.then((result) => {
      if ( result === 'Close click' ) {
        this.getData(); // Refresh Data in table grid
      }
    }, (reason) => {
    });
  }
  if( statusName=='PinDelv'){
    const modalRef = this.modalService.open(DeliveredToModalComponent);
    modalRef.componentInstance.my_modal_title = 'Pin Delivery:';
    modalRef.componentInstance.cardDataId = id;
    modalRef.componentInstance.statusName = statusName;
    modalRef.componentInstance.sourceChannel = sourceChannel;
    modalRef.componentInstance.sourceBy = sourceBy;

    modalRef.result.then((result) => {
      if ( result === 'Close click' ) {
        this.getData(); // Refresh Data in table grid
      }
    }, (reason) => {
    });
  }
}
    

else{
  if(confirm("Are you sure to take this ("+statusName+") step?")) {
    this.service.giveOtherStatus(id,statusName,sourceChannel,sourceBy).subscribe(
      (res: any) => {
        console.log(res);

        if (res.isSuccessfull) {
          this.getData();
          this.toastr.warning('Status saved!', 'Record successfully saved.');
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

    
  }

  // receiveDocument(id: string) {
  //   if(confirm("Are you sure to receive this file?")) {
  //     this.service.receiveDocument(id).subscribe(
  //       (res: any) => {
  //         console.log(res);

  //         if (res.isSuccessfull) {
  //           this.getData();
  //           this.toastr.warning('Data Received!', 'Successfully Received the file.');
  //         } else {
  //           this.toastr.error('Ops! Something went worng!', res.message);
  //         }
  //       },
  //       err => {
  //         console.log(err);
     
  //       }
  //     );
  //   }
  // }

  receiveDocument(id: string){

    const modalRef = this.modalService.open(CardReceiveModalComponent);
    modalRef.componentInstance.my_modal_title = 'Receive Document:';
    modalRef.componentInstance.historyId = id;

    modalRef.result.then((result) => {
      if ( result === 'Close click' ) {
        this.getData(); // Refresh Data in table grid
      }
    }, (reason) => {
    });
  }

  sourceChannelOnChange(){

    if(this.service.formModel.controls['SourceChannel'].value=="Branch"){
      this.SourceByList = this.BranchList; 
    }else{
      this.SourceByList = this.SalesAgentList;
    }
  }

}
