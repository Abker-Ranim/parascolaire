import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import de CommonModule
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule], // Assurez-vous d'importer CommonModule
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
})
export class ClubComponent implements OnInit {
  userRole: string = ''; // Le rôle de l'utilisateur (admin, club, student, membre)

  showForm = false;
  clubCards: any[] = []; // Tableau pour stocker les cartes des clubs
  newClub = {
    name: '',
    email: '',
    password: '',
    date: '',
    description: '',
    imageUrl: '',
  };
  selectedClub: any; // Variable pour stocker les informations du club sélectionné

  constructor(private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole') || 'membre';
    // Charger les cartes depuis le LocalStorage si elles existent
    const savedCards = localStorage.getItem('clubCards');
    if (savedCards) {
      this.clubCards = JSON.parse(savedCards);
    }

    // Récupérer l'ID du club depuis les paramètres de l'URL (si existe)
    this.route.params.subscribe((params) => {
      const clubId = params['clubId'];
      if (clubId) {
        this.selectedClub = this.clubCards.find((club) => club.id === +clubId); // Récupère le club par ID
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmit() {
    // Vérifier que tous les champs obligatoires sont remplis
    this.spinner.show();
    setTimeout(() => {
      if (
        !this.newClub.name ||
        !this.newClub.email ||
        !this.newClub.password ||
        !this.newClub.date ||
        !this.newClub.description
      ) {
        alert('Please fill in all required fields!');
        return;
      }
  
      // Ajout de la nouvelle carte au tableau des cartes de club
      const newClubWithId = { ...this.newClub, id: Date.now() }; // Utiliser Date.now() pour générer un ID unique
      this.clubCards.push(newClubWithId);
  
      // Sauvegarder les cartes dans le LocalStorage
      localStorage.setItem('clubCards', JSON.stringify(this.clubCards));
  
      // Réinitialisation du formulaire
      this.newClub = {
        name: '',
        email: '',
        password: '',
        date: '',
        description: '',
        imageUrl: '',
      };
      this.showForm = false;
      this.spinner.hide(); // Ferme le formulaire après la soumission
    },500);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newClub.imageUrl = e.target.result; // Enregistre l'image en base64
      };
      reader.readAsDataURL(file);
    }
  }

  // Méthode pour naviguer vers la page de profil d'un club lorsqu'on clique sur une carte
  navigateToClubProfile(clubId: number) {
    this.router.navigate([`/${this.userRole}/club/${clubId}`]);
  }
}
