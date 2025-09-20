import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../../../shared/services/user.service';
import { ManageUserDialogComponent } from '../../dialogs/manage-user-dialog/manage-user-dialog.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user.component.html',
})

export class UserComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'name', 'email', 'role', 'actions'];
  dataSource: User[] = [];

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * @description: Load users from service
   */
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => this.dataSource = users,
      error: (err) => console.error('Error loading users:', err)
    });
  }

  /**
   * @description: Perform action On users
   * @param action 
   * @param index 
   */
  openUserDialog(action: 'create' | 'edit' | 'delete', index?: number) {
    let user = index !== undefined ? this.dataSource[index] : null;

    switch (action) {
      case 'create':
        this.dialog.open(ManageUserDialogComponent, {
          width: '400px',
          data: { action: 'create' }
        }).afterClosed().subscribe(result => {
          if (result) {
            this.userService.addUser(result).subscribe({
              next: () => this.loadUsers(),
              error: (err) => console.error('Error creating user:', err)
            });
          }
        });
        break;

      case 'edit':
        this.dialog.open(ManageUserDialogComponent, {
          width: '400px',
          data: { action: 'edit', user: { ...user } }
        }).afterClosed().subscribe(result => {
          if (result && user?.id !== undefined) {
            this.userService.updateUser(user.id, result).subscribe({
              next: () => this.loadUsers(),
              error: (err) => console.error('Error updating user:', err)
            });
          }
        });
        break;

      case 'delete':
        this.dialog.open(ManageUserDialogComponent, {
          width: '300px',
          data: { action: 'delete', user }
        }).afterClosed().subscribe(confirm => {
          if (confirm && user?.id !== undefined) {
            this.userService.deleteUser(user.id).subscribe({
              next: () => this.loadUsers(),
              error: (err) => console.error('Error deleting user:', err)
            });
          }
        });
        break;
    }
  }
}
