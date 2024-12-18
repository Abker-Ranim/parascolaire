import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
  isSidebarCollapsed: boolean = false; // État pour la sidebar

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed; // Inverse l'état
  }
}
