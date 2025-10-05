// This central file holds all our custom types for the module.

export interface TimeSlot {
  slot_id: number;
  start_time: string;
  end_time: string;
  is_break: boolean;
}

export interface Assignment {
  assignment_id: number;
  teacher_name: string;
  subject_name: string;
  // We'll also need these for creating assignments
  teacher_id?: number;
  subject_id?: number;
}

// For the data returned by the API for a class/teacher view
export interface TimetableEntry {
  entry_id: number;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_break: boolean;
  subject_name: string;
  teacher_name?: string; // Available in class view
  class_name?: string;   // Available in teacher view
  section_name?: string; // Available in teacher view
}

// Basic interfaces for dropdowns
export interface Class {
  id: number;
  name: string;
}

export interface Section {
  id: number;
  name:string;
}

export interface Subject {
  id: number;
  name: string;
}

export interface Teacher {
  id: number;
  name: string;
}