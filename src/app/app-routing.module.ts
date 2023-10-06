import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from './services/auth-guard.service';
import { ContactComponent } from './home/contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfilComponent } from './profil/profil.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { UserBoardComponent } from './user-board/user-board.component';
import { SupervisorBoardComponent } from './supervisor-board/supervisor-board.component';
import { ModifyUserComponent } from './modify-user/modify-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ModifyUserAdminComponent } from './modify-user-admin/modify-user-admin.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ComingSoonPageComponent } from './coming-soon-page/coming-soon-page.component';

import { CompleteProfilComponent } from './complete-profil/complete-profil.component';
import { CollabUserCreateComponent } from './collab-user-create/collab-user-create.component';

import { SettingsComponent } from './settings/settings.component';
import { ViewUserDeletedComponent } from './view-user-deleted/view-user-deleted.component';

import { CollabBoardComponent } from './collab-board/collab-board.component';
import { InsertCompconfFileComponent } from './insert-compconf-file/insert-compconf-file.component';
import { ViewCompconfsComponent } from './view-compconfs/view-compconfs.component';
import { ViewWorkgabComponent } from './view-workgab/view-workgab.component';
import { ViewWorkposComponent } from './view-workpos/view-workpos.component';
import { ViewWorksmsComponent } from './view-worksms/view-worksms.component';
import { CreateReclamationComponent } from './create-reclamation/create-reclamation.component';
import { AddPotifRecComponent } from './add-potif-rec/add-potif-rec.component';

const routes: Routes = [
  
   
    
{ path: 'login', component: LoginComponent,
    
},
{ path: 'profil', component: ProfilComponent,
    
},
{ path: 'settings', component: SettingsComponent,
    
},
{ path: 'view-compconfs', component: ViewCompconfsComponent,
    
},
{ path: 'view-workgab', component: ViewWorkgabComponent,
    
},
{ path: 'view-workpos', component: ViewWorkposComponent,
    
},
{ path: 'view-worksms', component: ViewWorksmsComponent,
    
},
{ path: 'modify-user/:id', component: ModifyUserComponent,
    
},
{ path: 'complete-profil/:id', component: CompleteProfilComponent,
    
},
    


{ path: 'modify-user-admin/:id', component: ModifyUserAdminComponent,
    
},

{ path: 'view-user/:id', component: ViewUserComponent},
{ path: 'view-user-deleted/:id', component: ViewUserDeletedComponent},

{ path: 'verify-email/:token', component: VerifyEmailComponent},
{ path: 'reset-password/:token', component: ResetPasswordComponent},
{ path: 'admin-board', component: AdminBoardComponent},
{ path: 'user-board', component: UserBoardComponent},
{ path: 'collab-board', component: CollabBoardComponent},

{ path: 'supervisor-board', component: SupervisorBoardComponent},

  {path: 'home/contact', component :ContactComponent},
  {path: 'home', component :HomeComponent},
    

{ path: 'signup', component: SignupComponent,
    
},
{ path: 'collab-create', component: CollabUserCreateComponent,
    
},
{ path: 'login/signup', component: SignupComponent,
    
},
{ path: 'login/forgot-password', component: ForgotPasswordComponent,
    
},
{ path: 'admin-board/profil', component: ProfilComponent,
    
},
{ path: 'insert-compconf', component: InsertCompconfFileComponent,
    
},
{ path: 'create-reclamation/:id', component: CreateReclamationComponent,
    
},
{ path: 'add-motif', component: AddPotifRecComponent,
    
},
{ path: 'coming-soon', component: ComingSoonPageComponent,
    
},
{ path: '', pathMatch: 'full', redirectTo: 'home' },
  
  { path: '**', redirectTo: '/coming-soon' },
  

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard
  ]
})
export class AppRoutingModule {}
