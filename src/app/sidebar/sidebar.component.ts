import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userRole: string = ''; // Le rôle de l'utilisateur (admin, club, student, membre)

  ngOnInit(): void {
    // Simulez la récupération du rôle (remplacez ceci par votre logique réelle)
    this.userRole = localStorage.getItem('userRole') || 'membre'; // Exemple : 'admin', 'club', 'student', ou 'membre'
  }
}
