import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
}

@Component({
  selector: 'app-manage-teacher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-teacher.component.html',
  styleUrl: './manage-teacher.component.css'
})
export class ManageTeacherComponent implements OnInit{
  teachers: Teacher[] = [
    { id: 'T001', name: 'Mr. Rajesh Gupta', subject: 'Math', email: 'rajesh.g@example.com' },
    { id: 'T002', name: 'Ms. Priya Singh', subject: 'Science', email: 'priya.s@example.com' },
    { id: 'T003', name: 'Mrs. Neha Sharma', subject: 'English', email: 'neha.s@example.com' }
  ];

  ngOnInit(): void {
    // TODO: Replace with API call
  }
}
