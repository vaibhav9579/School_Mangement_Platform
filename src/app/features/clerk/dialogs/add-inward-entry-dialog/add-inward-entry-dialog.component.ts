import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InwardService, Inward } from '../../../../shared/services/inward.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-inward-entry-dialog',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-inward-entry-dialog.component.html',
  styleUrl: './add-inward-entry-dialog.component.css'
})
export class AddInwardEntryDialogComponent {
 inwardForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private inwardService: InwardService,
    private dialogRef: MatDialogRef<AddInwardEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inward | null
  ) {
    this.isEditMode = !!data;

    this.inwardForm = this.fb.group({
      received_date: [data?.received_date || '', Validators.required],
      sender_details: [data?.sender_details || '', Validators.required],
      subject: [data?.subject || '', Validators.required],
      document_type: [data?.document_type || 'Letter', Validators.required],
      logged_by_user_id: [1, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.inwardForm.invalid) return;

    const payload = this.inwardForm.value;

    if (this.isEditMode && this.data?.inward_id) {
      this.inwardService.update(this.data.inward_id, payload).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.inwardService.create(payload).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
