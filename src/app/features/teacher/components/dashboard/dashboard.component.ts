import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
myStudents = 3;
  assignedClassesCount = 1;
  homeworkAssigned = 1;
  assignedClasses = ['10A'];

  constructor(private router: Router) {}

  markAttendance() {
    this.router.navigate(['/attendance']);
  }

  uploadResults() {
    this.router.navigate(['/upload-results']);
  }

  assignHomework() {
    this.router.navigate(['/assign-homework']);
  }

  chatWithStudents() {
    this.router.navigate(['/chat']);
  }
}
