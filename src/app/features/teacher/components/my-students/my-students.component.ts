import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AcademicServiceService } from '../../../../shared/services/academic-service.service';
import { AdmissionService } from '../../../../shared/services/admission.service';
import { AuthServiceService } from '../../../../shared/services/auth-service.service';

export interface Student {
  id: string;
  name: string;
  class: string;
  email: string;
}

@Component({
  selector: 'app-my-students',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './my-students.component.html',
  styleUrl: './my-students.component.css'
})
export class MyStudentsComponent implements OnInit {
  public assignedClasses: any[] = [];
  dataSource = new MatTableDataSource<Student>();
  
  // 👇 define column config dynamically
  displayedColumns: string[] = ['id', 'name', 'class', 'contact', 'email', 'actions'];
  constructor(
    private _authService: AuthServiceService,
    private _academicService: AcademicServiceService,
    private _admissionService: AdmissionService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    // load dummy for now
    this.dataSource.data = [];
  }

  getUserDetails() {
    const userId = this._authService.getUserId();

    if (userId !== null) {
      this._academicService.getParticularClassByclassId(userId).subscribe(data => {
        this.assignedClasses = data;
        if (this.assignedClasses.length > 0) {
          this.getTotalStudents(this.assignedClasses[0].id)
        }
      });
    } else {
      console.error('User ID is null');
    }
  }
  
  getTotalStudents(classId: number) {
    this._admissionService.getAdmissionsByClass(classId).subscribe((studentData: any[]) => {
      if (studentData.length > 0) {
        // Map backend data to Student interface (adjust keys accordingly)
        this.dataSource.data = studentData.map((s: any) => ({
          id: s.id,
          name: s.full_name || `${s.first_name} ${s.last_name}`,
          class: s.class_id,
          contact: s.candidate_contact,
          email: s.candidate_mail
        }));
      }
    })
  }

  viewDetails(student: Student) {
    alert(`Viewing details for ${student.name}`);
  }
}
