import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClubComponent } from './club/club.component';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './home/home.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { ClubProfileComponent } from './club-profile/club-profile.component';
import { RequestEventComponent } from './request-event/request-event.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavbarComponent,
    SidebarComponent,
    BodyComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule, FormsModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
