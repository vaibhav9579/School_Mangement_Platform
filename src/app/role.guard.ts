// src/app/core/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthServiceService } from './shared/services/auth-service.service'; 

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = (route.data['roles'] as string[]) || [];
    const userRole = this.auth.getRole();

    if (!userRole) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!allowedRoles.length || allowedRoles.includes(userRole)) {
      return true;
    }

    // unauthorized for this role -> redirects
    this.router.navigate(['/login']);
    return false;
  }
}
