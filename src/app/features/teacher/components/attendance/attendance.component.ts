import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassAttendance } from '../../../../shared/services/attendance.service';
import { AttendanceService, AttendanceRecord } from '../../../../shared/services/attendance.service';
import { MatDialog } from '@angular/material/dialog';
import { EditAttendanceDialogComponent as EditAttendanceDialog } from '../../dialogs/edit-attendance-dialog/edit-attendance-dialog.component';
import { AuthServiceService } from '../../../../shared/services/auth-service.service';

@Component({
  selector: 'app-attendance',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatTableModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})

export class AttendanceComponent {
  attendanceForm!: FormGroup;
  classAttendance!: ClassAttendance;
  loading = false;

  // For select options
  statusOptions: Array<{ label: string, value: 'present' | 'absent' | 'late' | 'leave' }> = [
    { label: 'Present', value: 'present' },
    { label: 'Absent', value: 'absent' },
    { label: 'Late', value: 'late' },
    { label: 'Leave', value: 'leave' }
  ];

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private _authService: AuthServiceService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    const userId = this._authService.getUserId();
    if (userId !== null) {
      this.loadClassAttendance(userId);
    }
  }

  get records(): FormArray {
    return this.attendanceForm.get('records') as FormArray;
  }

  // Load students and today's attendance
  loadClassAttendance(userId: number) {
    this.loading = true;
    this.attendanceService.getStudentsWithAttendance(userId).subscribe({
      next: (data: ClassAttendance) => {
        console.log("data", data);
        this.classAttendance = data;
        this.initForm(data);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // Initialize Reactive Form
  initForm(classAttendance: ClassAttendance) {
    this.attendanceForm = this.fb.group({
      class_id: [classAttendance.class_id],
      section_id: [classAttendance.section_id],
      institution_id: [classAttendance.institution_id],
      department_id: [classAttendance.department_id],
      program_id: [classAttendance.program_id],
      attendance_date: [new Date(), Validators.required],
      records: this.fb.array([])
    });

    // Map students to form array
    classAttendance.students.forEach(student => {
      // Check if attendance already exists for student
      const existingRecord = classAttendance.attendance.find(a => a.student_id === student.student_id);
      (this.attendanceForm.get('records') as FormArray).push(this.fb.group({
        student_id: [student.student_id],
        status: [existingRecord ? existingRecord.status : 'present', Validators.required],
        arrival_time: [existingRecord?.arrival_time || ''],
        remark: [existingRecord?.remark || ''],
        attendance_id: [existingRecord?.attendance_id || null]
      }));
    });
  }

  // Save bulk attendance
  saveAttendance() {
    if (this.attendanceForm.invalid) return;

    const payload = {
      class_id: this.attendanceForm.value.class_id,
      section_id: this.attendanceForm.value.section_id,
      institution_id: this.attendanceForm.value.institution_id,
      department_id: this.attendanceForm.value.department_id,
      program_id: this.attendanceForm.value.program_id,
      taken_by_user_id: 1, // TODO: Replace with logged in teacher id
      attendance_date: this.attendanceForm.value.attendance_date.toISOString().split('T')[0],
      records: this.attendanceForm.value.records.map((r: any) => ({
        student_id: r.student_id,
        status: r.status,
        arrival_time: r.arrival_time,
        remark: r.remark
      })) as AttendanceRecord[]
    };

    this.loading = true;
    this.attendanceService.saveBulkAttendance(payload).subscribe({
      next: (res) => {
        alert('Attendance saved successfully!');
        // this.loadClassAttendance();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // Edit single record via dialog
  editRecord(index: number) {
    const record = this.records.at(index).value;
    const dialogRef = this.dialog.open(EditAttendanceDialog, {
      width: '350px',
      data: { ...record }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update form array
        this.records.at(index).patchValue({
          status: result.status,
          arrival_time: result.arrival_time,
          remark: result.remark
        });

        // Call backend API to update single record
        this.attendanceService.editAttendance(record.attendance_id!, {
          status: result.status,
          arrival_time: result.arrival_time,
          remark: result.remark,
          changed_by_user_id: 1 // TODO: Replace with logged in teacher id
        }).subscribe({
          next: () => alert('Attendance updated successfully!'),
          error: err => console.error(err)
        });
      }
    });
  }
}
