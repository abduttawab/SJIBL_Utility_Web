import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import 'datatables.net';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../shared/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'unAuthTransactions',
  templateUrl: './unAuthTransactions.component.html',
  styles: []

  
})
export class UnAuthTransactionsComponent implements OnInit {
  Transactions: any[];
  ApprovedApplications: any[];
  Districts= [];
  BranchList= [];
  SourceByList= [];
  SalesAgentList= [];
  UtilityTypes: any[];
  PaymentTypes: any[];
  userRoles;
    // Our future instance of DataTable
    dataTable: any;
  constructor(
    public service : PaymentService,
    public userService : UserService,
     private commonService : CommonService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router,
    private spinner: NgxSpinnerService
    ) { }

  async ngOnInit() {
    this.spinner.show();
    
      this.getData();
      this.BranchList = await this.getBranchList();
 
        this.service.searchFormModel.reset();
  
        this.service.searchFormModel.controls['UtilityTypeId'].setValue("");
        this.service.searchFormModel.controls['PaymentTypeId'].setValue("");
        this.getUtilityType();
        this.userRoles= localStorage.getItem('UserRoles');

        setTimeout(() => {
          /** spinner ends after 1 seconds */
          this.spinner.hide();
        }, 600);
  }
  async  getBranchList() : Promise<any>{

    return new Promise((resolve, reject) => {
      this.commonService.getbranchList().subscribe(
        (res: any) => {
          resolve(res.data);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    })
   
  }
  getUtilityType(){
    this.commonService.getUtilityType().subscribe(
      (res:any) =>{
        
        this.UtilityTypes=res.data;
        
        console.log(res.data);
      },
      err =>{
        console.log(err);
      }
    );
  }

  getPaymentType(){
    this.commonService.getPaymentType(this.service.searchFormModel.value.UtilityTypeId).subscribe(
      (res:any) =>{
        
        this.PaymentTypes=res.data;
      },
      err =>{
        console.log(err);
      }
    );
  }
  initDatatable(){
  }
  ConvertToInt(val){
    return Number(val);
  }
  onSearch() {
    this.spinner.show();
    this.service.searchTransactions().subscribe(
      (res: any) => {
        setTimeout(() => {
          /** spinner ends after 1 seconds */
          this.spinner.hide();
        }, 600);
        
        this.Transactions=res.data;
        console.log(res.data);
      },
      err => {
        setTimeout(() => {
          /** spinner ends after 1 seconds */
          this.spinner.hide();
        }, 600);
        console.log(err);
   
      }
    );
  }
getData(){
  this.service.getUnAuthTransactions().subscribe(
    (res:any) =>{
    
      this.Transactions=res.data;
      console.log(res.data);
    },
    err =>{
      console.log(err);
    }
  );
}

authorize(id){
 
    this.router.navigate(['/home/finalPayment'], { queryParams: { TransactionId: id } });
 
  
}

}
