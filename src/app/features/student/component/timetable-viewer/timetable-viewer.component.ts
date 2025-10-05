import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../../../../shared/services/timetable.service';
import { TimeSlotService } from '../../../../shared/services/time-slot.service';
import { TimetableEntry, TimeSlot } from '../../../../shared/models/timetable.models';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-timetable-viewer',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './timetable-viewer.component.html',
  styleUrl: './timetable-viewer.component.css'
})
export class TimetableViewerComponent {
  // This object will hold the processed data for easy rendering in the HTML grid.
  // Structure: { dayId: { slotId: TimetableEntry } }
  timetableGrid: { [key: number]: { [key: number]: TimetableEntry | null } } = {};
  
  // This array holds the master list of time slots to build the table rows.
  timeSlots: TimeSlot[] = [];
  
  // A static array to define the columns of the timetable.
  daysOfWeek = [
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' }
  ];
  
  isLoading = true;

  // IMPORTANT: In a real application, these IDs would come from a service
  // that holds the logged-in student's profile information.
  // We are hardcoding them here for this example.
  studentClassId = 1; 
  studentSectionId = 1; 

  constructor(
    private timetableService: TimetableService,
    private timeSlotService: TimeSlotService
  ) {}

  ngOnInit(): void {
    // 1. First, fetch the time slots. They define the rows of our timetable grid.
    this.timeSlotService.getTimeSlots().subscribe(slots => {
        // Sort slots by start time to ensure correct order
        this.timeSlots = slots.sort((a, b) => a.start_time.localeCompare(b.start_time));
        
        // 2. Once we have the structure, fetch the student's actual schedule.
        this.loadTimetable();
    });
  }

  /**
   * Fetches the timetable data for the student's class and processes it.
   */
  loadTimetable(): void {
    this.isLoading = true;
    this.timetableService.getForClass(this.studentClassId, this.studentSectionId).subscribe({
      next: (entries) => {
        this.processEntriesIntoGrid(entries);
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Failed to load timetable", err);
        this.isLoading = false;
      }
    });
  }

  /**
   * Transforms the flat array of timetable entries from the API into a 
   * 2D grid object. This makes it much easier to look up and render 
   * the correct data in the corresponding cell of the HTML table.
   * @param entries The array of TimetableEntry objects from the API.
   */
  private processEntriesIntoGrid(entries: TimetableEntry[]): void {
    // Reset the grid before populating it
    this.timetableGrid = {}; 

    for (const entry of entries) {
      // Ensure the day object exists
      if (!this.timetableGrid[entry.day_of_week]) {
        this.timetableGrid[entry.day_of_week] = {};
      }
      
      // Find the corresponding slot_id by matching the start_time from the entry
      const slot = this.timeSlots.find(s => s.start_time === entry.start_time);
      
      if (slot) {
          // Place the entry in the grid at the correct day and slot position
          this.timetableGrid[entry.day_of_week][slot.slot_id] = entry;
      }
    }
  }
}
