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
import { DataTablesModule } from 'angular-datatables';
import { AppConfigModule } from './app-config.module';
import { NumberToWordsPipe } from './shared/number-to-words.pipe';
import { RoleListComponent } from './user/role-list/role-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { RoleFormComponent } from './user/role-form/role-form.component';
import { UserRoleFormComponent } from './user/user-role-form/user-role-form.component';
import { UserRoleListComponent } from './user/user-role-list/user-role-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ToggleButtonComponent } from './shared/toggle-button.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SafePipeModule } from 'safe-pipe';
import { MatNativeDateModule } from '@angular/material/core';
import { DemoMaterialModule } from './shared/meterialModules';
import { ToggleFullscreenDirectiveDirective } from './shared/toggle-fullscreen-directive.directive';
import { UnAuthUserComponent } from './un-auth-user/un-auth-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { ChartsModule } from 'ng2-charts';
import { NonMpaymentComponent } from './nonMpayment/nonMpayment.component';
import { PaymentService } from './shared/payment.service';
import { FinalPaymentComponent } from './finalPayment/finalPayment.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UnAuthTransactionsComponent } from './unAuthTransactions/unAuthTransactions.component';
import { GlobalSettingsComponent } from './global-settings/global-settings.component';
// 
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup

import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting
import { BgdclPaymentService } from './shared/bgdclPayment.service';
import { bgdclVerifyComponent } from './bgdclVerify/bgdclVerify.component';
import { BgdclFinalPaymentComponent } from './bgdclFinalPayment/bgdclFinalPayment.component';
import { MessageModComponent } from './shared/message-mod/message-mod.component';
import { BgdclUnAuthTransactionsComponent } from './bgdclUnAuthTransactions/bgdclUnAuthTransactions.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { ReconciliationComponent } from './reconciliation/reconciliation.component';
import { BranchWiseReconciliationComponent } from './branchIwisereconciliation/branchIwisereconciliation.component';
import { NescoVerifyComponent } from './NESCO/NescoVerify/NescoVerify.component';
import { NescoFinalPaymentComponent } from './NESCO/NescoFinalPayment/NescoFinalPayment.component';
import { NescoUnAuthTransactionsComponent } from './NESCO/NescoUnAuthTransactions/NescoUnAuthTransactions.component';
import { NescoPaymentService } from './shared/NescoPayment.service';
import { NescoPostPiadDatwise } from './NESCO/Report/Nesco-Postpaid/NescoPostPaidReport1/NescoPostPiadDatwise.component';
import { DatePipe } from '@angular/common';
import { NescoPrePiadReport } from './NESCO/Report/Nesco-Prepaid/NescoPrePiadReport.component';
import { NescoPrePiadReceipt } from './NESCO/Report/Nesco-Prepaid/NescoPrePiadReceipt.component';
import { TimeExtensionComponent } from './user/time-extension-modal/time-extension-modal.component';
import { DescoVerifyComponent } from './DESCO/DescoVerify/DescoVerify.component';
import { DescoFinalPaymentComponent } from './DESCO/DescoFinalPayment/DescoFinalPayment.component';
import { DescoUnAuthTransactionsComponent } from './DESCO/DescoUnAuthTransactions/DescoUnAuthTransactions.component';
import { DescoPaymentService } from './shared/DescoPayment.service';
import { BREBPaymentService } from './shared/BREBPayment.service';
import { BREBVerifyComponent } from './BREB/BREBVerify/BREBVerify.component';
import { BREBFinalPaymentComponent } from './BREB/BREBFinalPayment/BREBFinalPayment.component';
import { BREBUnAuthTransactionsComponent } from './BREB/BREBUnAuthTransactions/BREBUnAuthTransactions.component';
import { DpdcPaymentService } from './shared/DpdcPayment.service';
import { DpdcVerifyComponent } from './DPDC/DpdcVerify/DpdcVerify.component';
import { DpdcFinalPaymentComponent } from './DPDC/DpdcFinalPayment/DpdcFinalPayment.component';
import { DpdcUnAuthTransactionsComponent } from './DPDC/DpdcUnAuthTransactions/DpdcUnAuthTransactions.component';
import { DESCOReport } from './DESCO/Report/DESCOReport.component';
import { DPDCReport } from './DPDC/Report/DPDCReport.component';

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
    NumberToWordsPipe,
    RoleListComponent,
    UserListComponent,
    UserFormComponent,
    RoleFormComponent,
    UserRoleFormComponent,
    UserRoleListComponent,
    ChangePasswordComponent,
    ToggleButtonComponent,
    FileUploadComponent,
    ToggleFullscreenDirectiveDirective,
    UnAuthUserComponent,
    ResetPasswordComponent,

    NonMpaymentComponent,
    FinalPaymentComponent,
    TransactionsComponent,
    UnAuthTransactionsComponent,
    GlobalSettingsComponent,
    BgdclUnAuthTransactionsComponent,

    bgdclVerifyComponent,
    BgdclFinalPaymentComponent,
    MessageModComponent,
    ReconciliationComponent,
    BranchWiseReconciliationComponent,


    NescoVerifyComponent,
    NescoFinalPaymentComponent,
    NescoUnAuthTransactionsComponent,
    NescoPostPiadDatwise,
    NescoPrePiadReport,
    NescoPrePiadReceipt,

    DescoVerifyComponent,
    DescoFinalPaymentComponent,
    DescoUnAuthTransactionsComponent,
    DESCOReport,
    DPDCReport,


    BREBVerifyComponent,
    BREBFinalPaymentComponent,
    BREBUnAuthTransactionsComponent,

    DpdcVerifyComponent,
    DpdcFinalPaymentComponent,
    DpdcUnAuthTransactionsComponent,

    TimeExtensionComponent

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
    SafePipeModule ,
    NgMultiSelectDropDownModule.forRoot(),
    ChartsModule,
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),

    NgxSpinnerModule

    
  ],
  entryComponents:[
    UserFormComponent,
    RoleFormComponent,
    UserRoleFormComponent,
    ResetPasswordComponent,
    MessageModComponent,
    TimeExtensionComponent
  ],
  providers: [DatePipe,UserService,PaymentService,
    BgdclPaymentService, NescoPaymentService,DescoPaymentService,DpdcPaymentService, BREBPaymentService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
