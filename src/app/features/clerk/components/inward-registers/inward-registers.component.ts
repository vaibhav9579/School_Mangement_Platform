import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InwardService, Inward } from '../../../../shared/services/inward.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-inward-registers',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './inward-registers.component.html',
  styleUrl: './inward-registers.component.css'
})
export class InwardRegistersComponent {
 inwardEntries: Inward[] = [];
  inwardForm: FormGroup;
  isFormVisible = false;

  constructor(
    private inwardService: InwardService,
    private fb: FormBuilder
  ) {
    this.inwardForm = this.fb.group({
      received_date: ['', Validators.required],
      sender_details: ['', Validators.required],
      subject: ['', Validators.required],
      document_type: ['Letter', Validators.required],
      // This should come from the logged-in user's state
      logged_by_user_id: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadInwardEntries();
  }

  loadInwardEntries(): void {
    this.inwardService.getAll().subscribe((data: any) => {
      this.inwardEntries = data;
    });
  }

  onSubmit(): void {
    if (this.inwardForm.invalid) {
      return;
    }

    this.inwardService.create(this.inwardForm.value).subscribe((newEntry : any) => {
      this.inwardEntries.unshift(newEntry); // Add new entry to the top
      this.toggleFormVisibility();
      this.inwardForm.reset({ document_type: 'Letter', logged_by_user_id: 1 });
    });
  }

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }
}
