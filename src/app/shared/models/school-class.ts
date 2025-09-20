export interface SchoolClass {
  id: number;
  name: string;
  section: string;
  teacherId?: number; // assigned teacher ID
  teacherName?: string; // optional to display directly
}
