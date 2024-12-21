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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { DashboardClubComponent } from './dashboard-club/dashboard-club.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material-module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavbarComponent,
    SidebarComponent,
    BodyComponent,
    DashboardClubComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    LoginComponent,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    NgApexchartsModule,
  ],

  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
