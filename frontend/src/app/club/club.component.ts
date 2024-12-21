import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
})
export class ClubComponent implements OnInit {
  userRole: string = '';

  showForm = false;
  clubCards: any[] = [];
  newClub = {
    name: '',
    email: '',
    password: '',
    date: '',
    description: '',
    imageUrl: '',
  };
  selectedClub: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole') || 'membre';
    const savedCards = localStorage.getItem('clubCards');
    if (savedCards) {
      this.clubCards = JSON.parse(savedCards);
    }

    this.route.params.subscribe((params) => {
      const clubId = params['clubId'];
      if (clubId) {
        this.selectedClub = this.clubCards.find((club) => club.id === +clubId);
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmit() {
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
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.newClub.email)) {
        alert('Please enter a valid email address!');
        return;
      }
      const newClubWithId = { ...this.newClub, id: Date.now() };
      this.clubCards.push(newClubWithId);

      localStorage.setItem('clubCards', JSON.stringify(this.clubCards));

      this.newClub = {
        name: '',
        email: '',
        password: '',
        date: '',
        description: '',
        imageUrl: '',
      };
      this.showForm = false;
      this.spinner.hide();
    }, 500);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newClub.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  navigateToClubProfile(clubId: number) {
    this.router.navigate([`/${this.userRole}/club/${clubId}`]);
  }
}
