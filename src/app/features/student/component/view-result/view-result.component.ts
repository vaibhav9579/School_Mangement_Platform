import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface AcademicResult {
  subject: string;
  score: number;
  grade: string;
  date: string;
}

@Component({
  selector: 'app-view-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-result.component.html',
  styleUrl: './view-result.component.css'
})
export class ViewResultComponent {
 results: AcademicResult[] = [
    { subject: 'Math', score: 85, grade: 'A', date: '20 May 2025' },
    { subject: 'Science', score: 92, grade: 'A+', date: '20 May 2025' }
  ];
}
