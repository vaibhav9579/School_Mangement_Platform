export class Student {
  id?: number;                       // Auto-generated when stored in DB
  name!: string;                     // Student full name
  email!: string;                    // Email ID
  mobile!: string;                   // Contact number
  marks!: number;                    // Previous marks
  status!: 'pending' | 'approved' | 'rejected';  // Admission status
  classAssigned?: string;            // Assigned class (e.g., "Class 8A")
}
