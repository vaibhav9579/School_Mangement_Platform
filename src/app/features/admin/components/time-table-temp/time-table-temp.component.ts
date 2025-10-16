import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { NgIf, NgFor, NgClass, NgTemplateOutlet } from '@angular/common'; // Only needed if not using Angular 17.2+, but good practice for clarity

// --- Interfaces for type safety ---
interface SubjectData {
  id: number;
  name: string;
  teacher: string;
  color: string;
  hover: string;
  text?: string;
}

interface TimetableCell {
  day: string;
  slot: string;
}

interface Filters {
  class: string;
  section: string;
}

// Define the shape of the main timetable data
type Timetable = {
  [key: string]: {
    [key: string]: SubjectData | null;
  }
}

// --- Configuration Data ---
const TIME_SLOTS: string[] = [
  '8:00 - 9:00 (P1)',
  '9:00 - 10:00 (P2)',
  '10:00 - 11:00 (P3)',
  '11:00 - 11:30 (Break)',
  '11:30 - 12:30 (P4)',
  '12:30 - 1:30 (P5)',
];

const DAYS: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const SUBJECT_TEACHERS: SubjectData[] = [
  { id: 1, name: 'Mathematics', teacher: 'Dr. A. Sharma', color: 'bg-indigo-500', hover: 'hover:bg-indigo-600' },
  { id: 2, name: 'Physics', teacher: 'Ms. J. Kaur', color: 'bg-teal-500', hover: 'hover:bg-teal-600' },
  { id: 3, name: 'Chemistry', teacher: 'Mr. S. Khan', color: 'bg-red-500', hover: 'hover:bg-red-600' },
  { id: 4, name: 'Biology', teacher: 'Dr. P. Patil', color: 'bg-green-500', hover: 'hover:bg-green-600' },
  { id: 5, name: 'English', teacher: 'Mrs. L. Smith', color: 'bg-yellow-500', hover: 'hover:bg-yellow-600' },
  { id: 6, name: 'History', teacher: 'Mr. B. Rajan', color: 'bg-purple-500', hover: 'hover:bg-purple-600' },
  { id: 7, name: 'Computer Sci.', teacher: 'Ms. K. Rao', color: 'bg-pink-500', hover: 'hover:bg-pink-600' },
  { id: 8, name: 'P.E.', teacher: 'Coach M. Lee', color: 'bg-gray-500', hover: 'hover:bg-gray-600' },
];

// --- Initialization Logic ---
const INITIAL_TIMETABLE: Timetable = DAYS.reduce((acc: Timetable, day) => {
  acc[day] = TIME_SLOTS.reduce((slotAcc: { [key: string]: SubjectData | null }, slot) => {
    slotAcc[slot] = null;
    return slotAcc;
  }, {});
  return acc;
}, {});

// Mock some initial data for demonstration
INITIAL_TIMETABLE['Monday']['8:00 - 9:00 (P1)'] = SUBJECT_TEACHERS[0];
INITIAL_TIMETABLE['Tuesday']['9:00 - 10:00 (P2)'] = SUBJECT_TEACHERS[1];
INITIAL_TIMETABLE['Thursday']['11:30 - 12:30 (P4)'] = SUBJECT_TEACHERS[6];
INITIAL_TIMETABLE['Friday']['11:00 - 11:30 (Break)'] = { id: 0, name: 'Break', teacher: '', color: 'bg-gray-200', hover: '', text: 'text-gray-700' };


@Component({
  selector: 'app-time-table-temp',
  imports: [],
  templateUrl: './time-table-temp.component.html',
  styleUrl: './time-table-temp.component.css'
})
export class TimeTableTempComponent {
  readonly DAYS = DAYS;
  readonly TIME_SLOTS = TIME_SLOTS;
  readonly SUBJECT_TEACHERS = SUBJECT_TEACHERS;

  // State managed via Signals
  timetableData: WritableSignal<Timetable> = signal(INITIAL_TIMETABLE);
  editingCell: WritableSignal<TimetableCell | null> = signal(null);
  selectedFilters: WritableSignal<Filters> = signal({ class: '10th Grade', section: 'A' });

  // Updates a key in the selectedFilters signal
  updateFilter(key: keyof Filters, event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedFilters.update(current => ({
      ...current,
      [key]: value
    }));
  }

  // Opens the editing panel when a cell is clicked
  handleCellClick(day: string, slot: string): void {
    // Prevent editing of non-class slots like 'Break'
    if (slot.includes('Break')) return;

    this.editingCell.set({ day, slot });
  }

  // Assigns a subject or removes the current assignment
  handleAssignment(subjectData: SubjectData | 'REMOVE'): void {
    const cell = this.editingCell();
    if (!cell) return;

    const { day, slot } = cell;
    const isRemove = subjectData === 'REMOVE';

    // Update the timetable data signal immutably
    this.timetableData.update(prevData => {
      const newDayData = {
        ...prevData[day],
        [slot]: isRemove ? null : subjectData,
      };
      
      return {
        ...prevData,
        [day]: newDayData
      };
    });

    this.editingCell.set(null); // Close the editing panel
  }

}
