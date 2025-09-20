import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})

export class ResultComponent {
students: string[] = ['Aarav Sharma', 'Bhavna Devi', 'Chirag Singh'];

  formData = {
    student: '',
    subject: '',
    score: '',
    grade: ''
  };

  onSubmit() {
    if (!this.formData.student || !this.formData.subject || !this.formData.score || !this.formData.grade) {
      alert('Please fill in all fields');
      return;
    }

    console.log('Result Uploaded:', this.formData);
    alert('Result uploaded successfully!');
    this.formData = { student: '', subject: '', score: '', grade: '' };
  }
}
