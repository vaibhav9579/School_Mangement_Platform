// admission-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Admission, AdmissionService } from '../../../../shared/services/admission.service';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admission',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']})
export class AdmissionComponent implements OnInit {
  admissions: Admission[] = [];
  stats = { pending: 0, approved: 0, rejected: 0, drafts: 0 };
  filter = { department: '', klass: '', section: '' };

  constructor(
     private svc: AdmissionService,
     private router: Router) {}

  ngOnInit(): void { this.load(); }

  load() {
    // optionally pass filters
    this.svc.getAdmissions().subscribe({
      next: (list) => {
        this.admissions = list;
        this.recalc();
      },
      error: (err) => console.error(err)
    });
  }

  recalc() {
    this.stats.pending = this.admissions.filter(a => a.status === 'pending').length;
    this.stats.approved = this.admissions.filter(a => a.status === 'approved').length;
    this.stats.rejected = this.admissions.filter(a => a.status === 'rejected').length;
    this.stats.drafts = this.admissions.filter(a => a.status === 'draft').length;
  }

  newAdmission() {
    this.router.navigate(['clerk/new-admission']);
  }

  view(a: Admission) {
    this.router.navigate(['clerk/admission', a.id]);
  }

  edit(a: Admission) {
    this.router.navigate(['clerk/confirm-admission', a.id]);
  }

  approve(a: Admission) {
    if (!a.id) return;
    this.svc.approveAdmission(a.id).subscribe(() => this.load());
  }
}

