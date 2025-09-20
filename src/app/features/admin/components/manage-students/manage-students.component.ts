import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

  interface Student {
  id: string;
  name: string;
  class: string;
  rollNo: string;
  email: string;
}

@Component({
  selector: 'app-manage-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-students.component.html',
  styleUrl: './manage-students.component.css'
})

export class ManageStudentsComponent  implements OnInit{
  students: Student[] = [
    { id: 'S001', name: 'Aarav Sharma', class: '10A', rollNo: '1001', email: 'aarav.s@example.com' },
    { id: 'S002', name: 'Bhavna Devi', class: '10A', rollNo: '1002', email: 'bhavna.d@example.com' },
    { id: 'S003', name: 'Chirag Singh', class: '9B', rollNo: '9003', email: 'chirag.s@example.com' },
    { id: 'S004', name: 'Deepika Rao', class: '10A', rollNo: '1004', email: 'deepika.r@example.com' },
    { id: 'S005', name: 'Eklavya Kumar', class: '11C', rollNo: '1105', email: 'eklavya.k@example.com' }
  ];

  ngOnInit(): void {
    // TODO: Replace with API call to fetch students
  }
}
