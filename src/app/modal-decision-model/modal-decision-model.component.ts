import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GivenStatusService } from '../shared/given-status.service';
import { ToastrService } from 'ngx-toastr';
import { CardapplicationService } from '../shared/cardapplication.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-modal-decision-model',
  templateUrl: './modal-decision-model.component.html',
  styles: []
})
export class ModalDeduplicationstatusComponent implements OnInit {
  @Input() my_modal_title;

  @Input() historyId;
 applicationId ="";
  constructor(
    public activeModal: NgbActiveModal,
     public service: GivenStatusService,
     public cardService: CardapplicationService,
     private _location: Location,
     private toastr: ToastrService) {}
 
  ngOnInit() {
    this.getcurrentValues(this.historyId);
  }

  onSubmit() {
    this.service.saveDecision().subscribe(
      (res: any) => {
   

        if (res.isSuccessfull) {

          this.toastr.warning('Data updated!', res.message);
        } else {
          this.toastr.error('Ops! Something went worng!', res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
// For approval
if(this.applicationId && this.service.formModel.value.Status=="Approved"){

this.cardService.changeStage(this.applicationId,8).subscribe(
  (res: any) => {
    console.log(res);

    if (res.isSuccessfull) {
      this.toastr.success('Data Send To IAD!', 'Record successfully Send.');
      this.activeModal.dismiss('Cross click');
      this._location.back();
    } else {
      this.toastr.error('Ops! Something went worng!', res.message);
    }
  },
  err => {
    console.log(err);

  }
);
}
if(this.applicationId && this.service.formModel.value.Status=="Recommended for EC/Board"){

  this.cardService.changeStage(this.applicationId,9).subscribe(
    (res: any) => {
      console.log(res);
  
      if (res.isSuccessfull) {
        this.toastr.success('Data Send To EC/Board!', 'Record successfully Send.');
        this.activeModal.dismiss('Cross click');
        this._location.back();
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
  getcurrentValues(id) {
    this.service.getStatus(id).subscribe(
      (res: any) => {
        this.service.formModel.controls['HistoryId'].setValue(res.data.historyId);
        res.data.status = res.data.status==null?'':res.data.status;
        this.service.formModel.controls['Status'].setValue(res.data.status);
        this.service.formModel.controls['Remarks'].setValue(res.data.remarks);
        this.service.formModel.controls['StageSerial'].setValue(res.data.stageSerial);

        this.applicationId = res.data.applicationId;
      }
        )};

}
