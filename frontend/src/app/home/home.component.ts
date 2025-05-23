import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
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
  @ViewChild('formContainer') formContainer!: ElementRef;
  eventService: any;
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
    createdAt: '',
  };
  // Liste des événements
  Events: any[] = [];

  // Variables pour contrôler l'état du formulaire
  showForm = false;
  isOtherSelected = false;
  // spinner: any;
  sortEvents(): void {
    this.Events.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }
  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') || 'membre';
    const savedEvents = localStorage.getItem('Events');
    if (savedEvents) {
      this.Events = JSON.parse(savedEvents);
      this.sortEvents();
    }
  }
  closeFormOnOutsideClick(event: MouseEvent) {
    // Vérifiez si l'événement vient de l'extérieur
    this.showForm = false;
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
    this.spinner.show();
    this.newEvent.createdAt = new Date().toISOString();

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

      const eventId = new Date().getTime();
      this.Events.push({ ...this.newEvent, id: eventId });
      this.sortEvents();
      localStorage.setItem('Events', JSON.stringify(this.Events));

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
        createdAt: '',
      };
      this.isOtherSelected = false;
      this.showForm = false;

      this.spinner.hide(); 
    }, 500); 
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      this.showForm &&
      this.formContainer &&
      !this.formContainer.nativeElement.contains(event.target as Node)
    ) {
      this.showForm = false;
    }
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
  deleteEvent(eventId: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          this.loadEvents();
        },
        error: (error: any) => {
          console.error('Error deleting event:', error);
        },
      });
    }
  }
  loadEvents() {
    throw new Error('Method not implemented.');
  }

  favorites: { [key: number]: boolean } = {};

  favoriteEvent(eventId: number): void {
    this.favorites[eventId] = !this.favorites[eventId];
  }
}
