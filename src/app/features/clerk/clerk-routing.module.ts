import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeeManagementComponent } from '../admin/components/fee-management/fee-management.component';
import { NotificationComponent } from '../admin/components/notification/notification.component';
import { ManageTeacherComponent } from '../admin/components/manage-teacher/manage-teacher.component';
import { IdCardComponent } from '../admin/components/id-card/id-card.component';
import { AttendanceComponent } from '../student/component/attendance/attendance.component';
import { ClassCreationComponent } from '../admin/components/class-creation/class-creation.component';
import { AdmissionFormComponent } from './components/admission-form/admission-form.component';
import { AdmissionConfirmationComponent } from './components/admission-confirmation/admission-confirmation.component';
import { AdmissionComponent } from './components/admission/admission.component';
import { SubjectAssignComponent } from './components/subject-assign/subject-assign.component';
import { ClassTeacherComponent } from './components/class-teacher/class-teacher.component';
import { AssignSubjectToTeacherComponent } from './components/assign-subject-to-teacher/assign-subject-to-teacher.component';
export const CLERK_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../shared/layout/clerk-layout/clerk-layout.component').then(
        (m) => m.ClerkLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'fee', component: FeeManagementComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'studentrecord', component: NotificationComponent },
      { path: 'teacherrecord', component: ManageTeacherComponent },
      { path: 'payment', component: IdCardComponent },
      { path: 'class-creation', component: ClassCreationComponent },

      // Admission Module Routes
      { path: 'admission', component: AdmissionComponent },
      { path: 'new-admission', component: AdmissionFormComponent },
      { path: 'confirm-admission', component: AdmissionConfirmationComponent },
      { path: 'subject-assign', component: SubjectAssignComponent },
      { path: 'class-teacher', component: ClassTeacherComponent },
      { path: 'subject-teacher', component: AssignSubjectToTeacherComponent },
    ],
  },
];
