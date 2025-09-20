import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-result',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './upload-result.component.html',
  styleUrl: './upload-result.component.css'
})
export class UploadResultComponent {
students = [
    { id: 'S001', name: 'Aarav Sharma' },
    { id: 'S002', name: 'Bhavna Devi' },
    { id: 'S004', name: 'Deepika Rao' },
  ];

  formData = {
    studentId: '',
    subject: '',
    score: null,
    grade: '',
  };

  uploadResult() {
    console.log('Form Data:', this.formData);
    alert('Result uploaded successfully!');
    // API call can be made here
  }
}
