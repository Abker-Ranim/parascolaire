import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRole = localStorage.getItem('userRole');  // Récupère le rôle de l'utilisateur
    const expectedRole = route.data['role'];  // Rôle attendu pour cette route

    // Log pour vérifier les valeurs
    console.log('Rôle de l\'utilisateur:', userRole);
    console.log('Rôle attendu:', expectedRole);

    if (userRole && userRole.trim().toLowerCase() === expectedRole.toLowerCase()) {
      return true;  // L'utilisateur a le rôle correct
    } else {
      console.error('Accès refusé : rôle non autorisé');
      this.router.navigate(['/login']);  // Redirection vers la page de connexion
      return false;  // Empêche l'accès à la route
    }
  }
}
