import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GivenStatusService } from '../shared/given-status.service';
import { ToastrService } from 'ngx-toastr';
import { CardapplicationService } from '../shared/cardapplication.service';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-delivered-to-modal',
  templateUrl: './delivered-to-modal.component.html',
  styles: []
})
export class DeliveredToModalComponent implements OnInit {

  @Input() my_modal_title;

  @Input() cardDataId;
  @Input() statusName;
  @Input() sourceChannel;
  @Input() sourceBy;

 
  constructor(private commonService: CommonService,
    public activeModal: NgbActiveModal,
     public service: CardapplicationService,
     private toastr: ToastrService) {}
     BranchList = [];
     SourceByList = [];
     SalesAgentList = [];
     EmployeeInfo;
     errorText;
  ngOnInit() {
    
    //this.service.deliverdModel.controls['SourcedBy'].value("");
      // Get Branch list
      this.commonService.getbranchList().subscribe(
        (res: any) => {
          this.BranchList = res.data;

        },
        err => {
          console.log(err);
        }
      );
  }
  getEmployeeId() {

    // Get Employee Info
    this.commonService.getEmpInfo(this.service.deliverdModel.controls['SourcedBy'].value).subscribe(
      (res: any) => {
        
        if (res.isSuccessfull) {
          this.EmployeeInfo = res.data;
          this.errorText = null;
        } else {
          this.EmployeeInfo = null;
          this.service.deliverdModel.controls['SourcedBy'].setValue("")
          this.errorText = "Invalid Employee Id !!!"
        }


      },
      err => {
        this.EmployeeInfo = null;
        this.service.deliverdModel.controls['SourcedBy'].setValue("")
        this.errorText = "Invalid Employee Id !!!"
        console.log(err);
      }
    );
  }
  sourceChannelOnChange() {
    
    if (this.service.deliverdModel.controls['SourceChannel'].value == "Branch") {
      this.SourceByList = this.BranchList;
    } else {
      this.SourceByList = this.SalesAgentList;
    }
  }
  onSubmit() {

    this.service.giveOtherStatus(this.cardDataId,this.statusName,
      this.service.deliverdModel.value.SourceChannel,this.service.deliverdModel.value.SourcedBy).subscribe(
      (res: any) => {
        console.log(res);

        if (res.isSuccessfull) {
       
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
