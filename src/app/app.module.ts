import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardapplicationService } from './shared/cardapplication.service';
import { NewApplicationsComponent } from './new-applications/new-applications.component';
import { DataTablesModule } from 'angular-datatables';
import { AppConfigModule } from './app-config.module';
import { CardapplicationDetailsreportComponent } from './cardapplication-detailsreport/cardapplication-detailsreport.component';
import { NumberToWordsPipe } from './shared/number-to-words.pipe';
import { StageIRMDHeadComponent } from './stage-irmd-head/stage-irmd-head.component';
import { ModalDeduplicationstatusComponent } from './modal-decision-model/modal-decision-model.component';
import { StageIrmdDoComponent } from './stage-irmd-do/stage-irmd-do.component';
import { StageIrmdInchargeComponent } from './stage-irmd-incharge/stage-irmd-incharge.component';
import { StageIADComponent } from './stage-iad/stage-iad.component';
import { StageBoardSecretaryComponent } from './stage-boardSecretary/stage-board-secretary.component';
import { CreditAnalystFormComponent } from './credit-analyst-form/credit-analyst-form.component';
import { FormInvestmentDetailsComponent } from './form-investment-details/form-investment-details.component';
import { FormContactPointVerificationComponent } from './form-contact-point-verification/form-contact-point-verification.component';
import { RoleListComponent } from './user/role-list/role-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { RoleFormComponent } from './user/role-form/role-form.component';
import { UserRoleFormComponent } from './user/user-role-form/user-role-form.component';
import { UserRoleListComponent } from './user/user-role-list/user-role-list.component';
import { AllApplicationsStatusComponent } from './all-applications-status/all-applications-status.component';
import { CardReceiveModalComponent } from './card-receive-modal/card-receive-modal.component';
import { DeliveredToModalComponent } from './delivered-to-modal/delivered-to-modal.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ToggleButtonComponent } from './shared/toggle-button.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { CardAppDocComponent } from './card-app-doc/card-app-doc.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SafePipeModule } from 'safe-pipe';
import { MatNativeDateModule } from '@angular/material/core';
import { DemoMaterialModule } from './shared/meterialModules';
import { StageDmdComponent } from './stage-dmd/stage-dmd.component';
import { StageAmdComponent } from './stage-amd/stage-amd.component';
import { StageMdComponent } from './stage-md/stage-md.component';
import { StageRetailHeadComponent } from './stage-retail-head/stage-retail-head.component';
import { ToggleFullscreenDirectiveDirective } from './shared/toggle-fullscreen-directive.directive';
import { AppHistoryModelComponent } from './app-history-model/app-history-model.component';
import { StageDmd2Component } from './stage-dmd2/stage-dmd2.component';
import { UnAuthUserComponent } from './un-auth-user/un-auth-user.component';
import { CibDataAutomationComponent } from './cib-data-automation/cib-data-automation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { StageBranchInvestmentInchargeComponent } from './stage-branch-investmentIncharge/stage-branch-investmentIncharge.component';
import { StageBranchDeputy } from './stage-branch-deputy/stage-branch-deputy.component';
import { StageBranchManager } from './stage-branch-manager/stage-branch-manager.component';
import { ApprovedApplicationsComponent } from './approved-applications/approved-applications.component';
// 

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    AdminPanelComponent,
    ForbiddenComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    EntryFormComponent,
    NewApplicationsComponent,
    CardapplicationDetailsreportComponent,
    NumberToWordsPipe,
    StageIRMDHeadComponent,
    ModalDeduplicationstatusComponent,
    AppHistoryModelComponent,
    StageIrmdDoComponent,
    StageIrmdInchargeComponent,
    StageIADComponent,
    StageBoardSecretaryComponent,
    CreditAnalystFormComponent,
    FormInvestmentDetailsComponent,
    FormContactPointVerificationComponent,
    RoleListComponent,
    UserListComponent,
    UserFormComponent,
    RoleFormComponent,
    UserRoleFormComponent,
    UserRoleListComponent,
    AllApplicationsStatusComponent,
    CardReceiveModalComponent,
    DeliveredToModalComponent,
    ChangePasswordComponent,
    ToggleButtonComponent,
    FileUploadComponent,
    DocumentTypeComponent,
    CardAppDocComponent,
    StageDmdComponent,
    StageAmdComponent,
    StageMdComponent,
    StageRetailHeadComponent,
    ToggleFullscreenDirectiveDirective,
    AppHistoryModelComponent,
    StageDmd2Component,
    UnAuthUserComponent,
    CibDataAutomationComponent,
    
    ResetPasswordComponent,
    StageBranchInvestmentInchargeComponent,
    StageBranchDeputy,
    StageBranchManager,
    ApprovedApplicationsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      progressBar: true
    }), // ToastrModule added,
    FormsModule,
    NgbModule,
    DataTablesModule,
    AppConfigModule,

    DemoMaterialModule,
    MatNativeDateModule,
    SafePipeModule 
    
  ],
  entryComponents:[
    ModalDeduplicationstatusComponent,
    FormInvestmentDetailsComponent,
    FormContactPointVerificationComponent,
    UserFormComponent,
    RoleFormComponent,
    UserRoleFormComponent,
    CardReceiveModalComponent,
    DeliveredToModalComponent,
    AppHistoryModelComponent,
    ResetPasswordComponent
  ],
  providers: [UserService,
    CardapplicationService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
