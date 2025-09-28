// src/app/admin/components/admin-academic/admin-academic.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AcademicServiceService, Institution, Department, Program, ClassModel, Section } from '../../../../shared/services/academic-service.service';

@Component({
  selector: 'app-academic-structure',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './academic-structure.component.html',
  styleUrl: './academic-structure.component.css'
})

export class AcademicStructureComponent implements OnInit {
  tab: 'institution' | 'department' | 'program' | 'class' | 'section' = 'institution';

  institutions: Institution[] = [];
  departments: Department[] = [];
  programs: Program[] = [];
  classes: ClassModel[] = [];
  sections: Section[] = [];

  instForm!: FormGroup;
  deptForm!: FormGroup;
  progForm!: FormGroup;
  classForm!: FormGroup;
  sectionForm!: FormGroup;


  // forms
  ngOnInit(): void {

    this.loadAll();


    this.instForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      type: ['school', Validators.required],
    });

    this.deptForm = this.fb.group({
      id: [null],
      institution_id: [null, Validators.required],
      name: ['', Validators.required],
    });

    this.progForm = this.fb.group({
      id: [null],
      department_id: [null, Validators.required],
      name: ['', Validators.required],
    });

    this.classForm = this.fb.group({
      id: [null],
      institution_id: [null, Validators.required],
      program_id: [null],
      name: ['', Validators.required],
    });

    this.sectionForm = this.fb.group({
      id: [null],
      class_id: [null, Validators.required],
      name: ['', Validators.required],
    });
  }

  loading = false;
  message = '';

  constructor(private svc: AcademicServiceService, private fb: FormBuilder) { }

  loadAll() {
    this.svc.listInstitutions().subscribe(inst => this.institutions = inst);
    // other lists will be loaded by user selection
  }

  selectTab(tab: any) {
    this.tab = tab;
    this.message = '';

    switch (tab) {
      case 'department':
        this.loadDepartments();
        break;

      case 'program':
        this.loadPrograms();
        break;

      case 'class':
        this.loadClasses();
        break;

      case 'section':
        this.loadSections();
        break;
    }
  }


  // institution actions
  saveInstitution() {
    if (this.instForm.invalid) return;
    const v = this.instForm.value;
    this.loading = true;
    if (v.id) this.svc.updateInstitution(v.id, v).subscribe(() => this.afterSave('institution'));
    else this.svc.createInstitution(v).subscribe(() => this.afterSave('institution'));
  }

  editInstitution(inst: Institution) { this.instForm.patchValue(inst); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  deleteInstitution(id: number) { if (!confirm('Delete?')) return; this.svc.deleteInstitution(id).subscribe(() => this.loadAll()); }

  // department
  loadDepartments() {
    this.svc.listDepartments().subscribe(d => this.departments = d);
  }

  saveDepartment() {
    if (this.deptForm.invalid) return; const v = this.deptForm.value; if (v.id) this.svc.updateDepartment(v.id, v).subscribe(() => this.afterSave('department')); else this.svc.createDepartment(v).subscribe(() => this.afterSave('department'));
  }

  editDepartment(d: Department) {
    this.deptForm.patchValue(d); window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteDepartment(id: number) {
    if (!confirm('Delete?')) return; this.svc.deleteDepartment(id).subscribe(() => this.loadDepartments());
  }

  // program
  loadPrograms() { this.svc.listPrograms().subscribe(p => this.programs = p); }
  saveProgram() { if (this.progForm.invalid) return; const v = this.progForm.value; if (v.id) this.svc.updateProgram(v.id, v).subscribe(() => this.afterSave('program')); else this.svc.createProgram(v).subscribe(() => this.afterSave('program')); }
  editProgram(p: Program) { this.progForm.patchValue(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  deleteProgram(id: number) { if (!confirm('Delete?')) return; this.svc.deleteProgram(id).subscribe(() => this.loadPrograms()); }

  // class
  loadClasses() { this.svc.listClasses().subscribe(c => this.classes = c); }
  saveClass() { if (this.classForm.invalid) return; const v = this.classForm.value; if (v.id) this.svc.updateClass(v.id, v).subscribe(() => this.afterSave('class')); else this.svc.createClass(v).subscribe(() => this.afterSave('class')); }
  editClass(c: ClassModel) { this.classForm.patchValue(c); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  deleteClass(id: number) { if (!confirm('Delete?')) return; this.svc.deleteClass(id).subscribe(() => this.loadClasses()); }

  // section
  loadSections() { this.svc.listSections().subscribe(s => this.sections = s); }
  saveSection() { if (this.sectionForm.invalid) return; const v = this.sectionForm.value; if (v.id) this.svc.updateSection(v.id, v).subscribe(() => this.afterSave('section')); else this.svc.createSection(v).subscribe(() => this.afterSave('section')); }
  editSection(s: Section) { this.sectionForm.patchValue(s); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  deleteSection(id: number) { if (!confirm('Delete?')) return; this.svc.deleteSection(id).subscribe(() => this.loadSections()); }

  afterSave(kind: string) {
    this.loading = false;
    this.message = `${kind} saved`;
    // reset forms
    this.instForm.reset({ type: 'school' }); this.deptForm.reset(); this.progForm.reset(); this.classForm.reset(); this.sectionForm.reset();
    // reload lists
    this.loadAll();
    this.loadDepartments();
    this.loadPrograms();
    this.loadClasses();
    this.loadSections();
  }
}
