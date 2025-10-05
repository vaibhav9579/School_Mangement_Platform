import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../../../../shared/services/timetable.service';
import { TimeSlotService } from '../../../../shared/services/time-slot.service';
import { TimetableEntry, TimeSlot } from '../../../../shared/models/timetable.models';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-timetable-view',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ],
  templateUrl: './timetable-view.component.html',
  styleUrl: './timetable-view.component.css'
})
export class TimetableViewComponent {
// This will be the 2D data structure for easy rendering in the HTML table
  timetableGrid: { [key: number]: { [key: number]: TimetableEntry | null } } = {};
  
  // Master list of time slots to build the table rows
  timeSlots: TimeSlot[] = [];
  
  // Static list of days for the table columns
  daysOfWeek = [
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' }
  ];
  
  isLoading = true;

  // IMPORTANT: This ID should come from your authentication service after the teacher logs in.
  // We are hardcoding it here for demonstration purposes.
  loggedInTeacherId = 1; 

  constructor(
    private timetableService: TimetableService,
    private timeSlotService: TimeSlotService
  ) {}

  ngOnInit(): void {
    // First, fetch the time slots which define the rows of our table.
    this.timeSlotService.getTimeSlots().subscribe(slots => {
        this.timeSlots = slots.sort((a, b) => a.start_time.localeCompare(b.start_time));
        // Once we have the slots, fetch the actual timetable data.
        this.loadTimetable();
    });
  }

  loadTimetable(): void {
    this.isLoading = true;
    this.timetableService.getForTeacher(this.loggedInTeacherId).subscribe(entries => {
        this.processEntriesIntoGrid(entries);
        this.isLoading = false;
    });
  }

  /**
   * Transforms the flat array of timetable entries from the API into a 
   * 2D grid object for easy lookup and rendering in the HTML template.
   */
  private processEntriesIntoGrid(entries: TimetableEntry[]): void {
    this.timetableGrid = {}; // Reset the grid
    for (const entry of entries) {
      if (!this.timetableGrid[entry.day_of_week]) {
        this.timetableGrid[entry.day_of_week] = {};
      }
      // Find the slot_id that corresponds to the entry's start time
      const slot = this.timeSlots.find(s => s.start_time === entry.start_time);
      if (slot) {
          this.timetableGrid[entry.day_of_week][slot.slot_id] = entry;
      }
    }
  }
}
