import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  student_id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
}

export interface AttendanceRecord {
  attendance_id?: number;
  student_id: number;
  status: 'present' | 'absent' | 'late' | 'leave';
  arrival_time?: string;
  remark?: string;
}

export interface ClassAttendance {
  class_id: number;
  section_id: number;
  institution_id: number;
  department_id?: number;
  program_id?: number;
  students: Student[];
  attendance: AttendanceRecord[];
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
 private apiUrl = 'http://localhost:5000/api/attendance';

  constructor(private http: HttpClient) { }

  /**
   * Get students + today's attendance for teacher's assigned class
   */
  getStudentsWithAttendance(userId:number): Observable<ClassAttendance> {
    console.log(`${this.apiUrl}/students/${userId}`);
    return this.http.get<ClassAttendance>(`${this.apiUrl}/students/${userId}`);
  }

  /**
   * Get attendance by date (edit or report)
   * @param date yyyy-mm-dd format
   */
  getAttendanceByDate(date: string): Observable<ClassAttendance> {
    return this.http.get<ClassAttendance>(`${this.apiUrl}/${date}`);
  }

  /**
   * Save bulk attendance
   */
  saveBulkAttendance(payload: {
    class_id: number;
    section_id: number;
    institution_id: number;
    department_id?: number;
    program_id?: number;
    taken_by_user_id: number;
    attendance_date: string;
    records: AttendanceRecord[];
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/batch`, payload);
  }

  /**
   * Edit single attendance record
   */
  editAttendance(attendance_id: number, payload: {
    status: 'present' | 'absent' | 'late' | 'leave';
    arrival_time?: string;
    remark?: string;
    changed_by_user_id: number;
  }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${attendance_id}`, payload);
  }
}
