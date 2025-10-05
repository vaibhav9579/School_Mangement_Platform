import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-mark-sheet',
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './mark-sheet.component.html',
  styleUrl: './mark-sheet.component.css'
})
export class MarkSheetComponent {
   displayedColumns: string[] = ['subject_code', 'total_mark', 'obtained_marks'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private dialogRef: MatDialogRef<MarkSheetComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }

  downloadPdf() {
    const doc = new jsPDF();

    // ✅ Title
    doc.setFontSize(18);
    doc.text('Student Marks Report', 14, 20);

    // ✅ Define table headers
    const head = [['Subject Code', 'Total Marks', 'Obtained Marks']];

    // ✅ Map data to rows
    const body = this.data.map(item => [
      item.subject_code,
      item.total_mark,
      item.obtained_marks
    ]);

    // ✅ Generate table
    autoTable(doc, {
      head: head,
      body: body,
      startY: 30,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 12 },
      bodyStyles: { fontSize: 11 },
      margin: { left: 14, right: 14 }
    });

    // ✅ Save PDF  
    doc.save('Student_Marks.pdf');
  }
}
