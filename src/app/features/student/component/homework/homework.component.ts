import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Homework {
  subject: string;
  title: string;
  assignedBy: string;
  dueDate: string;
}

@Component({
  selector: 'app-homework',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './homework.component.html',
  styleUrl: './homework.component.css'
})
export class HomeworkComponent {
  studentClass: string = '10A';
  
  homeworks: Homework[] = [
    // Example: uncomment this to test with data
    // {
    //   subject: 'Math',
    //   title: 'Algebra Practice',
    //   assignedBy: 'Mr. Sharma',
    //   dueDate: '25 Aug 2025'
    // }
  ];

  downloadHomework(hw: Homework) {
    console.log(`Downloading homework: ${hw.title}`);
    // Here we can later add actual file download logic
  }
}
