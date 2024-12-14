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
    this.router.navigate(['body']);
  }
}
