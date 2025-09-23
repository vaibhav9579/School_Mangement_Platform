import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { LeavePolicy } from '../../../../shared/models/leave-policy';
import { LeavePolicyService } from '../../../../shared/services/leave-policy.service';
import { RoleServiceService } from '../../../../shared/services/role-service.service';
import { Roles } from '../../models/roles';
import { ManageLeavePolicyDialogComponent } from '../../dialogs/manage-leave-policy-dialog/manage-leave-policy-dialog.component';

@Component({
  selector: 'app-leave-policy',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './leave-policy.component.html',
})
export class LeavePolicyComponent implements OnInit {
  displayedColumns: string[] = ['policy_id', 'role', 'leave_type', 'allowed_days', 'actions'];
  dataSource: LeavePolicy[] = [];
  roles: Roles[] = [];
  leaveTypes = ["Sick-Leave", "Casual-Leave", "Special-Leave", "Other-Leave"];


  constructor(
    private dialog: MatDialog,
    private leavePolicyService: LeavePolicyService,
    private roleService: RoleServiceService
  ) { }

  ngOnInit(): void {
    this.loadPolicies();
    this.loadRoles();
  }

  /**
   * @description: Load roles for mapping role_id → role_name
   */
  loadRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (roles: Roles[]) => (this.roles = roles),
      error: (err) => console.error('Error loading roles:', err),
    });
  }

  /**
   * @description: Load all policies
   */
  loadPolicies(): void {
    this.leavePolicyService.getAllPolicies().subscribe({
      next: (data) => this.dataSource = data,
      error: (err) => console.error('Error loading policies:', err),
    });
  }

  /**
   * @description: Open dialog for CRUD
   */
  openPolicyDialog(action: 'create' | 'edit' | 'delete', index?: number): void {
    const policy = index !== undefined ? this.dataSource[index] : null;

    switch (action) {
      case 'create':
        this.dialog.open(ManageLeavePolicyDialogComponent, {
          width: '400px',
          data: { action: 'create', roles: this.roles }
        }).afterClosed().subscribe(result => {
          if (result) {
            this.leavePolicyService.addPolicy(result).subscribe({
              next: () => this.loadPolicies(),
              error: (err) => console.error('Error adding policy:', err),
            });
          }
        });
        break;

      case 'edit':
        const roleId = this.roles.find(r => r.name === policy?.role_name)?.id;
       
        this.dialog.open(ManageLeavePolicyDialogComponent, {
          width: '400px',
          data: {
            action: 'edit',
            policy: { ...policy, role_id: roleId },  // ✅ inject role_id
            roles: this.roles
          }
        }).afterClosed().subscribe(result => {
          if (result && policy?.policy_id !== undefined) {
            this.leavePolicyService.updatePolicy(policy.policy_id, result).subscribe({
              next: () => this.loadPolicies(),
              error: (err) => console.error('Error updating policy:', err),
            });
          }
        });
        break;

      case 'delete':
        this.dialog.open(ManageLeavePolicyDialogComponent, {
          width: '400px',
          data: { action: 'delete', policy }
        }).afterClosed().subscribe(confirm => {
          if (confirm && policy?.policy_id !== undefined) {
            this.leavePolicyService.deletePolicy(policy.policy_id).subscribe({
              next: () => this.loadPolicies(),
              error: (err) => console.error('Error deleting policy:', err),
            });
          }
        });
        break;
    }
  }

  /**
   * @description: Map role_id → role_name
   */
  getRoleName(roleId: number): string {
    return this.roles.find(r => r.id === roleId)?.name || 'N/A';
  }
}
