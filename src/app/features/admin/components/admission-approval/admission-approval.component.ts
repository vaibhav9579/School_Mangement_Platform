import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdmissionService } from '../../../../shared/services/admission.service';

@Component({
  selector: 'app-admission-approval',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admission-approval.component.html',
  styleUrls: ['./admission-approval.component.css']
})
export class AdmissionApprovalComponent {
  pending: any[] = [];
  remarks: string = "";

  constructor(private svc: AdmissionService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.svc.getAdmissions({ status: 'pending' }).subscribe({
      next: (d) => (this.pending = d),
      error: (e) => console.error(e),
    });
  }

  approve(id: number) {
    this.svc.approveAdmission(id).subscribe(() => this.load());
  }

  reject(id: number) {
    const r = prompt('Enter rejection remarks:');
    if (r !== null) {
      this.svc.rejectAdmission(id, r).subscribe(() => this.load());
    }
  }

  // ✅ Helper function to extract initials
  getInitials(fullName: string): string {
    if (!fullName) return '';
    return fullName
      .split(' ')
      .map((x) => x[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
}
