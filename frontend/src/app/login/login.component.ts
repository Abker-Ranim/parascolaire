import { Component, OnInit } from '@angular/core';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms'; // Import pour ngModel
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, NgxSpinnerModule], // Ajouter FormsModule et FontAwesomeModule ici
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Corrige le styleUrl en styleUrls
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;

  loginObj: any = {
    email: '',
    password: '',
    show: false,
  };

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
   
  }

  ngOnInit(): void {}
  onLogin() {
    this.spinner.show();
    setTimeout(() => {
      if (
        this.loginObj.email === 'admin@example.com' &&
        this.loginObj.password === 'admin123'
      ) {
        const user = { role: 'admin' };
        localStorage.setItem('userRole', user.role);
        console.log("Utilisateur connecté en tant qu'admin.");
        this.router.navigate(['/admin/dashboard']);
      } else if (
        this.loginObj.email === 'club@example.com' &&
        this.loginObj.password === 'club123'
      ) {
        const user = { role: 'club' };
        localStorage.setItem('userRole', user.role);
        console.log('Utilisateur connecté en tant que club.');
        this.router.navigate(['/club/profile']);
      } else if (
        this.loginObj.email === 'student@example.com' &&
        this.loginObj.password === 'student123'
      ) {
        const user = { role: 'student' };
        localStorage.setItem('userRole', user.role);
        console.log('Utilisateur connecté en tant que student.');
        this.router.navigate(['/student/home']);
      } else if (
        this.loginObj.email === 'membre@example.com' &&
        this.loginObj.password === 'membre123'
      ) {
        const user = { role: 'membre' };
        localStorage.setItem('userRole', user.role);
        console.log('Utilisateur connecté en tant que membre.');
        this.router.navigate(['/membre/home']);
      } else {
        console.error('Invalid login credentials');
      }
      this.spinner.hide();
    }, 300); // Simulate a delay for demonstration purposes
  }
}
