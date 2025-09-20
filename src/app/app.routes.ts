import { Routes } from '@angular/router';
import { RoleGuard } from './role.guard'; 
export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin-routing.module'),
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] }
  },
  // Teacher root
  {
    path: 'teacher',          
    loadChildren: () => import('./features/teacher/teacher-routing.module').then(m => m.TEACHER_ROUTES),
    canActivate: [RoleGuard],
    data: { roles: ['Teacher'] }
  },

  // Student root
  {
    path: 'student',
    loadChildren: () => import('./features/student/student-routing.module').then(m => m.STUDENT_ROUTES),
    canActivate: [RoleGuard],
    data: { roles: ['Student'] }
  },

  // Clerk root
  {
    path: 'clerk',
    loadChildren: () => import('./features/clerk/clerk-routing.module').then(m => m.CLERK_ROUTES),
    canActivate: [RoleGuard],
    data: { roles: ['Clerk'] }
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
