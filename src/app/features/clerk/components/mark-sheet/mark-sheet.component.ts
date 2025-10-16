import { Component, Inject , OnInit} from '@angular/core';
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
export class MarkSheetComponent implements OnInit {
  displayedColumns: string[] = ['subject_code', 'total_mark', 'obtained_marks'];
  data : any[] = [];
   subjects = ['Math', 'Science', 'History', 'English', 'Computer'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public newdata: any[],
    private dialogRef: MatDialogRef<MarkSheetComponent>
  ) { }

  ngOnInit(): void {
    this.newdata = this.newdata.map((item, index) => ({
  ...item,
  subjectName: this.subjects[index]
}));

this.data = this.newdata;
  }

  close() {
    this.dialogRef.close();
  }

  downloadPdf() {
    const doc = new jsPDF();
    const PAGE_WIDTH = doc.internal.pageSize.getWidth();
    const MARGIN_X = 14;
    // const SCHOOL_LOGO_BASE64 = '/logos/cc_logo.png'; 
    const SCHOOL_LOGO_BASE64 = '';

    // Constants for school info (Update these!)
    const SCHOOL_NAME = 'St. Ignatius High School';
    const SCHOOL_ADDRESS = '123 Academic Avenue, Knowledge City, State - 500001';
    const REPORT_TITLE = 'ACADEMIC MARK SHEET';
    const STUDENT_NAME = 'Rajesh Kumar'; // Assuming you'd get this from your data
    const ROLL_NUMBER = '2025/007'; // Assuming you'd get this from your data
    const ACADEMIC_YEAR = '2024-2025';

    // Function to add the standard header (Logo and School Info)
    const addHeader = (doc: any) => {
      const startY = 10;
      const logoSize = 25; // Size for the logo image

      // 1. School Logo
      if (SCHOOL_LOGO_BASE64) {
        try {
          // Assuming your image is a JPEG; adjust 'JPEG' if it's a PNG
          doc.addImage(SCHOOL_LOGO_BASE64, 'JPEG', MARGIN_X, startY, logoSize, logoSize);
        } catch (e) {
          console.error("Error adding logo. Check the Base64 string and format.", e);
          // Fallback for logo text
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
          doc.text('SCHOOL LOGO', MARGIN_X, startY + (logoSize / 2));
        }
      }

      // 2. School Name and Address
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text(SCHOOL_NAME, PAGE_WIDTH / 2, startY + 5, { align: 'center' });

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(SCHOOL_ADDRESS, PAGE_WIDTH / 2, startY + 12, { align: 'center' });

      // Horizontal line separator
      doc.setDrawColor(0, 0, 0); // Black color
      doc.setLineWidth(0.5);
      doc.line(MARGIN_X, startY + 15, PAGE_WIDTH - MARGIN_X, startY + 15);
    };

    // Function to add the footer
    const addFooter = (doc: any) => {
      const pageCount = doc.internal.pages.length - 1; // Total pages
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.text(`Page 1 of ${pageCount}`, PAGE_WIDTH - MARGIN_X, doc.internal.pageSize.getHeight() - 7, { align: 'right' });
      doc.text('Generated on: ' + new Date().toLocaleDateString(), MARGIN_X, doc.internal.pageSize.getHeight() - 7);
    };

    // --- PDF GENERATION STEPS ---

    addHeader(doc);
    let currentY = 40; // Starting point after the header

    // 3. Main Report Title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(REPORT_TITLE, PAGE_WIDTH / 2, currentY, { align: 'center' });
    currentY += 10;

    // 4. Student Information Block
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    // Draw a box around the student details for a neat look
    doc.setDrawColor(128, 128, 128); // Gray border
    doc.setLineWidth(0.1);
    doc.rect(MARGIN_X, currentY - 5, PAGE_WIDTH - (2 * MARGIN_X), 18); // Rectangle for info

    doc.text(`Student Name: ${STUDENT_NAME}`, MARGIN_X + 2, currentY);
    doc.text(`Roll Number: ${ROLL_NUMBER}`, PAGE_WIDTH / 2, currentY, { align: 'left' });

    doc.text(`Academic Year: ${ACADEMIC_YEAR}`, MARGIN_X + 2, currentY + 7);
    // Add other details like Grade/Class here if available
    doc.text(`Class/Grade: X 'A'`, PAGE_WIDTH / 2, currentY + 7, { align: 'left' });

    currentY += 18; // Move past the info box

    // 5. Define table headers
    const head = [['Subject Code', 'Subject Name', 'Total Marks (Max.)', 'Obtained Marks', 'Percentage (%)', 'Grade']];

    // 6. Map data to rows and calculate percentage/grade
    const body = this.data.map(item => {
      const percentage = ((item.obtained_marks / item.total_mark) * 100);
      // Simple grading logic (you'd use your school's actual logic)
      let grade = 'F';
      if (percentage >= 90) grade = 'A+';
      else if (percentage >= 80) grade = 'A';
      else if (percentage >= 70) grade = 'B';
      else if (percentage >= 60) grade = 'C';
      else if (percentage >= 40) grade = 'D';

      return [
        item.subject_code,
        item.subjectName, // Assuming you'll add subject_name
        item.total_mark,
        item.obtained_marks,
        `${percentage.toFixed(2)}%`,
        grade
      ];
    });

    // Calculate aggregate data
    const totalMaxMarks = this.data.reduce((sum, item) => sum + item.total_mark, 0);
    const totalObtainedMarks = this.data.reduce((sum, item) => sum + item.obtained_marks, 0);
    const overallPercentage = ((totalObtainedMarks / totalMaxMarks) * 100).toFixed(2);

    // 7. Generate table with styling
    autoTable(doc, {
      head: head,
      body: body,
      startY: currentY + 5,
      theme: 'grid',
      margin: { left: MARGIN_X, right: MARGIN_X },
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [0, 102, 204], // Darker Blue (Official/Professional)
        textColor: 255,
        fontSize: 11,
        fontStyle: 'bold',
        halign: 'center'
      },
      columnStyles: {
        // Set alignment for numeric columns
        2: { halign: 'center' },
        3: { halign: 'center' },
        4: { halign: 'center' },
        5: { halign: 'center', fontStyle: 'bold' } // Emphasize Grade
      },
      didDrawPage: (data) => {
        // Re-add header and footer on subsequent pages if needed
        if (data.pageNumber > 1) {
          // You might want a simpler header on continuation pages
          // For simplicity, we skip re-adding the full header/footer here
        }
      }
    });

    // Get the final Y position after the table
    currentY = (doc as any).lastAutoTable?.finalY || currentY;

    // 8. Summary Footer (Total Marks and Overall Percentage)
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');

    // Total Marks Row
    doc.text(`GRAND TOTAL:`, MARGIN_X, currentY + 10);
    doc.text(`${totalObtainedMarks} / ${totalMaxMarks}`, PAGE_WIDTH - MARGIN_X, currentY + 10, { align: 'right' });

    // Overall Percentage Row
    doc.text(`OVERALL PERCENTAGE:`, MARGIN_X, currentY + 18);
    doc.text(`${overallPercentage}%`, PAGE_WIDTH - MARGIN_X, currentY + 18, { align: 'right' });

    // 9. Signatures Block
    currentY += 35;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('_________________________', MARGIN_X + 5, currentY);
    doc.text('Class Teacher Signature', MARGIN_X + 5, currentY + 5);

    doc.text('_________________________', PAGE_WIDTH - 60, currentY);
    doc.text('Principal Signature', PAGE_WIDTH - 60, currentY + 5);

    // 10. Final Footer
    addFooter(doc);

    // 11. Save PDF  
    doc.save(`${STUDENT_NAME}_Mark_Sheet.pdf`);
  }
}
