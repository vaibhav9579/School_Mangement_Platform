// src/app/layout/admin/admin.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeeManagementComponent } from './components/fee-management/fee-management.component';
import { ResultComponent } from './components/result/result.component';
import { ManageTeacherComponent } from './components/manage-teacher/manage-teacher.component';
import { IdCardComponent } from './components/id-card/id-card.component';
import { ManageStudentsComponent } from './components/manage-students/manage-students.component';
import { NotificationComponent } from './components/notification/notification.component';
import { UserComponent } from './components/user/user.component';
import { ClassCreationComponent } from './components/class-creation/class-creation.component';
import { ApproveLeaveComponent } from './components/approve-leave/approve-leave.component';
import { LeaveAllotmentComponent } from './components/leave-allotment/leave-allotment.component';
import { AddRoleComponent } from './components/add-role/add-role.component';
import { LeavePolicyComponent } from './components/leave-policy/leave-policy.component';
import { AdmissionApprovalComponent } from './components/admission-approval/admission-approval.component';

 const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../../shared/layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'fee', component: FeeManagementComponent },
      { path: 'result', component: ResultComponent },
      { path: 'notification', component: NotificationComponent },
      // { path: 'teacher', component: ManageTeacherComponent },
      { path: 'id', component: IdCardComponent },
      { path: 'student', component: ManageStudentsComponent },
      { path: 'user', component: UserComponent },
      { path: 'class', component: ClassCreationComponent },
      { path: 'leave', component: ApproveLeaveComponent },
      { path: 'Allotleave', component: LeaveAllotmentComponent },
      { path: 'addrole', component: AddRoleComponent },
      { path: 'leave-policy', component: LeavePolicyComponent },
      { path: 'admission-approve', component: AdmissionApprovalComponent },
      
    ] 
  }
];

export default ADMIN_ROUTES;
