import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeaveRequestService } from '../../../../shared/services/leave-request.service';
import { LeavePolicy } from '../../../../shared/models/leave-policy';
// import { LeaveRequest } from '../../../../shared/models/leave-request';

@Component({
  selector: 'app-leave-request-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-request-form.component.html',
  styleUrls: ['./leave-request-form.component.css']
})

export class LeaveRequestFormComponent {
  leave: LeavePolicy = {
    policy_id: 0,
    role_id: 0,
    leave_type: '',
    allowed_days: 0
  };

  constructor(private leaveRequestService: LeaveRequestService) { }

  submitForm() {
    this.leaveRequestService.applyLeave(this.leave).subscribe(() => {
      alert('Leave applied successfully!');
    });
  }
}
