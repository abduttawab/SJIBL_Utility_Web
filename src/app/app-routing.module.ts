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
import { NewApplicationsComponent } from './new-applications/new-applications.component';
import { CardapplicationDetailsreportComponent } from './cardapplication-detailsreport/cardapplication-detailsreport.component';
import { StageIRMDHeadComponent as StageIRMDHeadComponent } from './stage-irmd-head/stage-irmd-head.component';
import { StageIrmdDoComponent } from './stage-irmd-do/stage-irmd-do.component';
import { StageIrmdInchargeComponent } from './stage-irmd-incharge/stage-irmd-incharge.component';
import { StageIADComponent } from './stage-iad/stage-iad.component';
import { StageBoardSecretaryComponent } from './stage-boardSecretary/stage-board-secretary.component';
import { CreditAnalystFormComponent } from './credit-analyst-form/credit-analyst-form.component';
import { AllApplicationsStatusComponent } from './all-applications-status/all-applications-status.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { CardAppDocComponent } from './card-app-doc/card-app-doc.component';
import { StageRetailHeadComponent } from './stage-retail-head/stage-retail-head.component';
import { StageDmdComponent } from './stage-dmd/stage-dmd.component';
import { StageAmdComponent } from './stage-amd/stage-amd.component';
import { StageMdComponent } from './stage-md/stage-md.component';
import { StageDmd2Component } from './stage-dmd2/stage-dmd2.component';
import { UnAuthUserComponent } from './un-auth-user/un-auth-user.component';
import { CibDataAutomationComponent } from './cib-data-automation/cib-data-automation.component';
import { StageBranchInvestmentInchargeComponent } from './stage-branch-investmentIncharge/stage-branch-investmentIncharge.component';
import { StageBranchDeputy } from './stage-branch-deputy/stage-branch-deputy.component';
import { StageBranchManager } from './stage-branch-manager/stage-branch-manager.component';
import { ApprovedApplicationsComponent } from './approved-applications/approved-applications.component';

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
    { path: 'allApplications', component: AllApplicationsStatusComponent },
    { path: 'unAuthUsers', component: UnAuthUserComponent },
    
    { path: 'newapplications', component: NewApplicationsComponent }
    ,
    { path: 'irmdHead', component: StageIRMDHeadComponent }
    ,
    { path: 'detailsreport', component: CardapplicationDetailsreportComponent }
    ,
    { path: 'branchInvestmentIncharge', component: StageBranchInvestmentInchargeComponent }
    ,
    { path: 'branchDeputy', component: StageBranchDeputy },
    { path: 'branchManager', component: StageBranchManager }
    ,
    { path: 'approvedApplication', component: ApprovedApplicationsComponent }
    ,
    //
    { path: 'irmdDo', component: StageIrmdDoComponent }
    ,
    { path: 'irmdIncharge', component: StageIrmdInchargeComponent }
    ,
    { path: 'iadStage', component: StageIADComponent }
    ,
    { path: 'retailhead', component: StageRetailHeadComponent }
    ,
    { path: 'dmd', component: StageDmdComponent }
    ,
    { path: 'dmd2', component: StageDmd2Component }
    ,
    { path: 'amd', component: StageAmdComponent }
    ,
    { path: 'md', component: StageMdComponent }
    ,
    { path: 'boardSecretaryStage', component: StageBoardSecretaryComponent }
    ,
    { path: 'creditform', component: CreditAnalystFormComponent }
    ,
    { path: 'documentType', component: DocumentTypeComponent }
    ,
    { path: 'appDoc', component: CardAppDocComponent }
    ,
    { path: 'cibAuto', component: CibDataAutomationComponent }
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