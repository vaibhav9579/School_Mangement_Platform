import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { User } from '../../models/user';
import { UserService } from '../../../../shared/services/user.service';
import { ManageClassDialogComponent } from '../../dialogs/manage-class-dialog/manage-class-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Class } from '../../models/class';
import { ClassesServiceService } from '../../../../shared/services/classes-service.service';

@Component({
  selector: 'app-class-creation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatListModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './class-creation.component.html',
  styleUrl: './class-creation.component.css'
})

export class ClassCreationComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'classTeacher', 'className', 'actions'];
  dataSource: Class[] = [];
  rolesMap: { [key: number]: string } = {};

  private _allTeachersData: User[] = [];
  private _role: number = 12;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private classService: ClassesServiceService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadClasses();
  }

  /**
   * Load users from service
   */
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log("user", users);
        this._allTeachersData = users.filter((user: User) => user.role === this._role);
        console.log("_allteacherData", this._allTeachersData);
        this.rolesMap = this._allTeachersData.reduce((acc: any, role: any) => {
          acc[role.id] = role.name;
          return acc;
        }, {});
        console.log("this.role", this.rolesMap);
      },
      error: (err) => console.error('Error loading users:', err)
    });
  }

  /**
   * @description: Load classes from service
   */
  loadClasses(): void {
    this.classService.getClasses().subscribe({
      next: (classes: Class[]) => this.dataSource = classes,
      complete: () => console.log('classes', this.dataSource),
      error: (err) => console.error('Error loading classes:', err)
    });
  }

  // loadRoles(): void {
  //   this._RoleServiceService.getRoles().subscribe({
  //     next: (rolesdata) => {
  //       this.rolesMap = rolesdata.reduce((acc: any, role: any) => {
  //         acc[role.id] = role.name;
  //         return acc;
  //       }, {});
  //       console.log("rolesMap", this.rolesMap);
  //     },
  //     error: (err) => console.error("Error loading roles:", err)
  //   });
  // }

  getRoleNameById(roleId: number): string {
    return this.rolesMap[roleId] || 'Unknown';
  }

  /**
   * @description: Perform action On users
   * @param action 
   * @param index 
   */
  openUserDialog(action: 'create' | 'edit' | 'delete', index?: number) {
    let selectedClass = index !== undefined ? this.dataSource[index] : null;

    switch (action) {
      case 'create':
        this.dialog.open(ManageClassDialogComponent, {
          width: '400px',
          data: { action: 'add', teacherData: this._allTeachersData }
        }).afterClosed().subscribe(result => {
          if (result) {
            this.classService.addClass(result).subscribe({
              next: () => this.loadClasses(),
              error: (err) => console.error('Error creating user:', err)
            });
          }
        });
        break;

      case 'edit':
        this.dialog.open(ManageClassDialogComponent, {
          width: '400px',
          data: { action: 'edit', class: selectedClass, teacherData: this._allTeachersData }
        }).afterClosed().subscribe(result => {
          if (result && selectedClass && selectedClass.id !== undefined) {
            this.classService.updateClass(selectedClass.id, result).subscribe({
              next: () => this.loadClasses(),
              error: (err) => console.error('Error updating class:', err)
            });
          }
        });
        break;

      case 'delete':
        this.dialog.open(ManageClassDialogComponent, {
          width: '300px',
          data: { action: 'delete', class: selectedClass, teacherData: this._allTeachersData }
        }).afterClosed().subscribe(confirm => {
          if (confirm && selectedClass && selectedClass.id !== undefined) {
            this.classService.deleteClass(selectedClass.id).subscribe({
              next: () => this.loadClasses(),
              error: (err) => console.error('Error deleting class:', err)
            });
          }
        });
        break;
    }
  }
  
}
