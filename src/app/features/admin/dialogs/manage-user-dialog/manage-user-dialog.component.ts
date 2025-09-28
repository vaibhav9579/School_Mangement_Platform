import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { Roles } from '../../models/roles';
import { RoleServiceService } from '../../../../shared/services/role-service.service';

@Component({
  selector: 'app-manage-user-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './manage-user-dialog.component.html',
  styleUrls: ['./manage-user-dialog.component.css']
})
export class ManageUserDialogComponent implements OnInit {
  userForm: FormGroup;
  action: 'create' | 'edit' | 'delete';
  public roles: Roles[] = [];

  // For delete confirmation
  deleteConfirmInput: string = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ManageUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: 'create' | 'edit' | 'delete'; user?: User },
    private roleService: RoleServiceService
  ) {
    this.action = data.action;

    this.userForm = this.fb.group({
      fullName: [
        data.user ? data.user.name : '',
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        data.user ? data.user.email : '',
        [Validators.required, Validators.email],
      ],
      password: [
        '',
        this.action === 'create' ? [Validators.required, Validators.minLength(6)] : [],
      ],
      role: [data.user ? data.user.role : '', Validators.required],
    });

    if (this.action === 'delete') {
      this.userForm.disable();
    }
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe((roles: Roles[]) => this.roles = roles);
  }

  /** Reset form fields */
  onReset() {
    this.userForm.reset();
  }

  /** Submit form */
  onSubmit() {
    if (this.action === 'delete') {
      if (this.deleteConfirmInput === this.data.user?.name) {
        this.dialogRef.close(true); // only confirm delete if names match
      }
    } else if (this.userForm.valid) {
      const { fullName, email, role, password } = this.userForm.value;

      // Map form values back to User structure
      const result: Partial<User> = {
        name: fullName,
        email,
        role,
        password
      };

      this.dialogRef.close(result);
    }
  }
}
