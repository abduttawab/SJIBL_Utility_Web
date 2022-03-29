import { Component, OnInit, Input } from '@angular/core';

import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaymentService } from '../shared/payment.service';
import { BgdclPaymentService } from '../shared/bgdclPayment.service';


@Component({
  selector: 'app-reconciliation',
  templateUrl: './reconciliation.component.html',
  styles: []
})
export class ReconciliationComponent implements OnInit {

  @Input() my_modal_title;
  ReconciliationLogs;

  errorText;
  @Input() id;
  RoleList =[];
  CompanyInfo = {};
  isDetailsShow=false;
  constructor(
    
     public service: PaymentService,
     public bgservice: BgdclPaymentService,
     private toastr: ToastrService,
     private spinner: NgxSpinnerService) {}
 
  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 1 seconds */
      this.spinner.hide();
    }, 600);

    this.getData();
   
  }
  onProcess() {

  var date ;
    if(this.service.searchFormModel.value.ToDate){

      date =('0'+this.service.searchFormModel.value.ToDate.day).slice(-2)+'-'
      +('0' + this.service.searchFormModel.value.ToDate.month).slice(-2)+'-'
      +this.service.searchFormModel.value.ToDate.year;

      this.spinner.show();

       this.service.kgdclReconciliation(date).subscribe(
        (res: any) => {
          if(res.statusCode==200){

            this.toastr.success('KGDCL ok!', 'Successfully done KGDCL!');

            this.bgservice.bgdclReconciliation(date).subscribe(
              (res: any) => {
  
                if(res.statusCode==200){
                  this.getData();
                  this.toastr.success('BGDCL ok!', 'Successfully done BGDCL!');
                  this.spinner.hide();
                }else{
                  this.toastr.warning('BGDCL error!', res.message);
                  this.spinner.hide();
  
                }
              },
              err => {
                console.log(err);
                this.spinner.hide();
           
              }
            );

          }else{
            this.toastr.warning('KGDCL error!', res.message);
            this.spinner.hide();

          }
     
         
        },
        err => {
          console.log(err);
          this.spinner.hide();
     
        }
      );
  
  
      







      }



    
  }
  getData(){
    
    this.service.getReconciliationLogs().subscribe(
      (res:any) =>{
        this.ReconciliationLogs=res.data;
      console.log(res.data);
      },
      err =>{
        console.log(err);
      }
    );
  }
  onSubmit() {
    // this.service.updateCompanyInfo().subscribe(
    //   (res: any) => {
        
    //     if (res.isSuccessfull) {
    //       this.toastr.success('Data saved!', 'Successfully updated!');
    //     } else {
    //       this.toastr.error('Ops! Something went worng!', res.message);
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }



}
