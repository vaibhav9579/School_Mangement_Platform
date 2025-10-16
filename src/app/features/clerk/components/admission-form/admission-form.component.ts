import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdmissionService } from '../../../../shared/services/admission.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admission-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admission-form.component.html',
  styleUrl: './admission-form.component.css'
})

export class AdmissionFormComponent implements OnInit {
  step = 1;
  maxStep = 5;
  isEdit = false;
  admissionId: number | null = null;

  form!: FormGroup; // ✅ declare first

  // file lists before upload
  filesMap: { [key: string]: File[] } = {
    idProof: [], transferCertificate: [], marksheet: [], other: [], photo: []
  };

  feeBreakdown: { item: string; amount: number }[] = [];
  constructor(
    private fb: FormBuilder,
    private svc: AdmissionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // ✅ initialize form here
    // this.form = this.fb.group({
    //   full_name: [''],
    //   dob: [''],
    //   gender: [''],
    //   guardian_name: [''],
    //   contact: [''],
    //   address: [''],
    //   institution_type: ['School'],
    //   school_class: [''],
    //   school_section: [''],
    //   college_department: [''],
    //   college_program: [''],
    //   college_year: [''],
    //   college_section: [''],
    //   admission_no: [''],
    //   fee_structure_id: [''],
    //   initial_payment_received: [false],
    //   initial_payment_amount: [0]
    // });

    /**
     * @description: "admission form group"
     */
    this.form = this.fb.group({
      admission_no: [''],
      first_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      last_name: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      candidate_contact: ['', Validators.required],
      guardian_name: ['', Validators.required],
      candidate_mail: ['', Validators.required],
      guardian_contact: ['', Validators.required],
      address_line1: ['', Validators.required],
      address_line2: [''],
      address_line3: [''],
      institution_type: ['School'],
      institute_id: ['', Validators.required],
      department_id: [''],
      program_id: [''],
      class_id: ['', Validators.required],
      section_id: [''],
      course_total_fee: ['', Validators.required],
      college_program: [''],
      college_year: [''],
      college_section: [''],
      fee_structure_id: [''],
      initial_payment_received: [false],
      initial_payment_amount: [0]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.admissionId = Number(id);
      this.load(this.admissionId);
    } else {
      this.form.patchValue({ admission_no: `CC-${Date.now()}` });
      this.loadFeeStructure();
    }

    this.form.get('institution_type')?.valueChanges.subscribe(() => {
      this.loadFeeStructure();
    });
  }

  load(id: number) {
    this.svc.getAdmission(id).subscribe({
      next: (ad) => {
        console.log("admission data", ad);
        this.form.patchValue(ad);
        // documents available on ad.documents - handle as needed
      }
    });
  }

  next() { if (this.step < this.maxStep) this.step++; }
  prev() { if (this.step > 1) this.step--; }

  onFileChange(event: any, key: string) {
    const f = event.target.files;
    if (!f || f.length === 0) return;
    for (let i = 0; i < f.length; i++) this.filesMap[key].push(f[i]);
  }

  removeFile(key: string, idx: number) {
    this.filesMap[key].splice(idx, 1);
  }

  loadFeeStructure() {
    if (this.form.get('institution_type')?.value === 'School') {
      this.feeBreakdown = [
        { item: 'Tuition', amount: 15000 },
        { item: 'Library', amount: 1000 }
      ];
    } else {
      this.feeBreakdown = [
        { item: 'Tuition', amount: 40000 },
        { item: 'Lab', amount: 5000 }
      ];
    }
  }

  saveDraft() {
    const data = { ...this.form.value, status: 'draft' };
    const fd = new FormData();
    Object.keys(data).forEach(k =>
      fd.append(k, data[k] === null || data[k] === undefined ? '' : String(data[k]))
    );
    Object.keys(this.filesMap).forEach(key => {
      for (const f of this.filesMap[key]) fd.append(key, f, f.name);
    });

    this.svc.createAdmission(fd).subscribe({
      next: () => {
        alert('Saved draft');
        this.router.navigate(['/clerk/admissions']);
      },
      error: (err) => console.error(err)
    });
  }

  submitForApproval() {
    const data = { ...this.form.value };
    const fd = new FormData();
    Object.keys(data).forEach(k =>
      fd.append(k, data[k] === null || data[k] === undefined ? '' : String(data[k]))
    );
    Object.keys(this.filesMap).forEach(key => {
      for (const f of this.filesMap[key]) fd.append(key, f, f.name);
    });

    this.svc.createAdmission(fd).subscribe({
      next: (res) => {
        console.log("response", res);
        // this.router.navigate(['/clerk/admissions/confirmation'], {
        //   state: { id: res.id, admissionNo: res.admission_no }
        // });
      },
      error: (err) => console.error(err)
    });
  }

  updateExisting() {
    if (!this.admissionId) return;
    const payload = { ...this.form.value };
    this.svc.updateAdmission(this.admissionId, payload).subscribe({
      next: () => {
        const fd = new FormData();
        Object.keys(this.filesMap).forEach(key => {
          for (const f of this.filesMap[key]) fd.append(key, f, f.name);
        });
        if ([...fd.keys()].length > 0) {
          this.svc.uploadDocuments(this.admissionId!, fd).subscribe(() =>
            this.router.navigate(['/clerk/admissions'])
          );
        } else {
          this.router.navigate(['/clerk/admissions']);
        }
      },
      error: (err) => console.error(err)
    });
  }
}
