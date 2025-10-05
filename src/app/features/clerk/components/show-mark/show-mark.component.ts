import { Component, OnInit } from '@angular/core';
import { AcademicServiceService } from '../../../../shared/services/academic-service.service';
import { ActivatedRoute } from '@angular/router';
import { AdmissionService } from '../../../../shared/services/admission.service';
import { Student } from '../../../../shared/models/student';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { SubjectService } from '../../../../shared/services/subject.service';
import { AuthServiceService } from '../../../../shared/services/auth-service.service';
import { FillMarkDialogComponent } from '../../../teacher/dialogs/fill-mark-dialog/fill-mark-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MarkServiceService } from '../../../../shared/mark-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MarkSheetComponent } from '../mark-sheet/mark-sheet.component';

@Component({
  selector: 'app-show-mark',
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
  templateUrl: './show-mark.component.html',
  styleUrl: './show-mark.component.css'
})

export class ShowMarkComponent {
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
    private _snackBar: MatSnackBar,
    private _matDialog : MatDialog,
    private MarkServiceService : MarkServiceService
  ) { }

  ngOnInit(): void {
    this._userId = this._authservice.getUserId();

    this._classId = Number(this._activatedRoute.snapshot.paramMap.get('class_id'));
    if (this._classId && this._classData !== null) {
      this.getStudentDataOfSelClass(this._classId);
    }
  }

  getStudentDataOfSelClass(class_id: number) {
    this._admissionService.getAdmissionsByClass(class_id).subscribe((studentData: any) => {
      if (studentData.length > 0) {

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

  showMark(studentId:number){
    console.log("studentID", studentId);
    this.MarkServiceService.getMarkBystudetId(studentId).subscribe(data =>{
      console.log("Student marks is getting", data);
      this.openMarksDialog(data)
    })
  }

  openMarksDialog(data: any) {
    console.log("data &&", data);
    this.dialog.open(MarkSheetComponent, {
      width: '500px',
      data: data // pass the array to dialog
    });
  }
}
