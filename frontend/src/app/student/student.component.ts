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
import { MatSort, MatSortModule } from '@angular/material/sort';
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
    MatSortModule,
  ],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  showForm = false;
  listStudent: any[] = [];
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
    const savedStudents = localStorage.getItem('listStudent');
    if (savedStudents) {
      this.listStudent = JSON.parse(savedStudents);
      this.dataSource.data = this.listStudent;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmit() {
    this.spinner.show();

    setTimeout(() => {
      if (
        !this.newStudent.firstname ||
        !this.newStudent.lastname ||
        !this.newStudent.email
      ) {
        alert('Please fill in all required fields!');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.newStudent.email)) {
        alert('Please enter a valid email address!');
        return;
      }

      const newStudentWithId = { ...this.newStudent, id: Date.now() };
      this.listStudent = [...this.listStudent, newStudentWithId];
      this.dataSource.data = this.listStudent;

      localStorage.setItem('listStudent', JSON.stringify(this.listStudent));

      this.newStudent = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        birthday: '',
      };
      this.showForm = false;
      this.spinner.hide();
    }, 500);
  }
}
