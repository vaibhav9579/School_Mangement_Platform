import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveRequestService } from '../../../../shared/services/leave-request.service';

@Component({
  selector: 'app-leave-balance',
  imports: [],
  templateUrl: './leave-balance.component.html',
  styleUrl: './leave-balance.component.css'
})
export class LeaveBalanceComponent {
  balance: any = {};

  constructor(private leaveRequestService: LeaveRequestService) {}

  ngOnInit() {
    const userId = 1; // 🔑 Replace with logged-in user ID from auth service
    this.leaveRequestService.getLeaveBalance(userId).subscribe(data => {
      this.balance = data;
    });
  }
}
