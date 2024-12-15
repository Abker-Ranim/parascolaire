import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(user: { role: string }): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('userRole', user.role);
    }
  }

  getRole(): string {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('userRole') || '';
    }
    return '';
  }

  isAuthenticated(): boolean {
    // Vérifie si un rôle d'utilisateur existe dans localStorage, seulement côté client
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('userRole');
    }
    return false; // Retourner false si l'environnement n'est pas un navigateur
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('userRole');
    }
  }

  // Nouvelle méthode pour obtenir un rôle et gérer l'authentification
  getCurrentUserRole(): string {
    return this.getRole();
  }
}
