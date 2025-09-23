import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ManageLeaveRequestDialogData {
  action: 'create' | 'edit' | 'delete';
  leaveRequest?: any;
  leaveTypes?: string[];
}

@Component({
  selector: 'app-manage-leave-request-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-leave-request-dialog.component.html'
})
export class ManageLeaveRequestDialogComponent {
  form: FormGroup;
  action: 'create' | 'edit' | 'delete';
  leaveTypes: string[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ManageLeaveRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ManageLeaveRequestDialogData
  ) {
    console.log('Dialog data:', data);
    this.action = data.action;
    this.leaveTypes = data.leaveTypes ||  ["Sick-Leave", "Casual-Leave", "Special-Leave", "Other-Leave"];

    this.form = this.fb.group({
      leave_type: [data.leaveRequest?.leave_type || '', Validators.required],
      start_date: [data.leaveRequest?.start_date || '', Validators.required],
      end_date: [data.leaveRequest?.end_date || '', Validators.required],
    });
  }

  get daysRequested(): number {
    const start = new Date(this.form.value.start_date);
    const end = new Date(this.form.value.end_date);
    if (!start || !end) return 0;
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  }

  onSave(): void {
    if (this.form.valid) {
      const payload = { ...this.form.value, days_requested: this.daysRequested };
      this.dialogRef.close(payload);
    }
  }

  onDeleteConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
