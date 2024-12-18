import { Component, OnInit } from '@angular/core';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms'; // Import pour ngModel
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule], // Ajouter FormsModule et FontAwesomeModule ici
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Corrige le styleUrl en styleUrls
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;

  signupUsers: any[] = [];
  signupObj: any = {
    FirstName: '',
    LastName: '',
    email: '',
    password: '',
  };
  loginObj: any = {
    email: '',
    password: '',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}
  onLogin() {
    console.log('Tentative de connexion avec :', this.loginObj);

    if (
      this.loginObj.email === 'admin@example.com' &&
      this.loginObj.password === 'admin123'
    ) {
      // Simule un admin
      const user = { role: 'admin' };
      localStorage.setItem('userRole', user.role);
      console.log("Utilisateur connecté en tant qu'admin.");
      this.router.navigate(['/admin/dashboard']); // Redirige vers une route admin
    } else if (
      this.loginObj.email === 'club@example.com' &&
      this.loginObj.password === 'club123'
    ) {
      // Simule un club
      const user = { role: 'club' };
      localStorage.setItem('userRole', user.role);
      console.log('Utilisateur connecté en tant que club.');
      this.router.navigate(['/club/profile']); // Redirige vers une route étudiant
    } else if (
      this.loginObj.email === 'student@example.com' &&
      this.loginObj.password === 'student123'
    ) {
      // Simule un etudiant
      const user = { role: 'student' };
      localStorage.setItem('userRole', user.role);
      console.log('Utilisateur connecté en tant que student.');
      this.router.navigate(['/student/home']); // Redirige vers une route étudiant
    } else if (
      this.loginObj.email === 'membre@example.com' &&
      this.loginObj.password === 'membre123'
    ) {
      // Simule un membre
      const user = { role: 'membre' };
      localStorage.setItem('userRole', user.role);
      console.log('Utilisateur connecté en tant que membre.');
      this.router.navigate(['/membre/home']); // Redirige vers une route étudiant
    } else {
      // Erreur si les identifiants sont incorrects
      console.log('Email ou mot de passe incorrect.');
      alert('Identifiants invalides. Veuillez réessayer.');
    }
  }
}
