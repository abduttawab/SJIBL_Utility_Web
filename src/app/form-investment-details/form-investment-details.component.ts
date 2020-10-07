import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CardapplicationService } from '../shared/cardapplication.service';
@Component({
  selector: 'app-form-investment-details',
  templateUrl: './form-investment-details.component.html',
  styles: []
})
export class FormInvestmentDetailsComponent implements OnInit {
  @Input() my_modal_title;

  @Input() id;
 
  constructor(
    public activeModal: NgbActiveModal,
     public service: CardapplicationService,
     private toastr: ToastrService) {}
 
  ngOnInit() {
    
    this.getcurrentValues(this.id);
  }

  onSubmit() {
    this.service.saveInvestmentDetails(this.id).subscribe(
      (res: any) => {
   

        if (res.isSuccessfull) {

          this.toastr.warning('Data saved!', res.message);
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
    this.service.formModelInvestmentDetails.controls['CardApplicationDataId'].setValue(id);
   };

}
