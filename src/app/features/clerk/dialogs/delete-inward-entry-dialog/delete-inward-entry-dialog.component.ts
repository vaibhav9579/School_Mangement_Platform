import { Component } from '@angular/core';
import { InwardService, Inward } from '../../../../shared/services/inward.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-inward-entry-dialog',
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-inward-entry-dialog.component.html',
  styleUrl: './delete-inward-entry-dialog.component.css'
})

export class DeleteInwardEntryDialogComponent {
  confirmText = '';

  constructor(
    private inwardService: InwardService,
    private dialogRef: MatDialogRef<DeleteInwardEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inward
  ) { }

  deleteEntry(): void {
    // if (this.confirmText === this.data.subject) {
    //   this.inwardService
    //     .update(this.data.inward_id!, { status: 'Deleted' })
    //     .subscribe(() => this.dialogRef.close(true));
    // }
    if (this.confirmText == this.data.subject) {
      this.inwardService.delete(this.data.inward_id!).subscribe(() => this.dialogRef.close(true));
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
