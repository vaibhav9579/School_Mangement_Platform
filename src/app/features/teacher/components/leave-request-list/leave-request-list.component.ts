import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveRequestService } from '../../../../shared/services/leave-request.service';
import { LeavePolicy } from '../../../../shared/models/leave-policy';
import { LeaveRequest } from '../../../../shared/models/leave-request';
@Component({
  selector: 'app-leave-request-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave-request-list.component.html',
  styleUrls: ['./leave-request-list.component.css']
})
export class LeaveRequestListComponent implements OnInit {
  requests: LeaveRequest[] = [];

  constructor(private leaveRequestService: LeaveRequestService) {}

  ngOnInit() {
    const userId = 1; // 🔑 from auth
    this.leaveRequestService.getLeaveRequestsByUser(userId).subscribe(data => {
      this.requests = data;
    });
  }
}
