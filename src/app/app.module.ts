import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/buffering';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {CustomDatePipe} from './_helpers/custom.datepipe'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './home/contact/contact.component';
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

import { AlertComponent } from './alert/alert.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

import { CompleteProfilComponent } from './complete-profil/complete-profil.component';
import { CollabUserCreateComponent } from './collab-user-create/collab-user-create.component';
import { SortDirective } from './directive/sort.directive';
import { TwoDigitDecimaNumberDirective } from './directive/TwoDigitDecimaNumber.directive';
import { RemoveCommaPipe } from './pipes/pipe-number';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';

import { SettingsComponent } from './settings/settings.component';
import { HttpErrorInterceptor } from './interceptors/error-interceptor';
import { ExcelService } from './services/excel.service';
import { ViewUserDeletedComponent } from './view-user-deleted/view-user-deleted.component';

import { CanDeactivateGuard } from './services/auth-guard.service';

import { CollabBoardComponent } from './collab-board/collab-board.component';
import { InsertCompconfFileComponent } from './insert-compconf-file/insert-compconf-file.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ViewCompconfsComponent } from './view-compconfs/view-compconfs.component';
import { ViewWorkgabComponent } from './view-workgab/view-workgab.component';
import { ViewWorkposComponent } from './view-workpos/view-workpos.component';
import { ViewWorksmsComponent } from './view-worksms/view-worksms.component';
import { CreateReclamationComponent } from './create-reclamation/create-reclamation.component';
import { AddPotifRecComponent } from './add-potif-rec/add-potif-rec.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    
    
    
    HeaderComponent,
   
    LoginComponent,
    SignupComponent,
   
    FooterComponent,
    HomeComponent,
    ContactComponent,
    ProfilComponent,
    AdminBoardComponent,
    UserBoardComponent,
    SupervisorBoardComponent,
    ModifyUserComponent,
    ViewUserComponent,
    ModifyUserAdminComponent,
    CustomDatePipe,
    RemoveCommaPipe,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ComingSoonPageComponent,
    
    AlertComponent,
    SearchBarComponent,
  
    CompleteProfilComponent,
    CollabUserCreateComponent,
    SortDirective,
    TwoDigitDecimaNumberDirective,
   
    SettingsComponent,
    ViewUserDeletedComponent,
    
    CollabBoardComponent,
    
    InsertCompconfFileComponent,
    
    ViewCompconfsComponent,
    
    ViewWorkgabComponent,
    
    ViewWorkposComponent,
    
    ViewWorksmsComponent,
    
    CreateReclamationComponent,
    
    AddPotifRecComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatTabsModule,
    FullCalendarModule,
    CarouselModule,
    MatPaginatorModule,
    ScrollingModule,
    ModalModule.forRoot(),

    
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  },ExcelService,CanDeactivateGuard,RemoveCommaPipe,BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
