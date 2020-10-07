import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GivenStatusService } from '../shared/given-status.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-deduplicationstatus',
  templateUrl: './modal-deduplicationstatus.component.html',
  styles: []
})
export class ModalDeduplicationstatusComponent implements OnInit {
  @Input() my_modal_title;

  @Input() historyId;
 
  constructor(
    public activeModal: NgbActiveModal,
     public service: GivenStatusService,
     private toastr: ToastrService) {}
 
  ngOnInit() {
    this.getcurrentValues(this.historyId);
  }

  onSubmit() {
    this.service.saveDeduplicationStatus().subscribe(
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

  }
  getcurrentValues(id) {
    this.service.getStatus(id).subscribe(
      (res: any) => {
        this.service.formModel.controls['HistoryId'].setValue(res.data.historyId);
        res.data.status = res.data.status==null?'':res.data.status;
        this.service.formModel.controls['Status'].setValue(res.data.status);
        this.service.formModel.controls['Remarks'].setValue(res.data.remarks);
        this.service.formModel.controls['StageSerial'].setValue(res.data.stageSerial);
      }
        )};

}
