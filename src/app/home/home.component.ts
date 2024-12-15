import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // Liste des clubs
  clubs: string[] = ['Club A', 'Club B', 'Club C'];

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

  ngOnInit(): void {
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
    if (
      !this.newEvent.nom ||
      !this.newEvent.dateDebut ||
      !this.newEvent.heureDebut ||
      !this.newEvent.dateFin ||
      !this.newEvent.heureFin ||
      !this.newEvent.clubOrganisateur ||
      !this.newEvent.description
    ) {
      alert('Please fill in all required fields!');
      return;
    }

    this.events.push({ ...this.newEvent });
    localStorage.setItem('events', JSON.stringify(this.events));
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
