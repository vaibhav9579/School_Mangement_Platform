import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admission-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admission-confirmation.component.html',
  styleUrl: './admission-confirmation.component.css'
})
export class AdmissionConfirmationComponent {
  admissionId: number | null = null;
  admissionNo: string | null = null;
  assignedSection: string | null = null;
  studentLogin = { username: '', password: '' };

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras?.state as any;
    if (state) {
      this.admissionId = state.id;
      this.admissionNo = state.admissionNo;
      this.assignedSection = state.class || state.program || 'Not assigned';
      this.studentLogin.username = `stu${this.admissionId || Math.floor(Math.random()*9000)}`;
      this.studentLogin.password = `Pass@${Math.floor(1000 + Math.random()*9000)}`;
    }
  }

  goToProfile() {
    if (this.admissionId) this.router.navigate(['/student', this.admissionId]);
    else this.router.navigate(['/clerk/admissions']);
  }
}
