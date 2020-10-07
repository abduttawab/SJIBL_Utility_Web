import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GivenStatusService } from '../shared/given-status.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-receive-modal',
  templateUrl: './card-receive-modal.component.html',
  styles: []
})
export class CardReceiveModalComponent implements OnInit {

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
    this.service.saveCardDivFileNo().subscribe(
      (res: any) => {
   

        if (res.isSuccessfull) {

          this.toastr.warning('Data recieved!', res.message);
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
        this.service.cardRecModel.controls['HistoryId'].setValue(res.data.historyId);
    
      }
        )};


}
