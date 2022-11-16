import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UnAuthUserComponent } from './un-auth-user/un-auth-user.component';
import { NonMpaymentComponent } from './nonMpayment/nonMpayment.component';
import { FinalPaymentComponent } from './finalPayment/finalPayment.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UnAuthTransactionsComponent } from './unAuthTransactions/unAuthTransactions.component';
import { GlobalSettingsComponent } from './global-settings/global-settings.component';
import { BgdclFinalPaymentComponent } from './bgdclFinalPayment/bgdclFinalPayment.component';
import { bgdclVerifyComponent } from './bgdclVerify/bgdclVerify.component';
import { BgdclUnAuthTransactionsComponent } from './bgdclUnAuthTransactions/bgdclUnAuthTransactions.component';
import { ReconciliationComponent } from './reconciliation/reconciliation.component';
import { BranchWiseReconciliationComponent } from './branchIwisereconciliation/branchIwisereconciliation.component';
import { NescoVerifyComponent } from './NESCO/NescoVerify/NescoVerify.component';
import { NescoFinalPaymentComponent } from './NESCO/NescoFinalPayment/NescoFinalPayment.component';
import { NescoUnAuthTransactionsComponent } from './NESCO/NescoUnAuthTransactions/NescoUnAuthTransactions.component';
import { NescoPostPiadDatwise } from './NESCO/Report/Nesco-Postpaid/NescoPostPaidReport1/NescoPostPiadDatwise.component';
import { NescoPrePiadReport } from './NESCO/Report/Nesco-Prepaid/NescoPrePiadReport.component';
import { NescoPrePiadReceipt } from './NESCO/Report/Nesco-Prepaid/NescoPrePiadReceipt.component';
import { DescoUnAuthTransactionsComponent } from './DESCO/DescoUnAuthTransactions/DescoUnAuthTransactions.component';
import { DescoFinalPaymentComponent } from './DESCO/DescoFinalPayment/DescoFinalPayment.component';
import { DescoVerifyComponent } from './DESCO/DescoVerify/DescoVerify.component';
import { BREBVerifyComponent } from './BREB/BREBVerify/BREBVerify.component';
import { BREBFinalPaymentComponent } from './BREB/BREBFinalPayment/BREBFinalPayment.component';
import { BREBUnAuthTransactionsComponent } from './BREB/BREBUnAuthTransactions/BREBUnAuthTransactions.component';
import { DpdcVerifyComponent } from './DPDC/DpdcVerify/DpdcVerify.component';
import { DpdcFinalPaymentComponent } from './DPDC/DpdcFinalPayment/DpdcFinalPayment.component';
import { DpdcUnAuthTransactionsComponent } from './DPDC/DpdcUnAuthTransactions/DpdcUnAuthTransactions.component';
import { DESCOReport } from './DESCO/Report/DESCOReport.component';
import { DPDCReport } from './DPDC/Report/DPDCReport.component';

const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
    path: 'user', component: UserComponent,
    children: [
      
      { path: 'login', component: LoginComponent }
    ]
  },
  {path:'home',component:HomeComponent,
  canActivate:[AuthGuard],
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'changePassword', component: ChangePasswordComponent },
    { path: 'appusers', component: UserListComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'entryform', component: EntryFormComponent },
    { path: 'nonMpayment', component: NonMpaymentComponent },
    { path: 'finalPayment', component: FinalPaymentComponent },

    { path: 'bgdclVerify', component: bgdclVerifyComponent },
    { path: 'bgdclFinalPayment', component: BgdclFinalPaymentComponent },
    { path: 'bgdclUnAuthTransactions', component: BgdclUnAuthTransactionsComponent },

    { path: 'NescoVerify', component: NescoVerifyComponent },
    { path: 'NescoFinalPayment', component: NescoFinalPaymentComponent },
    { path: 'NescoUnAuthTransactions', component: NescoUnAuthTransactionsComponent },
    
    { path: 'DescoVerify', component: DescoVerifyComponent },
    { path: 'DescoFinalPayment', component: DescoFinalPaymentComponent },
    { path: 'DescoUnAuthTransactions', component: DescoUnAuthTransactionsComponent },
    { path: 'DESCOReport', component: DESCOReport },

    { path: 'DpdcVerify', component: DpdcVerifyComponent },
    { path: 'DpdcFinalPayment', component: DpdcFinalPaymentComponent },
    { path: 'DpdcUnAuthTransactions', component: DpdcUnAuthTransactionsComponent },
    { path: 'DPDCReport', component: DPDCReport },

    //

    { path: 'BREBVerify', component: BREBVerifyComponent },
    { path: 'BREBFinalPayment', component: BREBFinalPaymentComponent },
    { path: 'BREBUnAuthTransactions', component: BREBUnAuthTransactionsComponent },

    { path: 'unAuthUsers', component: UnAuthUserComponent },
    
    { path: 'transactions', component: TransactionsComponent },
    { path: 'untAuthTransactions', component: UnAuthTransactionsComponent },
    { path: 'globalSettings', component: GlobalSettingsComponent },
    { path: 'reconciliation', component: ReconciliationComponent },
    { path: 'branchWiseReconciliation', component: BranchWiseReconciliationComponent },
    { path: 'NescoPostPiadDatwise', component: NescoPostPiadDatwise },
    { path: 'NescoPrePiadReport', component: NescoPrePiadReport },
    { path: 'NescoPrePiadReceipt', component: NescoPrePiadReceipt }
  ]
},
// 
  {path:'forbidden',component:ForbiddenComponent},
  {path:'adminpanel',component:AdminPanelComponent,
  canActivate:[AuthGuard],data :{permittedRoles:['Admin']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }