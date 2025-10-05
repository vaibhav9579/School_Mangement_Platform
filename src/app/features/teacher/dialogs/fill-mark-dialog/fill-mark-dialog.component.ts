import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-fill-mark-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './fill-mark-dialog.component.html',
  styleUrl: './fill-mark-dialog.component.css'
})
export class FillMarkDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FillMarkDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { subjects: any[]; outOf: number; studentId: number; existingMarks?: any[] }
  ) {
    // Build the form
    this.form = this.fb.group({
      subject: [null, Validators.required],
      outOf: [data.outOf, Validators.required],
      obtained: [null, [Validators.required, Validators.min(0), Validators.max(data.outOf)]],
    });

    // Prefill obtained marks if subject already has mark
    this.form.get('subject')?.valueChanges.subscribe(selectedSubject => {
      if (data.existingMarks?.length) {
        const matched = data.existingMarks.find(
          (m: any) =>
            m.subject_code ===
            (data.subjects.find((s: any) => s.name === selectedSubject)?.id ?? null)
        );
        if (matched) {
          this.form.patchValue({ obtained: matched.obtained_marks });
        } else {
          this.form.patchValue({ obtained: null });
        }
      }
    });
  }

  // Submit dialog data
  submit() {
    if (this.form.valid) {
      this.dialogRef.close({
        studentId: this.data.studentId,
        ...this.form.value
      });
    }
  }

  // Close dialog
  close() {
    this.dialogRef.close();
  }
}
