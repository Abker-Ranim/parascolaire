import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatTableDataSource,
  MatTableModule,
  MatTable,
} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    NgxSpinnerModule,
  ],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  showForm = false;
  listStudent: any[] = []; // Liste des étudiants
  newStudent = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    birthday: '',
  };
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'birthday'];
  dataSource = new MatTableDataSource<any>(this.listStudent);

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    // Chargement des étudiants depuis localStorage s'ils existent
    const savedStudents = localStorage.getItem('listStudent');
    if (savedStudents) {
      this.listStudent = JSON.parse(savedStudents);
      this.dataSource.data = this.listStudent;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toggleForm() {
    this.showForm = !this.showForm; // Afficher/Masquer le formulaire
  }

  onSubmit() {
    this.spinner.show(); // Affiche le spinner au début

    // Simulez un délai pour tester le spinner
    setTimeout(() => {
      // Vérifier que tous les champs obligatoires sont remplis
      if (
        !this.newStudent.firstname ||
        !this.newStudent.lastname ||
        !this.newStudent.email
      ) {
        alert('Please fill in all required fields!');
        return;
      }

      // Vérifier si l'email est valide
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.newStudent.email)) {
        alert('Please enter a valid email address!');
        return;
      }

      // Ajouter un étudiant avec un ID unique
      const newStudentWithId = { ...this.newStudent, id: Date.now() };
      this.listStudent = [...this.listStudent, newStudentWithId]; // Créer une nouvelle référence du tableau
      this.dataSource.data = this.listStudent; // Mettre à jour la source des données

      // Sauvegarder la liste mise à jour dans le localStorage
      localStorage.setItem('listStudent', JSON.stringify(this.listStudent));

      // Réinitialiser le formulaire
      this.newStudent = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        birthday: '',
      };
      this.showForm = false;
      this.spinner.hide(); // Fermer le formulaire après soumission
    }, 500);
  }
}
