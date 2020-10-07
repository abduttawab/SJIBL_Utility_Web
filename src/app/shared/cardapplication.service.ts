    import { Injectable } from '@angular/core';
    import { FormBuilder, Validators, FormGroup } from '@angular/forms';
    import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';
import { APP_CONFIG, AppConfig } from '../app-config.module';
import { Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
 // Use your own locale

    @Injectable({
      providedIn: 'root'
    })
    export class CardapplicationService {

      constructor(private fb: FormBuilder, private http: HttpClient,@Inject(APP_CONFIG) private config: AppConfig) { }

      readonly BaseURI =this.config.apiEndpoint +'CardApplicationData';

      formModel = this.fb.group({
        Id: [''],
        SourceChannel: ['', [Validators.required, Validators.maxLength(30)]],
        SourcedBy: ['', [Validators.required, Validators.maxLength(30)]],
        ReferenceName: ['', [Validators.required, Validators.maxLength(30)]],
        FileNo: [''],
        FromDate: ['', [CommonService.dateVaidator]],
        ToDate: ['', [CommonService.dateVaidator]],
      });
      formModelCreditData = this.fb.group({
        Id: ['', [Validators.required]],
        FileNo: ['', [Validators.required, Validators.maxLength(7)]],
        FullName: ['', [Validators.required, Validators.maxLength(30)]],
        IncomeDetails_BusinessIncome: [null, [Validators.required, Validators.maxLength(18)]],
        IncomeDetails_NetBusinessIncome: [null, [Validators.required, Validators.maxLength(18)]],
        IncomeDetails_OtherIncome: [null, [Validators.required, Validators.maxLength(18)]],
        IncomeDetails_NetIncome: [null, [Validators.required, Validators.maxLength(18)]],
        IncomeDetails_FamilyExpense: [null, [Validators.required, Validators.maxLength(18)]],
        IncomeDetails_SurplusIncome: [null, [Validators.required, Validators.maxLength(18)]],
        CIB_Dated: ['', [Validators.required,CommonService.dateVaidator, Validators.maxLength(10)]],
        CIB_Status: ['', [Validators.required,Validators.maxLength(10)]],
        DBR_ExistingEMI: [null, [ Validators.required,Validators.maxLength(18)]],
        DBR_ProposedEMI: [null, [Validators.required, Validators.maxLength(18)]],
        DBR_TotalEMI: [null, [Validators.required, Validators.maxLength(18)]],
        DBR_DBRatio: [null, [Validators.required, Validators.maxLength(18)]],
        EligibilityScore_MonthlyScore: [null, [Validators.required, Validators.maxLength(18)]],
        EligibilityScore_PointsObtained: [null, [ Validators.required,Validators.maxLength(18)]],
        EligibilityScore_Multiplier: [null, [Validators.required, Validators.maxLength(18)]],
        LimitInfo_AppliedAmount: [null, [ Validators.required,Validators.maxLength(18)]],
        LimitInfo_SalesBranchRequest: [null, [ Validators.required,Validators.maxLength(18)]],
        LimitInfo_MaxLimitAsPerMultiplier: [null, [Validators.required, Validators.maxLength(18)]],
        CardType: ['', [Validators.required,Validators.maxLength(50)]],
        Limit: [null, [Validators.required, Validators.maxLength(18)]],
        HaveSupplementaryCard: ['', [Validators.required,Validators.maxLength(10)]],
        SupplementaryCard_Name: ['', [Validators.required,Validators.maxLength(30)]],
        SupplementaryCard_Relationship: ['', [Validators.required,Validators.maxLength(10)]],
        SupplementaryCard_Portion: ['', [Validators.required,Validators.maxLength(10)]],
        Observation: ['', [Validators.required,Validators.maxLength(500)]],
        SpecialCondition: ['', [Validators.required,Validators.maxLength(500)]],
        Security: ['', [Validators.required,Validators.maxLength(500)]],
        Exception: ['', [Validators.required,Validators.maxLength(500)]],
        ApprovalAuthority: ['', [Validators.required,Validators.maxLength(500)]],
       
      });
      formModelInvestmentDetails = this.fb.group({
        CardApplicationDataId: ['', [Validators.required]],
        BankName: ['', [Validators.required]],
        FacilityType: ['', [Validators.required]],
        OutstandingAmount: [0, [Validators.required]],
        EMI: ['', [Validators.required]],
        Status: ['', [Validators.required]],
        
      });

      formModelContactPointVerification = this.fb.group({
        CardApplicationDataId: ['', [Validators.required]],
        Particulars: ['', [Validators.required]],
        Conducted: ['', [Validators.required]],
        IsSatisfactory: [null, [Validators.required]],
        CPV_Done_BY: [null, [Validators.required]]
      });
      deliverdModel = this.fb.group({
        cardDataId: [''],
        statusName: [''],
        SourceChannel: ['', [Validators.required]],
        SourcedBy: ['', [Validators.required]]
      });

//
      save() {
        var body = {
          Id: this.formModel.value.Id,
          FileNo: this.formModel.value.FileNo,
          SourceChannel: this.formModel.value.SourceChannel,
          SourcedBy: this.formModel.value.SourcedBy,
          ReferenceName: this.formModel.value.ReferenceName
        };
if(this.formModel.value.Id!=null){
  return this.http.put(this.BaseURI, body);
}else{
  return this.http.post(this.BaseURI, body);
}
       
      }
      search(stageId) {
        
        var body = {
          FileNo: this.formModel.value.FileNo,
         // FullName: this.formModel.value.FullName, 
          ContactNumber: this.formModel.value.ContactNumber,
          NationalID: this.formModel.value.NationalID,
          SourceChannel: this.formModel.value.SourceChannel,
          SourcedBy: this.formModel.value.SourcedBy,
          FromDate: this.formModel.value.FromDate.year+'-'
          +this.formModel.value.FromDate.month+'-'
           + this.formModel.value.FromDate.day,
           ToDate: this.formModel.value.ToDate.year+'-'
           +this.formModel.value.ToDate.month+'-'
            + this.formModel.value.ToDate.day,
          ApplicationStageId: stageId
        };

        return this.http.post(this.BaseURI+'/GetApplicationsWithStatusId', body);
      }
     


      delete(id){
        return this.http.delete(this.BaseURI+'/'+id);
      }
      changeStage(id,nextSerial){
        return this.http.get(this.BaseURI+'/ChangeStage?id='+id+'&nextSerial='+nextSerial);
      }
      uploadFile(formData){
        return this.http.post(this.BaseURI+'/FileUpload', formData, {reportProgress: true, observe: 'events'});
      }
      giveOtherStatus(id,statusName,sourceChannel,sourceBy){
        return this.http.get(this.BaseURI+'/GiveOtherStatus?id='+id+'&statusName='
        +statusName+'&sourceChannel='+sourceChannel+'&sourceBy='+sourceBy);
      }
      //
      receiveDocument(id){
        return this.http.get(this.BaseURI+'/ReceiveDocument?historyId='+id);
      }
      getApplicationDetails(id){
        return this.http.get(this.BaseURI+'/'+id);
      }
    
      getWithStage(id,historyId){
        return this.http.get(this.BaseURI+'/GetWithStage?id='+id+'&historyId='+historyId);
      }
      
      getApplicationDetailsAndBind(id){
        return this.http.get(this.BaseURI+'/'+id);
      }
      
      getDashboardVM(){
        return this.http.get(this.BaseURI+'/GetDashboardVM');
      }
      getApplicationsWithStatusId(statusId){
        
        return this.http.get(this.BaseURI+'/GetApplicationsWithStatusId?statusId='+statusId);
      }
      getAllWithStatusForSingleApp(appId){
        
        return this.http.get(this.BaseURI+'/GetAllWithStatusForSingleApp?appId='+appId);
      }
//////////////////// 
saveInvestmentDetails(cardInfoId) {
 
  var body = {

    CardApplicationDataId: cardInfoId,
    BankName: this.formModelInvestmentDetails.value.BankName,
    FacilityType: this.formModelInvestmentDetails.value.FacilityType,
    OutstandingAmount: parseInt(this.formModelInvestmentDetails.value.OutstandingAmount, 10),
    EMI: this.formModelInvestmentDetails.value.EMI,
    Status: this.formModelInvestmentDetails.value.Status
  };

  return this.http.post(this.BaseURI+'/SaveInvestmentDetails', body);
}
getInvestmentDetails(id){
  return this.http.get(this.BaseURI+'/GetInvestmentDetails?id='+id);
}


// formModelContactPointVerification = this.fb.group({
//   CardApplicationDataId: ['', [Validators.required]],
//   Particulars: ['', [Validators.required]],
//   Conducted: ['', [Validators.required]],
//   IsSatisfactory: [null, [Validators.required]],
//   CPV_Done_BY: [null, [Validators.required]]
// });

saveContactPointVerification(cardInfoId) {
 
  var body = {

    CardApplicationDataId: this.formModelContactPointVerification.value.CardApplicationDataId,
    Particulars: this.formModelContactPointVerification.value.Particulars,
    Conducted: this.formModelContactPointVerification.value.Conducted,
    IsSatisfactory: this.formModelContactPointVerification.value.IsSatisfactory,
    CPV_Done_BY: this.formModelContactPointVerification.value.CPV_Done_BY
  };

  return this.http.post(this.BaseURI+'/SaveContactPointVerification', body);
}

saveCreditAnalystData() {
  
  var body = {

    Id  :  this.formModelCreditData.value.Id ,
    IncomeDetails_BusinessIncome  :  this.formModelCreditData.value.IncomeDetails_BusinessIncome ,
    IncomeDetails_NetBusinessIncome  :  this.formModelCreditData.value.IncomeDetails_NetBusinessIncome ,
    IncomeDetails_OtherIncome  :  this.formModelCreditData.value.IncomeDetails_OtherIncome ,
    IncomeDetails_NetIncome  :  this.formModelCreditData.value.IncomeDetails_NetIncome ,
    IncomeDetails_FamilyExpense  :  this.formModelCreditData.value.IncomeDetails_FamilyExpense ,
    IncomeDetails_SurplusIncome  :  this.formModelCreditData.value.IncomeDetails_SurplusIncome ,
    CIB_Dated: this.formModelCreditData.value.CIB_Dated.year+'-'+this.formModelCreditData.value.CIB_Dated.month+'-'+this.formModelCreditData.value.CIB_Dated.day,
    CIB_Status  :  this.formModelCreditData.value.CIB_Status ,
    DBR_ExistingEMI  :  this.formModelCreditData.value.DBR_ExistingEMI ,
    DBR_ProposedEMI  :  this.formModelCreditData.value.DBR_ProposedEMI ,
    DBR_TotalEMI  :  this.formModelCreditData.value.DBR_TotalEMI ,
    DBR_DBRatio  :  this.formModelCreditData.value.DBR_DBRatio ,
    EligibilityScore_MonthlyScore  :  this.formModelCreditData.value.EligibilityScore_MonthlyScore ,
    EligibilityScore_PointsObtained  :  this.formModelCreditData.value.EligibilityScore_PointsObtained ,
    EligibilityScore_Multiplier  :  this.formModelCreditData.value.EligibilityScore_Multiplier ,
    LimitInfo_AppliedAmount  :  this.formModelCreditData.value.LimitInfo_AppliedAmount ,
    LimitInfo_SalesBranchRequest  :  this.formModelCreditData.value.LimitInfo_SalesBranchRequest ,
    LimitInfo_MaxLimitAsPerMultiplier  :  this.formModelCreditData.value.LimitInfo_MaxLimitAsPerMultiplier ,
    CardType  :  this.formModelCreditData.value.CardType ,
    Limit  :  this.formModelCreditData.value.Limit ,
    HaveSupplementaryCard  :  this.formModelCreditData.value.HaveSupplementaryCard ,
    SupplementaryCard_Name  :  this.formModelCreditData.value.SupplementaryCard_Name ,
    SupplementaryCard_Relationship  :  this.formModelCreditData.value.SupplementaryCard_Relationship ,
    SupplementaryCard_Portion  :  this.formModelCreditData.value.SupplementaryCard_Portion ,
    Observation  :  this.formModelCreditData.value.Observation ,
    SpecialCondition  :  this.formModelCreditData.value.SpecialCondition ,
    Security  :  this.formModelCreditData.value.Security ,
    Exception  :  this.formModelCreditData.value.Exception ,
    ApprovalAuthority  :  this.formModelCreditData.value.ApprovalAuthority 
    

  };

  return this.http.post(this.BaseURI+'/SaveCreditAnalysData', body);
}



getContactPointVerification(id){
  return this.http.get(this.BaseURI+'/GetContactPointVerification?id='+id);
}

getXML(id){
  
  return this.http.get(this.BaseURI+'/GetXml?id='+id);
}



      toDate(dob, name) {
        
        if (dob) {
          const [year, month, day] = dob.split('-');
          const obj = { year: parseInt(year), month: parseInt(month), day: 
            parseInt(day.split(' ')[0].trim()) };
            this.formModel.controls[name].setValue(obj);
          }
        }
        toDate_2(dob, name) {
          
          if (dob) {
            const [year, month, day] = dob.split('-');
            const obj = { year: parseInt(year), month: parseInt(month), day: 
              parseInt(day.split(' ')[0].trim()) };
              this.formModelCreditData.controls[name].setValue(obj);
            }
          }
    }
