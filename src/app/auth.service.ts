// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(user: { role: string }): void {
    localStorage.setItem('userRole', user.role);
  }

  getRole(): string {
    return localStorage.getItem('userRole') || '';
  }

  isAuthenticated(): boolean {
    // Vérifie si un rôle d'utilisateur existe
    return !!localStorage.getItem('userRole');
  }

  logout(): void {
    localStorage.removeItem('userRole');
  }

  // Nouvelle méthode pour obtenir un rôle et gérer l'authentification
  getCurrentUserRole(): string {
    return this.getRole();
  }
}
