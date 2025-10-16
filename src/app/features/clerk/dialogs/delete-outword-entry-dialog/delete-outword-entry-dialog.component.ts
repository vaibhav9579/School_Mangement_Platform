import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-outword-entry-dialog',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatIconModule],
  templateUrl: './delete-outword-entry-dialog.component.html',
  styleUrl: './delete-outword-entry-dialog.component.css'
})
export class DeleteOutwordEntryDialogComponent {
  outletName: string;
  confirmName: string = '';

  constructor(
    private dialogRef: MatDialogRef<DeleteOutwordEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.outletName = data.outletName;
  }

  confirmDelete() {
    this.dialogRef.close(true); // return confirmation to parent
  }
}
