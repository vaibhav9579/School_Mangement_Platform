import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubjectService, Subject } from '../../../../shared/services/subject.service';
import { AcademicServiceService, Institution, Department, Program, ClassModel } from '../../../../shared/services/academic-service.service';

@Component({
  selector: 'app-subject-assign',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './subject-assign.component.html',
  styleUrl: './subject-assign.component.css'
})
export class SubjectAssignComponent implements OnInit {
  form!: FormGroup;
  subjects: Subject[] = [];

  institutions: Institution[] = [];
  departments: Department[] = [];
  programs: Program[] = [];
  classes: ClassModel[] = [];

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private academicService: AcademicServiceService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      institution_id: [null, Validators.required],
      department_id: [null],
      program_id: [null],
      class_id: [null, Validators.required],
      name: ['', Validators.required],
      code: ['', Validators.required],
      teacher_id: [null]
    });

    this.loadSubjects();
    this.loadInstitutions();
  }

  // Loaders
  loadSubjects() {
    this.subjectService.list().subscribe(res => this.subjects = res);
  }
  loadInstitutions() {
    this.academicService.listInstitutions().subscribe(res => this.institutions = res);
  }
  loadDepartments(institutionId: number) {
    this.academicService.listDepartments(institutionId).subscribe(res => this.departments = res);
  }
  loadPrograms(departmentId: number) {
    this.academicService.listPrograms(departmentId).subscribe(res => this.programs = res);
  }
  loadClasses(opts?: any) {
    this.academicService.listClasses(opts).subscribe(res => this.classes = res);
  }

  // Dropdown change handlers
  onInstitutionChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const institutionId = +select.value;

    this.departments = [];
    this.programs = [];
    this.classes = [];
    this.form.patchValue({ department_id: null, program_id: null, class_id: null });

    if (institutionId) {
      this.loadDepartments(institutionId);
      this.loadClasses({ institution_id: institutionId });
    }
  }

  onDepartmentChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const deptId = +select.value;

    this.programs = [];
    this.classes = [];
    this.form.patchValue({ program_id: null, class_id: null });

    if (deptId) {
      this.loadPrograms(deptId);
      this.loadClasses({ department_id: deptId });
    }
  }

  onProgramChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const programId = +select.value;

    this.classes = [];
    this.form.patchValue({ class_id: null });

    if (programId) {
      this.loadClasses({ program_id: programId });
    }
  }

  // CRUD
  save() {
    if (this.form.invalid) return;
    const val = this.form.value;

    if (val.id) {
      this.subjectService.update(val.id, val).subscribe((updated) => this.afterSave(updated));
    } else {
      this.subjectService.create(val).subscribe((created) => this.afterSave(created));
    }
  }

  edit(s: Subject) {
    this.form.patchValue(s);

    // Load dropdowns in chain for pre-selection
    if (s.institution_id) {
      this.loadDepartments(s.institution_id);
      this.loadClasses({ institution_id: s.institution_id });
    }
    if (s.department_id) {
      this.loadPrograms(s.department_id);
      this.loadClasses({ department_id: s.department_id });
    }
    if (s.program_id) {
      this.loadClasses({ program_id: s.program_id });
    }
  }

  delete(id: number) {
    if (!confirm('Are you sure you want to delete this subject?')) return;
    this.subjectService.delete(id).subscribe(() => this.loadSubjects());
  }

 afterSave(subject: Subject) {
    this.loadSubjects();

    // ✅ Keep the form filled with the latest saved subject
    this.form.patchValue(subject);

    // ✅ Reload dropdowns so correct Institution → Dept → Program → Class remain visible
    if (subject.institution_id) {
      this.loadDepartments(subject.institution_id);
      this.loadClasses({ institution_id: subject.institution_id });
    }
    if (subject.department_id) {
      this.loadPrograms(subject.department_id);
      this.loadClasses({ department_id: subject.department_id });
    }
    if (subject.program_id) {
      this.loadClasses({ program_id: subject.program_id });
    }
  }
}
