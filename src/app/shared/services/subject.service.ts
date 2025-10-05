import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Subject model interface
 * - Matches the structure used in backend (Node + PostgreSQL)
 * - Optional fields (`?`) handle cases where a subject is linked
 *   only up to institution/department/program level
 */
export interface Subject {
  id?: number;               // Primary key (auto-generated in DB)
  institution_id: number;    // Foreign key → Institution
  department_id?: number | null; // Foreign key → Department
  program_id?: number | null;    // Foreign key → Program
  class_id?: number | null;      // Foreign key → Class
  name: string;              // Subject name (e.g., Mathematics)
  code: string;              // Unique code (e.g., MATH101)
}

@Injectable({
  providedIn: 'root' // Service will be available app-wide without re-importing
})
export class SubjectService {

  /** Base URL for all subject-related API requests */
  private baseUrl = 'http://localhost:5000/api/subjects';

  constructor(private http: HttpClient) { }

  /**
   * Fetch a list of subjects
   * @param filters (optional) - key-value pairs for filtering subjects
   * Example: { institution_id: 1, department_id: 2 }
   * Returns an Observable of Subject[] (array of subjects)
   */
  list(filters?: any): Observable<Subject[]> {
    const qs = filters ? '?' + new URLSearchParams(filters).toString() : '';
    return this.http.get<Subject[]>(this.baseUrl + qs);
  }

  getParticularClassAllSubjects(classId: any): Observable<string[]> {
    return this.http.get<any>(`${this.baseUrl}/${classId}`);
  }

  /**
   * Create a new subject
   * @param subject - Subject object (without id)
   * Returns an Observable of the created Subject
   */
  create(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.baseUrl, subject);
  }

  getSubjectsByTeacher(teacherId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.baseUrl}/teacher/${teacherId}`);
  }

  /**
   * Update an existing subject
   * @param id - Subject ID to update
   * @param subject - Updated Subject object
   * Returns an Observable of the updated Subject
   */
  update(id: number, subject: Subject): Observable<Subject> {
    console.log("subject", `${this.baseUrl}/${id}`, subject);
    return this.http.put<Subject>(`${this.baseUrl}/${id}`, subject);
  }

  upadateTeacherId(id: number, teacherId: Subject): Observable<Subject> {
    console.log("subjects----", `${this.baseUrl}/updateteacher/${id}`, teacherId);
    return this.http.put<any>(`${this.baseUrl}/${id}`, teacherId);
  }

  /**
   * Delete a subject by ID
   * @param id - Subject ID to delete
   * Returns an Observable of void (no response body)
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getSubjectsByTeacherAndClass(teacherId: number, classId: number): Observable<Subject[]> {
  return this.http.get<Subject[]>(`${this.baseUrl}/teacher/${teacherId}/class/${classId}`);
}

}
