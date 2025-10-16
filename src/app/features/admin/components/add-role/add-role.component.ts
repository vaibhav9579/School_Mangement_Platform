// Add MatProgressSpinnerModule and MatTooltipModule to your imports!
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { RoleServiceService } from '../../../../shared/services/role-service.service';
import { Roles } from '../../models/roles';
import { ManageroledialogComponent } from '../../dialogs/manageroledialog/manageroledialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // <-- ADD THIS
import { MatTooltipModule } from '@angular/material/tooltip'; // <-- ADD THIS

@Component({
  selector: 'app-add-role',
  // Make sure to add the new modules to the imports array
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule, // <-- ADD THIS
    MatTooltipModule          // <-- ADD THIS
  ],
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit { // <-- Implemented OnInit
  displayedColumns = ['sno', 'name', 'actions'];
  dataSource: Roles[] = [];
  isLoading = true; // <-- ADD THIS: Flag for loading spinner

  constructor(private roleService: RoleServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.isLoading = true; // <-- Start loading
    this.roleService.getRoles().subscribe(roles => {
      this.dataSource = roles;
      this.isLoading = false; // <-- Stop loading
    });
  }

  // The rest of your openRoleDialog function remains the same!
  // ... (no changes needed for the openRoleDialog method)
  openRoleDialog(action: 'create' | 'edit' | 'view' | 'delete', index?: number) {
    const role = index !== undefined ? this.dataSource[index] : null;

    this.dialog.open(ManageroledialogComponent, {
      width: '400px',
      data: { action, role }
    }).afterClosed().subscribe(result => {
      if (!result) return;
      switch (action) {
        case 'create':
          this.roleService.addRole(result).subscribe(() => this.loadRoles());
          break;
        case 'edit':
          if (role?.id !== undefined) {
            this.roleService.updateRole(role.id, result).subscribe(() => this.loadRoles());
          }
          break;
        case 'delete':
          // HIGHLY RECOMMENDED: Add a confirmation dialog before deleting!
          if (role?.id !== undefined) {
            this.roleService.deleteRole(role.id).subscribe(() => this.loadRoles());
          }
          break;
      }
    });
  }
}