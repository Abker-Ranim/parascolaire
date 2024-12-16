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
    this.router.navigate(['club']);
  }
  user = {
    name: 'Kevin Anderson',
    role: 'UI Designer',
    about: 'A passionate UI designer.',
    phone: '123456789',
    email: 'kevin@example.com',
    facebook: 'kevin_fb',
    instagram: 'kevin_insta',
    linkedin: 'kevin_linkedin',
    creationDate: '2022/06/01',
  };

  onSaveChanges() {
    // Sauvegarder les changements ici

    // Après avoir sauvegardé les changements, revenir à l'onglet Overview
    this.activateTab('profile-overview');
  }

  activateTab(tabId: string) {
    // Cette méthode peut être utilisée pour activer le bon onglet via la classe CSS ou autre logique
    // Par exemple, en utilisant un ViewChild et une méthode de gestion des onglets si vous êtes sur Angular
  }
}
