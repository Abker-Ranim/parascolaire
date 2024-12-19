import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // Liste des clubs
  clubs: string[] = ['Club A', 'Club B', 'Club C'];
  userRole: string = ''; // Le rôle de l'utilisateur (admin, club, student, membre)
  constructor(private router: Router, private spinner: NgxSpinnerService) {}
  // Nouveau événement
  newEvent = {
    nom: '',
    dateDebut: '',
    heureDebut: '',
    dateFin: '',
    heureFin: '',
    imageUrl: '',
    clubOrganisateur: '',
    customOrganisateur: '',
    description: '',
  };
  // Liste des événements
  events: any[] = [];

  // Variables pour contrôler l'état du formulaire
  showForm = false;
  isOtherSelected = false;
  // spinner: any;

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') || 'membre';
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      this.events = JSON.parse(savedEvents);
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  checkIfOtherSelected(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.isOtherSelected = selectedValue === 'Autre';
    if (this.isOtherSelected) {
      this.newEvent.customOrganisateur = '';
    }
  }

  onSubmitEvent(): void {
    this.spinner.show(); // Affiche le spinner au début
  
    // Simulez un délai pour tester le spinner
    setTimeout(() => {
      if (
        !this.newEvent.nom ||
        !this.newEvent.dateDebut ||
        !this.newEvent.heureDebut ||
        !this.newEvent.dateFin ||
        !this.newEvent.heureFin ||
        !this.newEvent.clubOrganisateur ||
        !this.newEvent.description
      ) {
        this.spinner.hide(); // Cache le spinner si validation échoue
        alert('Please fill in all required fields!');
        return;
      }
  
      // Ajout de l'événement
      this.events.push({ ...this.newEvent });
      localStorage.setItem('events', JSON.stringify(this.events));
  
      // Réinitialisation du formulaire
      this.newEvent = {
        nom: '',
        dateDebut: '',
        heureDebut: '',
        dateFin: '',
        heureFin: '',
        imageUrl: '',
        clubOrganisateur: '',
        customOrganisateur: '',
        description: '',
      };
      this.isOtherSelected = false;
      this.showForm = false;
  
      this.spinner.hide(); // Cache le spinner après l'opération
    }, 500); // Simule un délai de 2 secondes pour les tests
  }
  

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newEvent.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
