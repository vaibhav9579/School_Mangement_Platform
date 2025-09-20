

import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeeManagementComponent } from '../admin/components/fee-management/fee-management.component';
import { ResultComponent } from '../admin/components/result/result.component';
import { NotificationComponent } from '../admin/components/notification/notification.component';
import { ManageTeacherComponent } from '../admin/components/manage-teacher/manage-teacher.component';
import { IdCardComponent } from '../admin/components/id-card/id-card.component';
import { ManageStudentsComponent } from '../admin/components/manage-students/manage-students.component';
import { UserComponent } from '../admin/components/user/user.component';
import { ClassCreationComponent } from '../admin/components/class-creation/class-creation.component';
import { ClerkLayoutComponent } from '../../shared/layout/clerk-layout/clerk-layout.component';
import { AttendanceComponent } from '../student/component/attendance/attendance.component';
import { AdmissionComponent } from './components/admission/admission.component';

export const CLERK_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../../shared/layout/clerk-layout/clerk-layout.component').then(m => m.ClerkLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'fee', component: FeeManagementComponent },
      {path: 'admission', component : AdmissionComponent},
      { path: 'attendence', component: AttendanceComponent },
      { path: 'studentrecord', component: NotificationComponent },
      { path: 'teacherrecord', component: ManageTeacherComponent },
      { path: 'payment', component: IdCardComponent },
    ] 
  }
];
