import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CibDataAutoService } from '../shared/cib-data-auto.service';
import { DocumentTypeService } from '../shared/document-type.service';

@Component({
  selector: 'app-cib-data-automation',
  templateUrl: './cib-data-automation.component.html',
  styleUrls: ['./cib-data-automation.component.css']
})
export class CibDataAutomationComponent implements OnInit {
  lists;
  isLoading=false;
  constructor(
    public service : CibDataAutoService,
    public toastr: ToastrService

  ) { }

  ngOnInit() {
    this.getData();
  }
  onSubmit(){
    this.isLoading = true;
    this.service.process().subscribe(
      (res: any) => {
        console.log(res.data);
        this.lists=res.data;
        
      
        if (res.isSuccessfull) {
          this.toastr.success('Complete!', 'Process successfully completed.');

          this.isLoading = false;
          this.service.formModel.reset();
          this.getData();
        } else {
          this.toastr.error('Ops! Something went worng!', res.message);
        }
      },
      err => {
        console.log(err);
   
      }
    );
  }
  getData(){
    
  }
  

}
