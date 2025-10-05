import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OutwardService, Outward } from '../../../../shared/outward.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-outward-register',
  templateUrl: './outward-register.component.html',
})
export class OutwardRegisterComponent implements OnInit {

  outwardEntries: Outward[] = [];
  outwardForm: FormGroup;
  isFormVisible = false;

  constructor(
    private outwardService: OutwardService,
    private fb: FormBuilder
  ) {
    this.outwardForm = this.fb.group({
      dispatch_date: ['', Validators.required],
      recipient_details: ['', Validators.required],
      subject: ['', Validators.required],
      document_type: ['Letter', Validators.required],
      dispatch_mode: ['Post'],
      tracking_number: [''],
      // This should come from the logged-in user's state
      logged_by_user_id: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadOutwardEntries();
  }

  loadOutwardEntries(): void {
    this.outwardService.getAll().subscribe((data: any) => {
      this.outwardEntries = data;
    });
  }

  onSubmit(): void {
    if (this.outwardForm.invalid) {
      return;
    }

    this.outwardService.create(this.outwardForm.value).subscribe((newEntry: any) => {
      this.outwardEntries.unshift(newEntry); // Add new entry to the top of the list
      this.toggleFormVisibility();
      this.outwardForm.reset({
        document_type: 'Letter',
        dispatch_mode: 'Post',
        logged_by_user_id: 1
      });
    });
  }

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }
}