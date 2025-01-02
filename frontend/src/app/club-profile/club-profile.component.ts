import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-club-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './club-profile.component.html',
  styleUrl: './club-profile.component.css',
})
export class ClubProfileComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  onReturnClick(): void {
    this.router.navigate([`/${this.userRole}/club`]);
  }
  club = {
    name: 'club',
    description: 'club club',
    phone: '123456789',
    email: 'club@example.com',
    facebook: 'club',
    instagram: 'club',
    linkedin: 'club',
    creationDate: '2022/06/01',
  };

  onSaveChanges() {
    this.activateTab('profile-overview');
  }

  activateTab(tabId: string) {}
  userRole: string = ''; // Le rôle de l'utilisateur (admin, club, student, membre)

  ngOnInit(): void {
    // Simulez la récupération du rôle (remplacez ceci par votre logique réelle)
    this.userRole = localStorage.getItem('userRole') || 'membre'; // Exemple : 'admin', 'club', 'student', ou 'membre'
  }
}
