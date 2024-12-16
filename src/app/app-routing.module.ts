import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BodyComponent } from './body/body.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './home/home.component';
import { ClubComponent } from './club/club.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { AuthGuard } from './auth.guard';
import { ClubProfileComponent } from './club-profile/club-profile.component';
import { RequestEventComponent } from './request-event/request-event.component';

const routes: Routes = [
  // Route par défaut : redirige vers la page de connexion
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Route de connexion
  {
    path: 'login',
    component: LoginComponent,
  },

  // Routes pour les admins
  {
    path: 'admin',
    component: BodyComponent, // Contient les routes enfants pour l'admin
    canActivate: [AuthGuard], // Vérifie que l'utilisateur est authentifié
    data: { role: 'admin' }, // Rôle attendu pour accéder à ces routes
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'home', component: HomeComponent },
      { path: 'club', component: ClubComponent },
      { path: 'classroom', component: ClassroomComponent },
      { path: 'student', component: StudentComponent },
      { path: 'RequestEvent', component: RequestEventComponent },
      { path: 'club/:clubId', component: ClubProfileComponent },
    ],
  },

  // Routes pour les clubs
  {
    path: 'club',
    component: BodyComponent, 
    canActivate: [AuthGuard], // Vérifie que l'utilisateur est authentifié
    data: { role: 'club' }, // Rôle attendu pour accéder à ces routes
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'home', component: HomeComponent },
      { path: 'club', component: ClubComponent },
      { path: 'RequestEvent', component: RequestEventComponent },
      
    ],
  },

   // Routes pour les étudiants
   {
    path: 'student',
    component: BodyComponent, 
    canActivate: [AuthGuard], // Vérifie que l'utilisateur est authentifié
    data: { role: 'student' }, // Rôle attendu pour accéder à ces routes
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'home', component: HomeComponent },
      { path: 'club', component: ClubComponent },
      { path: 'club/:clubId', component: ClubProfileComponent },
    ],
  },
   // Routes pour les membres
   {
    path: 'membre',
    component: BodyComponent, 
    canActivate: [AuthGuard], // Vérifie que l'utilisateur est authentifié
    data: { role: 'membre' }, // Rôle attendu pour accéder à ces routes
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'home', component: HomeComponent },
      { path: 'club', component: ClubComponent },
      { path: 'club/:clubId', component: ClubProfileComponent },
    ],
  },
  // Route pour les chemins inconnus
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
