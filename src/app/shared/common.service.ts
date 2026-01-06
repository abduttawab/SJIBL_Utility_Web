import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { APP_CONFIG, AppConfig } from '../app-config.module';
import { Inject } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import * as moment from 'moment';

declare function calljsapi(clientIpUrl): any;

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  readonly BaseURI =this.config.apiEndpoint;
  readonly clientIpUrl = this.config.getClientIPEndpoint;
  

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
    ) {
     }

     companySetupModel = this.fb.group({

      Id: ['', [Validators.required]],
      CompanyShortCode: ['', [Validators.required]],
      CTRLBRID: ['', [Validators.required]],
      CTRLBRACCNO_Domestic: [''],
      CTRLBRACCNO_Domestic_Gov: [''],
      CTRLBRACCNO_Domestic_NonGov: [''],
      CTRLBRACCNO_CentralCollectionAccount: [''],

      CTRLBRACCNO_PostPaid: [''],
      CTRLBRACCNO_PostPaid_VAT: [''],
      CTRLBRACCNO_PrePaid: [''],
      CTRLBRACCNO_PrePaid_VAT: [''],


      CTRLBRACCNO_Commercial: [''],
      CTRLBRACCNO_Industrial: [''],
      ParkingSundryAccNo: ['', [Validators.required]],
      ParkingACCNO: ['', [Validators.required]],
      StampChgBrId: ['', [Validators.required]],
      StampChgACCNO: ['', [Validators.required]],
      StampChgAmount_SlabAmount: ['', [Validators.required]],
      StampChgAmount: ['', [Validators.required]]
    });

   public getdistrict() {
    return this.http.get("./assets/data/bangladesh-upazila-district-division.json");
}
public getbranchList() {
  return this.http.get(this.BaseURI+"Common/GetBranchList");
}
public getEmpInfo(empId) {
  return this.http.get(this.BaseURI+"Common/GetEmployeeInfoById?empId="+empId);
}
public getEmpInfoFromHrm(empId) {
  return this.http.get(this.BaseURI+"Common/GetEmployeeInfoByIdFromHrm?empId="+empId);
}

public getAccountInfo(branch,accNo) {
  return this.http.get(this.BaseURI+"Common/GetAccountInfo?branch="+branch+"&accNo="+accNo);
}
//getCompanyCode
public getUtilityType() {
  return this.http.get(this.BaseURI+"Common/GetUtilityType");
}
public getCompanyCode() {
  return this.http.get(this.BaseURI+"Common/GetCompanyCode");
}
public getClientIP() {
var rrr = calljsapi(this.clientIpUrl);


  return rrr;
  //return this.http.get<any>(this.clientIpUrl);

}


//
public getPaymentType(utilityTypeId) {
  return this.http.get(this.BaseURI+"Common/GetPaymentType?utilityTypeId="+utilityTypeId);
}

getGetCompanyInfo(companyCode) {
  return this.http.get(this.BaseURI + 'Common/GetCompanySetup?companyCode='+companyCode);
}

getCompanySetups() {
  return this.http.get(this.BaseURI + 'Common/GetCompanySetups');
}
updateCompanyInfo() {

  var body = {
    Id: this.companySetupModel.value.Id,
    CompanyShortCode: this.companySetupModel.value.CompanyShortCode,
    CTRLBRID: this.companySetupModel.value.CTRLBRID,
    CTRLBRACCNO_Domestic: this.companySetupModel.value.CTRLBRACCNO_Domestic,
    CTRLBRACCNO_Domestic_Gov: this.companySetupModel.value.CTRLBRACCNO_Domestic_Gov,
    CTRLBRACCNO_Domestic_NonGov: this.companySetupModel.value.CTRLBRACCNO_Domestic_NonGov,
    CTRLBRACCNO_CentralCollectionAccount: this.companySetupModel.value.CTRLBRACCNO_CentralCollectionAccount,
    CTRLBRACCNO_Industrial: this.companySetupModel.value.CTRLBRACCNO_Industrial,
    CTRLBRACCNO_Commercial: this.companySetupModel.value.CTRLBRACCNO_Commercial,

    CTRLBRACCNO_PostPaid: this.companySetupModel.value.CTRLBRACCNO_PostPaid,
    CTRLBRACCNO_PostPaid_VAT: this.companySetupModel.value.CTRLBRACCNO_PostPaid_VAT,
    CTRLBRACCNO_PrePaid: this.companySetupModel.value.CTRLBRACCNO_PrePaid,
    CTRLBRACCNO_PrePaid_VAT: this.companySetupModel.value.CTRLBRACCNO_PrePaid_VAT,


    ParkingSundryAccNo: this.companySetupModel.value.ParkingSundryAccNo,
    ParkingACCNO: this.companySetupModel.value.ParkingACCNO,
    StampChgBrId: this.companySetupModel.value.StampChgBrId,
    StampChgACCNO: this.companySetupModel.value.StampChgACCNO,
    StampChgAmount: this.companySetupModel.value.StampChgAmount,
    StampChgAmount_SlabAmount: 
    Number(this.companySetupModel.value.StampChgAmount_SlabAmount),
  };
debugger;
  return this.http.post(this.BaseURI + 'Common/UpdateCompanySetup', body);
}

static dateVaidator(AC: AbstractControl) {

  if (AC && AC.value && !moment((AC.value.day+"/"+AC.value.month+"/"+AC.value.year), 'D/M/YYYY',true).isValid()) {
    return {'dateVaidator': true};
  }
  return null;
}


}
