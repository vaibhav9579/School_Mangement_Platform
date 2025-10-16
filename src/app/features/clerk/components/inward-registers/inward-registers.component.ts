import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InwardService, Inward } from '../../../../shared/services/inward.service';
import { AddInwardEntryDialogComponent as InwardDialogComponent } from '../../dialogs/add-inward-entry-dialog/add-inward-entry-dialog.component';
import { DeleteInwardEntryDialogComponent as InwardDeleteDialogComponent } from '../../dialogs/delete-inward-entry-dialog/delete-inward-entry-dialog.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inward-registers',
  imports: [CommonModule,ReactiveFormsModule, ],
  templateUrl: './inward-registers.component.html',
  styleUrl: './inward-registers.component.css'
})
export class InwardRegistersComponent {
  inwardEntries: Inward[] = [];

  constructor(
    private inwardService: InwardService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadInwardEntries();
  }

  loadInwardEntries(): void {
    this.inwardService.getAll().subscribe((data) => {
      this.inwardEntries = data;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(InwardDialogComponent, {
      width: '90%',
      maxWidth: '500px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadInwardEntries();
    });
  }

  openEditDialog(entry: Inward): void {
    const dialogRef = this.dialog.open(InwardDialogComponent, {
      width: '90%',
      maxWidth: '500px',
      data: entry,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadInwardEntries();
    });
  }

  openDeleteDialog(entry: Inward): void {
    const dialogRef = this.dialog.open(InwardDeleteDialogComponent, {
      width: '90%',
      maxWidth: '400px',
      data: entry,
    });

    dialogRef.afterClosed().subscribe((deleted) => {
      console.log("deleted", deleted);
      if (deleted) this.loadInwardEntries();
    });
  }
}
