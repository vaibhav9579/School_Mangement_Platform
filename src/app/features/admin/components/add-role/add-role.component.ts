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

@Component({
  selector: 'app-add-role',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule],
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {
  displayedColumns = ['sno', 'name', 'description', 'actions'];
  dataSource: Roles[] = [];

  

  constructor(private roleService: RoleServiceService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(roles => this.dataSource = roles);
  }

  openRoleDialog(action: 'create' | 'edit' | 'view' | 'delete', index?: number) {
    const role = index !== undefined ? this.dataSource[index] : null;

    this.dialog.open(ManageroledialogComponent, {
      width: '400px',
      data: { action, role }
    }).afterClosed().subscribe(result => {
      if (!result) return;
      switch(action) {
        case 'create':
          this.roleService.addRole(result).subscribe(() => this.loadRoles());
          break;
        case 'edit':
          if (role?.id !== undefined) {
            this.roleService.updateRole(role.id, result).subscribe(() => this.loadRoles());
          }
          break;
        case 'delete':
          if (role?.id !== undefined) {
            this.roleService.deleteRole(role.id).subscribe(() => this.loadRoles());
          }
          break;
      }
    });
  }
}
