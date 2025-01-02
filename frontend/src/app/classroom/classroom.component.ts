import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatTableDataSource,
  MatTableModule,
  MatTable,
} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css'],
})
export class ClassroomComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;
  newClassroom: {
    num: string;
    capacity: string;
    available: boolean;
  } = { num: '', capacity: '', available: true };
  displayedColumns: string[] = ['num', 'capacity', 'available'];
  dataSource = new MatTableDataSource<any>([]);
  listClassroom: any[] = [];
  showForm = false; // Control the visibility of the form
  @ViewChild('formContainer') formContainer!: ElementRef;
  constructor(private spinner: NgxSpinnerService) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    // Load classrooms from localStorage if available
    const savedClassrooms = localStorage.getItem('listClassroom');
    if (savedClassrooms) {
      this.listClassroom = JSON.parse(savedClassrooms);
      this.dataSource.data = this.listClassroom;
    }
  }

  // Toggle the form visibility
  toggleForm(): void {
    this.showForm = !this.showForm; // If form is visible, hide it; otherwise, show it
  }
  closeFormOnOutsideClick(event: MouseEvent) {
    // Vérifiez si l'événement vient de l'extérieur
    this.showForm = false;
  }
  onSubmitClassroom() {
    // Vérifier que tous les champs obligatoires sont remplis
    this.spinner.show(); // Affiche le spinner au début

    // Simulez un délai pour tester le spinner
    setTimeout(() => {
      if (
        !this.newClassroom.num ||
        !this.newClassroom.capacity ||
        !this.newClassroom.available
      ) {
        alert('Please fill in all required fields!');
        return;
      }

      // Ensure 'available' is a boolean
      const available = this.newClassroom.available === true;

      const newClassroomWithId = {
        ...this.newClassroom,
        available: available,
      };

      // Add new classroom to the list
      this.listClassroom.push(newClassroomWithId);
      this.dataSource.data = this.listClassroom; // Mettre à jour la source des données

      // Save to localStorage
      localStorage.setItem('listClassroom', JSON.stringify(this.listClassroom));

      // Reset the form
      this.newClassroom = { num: '', capacity: '', available: true };
      this.showForm = false;
      this.spinner.hide();
    }, 500);
   
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.showForm && this.formContainer && !this.formContainer.nativeElement.contains(event.target as Node)) {
      this.showForm = false;
    }
  }
}
