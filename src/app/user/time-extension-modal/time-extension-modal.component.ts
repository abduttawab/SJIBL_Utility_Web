import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'time-extension-modal',
  templateUrl: './time-extension-modal.component.html',
  styles: []
})
export class TimeExtensionComponent implements OnInit {

  @Input() my_modal_title;

  @Input() userId;
  @Input() username;
 
  constructor(
    public activeModal: NgbActiveModal,
     public service: UserService,
     private toastr: ToastrService) {}
 
  ngOnInit() {
    this.service.formTimeExtensionModel.controls['Id'].setValue(this.userId);
  }

  onSubmit() {
    this.service.SetTimeExtensionHour().subscribe(
      (res: any) => {
   

        if (res.isSuccessfull) {

          this.toastr.success('Time extension complete for this user!', res.message);
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
