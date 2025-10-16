import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assign-homework',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-homework.component.html',
  styleUrl: './assign-homework.component.css'
})
export class AssignHomeworkComponent {
 classList = ['10A', '10B', '9A', '9B'];

  newHomework = {
    class: '',
    subject: '',
    title: '',
    description: '',
    dueDate: ''
  };

  homeworkList = [
    { class: '5', subject: 'English', title: '10 Grammar questions', dueDate: '2025-10-15' }
  ];

  assignHomework() {
    if (this.newHomework.class && this.newHomework.subject && this.newHomework.title && this.newHomework.dueDate) {
      this.homeworkList.push({ ...this.newHomework });
      this.newHomework = { class: '', subject: '', title: '', description: '', dueDate: '' };
      alert('Homework assigned successfully!');
    }
  }

  viewHomework(hw: any) {
    alert(`Viewing homework: ${hw.title}`);
  }

  deleteHomework(hw: any) {
    this.homeworkList = this.homeworkList.filter(item => item !== hw);
  }
}
