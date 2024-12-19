import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  newClassroom: {
    num: string;
    capacity: string;
    available: boolean;
   
  } = { num: '', capacity: '', available: true };

  listClassroom: any[] = [];
  showForm = false; // Control the visibility of the form

  ngOnInit(): void {
    // Load classrooms from localStorage if available
    const savedClassrooms = localStorage.getItem('listClassroom');
    if (savedClassrooms) {
      this.listClassroom = JSON.parse(savedClassrooms);
    }
  }

  // Toggle the form visibility
  toggleForm(): void {
    this.showForm = !this.showForm; // If form is visible, hide it; otherwise, show it
  }

  onSubmitClassroom() {
      // Vérifier que tous les champs obligatoires sont remplis
   if (!this.newClassroom.num || !this.newClassroom.capacity || !this.newClassroom.available) {
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

    // Save to localStorage
    localStorage.setItem('listClassroom', JSON.stringify(this.listClassroom));

    // Reset the form
    this.newClassroom = { num: '', capacity: '', available: true };
    this.showForm = false; // Close form after submission
  }
}
