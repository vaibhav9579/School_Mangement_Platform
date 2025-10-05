import { Component, OnInit } from '@angular/core';
import { AcademicServiceService } from '../../../shared/services/academic-service.service';
import { ActivatedRoute } from '@angular/router';
import { AdmissionService } from '../../../shared/services/admission.service';
import { Student } from '../../../shared/models/student';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { SubjectService } from '../../../shared/services/subject.service';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { FillMarkDialogComponent } from '../dialogs/fill-mark-dialog/fill-mark-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MarkServiceService } from '../../../shared/mark-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-fill-classwise-mark',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
  ],

  templateUrl: './fill-classwise-mark.component.html',
  styleUrl: './fill-classwise-mark.component.css'
})
export class FillClasswiseMarkComponent implements OnInit {
  public _classData: any[] = [];
  public _classId: number = 0;
  public _datasource = new MatTableDataSource<any>();
  public _userId: any;


  displayedColumns: string[] = ['id', 'name', 'class', 'contact', 'email', 'actions'];

  constructor(
    private _academicService: AcademicServiceService,
    private _activatedRoute: ActivatedRoute,
    private _admissionService: AdmissionService,
    private _subjectService: SubjectService,
    private _authservice: AuthServiceService,
    private _markService: MarkServiceService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._userId = this._authservice.getUserId();

    this._classId = Number(this._activatedRoute.snapshot.paramMap.get('classs_id'));
    if (this._classId && this._classData !== null) {
      this.getStudentDataOfSelClass(this._classId);
    }
  }

  getStudentDataOfSelClass(class_id: number) {
    this._admissionService.getAdmissionsByClass(class_id).subscribe((studentData: any) => {
      if (studentData.length > 0) {

        console.log("Student data", studentData);
        // Map backend data to Student interface (adjust keys accordingly)
        // this._datasource = studentData
        this._datasource.data = studentData.map((s: any) => ({
          id: s.id,
          name: s.full_name || `${s.first_name} ${s.last_name}`,
          class: s.class_id,
          contact: s.candidate_contact,
          email: s.candidate_mail,
          student_id: s.id
        }));
      }
    })
  }

fillMark(studentId: number) {
  console.log("Selected student:", studentId);

  // 1️⃣ Step 1 - Fetch subjects taught by this teacher for current class
  this._subjectService.getSubjectsByTeacherAndClass(this._userId, this._classId).subscribe({
    next: (subjects) => {
      if (!subjects || subjects.length === 0) {
        this._snackBar.open('No subjects assigned for this class.', 'Close', { duration: 2500 });
        return;
      }

      // 2️⃣ Step 2 - Open dialog to fill marks
      const dialogRef = this.dialog.open(FillMarkDialogComponent, {
        width: '400px',
        data: {
          subjects,
          outOf: 100,
          studentId,
        },
      });

      // 3️⃣ Step 3 - After dialog closed
      dialogRef.afterClosed().subscribe(result => {
        if (!result) return; // cancelled

        console.log("Filled marks data:", result);
        const selectedSubject = subjects.find(s => s.name === result.subject);
        if (!selectedSubject) {
          console.error("Invalid subject selected!");
          return;
        }

        // Payload for backend
        const payload = {
          student_id: result.studentId,
          subject_code: selectedSubject.id,
          total_mark: result.outOf,
          obtained_marks: result.obtained,
        };

        // 4️⃣ Step 4 - Check if mark already exists for this subject/student
        this._markService.list({ student_id: studentId, subject_code: selectedSubject.id }).subscribe({
          next: (existing: any[]) => {
            if (existing && existing.length > 0) {
              // UPDATE existing
              const markId = existing[0].id;
              this._markService.update(markId, payload).subscribe({
                next: () => {
                  this._snackBar.open('Marks updated successfully ✅', 'OK', { duration: 2500 });
                },
                error: (err) => {
                  console.error('Error updating marks', err);
                  this._snackBar.open('Error updating marks ❌', 'Close', { duration: 2500 });
                }
              });
            } else {
              // CREATE new
              this._markService.create(payload).subscribe({
                next: () => {
                  this._snackBar.open('Marks saved successfully ✅', 'OK', { duration: 2500 });
                },
                error: (err) => {
                  console.error('Error saving marks', err);
                  this._snackBar.open('Error saving marks ❌', 'Close', { duration: 2500 });
                }
              });
            }
          },
          error: (err) => {
            console.error('Error checking existing marks', err);
          }
        });
      });
    },
    error: (err) => {
      console.error("Error fetching subjects", err);
      this._snackBar.open('Failed to fetch subjects', 'Close', { duration: 2500 });
    }
  });
}

updateMark(id: number, updated: any) {
  this._markService.update(id, updated).subscribe({
    next: () => this._snackBar.open('Mark updated successfully', 'OK', { duration: 2000 }),
    error: () => this._snackBar.open('Failed to update mark', 'Close', { duration: 2000 }),
  });
}

deleteMark(id: number) {
  if (confirm('Are you sure you want to delete this mark?')) {
    this._markService.delete(id).subscribe({
      next: () => this._snackBar.open('Mark deleted successfully', 'OK', { duration: 2000 }),
      error: () => this._snackBar.open('Failed to delete mark', 'Close', { duration: 2000 }),
    });
  }
}
}
