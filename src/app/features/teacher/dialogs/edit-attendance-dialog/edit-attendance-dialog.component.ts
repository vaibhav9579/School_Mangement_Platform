import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AttendanceRecord } from '../../../../shared/services/attendance.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-attendance-dialog',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-attendance-dialog.component.html',
  styleUrl: './edit-attendance-dialog.component.css'
})
export class EditAttendanceDialogComponent {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditAttendanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AttendanceRecord,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      status: [data.status],
      arrival_time: [data.arrival_time],
      remark: [data.remark]
    });
  }

  save() {
    this.dialogRef.close(this.editForm.value);
  }
}
