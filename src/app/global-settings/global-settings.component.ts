import { Component, OnInit, Input } from '@angular/core';

import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-global-settings',
  templateUrl: './global-settings.component.html',
  styles: []
})
export class GlobalSettingsComponent implements OnInit {

  @Input() my_modal_title;
  EmployeeInfo;

  errorText;
  @Input() id;
  RoleList =[];
  CompanyInfo = {};
  isDetailsShow=false;
  constructor(
    
     public service: CommonService,
     private toastr: ToastrService,
     private spinner: NgxSpinnerService) {}
 
  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 1 seconds */
      this.spinner.hide();
    }, 600);
   
  }
  getData(companyCode){
    
    this.service.getGetCompanyInfo(companyCode).subscribe(
      (res:any) =>{
        this.isDetailsShow=true;
        this.service.companySetupModel.controls['Id'].setValue(res.data.id);
        this.service.companySetupModel.controls['CompanyShortCode'].setValue(res.data.companyShortCode);
        this.service.companySetupModel.controls['CTRLBRID'].setValue(res.data.ctrlbrid);
        this.service.companySetupModel.controls['CTRLBRACCNO_Domestic'].setValue(res.data.ctrlbraccnO_Domestic);
        this.service.companySetupModel.controls['CTRLBRACCNO_Domestic_Gov'].setValue(res.data.ctrlbraccnO_Domestic_Gov);
        this.service.companySetupModel.controls['CTRLBRACCNO_Domestic_NonGov'].setValue(res.data.ctrlbraccnO_Domestic_NonGov);
        this.service.companySetupModel.controls['CTRLBRACCNO_CentralCollectionAccount'].setValue(res.data.ctrlbraccnO_CentralCollectionAccount);
        this.service.companySetupModel.controls['CTRLBRACCNO_Industrial'].setValue(res.data.ctrlbraccnO_Industrial);
        this.service.companySetupModel.controls['CTRLBRACCNO_Commercial'].setValue(res.data.ctrlbraccnO_Commercial);
        
        this.service.companySetupModel.controls['CTRLBRACCNO_PostPaid'].setValue(res.data.ctrlbraccnO_PostPaid);
        this.service.companySetupModel.controls['CTRLBRACCNO_PostPaid_VAT'].setValue(res.data.ctrlbraccnO_PostPaid_VAT);
        this.service.companySetupModel.controls['CTRLBRACCNO_PrePaid_VAT'].setValue(res.data.ctrlbraccnO_PrePaid_VAT);
        this.service.companySetupModel.controls['CTRLBRACCNO_PrePaid'].setValue(res.data.ctrlbraccnO_PrePaid);


        this.service.companySetupModel.controls['ParkingSundryAccNo'].setValue(res.data.parkingSundryAccNo);
        this.service.companySetupModel.controls['ParkingACCNO'].setValue(res.data.parkingACCNO);
        this.service.companySetupModel.controls['StampChgBrId'].setValue(res.data.stampChgBrId);
        this.service.companySetupModel.controls['StampChgACCNO'].setValue(res.data.stampChgACCNO);
        this.service.companySetupModel.controls['StampChgAmount'].setValue(res.data.stampChgAmount);
        this.service.companySetupModel.controls['StampChgAmount_SlabAmount'].setValue(res.data.stampChgAmount_SlabAmount);
        console.log(res.data);
      },
      err =>{
        console.log(err);
      }
    );
  }
  onSubmit() {
    this.service.updateCompanyInfo().subscribe(
      (res: any) => {
        
        if (res.isSuccessfull) {
          this.toastr.success('Data saved!', 'Successfully updated!');
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
