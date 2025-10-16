import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OutwardService, Outward } from '../../../../shared/outward.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddOutwordEntryDialogComponent as OutwardFormDialogComponent } from '../../dialogs/add-outword-entry-dialog/add-outword-entry-dialog.component';
import { DeleteOutwordEntryDialogComponent as DeleteOutletDialogComponent } from '../../dialogs/delete-outword-entry-dialog/delete-outword-entry-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  standalone: true,
  selector: 'app-outward-register',
  templateUrl: './outward-register.component.html',
})
export class OutwardRegisterComponent implements OnInit {
  outwardEntries: Outward[] = [];

  constructor(
    private outwardService: OutwardService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadOutwardEntries();
  }

  loadOutwardEntries(): void {
    this.outwardService.getAll().subscribe((data: any) => {
      this.outwardEntries = data;
    });
  }

  openNewDialog(): void {
    const dialogRef = this.dialog.open(OutwardFormDialogComponent, {
      width: this.getDialogWidth(),
      maxWidth: '95vw',
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.outwardService.create(result).subscribe(() => {
          this.loadOutwardEntries();
        });
      }
    });
  }

  openEditDialog(entry: Outward): void {
    const dialogRef = this.dialog.open(OutwardFormDialogComponent, {
      width: this.getDialogWidth(),
      maxWidth: '95vw',
      data: { entry, isEdit: true },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.outwardService.update(entry.outward_id!, result).subscribe(() => {
          this.loadOutwardEntries();
        });
      }
    });
  }

  openDeleteDialog(outletName: string) {
    const dialogRef = this.dialog.open(DeleteOutletDialogComponent, {
      width: '90vw',
      maxWidth: '420px',
      data: { outletName },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        console.log('Outlet deleted:', outletName);
        const deletedOutwordId = this.outwardEntries.find(entry => entry.subject === outletName)?.outward_id;
        if (deletedOutwordId) {
          this.outwardService.delete(deletedOutwordId).subscribe(() => {
            this.loadOutwardEntries();
          });
        }
      }
    });
  }

  /** Helper for responsive dialog size */
  getDialogWidth(): string {
    return window.innerWidth < 768 ? '95vw' : '600px';
  }
}