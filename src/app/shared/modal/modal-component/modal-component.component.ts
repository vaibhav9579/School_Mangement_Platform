import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-component',
  imports: [CommonModule],
  templateUrl: './modal-component.component.html',
  styleUrl: './modal-component.component.css'
})
export class ModalComponentComponent {
  @Input() title: string = '';
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
