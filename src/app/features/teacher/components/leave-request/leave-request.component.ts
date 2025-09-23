  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { MatTableModule } from '@angular/material/table';
  import { MatButtonModule } from '@angular/material/button';
  import { MatIconModule } from '@angular/material/icon';
  import { MatDialog, MatDialogModule } from '@angular/material/dialog';
  import { LeaveRequestService } from '../../../../shared/services/leave-request.service';
  import { ManageLeaveRequestDialogComponent } from '../../dialogs/manage-leave-request-dialog/manage-leave-request-dialog.component';
  import { AuthServiceService } from '../../../../shared/services/auth-service.service';

  @Component({
    selector: 'app-leave-request',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
    templateUrl: './leave-request.component.html'
  })
  export class LeaveRequestComponent implements OnInit {
    displayedColumns = ['sno', 'leave_type', 'start_date', 'end_date', 'status', 'actions'];
    dataSource: any[] = [];
    leaveBalance: any = {};
    userId: number = 0;

    constructor(
      private dialog: MatDialog,
      private leaveService: LeaveRequestService,
      private authService: AuthServiceService
    ) {
      this.userId = this.authService.getUserId() || 0;
    }

    ngOnInit(): void {
      this.loadLeaveRequests();
      this.loadLeaveBalance();
    }

    loadLeaveRequests() {
      this.leaveService.getLeaveRequestsByUser(this.userId).subscribe({
        next: data => this.dataSource = data,
        error: err => console.error(err)
      });
    }

    loadLeaveBalance() {
      this.leaveService.getLeaveBalance(this.userId).subscribe({
        next: data => this.leaveBalance = data,
        error: err => console.error(err)
      });
    }

    openLeaveDialog(action: 'create' | 'edit' | 'delete', index?: number) {
      const leaveRequest = index !== undefined ? this.dataSource[index] : null;

      this.dialog.open(ManageLeaveRequestDialogComponent, {
        width: '400px',
        data: { action, leaveRequest, leaveTypes: ["Sick-Leave", "Casual-Leave", "Special-Leave", "Other-Leave"] }
      }).afterClosed().subscribe(result => {
        if (!result) return;

        if (action === 'create') {
          this.leaveService.applyLeave({ ...result, user_id: this.userId }).subscribe(() => this.loadLeaveRequests());
        }

        if (action === 'edit' && leaveRequest?.request_id) {
          this.leaveService.updateLeaveRequest(leaveRequest.request_id, result).subscribe(() => this.loadLeaveRequests());
        }

        if (action === 'delete' && leaveRequest?.request_id) {
          this.leaveService.deleteLeaveRequest(leaveRequest.request_id).subscribe(() => this.loadLeaveRequests());
        }
      });
    }
  }
