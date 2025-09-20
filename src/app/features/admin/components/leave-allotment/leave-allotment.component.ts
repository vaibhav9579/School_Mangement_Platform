import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave-allotment',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './leave-allotment.component.html',
  styleUrl: './leave-allotment.component.css'
})
export class LeaveAllotmentComponent {
 leaveForm!: FormGroup;
  users: any[] = []; // fetched from API /user endpoint
  leaveTypes: string[] = ['Sick Leave', 'Casual Leave', 'Earned Leave'];

  isSubmitting = false;
  message = '';
  roles: string[] = ['Admin', 'Teacher', 'Clerk', 'Student'];
  
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.leaveForm = this.fb.group({
      userId: ['', Validators.required],
      leaveType: ['', Validators.required],
      totalAllowed: ['', [Validators.required, Validators.min(1)]],
    });

    this.fetchUsers();
  }

  fetchUsers() {
    // TODO: replace with your user API endpoint
    this.http.get<any[]>('http://localhost:5000/users').subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Failed to fetch users', err);
      }
    });
  }

  onSubmit() {
    if (this.leaveForm.invalid) {
      this.leaveForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.message = '';

    this.http.post('http://localhost:5000/api/leave/allocate', this.leaveForm.value).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        this.message = res.message || 'Leave allocation successful!';
        this.leaveForm.reset();
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error(err);
        this.message = 'Error allocating leave. Please try again.';
      }
    });
  }
}
