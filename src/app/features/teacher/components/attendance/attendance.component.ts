import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {
 todayDate: string = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  attendanceList = [
    { name: 'Aarav Sharma', class: '10A', status: 'Present' },
    { name: 'Bhavna Devi', class: '10A', status: 'Present' },
    { name: 'Deepika Rao', class: '10A', status: 'Present' },
  ];

  saveAttendance() {
    console.log('Attendance Submitted:', this.attendanceList);
    alert('Attendance saved successfully!');
    // API call to save attendance here
  }
}
