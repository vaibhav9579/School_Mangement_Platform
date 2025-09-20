import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ask-anna',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ask-anna.component.html',
  styleUrl: './ask-anna.component.css'
})
export class AskAnnaComponent {

}
