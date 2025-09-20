import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface FeeRecord {
  name: string;
  class: string;
  amount: number;
  status: 'Paid' | 'Pending';
  dueDate: string;
  paidDate?: string;
}

@Component({
  selector: 'app-fee-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fee-management.component.html',
  styleUrl: './fee-management.component.css'
})
export class FeeManagementComponent implements OnInit{
feeData: FeeRecord[] = [
    {
      name: 'Aarav Sharma',
      class: '10A',
      amount: 1500,
      status: 'Paid',
      dueDate: '1 July 2025',
      paidDate: '15 June 2025'
    },
    {
      name: 'Bhavna Devi',
      class: '10A',
      amount: 1500,
      status: 'Pending',
      dueDate: '1 July 2025'
    },
    {
      name: 'Chirag Singh',
      class: '9B',
      amount: 1200,
      status: 'Paid',
      dueDate: '1 July 2025',
      paidDate: '10 June 2025'
    }
  ];

  ngOnInit(): void {
    // API call can be placed here later
  }
}
