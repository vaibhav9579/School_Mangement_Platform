import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Outward } from '../../../../shared/outward.service';

@Component({
  selector: 'app-add-outword-entry-dialog',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, FormsModule],
  templateUrl: './add-outword-entry-dialog.component.html',
  styleUrl: './add-outword-entry-dialog.component.css'
})
export class AddOutwordEntryDialogComponent {
form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddOutwordEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { entry?: Outward; isEdit: boolean }
  ) {
    this.form = this.fb.group({
      dispatch_date: [data?.entry?.dispatch_date || '', Validators.required],
      recipient_details: [data?.entry?.recipient_details || '', Validators.required],
      subject: [data?.entry?.subject || '', Validators.required],
      document_type: [data?.entry?.document_type || 'Letter', Validators.required],
      dispatch_mode: [data?.entry?.dispatch_mode || 'Post', Validators.required],
      tracking_number: [data?.entry?.tracking_number || ''],
      logged_by_user_id: [1, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
