import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { CommonService } from '../shared/common.service';
import { CardapplicationService } from '../shared/cardapplication.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { FormInvestmentDetailsComponent } from '../form-investment-details/form-investment-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormContactPointVerificationComponent } from '../form-contact-point-verification/form-contact-point-verification.component';

@Component({
  selector: 'app-credit-analyst-form',
  templateUrl: './credit-analyst-form.component.html',
  styles: []
})
export class CreditAnalystFormComponent implements OnInit {
 InvestmentDetails= [];
 ContactPoints= [];
 id;
 preDifText = '';
  constructor(private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    public service: CardapplicationService,
    private modalService: NgbModal,
    private toastr: ToastrService) { }

  ngOnInit() {
    

    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['CardApplicationId'];
      if(params['CardApplicationId']==null){
        this.resetWithDefault();
      }
    });

    if (this.id != null) {
      this.getcurrentValues(this.id);
    }

   
  }

  resetWithDefault() {
    this.service.formModel.reset();
    this.service.formModel.controls['TotalServiceYears'].setValue(0);
    //
  }
  DefaultText(){
    this.service.formModelCreditData.controls['ApprovalAuthority'].setValue(this.preDifText);
  }
  add_investmentDetails(){
  
    const modalRef = this.modalService.open(FormInvestmentDetailsComponent);
    modalRef.componentInstance.my_modal_title = 'Add Investment Details';
    modalRef.componentInstance.id = this.id;

    modalRef.result.then((result) => {
      if ( result === 'Close click' ) {
         this.getInvestmentDetails(); // Refresh Data in table grid
      }
    }, (reason) => {
    });
  }
  add_contactPointVerification(){
    const modalRef = this.modalService.open(FormContactPointVerificationComponent);
    modalRef.componentInstance.my_modal_title = 'Add Contact Point Verification';
    modalRef.componentInstance.id = this.id;

    modalRef.result.then((result) => {
      if ( result === 'Close click' ) {
         this.getContactPointVerification(); // Refresh Data in table grid
      }
    }, (reason) => {
    });
  }
getInvestmentDetails(){

    // Get Branch list
    this.service.getInvestmentDetails(this.id).subscribe(
      (res: any) => {
        this.InvestmentDetails = res.data;

      },
      err => {
        console.log(err);
      }
    );
}
getContactPointVerification(){

    // Get Branch list
    this.service.getContactPointVerification(this.id).subscribe(
      (res: any) => {
      
        this.ContactPoints = res.data;

      },
      err => {
        console.log(err);
      }
    );
}
public findInvalidControls() {
  const invalid = [];
  const controls = this.service.formModelCreditData.controls;
  for (const name in controls) {
      if (controls[name].invalid) {
          invalid.push(name);
      }
  }

  console.log(invalid);
}
  getcurrentValues(id) {
    this.service.getApplicationDetailsAndBind(id).subscribe(
      (res: any) => {
        this.service.formModelCreditData.controls['Id'].setValue(res.data.id);
        this.service.formModelCreditData.controls['FileNo'].setValue(res.data.fileNo);
        this.service.formModelCreditData.controls['FullName'].setValue(res.data.fullName);
        this.service.formModelCreditData.controls['IncomeDetails_BusinessIncome'].setValue(res.data.incomeDetails_BusinessIncome);
        this.service.formModelCreditData.controls['IncomeDetails_NetBusinessIncome'].setValue(res.data.incomeDetails_NetBusinessIncome);
        this.service.formModelCreditData.controls['IncomeDetails_OtherIncome'].setValue(res.data.incomeDetails_OtherIncome);
        this.service.formModelCreditData.controls['IncomeDetails_NetIncome'].setValue(res.data.incomeDetails_NetIncome);
        this.service.formModelCreditData.controls['IncomeDetails_FamilyExpense'].setValue(res.data.incomeDetails_FamilyExpense);
        this.service.formModelCreditData.controls['IncomeDetails_SurplusIncome'].setValue(res.data.incomeDetails_SurplusIncome);
        this.service.toDate_2(res.data.ciB_Dated, 'CIB_Dated');
        this.service.formModelCreditData.controls['CIB_Status'].setValue(res.data.ciB_Status);
        this.service.formModelCreditData.controls['DBR_ExistingEMI'].setValue(res.data.dbR_ExistingEMI);
        this.service.formModelCreditData.controls['DBR_ProposedEMI'].setValue(res.data.dbR_ProposedEMI);
        this.service.formModelCreditData.controls['DBR_TotalEMI'].setValue(res.data.dbR_TotalEMI);
        this.service.formModelCreditData.controls['DBR_DBRatio'].setValue(res.data.dbR_DBRatio);
        this.service.formModelCreditData.controls['EligibilityScore_MonthlyScore'].setValue(res.data.eligibilityScore_MonthlyScore);
        this.service.formModelCreditData.controls['EligibilityScore_PointsObtained'].setValue(res.data.eligibilityScore_PointsObtained);
        this.service.formModelCreditData.controls['EligibilityScore_Multiplier'].setValue(res.data.eligibilityScore_Multiplier);
        this.service.formModelCreditData.controls['LimitInfo_AppliedAmount'].setValue(res.data.limitInfo_AppliedAmount);
        this.service.formModelCreditData.controls['LimitInfo_SalesBranchRequest'].setValue(res.data.limitInfo_SalesBranchRequest);
        this.service.formModelCreditData.controls['LimitInfo_MaxLimitAsPerMultiplier'].setValue(res.data.limitInfo_MaxLimitAsPerMultiplier);
        this.service.formModelCreditData.controls['CardType'].setValue(res.data.cardType);
        this.service.formModelCreditData.controls['Limit'].setValue(res.data.limit);
        this.service.formModelCreditData.controls['HaveSupplementaryCard'].setValue(res.data.haveSupplementaryCard);
        this.service.formModelCreditData.controls['SupplementaryCard_Name'].setValue(res.data.supplementaryCard_Name);
        this.service.formModelCreditData.controls['SupplementaryCard_Relationship'].setValue(res.data.supplementaryCard_Relationship);
        this.service.formModelCreditData.controls['SupplementaryCard_Portion'].setValue(res.data.supplementaryCard_Portion);
        this.service.formModelCreditData.controls['Observation'].setValue(res.data.observation);
        this.service.formModelCreditData.controls['SpecialCondition'].setValue(res.data.specialCondition);
        this.service.formModelCreditData.controls['Security'].setValue(res.data.security);
        this.service.formModelCreditData.controls['Exception'].setValue(res.data.exception);
        this.service.formModelCreditData.controls['ApprovalAuthority'].setValue(res.data.approvalAuthority);
       
      })//
      
      this.getInvestmentDetails();
      this.getContactPointVerification();
      }

      onSubmit() {


        this.service.saveCreditAnalystData().subscribe(
          (res: any) => {
            console.log(res);

            if (res.isSuccessfull) {

              this.toastr.warning('Data updated!', 'Record successfully updated.');
            } else {
              this.toastr.error('Ops! Something went worng!', res.message);
            }
          },
          err => {
            console.log(err);
            this.toastr.error(err);
          }
        );

      }
}
