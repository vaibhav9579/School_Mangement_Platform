import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Student {
  id: number;
  name: string;
  class: string;
  dob: string;
}

@Component({
  selector: 'app-id-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './id-card.component.html',
  styleUrl: './id-card.component.css'
})
export class IdCardComponent {
  students: Student[] = [
    { id: 1, name: 'Alice Johnson', class: '10-A', dob: '2008-04-12' },
    { id: 2, name: 'Bob Smith', class: '9-B', dob: '2009-08-30' },
    { id: 3, name: 'Charlie Brown', class: '8-C', dob: '2010-02-21' }
  ];

  selectedStudentId: string = '';
  generatedStudent?: Student;

  generateIdCard() {
    this.generatedStudent = this.students.find(
      s => s.id.toString() === this.selectedStudentId
    );
  }
}
