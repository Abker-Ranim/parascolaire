import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  showForm = false;
  listStudent: any[] = []; // Liste des étudiants
  newStudent = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    birthday: ''
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Chargement des étudiants depuis localStorage s'ils existent
    const savedStudents = localStorage.getItem('listStudent');
    if (savedStudents) {
      this.listStudent = JSON.parse(savedStudents);
    }
  }

  toggleForm() {
    this.showForm = !this.showForm; // Afficher/Masquer le formulaire
  }

  onSubmit() {
    // Vérifier que tous les champs obligatoires sont remplis
    if (!this.newStudent.firstname || !this.newStudent.lastname || !this.newStudent.email) {
      alert('Please fill in all required fields!');
      return;
    }
  
    // Ajouter un étudiant avec un ID unique
    const newStudentWithId = { ...this.newStudent, id: Date.now() };
    this.listStudent = [...this.listStudent, newStudentWithId]; // Créer une nouvelle référence du tableau
  
    // Sauvegarder la liste mise à jour dans le localStorage
    localStorage.setItem('listStudent', JSON.stringify(this.listStudent));
  
    // Réinitialiser le formulaire
    this.newStudent = { firstname: '', lastname: '', email: '', password: '', birthday: '' };
    this.showForm = false; // Fermer le formulaire après soumission
  }
}  
