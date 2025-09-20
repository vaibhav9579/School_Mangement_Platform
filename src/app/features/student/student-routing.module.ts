// src/app/layout/student/student.routes.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';


export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../../shared/layout/student-layout/student-layout.component').then(m => m.StudentLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {path : 'dashboard', component: DashboardComponent},
      // {path : '', component: },
      // {path : '', component: },
      // {path : '', component: },
      // {path : '', component: }
    //   { path: 'dashboard', loadComponent: () => import('../../features/student/dashboard.component').then(m => m.StudentDashboardComponent) },
    //   { path: 'my-attendance', loadComponent: () => import('../../features/student/attendance.component').then(m => m.StudentAttendanceComponent) },
    ]
  }
];

