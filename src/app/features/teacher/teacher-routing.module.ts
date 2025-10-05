// src/app/layout/teacher/teacher.routes.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyStudentsComponent } from './components/my-students/my-students.component';
import { UploadResultComponent } from './components/upload-result/upload-result.component';
import { AssignHomeworkComponent } from './components/assign-homework/assign-homework.component';
import { ChatComponent } from './components/chat/chat.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { MyLeaveComponent } from './components/my-leave/my-leave.component';
import { StudentLeaveComponent } from './components/student-leave/student-leave.component';
import { LeaveRequestFormComponent } from '../../features/teacher/components/leave-request-form/leave-request-form.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { FillMarkComponent } from './fill-mark/fill-mark.component';
import { FillClasswiseMarkComponent } from './fill-classwise-mark/fill-classwise-mark.component';
export const TEACHER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../../shared/layout/teacher-layout/teacher-layout.component').then(m => m.TeacherLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'my-students', component: MyStudentsComponent },
      { path: 'upload-result', component: UploadResultComponent },
      { path: 'assign-homework', component: AssignHomeworkComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'studentLeave', component: StudentLeaveComponent },
      { path: 'myleave', component: MyLeaveComponent },
      { path: 'leaverequest', component: LeaveRequestComponent },
      { path: 'class', component: FillMarkComponent, },
      { path: 'fill_mark/:classs_id', component: FillClasswiseMarkComponent, },
    ]
  }
];

// @NgModule({
//   declarations: [],
//   imports : [RouterModule.forChild(TEACHER_ROUTES)],
//   exports : []
// })

// export class TeacherRoutingModule{}