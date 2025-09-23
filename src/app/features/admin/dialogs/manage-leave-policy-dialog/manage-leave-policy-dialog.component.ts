import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Roles } from '../../models/roles';
import { LeavePolicy } from '../../../../shared/models/leave-policy';

export interface ManageLeavePolicyDialogData {
  action: 'create' | 'edit' | 'delete';
  policy?: LeavePolicy;
  roles?: Roles[];
}

@Component({
  selector: 'pp-manage-leave-policy-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './manage-leave-policy-dialog.component.html',
  styleUrl: './manage-leave-policy-dialog.component.css'
})
export class ManageLeavePolicyDialogComponent {
  form: FormGroup;
  action: 'create' | 'edit' | 'delete';
  roles: Roles[];
  leaveTypes = ["Sick-Leave", "Casual-Leave", "Special-Leave", "Other-Leave"];


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ManageLeavePolicyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ManageLeavePolicyDialogData
  ) {
    console.log('Dialog data:', data);
    this.action = data.action;
    this.roles = data.roles || [];

    this.form = this.fb.group({
      role_id: [data.policy?.role_id  || '', Validators.required],
      leave_type: [data.policy?.leave_type || '', Validators.required],
      allowed_days: [data.policy?.allowed_days || '', [Validators.required, Validators.min(1)]],
    });
  }

  /**
   * @description Handle dialog save/confirm
   */
  onSave(): void {
    if (this.form.valid) {
      console.log('Form data:', this.form.value);
      this.dialogRef.close(this.form.value);
    }
  }

  /**
   * @description Handle delete confirm
   */
  onDeleteConfirm(): void {
    this.dialogRef.close(true);
  }

  /**
   * @description Cancel dialog
   */
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
