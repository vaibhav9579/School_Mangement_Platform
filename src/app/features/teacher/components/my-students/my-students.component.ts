import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Student {
  id: string;
  name: string;
  class: string;
  email: string;
}
@Component({
  selector: 'app-my-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-students.component.html',
  styleUrl: './my-students.component.css'
})
export class MyStudentsComponent {
  students: Student[] = [
    { id: 'S001', name: 'Aarav Sharma', class: '10A', email: 'aarav.s@example.com' },
    { id: 'S002', name: 'Bhavna Devi', class: '10A', email: 'bhavna.d@example.com' },
    { id: 'S004', name: 'Deepika Rao', class: '10A', email: 'deepika.r@example.com' },
  ];

  viewDetails(student: Student) {
    alert(`Viewing details for ${student.name}`);
    // You can navigate to a details page here
    // this.router.navigate(['/student', student.id]);
  }

}
