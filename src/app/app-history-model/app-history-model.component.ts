import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CardapplicationService } from '../shared/cardapplication.service';
import { GivenStatusService } from '../shared/given-status.service';

@Component({
  selector: 'app-app-history-model',
  templateUrl: './app-history-model.component.html',
  styleUrls: ['./app-history-model.component.css']
})
export class AppHistoryModelComponent implements OnInit {

  @Input() my_modal_title;

  @Input() appId;
  histories= [];
  constructor(
    public activeModal: NgbActiveModal,
     public service: CardapplicationService,
     private toastr: ToastrService) {}
 
  ngOnInit() {
    this.getHistory();
  }

  onSubmit() {
    
  }
  getHistory(){

    // Get Branch list
    this.service.getAllWithStatusForSingleApp(this.appId).subscribe(
      (res: any) => {
        this.histories = res.data;
        console.log(res.data);
      },
      err => {
        console.log(err);
      }
    );
  };


}
