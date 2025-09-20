import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Student } from '../../../../shared/models/student';
import { StudentServiceService } from '../../../../shared/services/student-service.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-admission',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})

export class AdmissionComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'name', 'email', 'class', 'status', 'actions'];
  students: Student[] = [];
  dataSource: Student[] = [];
  studentForm!: FormGroup;
  isEditMode: boolean = false;
  selectedStudentId?: number;

  constructor(
    private studentService: StudentServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadStudents();

    // initialize form
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      marks: [0, Validators.required],
      documents: [[]], 
      status: ['pending', Validators.required],
      classAssigned: ['']
    })
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
      this.dataSource = data;
    });
  }

  approveAdmission(student: Student): void {
    if (!student.id) return;
    const updatedStudent : Student = { ...student, status: 'approved' };
    this.studentService.updateStudent(student.id, updatedStudent).subscribe(() => {
      this.loadStudents();
    });
  }

  rejectAdmission(student: Student): void {
    if (!student.id) return;
    const updatedStudent : Student = { ...student, status: 'rejected' };
    this.studentService.updateStudent(student.id, updatedStudent).subscribe(() => {
      this.loadStudents();
    });
  }

    onSubmit() {
    if (this.studentForm.invalid) return;

    const studentData: Student = this.studentForm.value;

    if (this.isEditMode && this.selectedStudentId) {
      // update student
      this.studentService.updateStudent(this.selectedStudentId, studentData).subscribe(() => {
        this.loadStudents();
        this.resetForm();
      });
    } else {
      // add new student
      this.studentService.addStudent(studentData).subscribe(() => {
        this.loadStudents();
        this.resetForm();
      });
    }
  }

  editStudent(student: Student) {
    this.isEditMode = true;
    this.selectedStudentId = student.id;
    this.studentForm.patchValue(student);
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }

  resetForm() {
    this.studentForm.reset({
      status: 'pending',
      marks: 0,
      documents: []
    });
    this.isEditMode = false;
    this.selectedStudentId = undefined;
  }
}
