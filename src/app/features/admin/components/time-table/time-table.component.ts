import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// Import all services and models
import { TimeSlotService } from '../../../../shared/services/time-slot.service';
import { AssignmentService } from '../../../../shared/services/assignment.service';
import { TimetableService } from '../../../../shared/services/timetable.service';
import { TimeSlot, Assignment, TimetableEntry, Teacher, Subject, Class, Section} from '../../../../shared/models/timetable.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-table',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './time-table.component.html',
  styleUrl: './time-table.component.css'
})

export class TimeTableComponent {
 activeTab: 'builder' | 'slots' | 'assignments' = 'builder';

  // Data stores
  timeSlots: TimeSlot[] = [];
  assignments: Assignment[] = [];
  teachers: Teacher[] = []; // Should be fetched from a UserService
  subjects: Subject[] = []; // Should be fetched from a SubjectService
  classes: Class[] = [];     // Should be fetched from a ClassService
  sections: Section[] = [];  // Should be fetched from a SectionService

  // Timetable grid data
  timetableGrid: { [key: number]: { [key: number]: TimetableEntry | null } } = {};
  daysOfWeek = [
    { id: 1, name: 'Monday' }, { id: 2, name: 'Tuesday' }, { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' }, { id: 5, name: 'Friday' }, { id: 6, name: 'Saturday' }
  ];

  // Forms
  slotForm: FormGroup;
  assignmentForm: FormGroup;
  timetableSelectionForm: FormGroup;
  entryForm: FormGroup;

  // Modal state
  isModalOpen = false;
  modalError: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private timeSlotService: TimeSlotService,
    private assignmentService: AssignmentService,
    private timetableService: TimetableService
  ) {
    // Form for creating a new time slot
    this.slotForm = this.fb.group({
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      is_break: [false]
    });

    // Form for assigning a teacher to a subject
    this.assignmentForm = this.fb.group({
      teacher_id: [null, Validators.required],
      subject_id: [null, Validators.required]
    });

    // Form for selecting which timetable to view/edit
    this.timetableSelectionForm = this.fb.group({
        class_id: [null, Validators.required],
        section_id: [null, Validators.required]
    });

    // Form for the modal to create a timetable entry
    this.entryForm = this.fb.group({
        day_of_week: [null],
        slot_id: [null],
        assignment_id: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAllMasterData();
    this.timetableSelectionForm.valueChanges.subscribe(val => {
        if(val.class_id && val.section_id) {
            this.loadTimetableGrid();
        }
    });
  }

  loadAllMasterData(): void {
    // Fetch all data required for the component
    this.timeSlotService.getTimeSlots().subscribe(data => this.timeSlots = data);
    this.assignmentService.getAssignments().subscribe(data => this.assignments = data);

    // MOCK DATA: Replace with actual service calls
    this.teachers = [{id: 1, name: 'Mr. Vaibhav'}, {id: 2, name: 'Ms. Priya'}, {id: 3, name: 'Mr. Sharma'}];
    this.subjects = [{id: 1, name: 'English'}, {id: 2, name: 'Maths'}, {id: 3, name: 'Science'}];
    this.classes = [{id: 1, name: 'Class 5'}, {id: 2, name: 'Class 6'}];
    this.sections = [{id: 1, name: 'A'}, {id: 2, name: 'B'}];
  }

  // --- Time Slot Methods ---
  onSaveTimeSlot(): void {
    if (this.slotForm.valid) {
      this.timeSlotService.createTimeSlot(this.slotForm.value).subscribe(newSlot => {
        this.timeSlots.push(newSlot);
        this.timeSlots.sort((a,b) => a.start_time.localeCompare(b.start_time));
        this.slotForm.reset({ is_break: false });
      });
    }
  }

  onDeleteTimeSlot(id: number): void {
    this.timeSlotService.deleteTimeSlot(id).subscribe(() => {
        this.timeSlots = this.timeSlots.filter(s => s.slot_id !== id);
    });
  }

  // --- Assignment Methods ---
  onSaveAssignment(): void {
    if (this.assignmentForm.valid) {
      this.assignmentService.createAssignment(this.assignmentForm.value).subscribe({
        next: (newAssignment) => {
          this.assignments.push(newAssignment);
          this.assignmentForm.reset();
        },
        error: (err) => alert(err.error.error) // Display error from backend
      });
    }
  }

  onDeleteAssignment(id: number): void {
      this.assignmentService.deleteAssignment(id).subscribe(() => {
          this.assignments = this.assignments.filter(a => a.assignment_id !== id);
      });
  }

  // --- Timetable Builder Methods ---
  loadTimetableGrid(): void {
    const { class_id, section_id } = this.timetableSelectionForm.value;
    if (!class_id || !section_id) return;

    this.timetableService.getForClass(class_id, section_id).subscribe(entries => {
      // Process flat array into a 2D grid for easy lookup in the template
      this.timetableGrid = {};
      for (const entry of entries) {
        if (!this.timetableGrid[entry.day_of_week]) {
          this.timetableGrid[entry.day_of_week] = {};
        }
        // Find the slot_id that matches the start_time
        const slot = this.timeSlots.find(s => s.start_time === entry.start_time);
        if (slot) {
            this.timetableGrid[entry.day_of_week][slot.slot_id] = entry;
        }
      }
    });
  }

  openEntryModal(day: number, slotId: number): void {
    this.entryForm.patchValue({ day_of_week: day, slot_id: slotId });
    this.isModalOpen = true;
    this.modalError = null;
  }
  
  onDeleteEntry(entryId: number): void {
      if(confirm('Are you sure you want to delete this entry?')) {
          this.timetableService.deleteEntry(entryId).subscribe(() => this.loadTimetableGrid());
      }
  }

  onSaveEntry(): void {
      if(this.entryForm.invalid) return;
      
      const entryData = {
          ...this.timetableSelectionForm.value,
          ...this.entryForm.value
      };
      
      this.timetableService.createEntry(entryData).subscribe({
          next: () => {
              this.isModalOpen = false;
              this.loadTimetableGrid();
          },
          error: (err) => {
              this.modalError = err.error.error; // Show clash error in modal
          }
      });
  }
}
